import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { ReactNode, SyntheticEvent } from "react";
import { useSearchParams } from "react-router-dom";

export interface TabProps {
  tabItems: TabItems[];
}
export interface TabItems {
  label: string;
  selected: string;
  tabItemElement?: JSX.Element & ReactNode;
}

const TAB_PARAM = "tab";

/** Tabs whose selection lives in the URL (`?tab=skills`) so each tab is linkable. */
export default function TabElement({ tabItems }: TabProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const requested = searchParams.get(TAB_PARAM);
  const value = tabItems.some((tab) => tab.selected === requested)
    ? (requested as string)
    : tabItems[0].selected;

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setSearchParams({ [TAB_PARAM]: newValue });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="Page Tabs"
          sx={{
            minHeight: 0,
            "& .MuiTabs-flexContainer": {
              gap: "4px",
              alignItems: "flex-end",
            },
            // Let the scooped tab corners render outside the scroller.
            "& .MuiTabs-scroller": { overflow: "visible" },
          }}
        >
          {tabItems.map((tabItem) => (
            <Tab
              key={tabItem.selected}
              label={tabItem.label}
              value={tabItem.selected}
            />
          ))}
        </TabList>
        {tabItems.map((tabItem) => (
          <TabPanel key={tabItem.selected} value={tabItem.selected} keepMounted>
            {tabItem.tabItemElement}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}
