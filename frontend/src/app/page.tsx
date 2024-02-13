"use client";

import { useState, SyntheticEvent } from "react";
import Nav from "@/components/Nav";
import { ElectricityTable } from "@/components/features/tables/ElectricityTable";
import { WaterTable } from "@/components/features/tables/WaterTable";
import { NaturalGasTable } from "@/components/features/tables/NaturalGasTable";
import { TravelTable } from "@/components/features/tables/TravelTable";
import { LINKS } from "@/infrastructure/consts";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@/components/TabPanel";
import Box from "@mui/material/Box";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newTabValue: number) => {
    setTabValue(newTabValue);
  };

  return (
    <>
      <Nav links={LINKS} />
      <main className="min-h-screen p-2 md:px-24">
        <h1 className="text-3xl mb-4">Carbon Footprint</h1>
        <div>
          <p>
            The Carbon Footprint app is a tool to help you understand your
            carbon footprint
          </p>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              aria-label="tabs for the carbon footprint categories"
            >
              <Tab label="Water" {...a11yProps(0)} />
              <Tab label="Electricity" {...a11yProps(1)} />
              <Tab label="Natural Gas" {...a11yProps(2)} />
              <Tab label="Travel" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <WaterTable />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <ElectricityTable />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <NaturalGasTable />
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <TravelTable />
          </TabPanel>
        </div>
      </main>
    </>
  );
}
