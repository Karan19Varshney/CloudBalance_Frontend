import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CommonButton from "../Button/CommonButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const SidebarView = ({ items, collapsed, setCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = useSelector((state) => state.user.Role);

  const filteredItems = items.filter((item) => {
    if (role === "ADMIN") return true;
    if (role === "READ_ONLY") {
      return (
        item.path === "/dashboard/AwsService" ||
        item.path === "/dashboard/CostExplorer" ||
        item.path === "/dashboard/UserManagement"
      );
    }
    if (role === "CUSTOMER") {
      return (
        item.path === "/dashboard/AwsService" ||
        item.path === "/dashboard/CostExplorer"
      );
    }
    return false;
  });

  return (
    <div
      className={`h-screen bg-white text-black transition-all duration-300 shadow ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex justify-end p-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-100"
        >
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {filteredItems.map((item) => (
          <li key={item.path}>
            <CommonButton
              onClick={() => navigate(item.path)}
              className={`w-full text-left flex items-center gap-4 px-4 py-2 rounded transition-all hover:bg-blue-500 hover:text-white ${
                location.pathname === item.path ? "bg-blue-500 text-white" : ""
              }`}
              text={
                <div className="flex items-center gap-4">
                  {item.icon}
                  {!collapsed && <span>{item.name}</span>}
                </div>
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarView;
