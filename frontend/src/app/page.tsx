"use client";

import { useState, SyntheticEvent } from "react";
import Nav from "@/components/Nav";
import { ElectricityTable } from "@/components/features/tables/ElectricityTable";
import { WaterTable } from "@/components/features/tables/WaterTable";
import { NaturalGasTable } from "@/components/features/tables/NaturalGasTable";
import { LINKS } from "@/infrastructure/consts";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TravelTable from "@/components/features/tables/TravelTable";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Nav links={LINKS} />
      <main className="min-h-screen p-2 md:px-24">
        <div>
          <h1 className="text-3xl mb-4">Carbon Footprint</h1>
          <div>
            <p>
              The Carbon Footprint app is a tool to help you understand your
              carbon footprint
            </p>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="tabs for the carbon footprint categories"
              >
                <Tab label="Water" {...a11yProps(0)} />
                <Tab label="Electricity" {...a11yProps(1)} />
                <Tab label="NaturalGas" {...a11yProps(2)} />
                <Tab label="Travel" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <WaterTable />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <ElectricityTable />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <NaturalGasTable />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <TravelTable />
            </CustomTabPanel>
          </div>
        </div>
      </main>
    </>
  );
}
