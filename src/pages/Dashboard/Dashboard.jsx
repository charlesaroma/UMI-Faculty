import React from "react";
import DLineChart from "./DLineChart";
import DPieChart from "./DPieChart";
import DTable from "./DTable";
import DNotificationLog from "./DNotificationLog";

const Dashboard = () => {
  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">100,000</h2>
          <p>All Students 2024/2028</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">45</h2>
          <p>Recently Enrolled</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">14</h2>
          <p>Workshop</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">26</h2>
          <p>Normal Progress</p>
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <DLineChart />
        <DPieChart />
      </div>
      <div className="flex w-full gap-4">
        <DTable />
        <DNotificationLog />
      </div>
    </div>
  );
};

export default Dashboard;
