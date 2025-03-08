import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const pieData = [
  { name: "Normal Progress", value: 32, color: "#0F766E" },
  { name: "Book Submitted", value: 10, color: "#B45309" },
  { name: "Under Examination", value: 9, color: "#0369A1" }
];

const DPieChart = () => {
  const [selectedOption, setSelectedOption] = useState("Status report");

  return (
    <div className="bg-white p-4 rounded-lg shadow w-[384px]">
      {/* Dropdown Header */}
      <div className="relative mb-3">
        <button className="w-52 flex justify-between items-center px-3 py-2 border rounded-md text-sm bg-white">
          {selectedOption} <ChevronDown size={16} />
        </button>
      </div>

      {/* Flex container for Pie Chart + Legend */}
      <div className="flex items-center justify-evenly">
        {/* Enlarged Donut Pie Chart */}
        <PieChart width={220} height={220}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80} // Increased size
            innerRadius={50} // Donut shape
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        {/* Legend (Aligned Properly) */}
        <div className="space-y-3">
          {pieData.map((item) => (
            <div key={item.name} className="flex">
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              ></span>
              <div className="flex flex-col">
                <span className="text-lg font-semibold leading-none">{item.value}</span>
                <span className="text-gray-500 text-sm">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DPieChart;
