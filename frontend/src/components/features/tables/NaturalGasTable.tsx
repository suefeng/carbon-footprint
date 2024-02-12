"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { NaturalGasType } from "@/domain/entities/naturalGas";
import { getData } from "@/infrastructure/utilities";

const columns: GridColDef[] = [
  { field: "kgco2", headerName: "Kg CO2", width: 120 },
  { field: "month", headerName: "Month", width: 200 },
  {
    field: "therms",
    headerName: "Therms",
    width: 200,
  },
  {
    field: "average_temperature",
    headerName: "Avg Temp",
    width: 200,
  },
];

const formattedNaturalGasData = async (
  setRowsNaturalGasData: React.Dispatch<SetStateAction<NaturalGasType[]>>
) => {
  if (!localStorage.getItem("natural-gas")) {
    const data: NaturalGasType[] = await getData("natural-gas");
    localStorage.setItem("natural-gas", JSON.stringify(data));
    setRowsNaturalGasData(data);
  } else {
    const data: NaturalGasType[] = JSON.parse(
      localStorage.getItem("natural-gas")!
    );
    setRowsNaturalGasData(data);
  }
};

export const NaturalGasTable = () => {
  const [rowsNaturalGasData, setRowsNaturalGasData] = useState<
    NaturalGasType[]
  >([]);

  useEffect(() => {
    if (!rowsNaturalGasData.length) {
      formattedNaturalGasData(setRowsNaturalGasData);
    }
  }, [rowsNaturalGasData]);

  return (
    <>
      {rowsNaturalGasData.length > 0 && (
        <DataTable rows={rowsNaturalGasData} columns={columns} perPage={12} />
      )}
    </>
  );
};
