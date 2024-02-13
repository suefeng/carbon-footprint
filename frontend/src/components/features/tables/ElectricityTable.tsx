"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { ElectricityType } from "@/domain/entities/electricity";
import {
  formattedDate,
  getData,
  groupBy,
  sumTonsCo2PerYear,
} from "@/infrastructure/utilities";

const columns: GridColDef[] = [
  { field: "tons_co2", headerName: "Tons of CO2", width: 120 },
  {
    field: "date",
    headerName: "Date",
    width: 200,
    valueFormatter: (params) => formattedDate(params.value),
  },
  {
    field: "kwh",
    headerName: "KWH",
    width: 90,
  },
  {
    field: "low",
    headerName: "Low",
    width: 90,
  },
  {
    field: "high",
    headerName: "High",
    width: 90,
  },
];

export const ElectricityTable = () => {
  const [rowsElectricityData, setRowsElectricityData] = useState<
    ElectricityType[]
  >([]);
  const [totalCo2, setTotalCo2] = useState<
    { year: number; tons_co2: number }[]
  >([]);

  const formattedElectricityData = async (
    setRowsElectricityData: React.Dispatch<SetStateAction<ElectricityType[]>>
  ) => {
    if (!localStorage.getItem("electricity")) {
      const data: ElectricityType[] = await getData("electricity");

      setRowsElectricityData(data);
      localStorage.setItem("electricity", JSON.stringify(data));
    } else {
      const data: ElectricityType[] = JSON.parse(
        localStorage.getItem("electricity")!
      );
      setRowsElectricityData(data);
    }
  };

  const totalCo2Emitted = async (
    setTotalCo2: React.Dispatch<
      SetStateAction<{ year: number; tons_co2: number }[]>
    >
  ) => {
    if (!localStorage.getItem("totalElectricityCo2")) {
      const grouped: Map<number, ElectricityType[]> = groupBy(
        rowsElectricityData,
        ({ date }: { date: string }) => new Date(date).getFullYear()
      );
      const totalCo2Data = Array.from(grouped.values()).map(sumTonsCo2PerYear);
      if (totalCo2Data.length > 0) {
        setTotalCo2(totalCo2Data);
        localStorage.setItem(
          "totalElectricityCo2",
          JSON.stringify(totalCo2Data)
        );
      }
    } else {
      const totalCo2Data = JSON.parse(
        localStorage.getItem("totalElectricityCo2")!
      );
      totalCo2Data && setTotalCo2(totalCo2Data);
    }
  };

  useEffect(() => {
    if (rowsElectricityData.length < 1) {
      formattedElectricityData(setRowsElectricityData);
    }
    if (rowsElectricityData.length > 0 && totalCo2.length < 1) {
      totalCo2Emitted(setTotalCo2);
    }
  }, [rowsElectricityData, totalCo2]);

  return (
    <>
      Total CO2:
      {totalCo2.length > 0 &&
        totalCo2.map((row) => (
          <p>
            <b>In {row.year}</b>: {row.tons_co2} tons of CO2
          </p>
        ))}
      {rowsElectricityData.length > 0 && (
        <DataTable rows={rowsElectricityData} columns={columns} perPage={12} />
      )}
    </>
  );
};
