import React, { useEffect, SetStateAction, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { WaterType } from "@/domain/entities/water";
import {
  formattedDate,
  formattedPrice,
  getData,
  groupBy,
  sumTonsCo2PerYear,
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
  {
    field: "tons_co2",
    headerName: "Tons of CO2",
    width: 120,
  },
];

export const WaterTable = () => {
  const [rowsWaterData, setRowsWaterData] = useState<WaterType[]>([]);
  const [totalCo2, setTotalCo2] = useState<
    { year: number; tons_co2: number }[]
  >([]);

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

  const totalCo2Emitted = async (
    setTotalCo2: React.Dispatch<
      SetStateAction<{ year: number; tons_co2: number }[]>
    >
  ) => {
    if (!localStorage.getItem("totalWaterCo2")) {
      const grouped: Map<number, WaterType[]> = groupBy(
        rowsWaterData,
        ({ date_paid }: { date_paid: string }) =>
          Number(new Date(date_paid).getFullYear())
      );
      console.log(grouped);
      const totalCo2Data = Array.from(grouped.values()).map(sumTonsCo2PerYear);
      console.log(totalCo2Data);
      if (totalCo2Data.length > 0) {
        setTotalCo2(totalCo2Data);
        localStorage.setItem("totalWaterCo2", JSON.stringify(totalCo2Data));
      }
    } else {
      const totalCo2Data = JSON.parse(localStorage.getItem("totalWaterCo2")!);
      totalCo2Data && setTotalCo2(totalCo2Data);
    }
  };

  useEffect(() => {
    if (!rowsWaterData.length) {
      formattedWaterData(setRowsWaterData);
    }
    if (!totalCo2.length) {
      totalCo2Emitted(setTotalCo2);
    }
  }, [rowsWaterData]);

  return (
    <>
      Total CO2:
      {totalCo2.length > 0 &&
        totalCo2.map((row) => (
          <p>
            <b>In {row.year}</b>: {row.tons_co2} tons of CO2
          </p>
        ))}
      {rowsWaterData.length > 0 && (
        <DataTable rows={rowsWaterData} columns={columns} perPage={6} />
      )}
    </>
  );
};
