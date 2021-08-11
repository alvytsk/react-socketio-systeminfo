import React, { useState, useEffect } from "react";
import { atom, useSetRecoilState, useRecoilValue } from "recoil";
import { io } from "socket.io-client";
import "./App.less";

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

const systemInfoState = atom({
  key: "systemInfoState",
  default: {
    cpus: [],
    totalmem: 0,
    freemem: 0,
  },
});

const BYTES_IN_GB = 1024 * 1024 * 1024;

const App = () => {
  const setSystemInfo = useSetRecoilState(systemInfoState);
  const systemInfo = useRecoilValue(systemInfoState);

  useEffect(() => {
    const socket = io("http://127.0.0.1:4001");
    socket.on("outgoing data", (data) => setSystemInfo({ ...data }));
  }, []);

  const cpuItems = systemInfo.cpus.map((item: ICpu, index: number) => (
    <li key={index}>
      {item.model} {item.speed}
    </li>
  ));

  return (
    <div className="app">
      Memory [free/total, Gb]: {(systemInfo.freemem / BYTES_IN_GB).toFixed(2)} /{" "}
      {(systemInfo.totalmem / BYTES_IN_GB).toFixed(2)}
      <p />
      <ul>{cpuItems}</ul>
    </div>
  );
};

export default App;
