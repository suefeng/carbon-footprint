"use client";

import { SetStateAction, useState } from "react";
import DataTable from "@/components/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { TravelType } from "@/domain/entities/travel";
import {
  formattedDate,
  formattedPrice,
  getData,
} from "@/infrastructure/utilities";

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
  const data: TravelType[] = await getData("travel");
  setRowsTravelData(data);
};

export default function TravelTable() {
  const [rowsTravelData, setRowsTravelData] = useState<TravelType[]>([]);

  rowsTravelData.length > 0
    ? rowsTravelData
    : formattedTravelData(setRowsTravelData);

  return (
    <>
      {rowsTravelData && (
        <DataTable rows={rowsTravelData} columns={columns} perPage={50} />
      )}
    </>
  );
}
