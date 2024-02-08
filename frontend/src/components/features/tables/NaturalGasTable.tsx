"use client";

import { SetStateAction, useState } from "react";
import DataTable from "@/components/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { NaturalGasType } from "@/domain/entities/naturalGas";
import { getData } from "@/infrastructure/utilities";

const columns: GridColDef[] = [
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
  const data: NaturalGasType[] = await getData("natural-gas");
  setRowsNaturalGasData(data);
};

export const NaturalGasTable = () => {
  const [rowsNaturalGasData, setRowsNaturalGasData] = useState<
    NaturalGasType[]
  >([]);

  rowsNaturalGasData.length > 0
    ? rowsNaturalGasData
    : formattedNaturalGasData(setRowsNaturalGasData);

  return (
    <>
      {rowsNaturalGasData && (
        <DataTable rows={rowsNaturalGasData} columns={columns} perPage={12} />
      )}
    </>
  );
};
