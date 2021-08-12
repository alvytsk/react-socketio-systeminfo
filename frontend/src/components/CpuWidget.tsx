import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { systemInfoState, ICpu } from "./App";

const CpuWidget = () => {
  const { cpus } = useRecoilValue(systemInfoState);

  const cpuItems = cpus.map((item: ICpu, index: number) => (
    <li key={index}>
      {item.model} <p />
      Current speed: {(item.speed / 1024).toFixed(2)} GHz
    </li>
  ));

  return <ul>{cpuItems}</ul>;
};

export default CpuWidget;
