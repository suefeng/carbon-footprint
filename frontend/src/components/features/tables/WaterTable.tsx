import React, { useEffect, SetStateAction, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { WaterType } from "@/domain/entities/water";
import {
  formattedDate,
  formattedPrice,
  getData,
} from "@/infrastructure/utilities";

const columns: GridColDef[] = [
  { field: "cons", headerName: "Cons", width: 90 },
  {
    field: "date_paid",
    headerName: "Date Paid",
    width: 200,
    valueFormatter: (params) => formattedDate(params.value),
  },
  {
    field: "total",
    headerName: "Total",
    width: 90,
    valueFormatter: (params) => formattedPrice(params.value),
  },
];

const formattedWaterData = async (
  setRowsWaterData: React.Dispatch<SetStateAction<WaterType[]>>
) => {
  if (!localStorage.getItem("water")) {
    const data: WaterType[] = await getData("water");
    localStorage.setItem("water", JSON.stringify(data));
    setRowsWaterData(data);
  } else {
    const data: WaterType[] = JSON.parse(localStorage.getItem("water")!);
    setRowsWaterData(data);
  }
};

export const WaterTable = () => {
  const [rowsWaterData, setRowsWaterData] = useState<WaterType[]>([]);

  useEffect(() => {
    if (!rowsWaterData.length) {
      formattedWaterData(setRowsWaterData);
    }
  }, [rowsWaterData]);

  return (
    <>
      {rowsWaterData.length > 0 && (
        <DataTable rows={rowsWaterData} columns={columns} perPage={6} />
      )}
    </>
  );
};
