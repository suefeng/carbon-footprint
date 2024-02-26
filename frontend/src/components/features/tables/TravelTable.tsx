"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { TravelType } from "@/domain/entities/travel";
import { formattedDate, getData } from "@/infrastructure/utilities";
import { sumTonsCo2PerYear, groupBy } from "@/infrastructure/utilities";

const columns: GridColDef[] = [
  { field: "type", headerName: "Type", width: 120 },
  {
    field: "date",
    headerName: "Date",
    width: 200,
    valueFormatter: (params) => formattedDate(params.value),
  },
  {
    field: "location",
    headerName: "Location",
    width: 250,
  },
  {
    field: "time",
    headerName: "Time",
    width: 120,
  },
  {
    field: "miles",
    headerName: "Miles",
    width: 120,
  },
  {
    field: "tons_co2",
    headerName: "Tons of CO2",
    width: 120,
  },
];

export const TravelTable = () => {
  const [rowsTravelData, setRowsTravelData] = useState<TravelType[]>([]);
  const [totalCo2, setTotalCo2] = useState<
    { year: number; tons_co2: number }[]
  >([]);

  const formattedTravelData = async (
    setRowsTravelData: React.Dispatch<SetStateAction<TravelType[]>>
  ) => {
    if (!localStorage.getItem("travel")) {
      const data: TravelType[] = await getData("travel");
      localStorage.setItem("travel", JSON.stringify(data));
      setRowsTravelData(data);
    } else {
      const data: TravelType[] = JSON.parse(localStorage.getItem("travel")!);
      setRowsTravelData(data);
    }
  };

  const totalCo2Emitted = async (
    setTotalCo2: React.Dispatch<
      SetStateAction<{ year: number; tons_co2: number }[]>
    >
  ) => {
    if (!localStorage.getItem("totalTravelCo2")) {
      const grouped: Map<number, TravelType[]> = groupBy(
        rowsTravelData,
        ({ date }: { date: string }) =>
          Number(
            new Date(date).toLocaleDateString("en-US", { year: "numeric" })
          )
      );
      const totalCo2Data = Array.from(grouped.values()).map(sumTonsCo2PerYear);
      if (totalCo2Data.length > 0) {
        setTotalCo2(totalCo2Data);
        localStorage.setItem("totalTravelCo2", JSON.stringify(totalCo2Data));
      }
    } else {
      const totalCo2Data = JSON.parse(localStorage.getItem("totalTravelCo2")!);
      totalCo2Data && setTotalCo2(totalCo2Data);
    }
  };

  useEffect(() => {
    if (!rowsTravelData.length) {
      formattedTravelData(setRowsTravelData);
    }
    if (!totalCo2.length) {
      totalCo2Emitted(setTotalCo2);
    }
  }, [rowsTravelData]);

  return (
    <>
      {totalCo2.length > 0 &&
        totalCo2.map((row) => (
          <p>
            <b>In {row.year}</b>: {row.tons_co2} tons of CO2
          </p>
        ))}
      {rowsTravelData.length > 0 && (
        <DataTable rows={rowsTravelData} columns={columns} perPage={50} />
      )}
    </>
  );
};
