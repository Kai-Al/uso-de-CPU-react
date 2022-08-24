const server = require('http').createServer();
const os = require('os-utils');
const io = require('socket.io')(server,{
    transports: ['websocket', 'polling']
});

//Esta variable nos va a mostrar los datos del eje x en el grafico.
let tick = 0;

// Vamos a escuchar las conexiones de los clientes.
io.on('connection', client => {
    setInterval(() => {
        os.totalmem(memPercent =>{
            client.emit('mem',{
                name: tick++,
                value: memPercent
            }); console.log(memPercent);
        });
    });
// Cada segundo se va a emitir el evento CPU al usuario.
    setInterval(() => {
        os.cpuUsage((err, cpu) => {
            client.emit('cpu', {
                name: tick++,
                value: cpu
            });
        }),1000;
    });
});

server.listen(3001);