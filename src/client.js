import io from "socket.io-client";
import React from "react";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  Tooltip
} from "recharts";

const socket = io("http://localhost:3001", {
    transports: ["websocket", "polling"]
});

const App = () => {
    const [data, setData] = useState([]);

    // Se escucha el evento de la CPU y se actualiza el estado.
    useEffect(() => {
        socket.on("cpu", cpuPercent => {
            setData(currentData => [...currentData, cpuPercent]);
        });
    });

    // Renderizar los valores capturados en el chat usando el estado.
    return (
        <div>
            <h1>CPU Usage</h1>
            <BarChart width={600} height={300} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
            <LineChart width={600} height={300} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
        </div>
    );
     
};

ReactDOM.render(<App />, document.getElementById("root"));

