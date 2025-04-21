import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CloudIcon from "@mui/icons-material/Cloud";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const sidebarItems = [
  { path: "/dashboard/CostExplorer", name: "Cost Explorer", icon: <MonetizationOnIcon /> },
  { path: "/dashboard/AwsService", name: "AWS Services", icon: <CloudIcon /> },
  { path: "/dashboard/UserManagement", name: "User Management", icon: <PeopleIcon /> },
  { path: "/dashboard/onboarding", name: "OnBoarding", icon: <DashboardIcon /> },
];

export default sidebarItems;
