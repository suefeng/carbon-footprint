"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { TravelType } from "@/domain/entities/travel";
import { formattedDate, getData } from "@/infrastructure/utilities";

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
];

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

export const TravelTable = () => {
  const [rowsTravelData, setRowsTravelData] = useState<TravelType[]>([]);

  useEffect(() => {
    if (!rowsTravelData.length) {
      formattedTravelData(setRowsTravelData);
    }
  }, [rowsTravelData]);

  return (
    <>
      {rowsTravelData.length > 0 && (
        <DataTable rows={rowsTravelData} columns={columns} perPage={50} />
      )}
    </>
  );
};
