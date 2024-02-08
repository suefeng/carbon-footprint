"use client";

import { SetStateAction, useState } from "react";
import DataTable from "@/components/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { ElectricityType } from "@/domain/entities/electricity";
import { formattedDate, getData } from "@/infrastructure/utilities";

const columns: GridColDef[] = [
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

const formattedElectricityData = async (
  setRowsElectricityData: React.Dispatch<SetStateAction<ElectricityType[]>>
) => {
  const data: ElectricityType[] = await getData("electricity");
  setRowsElectricityData(data);
};

export const ElectricityTable = () => {
  const [rowsElectricityData, setRowsElectricityData] = useState<
    ElectricityType[]
  >([]);

  rowsElectricityData.length > 0
    ? rowsElectricityData
    : formattedElectricityData(setRowsElectricityData);

  return (
    <>
      {rowsElectricityData && (
        <DataTable rows={rowsElectricityData} columns={columns} perPage={12} />
      )}
    </>
  );
};
