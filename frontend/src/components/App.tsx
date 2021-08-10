import React, { useState, useEffect } from "react";
import "./App.less";
import { io } from "socket.io-client";

interface ICpu {
  model: string;
  speed: number;
  times: {
    user: number;
    nice: number;
    sys: number;
    idle: number;
    irq: number;
  };
}

interface IData {
  cpus: ICpu[];
  totalmem: number;
  freemem: number;
}

const BYTES_IN_GB = 1024 * 1024 * 1024;

const App = () => {
  const [data, updateData] = useState<IData>({
    cpus: [],
    totalmem: 0,
    freemem: 0,
  });

  useEffect(() => {
    const socket = io("http://127.0.0.1:4001");
    socket.on("outgoing data", (data) => updateData({ ...data }));
  }, []);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const cpuItems = data.cpus.map((item, index) => (
    <li key={index}>
      {item.model} {item.speed}
    </li>
  ));

  return (
    <div className="app">
      Memory [free/total, Gb]: {data.freemem / BYTES_IN_GB} /{" "}
      {data.totalmem / BYTES_IN_GB}
      <p />
      {cpuItems}
    </div>
  );
};

export default App;
