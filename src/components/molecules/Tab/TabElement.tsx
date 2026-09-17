import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { ReactNode, SyntheticEvent, useState } from "react";

export interface TabProps {
  tabItems: TabItems[];
}
export interface TabItems {
  label: string;
  selected: string;
  tabItemElement?: JSX.Element & ReactNode;
}

export default function TabElement({ tabItems }: TabProps) {
  const [value, setValue] = useState("about");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", height: "90%" }}>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="Page Tabs"
          sx={{
            overflowY: "visible",
            minHeight: 0,
            "& .MuiTabs-flexContainer": {
              gap: "4px",
              alignItems: "flex-end",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#c084fc !important",
            },
            "& .MuiTabs-scroller": {
              overflow: "visible !important",
            },
          }}
        >
          {tabItems.map((tabItem) => (
            <Tab
              key={tabItem.selected}
              label={tabItem.label}
              value={tabItem.selected}
              sx={{
                paddingX: "10px",
                color: "#757575 !important",
                "&.Mui-selected": {
                  color: "#c084fc !important",
                  filter: "drop-shadow(0 10px 10px  rgba(168, 85, 247, 0.8))",
                },
              }}
              className="scoop-tab"
            />
          ))}
        </TabList>
        {tabItems.map((tabItem) => (
          <TabPanel
            key={tabItem.selected}
            value={tabItem.selected}
            keepMounted
            id="page"
          >
            {tabItem.tabItemElement}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}
