import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { systemInfoState } from "./App";

const BYTES_IN_GB = 1024 * 1024 * 1024;

const MemoryWidget = () => {
  const { freemem, totalmem } = useRecoilValue(systemInfoState);

  return (
    <>
      Memory [free/total, Gb]: {(freemem / BYTES_IN_GB).toFixed(2)} /{" "}
      {(totalmem / BYTES_IN_GB).toFixed(2)}
    </>
  );
};

export default MemoryWidget;
