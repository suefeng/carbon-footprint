"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { AllType } from "@/domain/entities/all";

const columns: GridColDef[] = [
  {
    field: "year",
    headerName: "Year",
    width: 120,
  },
  {
    field: "water",
    headerName: "Water",
    width: 120,
  },
  {
    field: "electricity",
    headerName: "Electricity",
    width: 120,
  },
  {
    field: "natural_gas",
    headerName: "Natural Gas",
    width: 120,
  },
  {
    field: "travel",
    headerName: "Travel",
    width: 120,
  },
  {
    field: "total",
    headerName: "Total CO2",
    width: 120,
    valueFormatter: (params) => params.value.toFixed(2),
  },
];

const tonsCo2 = (year: number, item: { year: number; tons_co2: number }[]) => {
  return Number(
    item.find((item: { year: number; tons_co2: number }) => item.year === year)
      ?.tons_co2 || 0
  );
};

const getAndParseItem = (item: string) => {
  const itemStored = localStorage.getItem(item);
  return itemStored ? JSON.parse(itemStored) : [];
};

export const AllTable = () => {
  const [rowsAllData, setRowsAllData] = useState<AllType[]>([]);

  const formattedAllData = async (
    setRowsAllData: React.Dispatch<SetStateAction<AllType[]>>
  ) => {
    if (!localStorage.getItem("all")) {
      const water = getAndParseItem("totalWaterCo2");
      const electricity = getAndParseItem("totalElectricityCo2");
      const naturalGas = getAndParseItem("totalNaturalGasCo2");
      const travel = getAndParseItem("totalTravelCo2");

      const years = electricity.map(
        (item: { year: number; tons_co2: number }) => item.year
      );

      const data = years.map((year: number, index: number) => {
        const waterCo2 = tonsCo2(year, water);
        const electricityCo2 = tonsCo2(year, electricity);
        const naturalGasCo2 = tonsCo2(year, naturalGas);
        const travelCo2 = tonsCo2(year, travel);
        return {
          id: index,
          year: year,
          water: waterCo2,
          electricity: electricityCo2,
          natural_gas: naturalGasCo2,
          travel: travelCo2,
          total: waterCo2 + electricityCo2 + naturalGasCo2 + travelCo2,
        };
      });
      localStorage.setItem("all", JSON.stringify(data));
      setRowsAllData(data);
    } else {
      const data: AllType[] = JSON.parse(localStorage.getItem("all")!);
      setRowsAllData(data);
    }
  };

  useEffect(() => {
    if (!rowsAllData.length) {
      formattedAllData(setRowsAllData);
    }
  });

  return (
    <>
      <p className="mb-4">
        This table shows the total Tons of CO2 emissions by year for each
        category as well as the total overall per year.
      </p>
      {rowsAllData.length > 0 && (
        <DataTable rows={rowsAllData} columns={columns} perPage={12} />
      )}
    </>
  );
};
