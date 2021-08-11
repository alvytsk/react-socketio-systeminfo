import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { systemInfoState, ICpu } from "./App";

const CpuWidget = () => {
  const { cpus } = useRecoilValue(systemInfoState);

  const cpuItems = cpus.map((item: ICpu, index: number) => (
    <li key={index}>
      {item.model} {item.speed}
    </li>
  ));

  return <ul>{cpuItems}</ul>;
};

export default CpuWidget;
