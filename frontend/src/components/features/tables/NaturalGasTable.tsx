"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { NaturalGasType } from "@/domain/entities/naturalGas";
import {
  getData,
  groupBy,
  sumTonsCo2PerYear,
} from "@/infrastructure/utilities";

const columns: GridColDef[] = [
  { field: "tons_co2", headerName: "Tons of CO2", width: 120 },
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

export const NaturalGasTable = () => {
  const [rowsNaturalGasData, setRowsNaturalGasData] = useState<
    NaturalGasType[]
  >([]);
  const [totalCo2, setTotalCo2] = useState<
    { year: number; tons_co2: number }[]
  >([]);

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

  const totalCo2Emitted = async (
    setTotalCo2: React.Dispatch<
      SetStateAction<{ year: number; tons_co2: number }[]>
    >
  ) => {
    if (!localStorage.getItem("totalNaturalGasCo2")) {
      const grouped: Map<number, NaturalGasType[]> = groupBy(
        rowsNaturalGasData,
        ({ month }: { month: string }) => Number(month.split(" ")[1])
      );
      const totalCo2Data = Array.from(grouped.values()).map(sumTonsCo2PerYear);
      if (totalCo2Data.length > 0) {
        setTotalCo2(totalCo2Data);
        localStorage.setItem(
          "totalNaturalGasCo2",
          JSON.stringify(totalCo2Data)
        );
      }
    } else {
      const totalCo2Data = JSON.parse(
        localStorage.getItem("totalNaturalGasCo2")!
      );
      totalCo2Data && setTotalCo2(totalCo2Data);
    }
  };

  useEffect(() => {
    if (!rowsNaturalGasData.length) {
      formattedNaturalGasData(setRowsNaturalGasData);
    }
    if (!totalCo2.length) {
      totalCo2Emitted(setTotalCo2);
    }
  }, [rowsNaturalGasData]);

  return (
    <>
      Total CO2:
      {totalCo2.length > 0 &&
        totalCo2.map((row) => (
          <p>
            <b>In {row.year}</b>: {row.tons_co2} tons of CO2
          </p>
        ))}
      {rowsNaturalGasData.length > 0 && (
        <DataTable rows={rowsNaturalGasData} columns={columns} perPage={12} />
      )}
    </>
  );
};
