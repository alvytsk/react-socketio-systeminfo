import React, { useEffect } from "react";
import { atom, useSetRecoilState } from "recoil";
import { io } from "socket.io-client";
import MemoryWidget from "./MemoryWidget";
import CpuWidget from "./CpuWidget";
import "./App.less";

export interface ICpu {
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

export const systemInfoState = atom({
  key: "systemInfoState",
  default: {
    cpus: [],
    totalmem: 0,
    freemem: 0,
  },
});

const App = () => {
  const setSystemInfo = useSetRecoilState(systemInfoState);

  useEffect(() => {
    const socket = io("http://127.0.0.1:4001");
    socket.on("outgoing data", (data) => setSystemInfo({ ...data }));
  }, []);

  return (
    <div className="app">
      <MemoryWidget />
      <p />
      <CpuWidget />
    </div>
  );
};

export default App;
