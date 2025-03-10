import { HiOutlineChevronDown } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";

const Progress = ({ studentData }) => {
  const [activeTab, setActiveTab] = useState("status");

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6 px-6">
      {/* Section 1: Student Information Details */}
      <div className="grid grid-cols-3 gap-x-16">
        <div>
          <h3 className="text-sm font-medium text-[#626263] mb-1">Supervisor</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-900">Prof. Benjamin Russel</span>
            <button className="text-[#626263]">
              <HiOutlineChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-[#626263] mb-1">
            Current Status
          </h3>
          <span className="inline-flex px-2 py-0.5 rounded-md text-sm bg-[#F3F4F6] border border-[#6B7280] text-gray-900">
            Workshop
          </span>
        </div>

        <div>
          <h3 className="text-sm font-medium text-[#626263] mb-1">Total Time</h3>
          <span className="text-sm text-gray-900">2 days</span>
        </div>
      </div>

      {/* Section 2: Timeline */}
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-4">Timeline</h3>

        {/* Timeline Progress Bar */}
        <div className="space-y-2">
          <div className="relative flex items-center justify-between text-xs font-medium text-[#626263]">
            <span>0 Days</span>
            <span className="absolute left-56">120 Days</span>
            <span className="absolute left-[520px]">240 Days</span>
          </div>
          <div className="relative h-8 bg-white shadow-md">
            <div className="absolute h-8 w-[76px] left-[27px] bg-[#313132]"></div>
            <div className="absolute h-8 w-[124px] left-[117px] bg-[#0F766E]"></div>
          </div>
        </div>

        {/* Timeline Legend */}
        <div className="flex items-center justify-between gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-white border border-gray-200 rounded-sm"></div>
            <span className="text-xs text-gray-600">Break</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-[#313132] rounded-sm"></div>
            <span className="text-xs text-[#626263]">Workshop</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-[#0F766E] rounded-sm"></div>
            <span className="text-xs text-[#626263]">Normal Progress</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-[#B42318] rounded-sm"></div>
            <span className="text-xs text-[#626263]">Proposal in Review</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-[#0369A1] rounded-sm"></div>
            <span className="text-xs text-[#626263]">Under Examination</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-[#CA922D] rounded-sm"></div>
            <span className="text-xs text-[#626263]">Minutes Pending</span>
          </div>
        </div>
      </div>

      {/* Status Action Tracker Section */}
      <div className="bg-white rounded-lg">
        {/* Options */}
        <div className="flex gap-4 px-4 pt-4">
          <span className="text-sm font-medium bg-[#ECF6FB] py-1 px-2 rounded-lg text-[#626263]">Status Action Tracker</span>
          <span className="text-sm font-medium bg-[#ECF6FB] py-1 px-2 rounded-lg text-[#626263]">Grading Progress</span>
        </div>

        
          {/* Search Bar and Controls */}
          <div className="p-4 flex justify-between items-center">
            <div className="relative w-[280px]">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <FiSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by Action Type, or"
                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show:</span>
              <select className="text-sm border border-gray-300 rounded-lg px-2 py-1">
                <option>10</option>
              </select>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 text-center">
            <p className="text-gray-500 mb-3">Proposal Not Submitted</p>
            <button className="px-4 py-2 bg-[#23388F] text-white text-sm font-medium rounded-lg hover:bg-blue-700">
              Submit Proposal
            </button>
          </div>

          {/* Pagination */}
          <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">0</span> of{" "}
              <span className="font-medium">0</span> Results
            </p>
            <div className="flex gap-1">
              <button
                className="px-2 py-1 text-sm border border-[#939495] rounded text-[#939495]"
                disabled
              >
                Previous
              </button>
              <button className="px-2 py-1 text-sm bg-[#ECF6FB] rounded-md">
                1
              </button>
              <button className="px-2 py-1 text-sm">
                2
              </button>
              <button className="px-2 py-1 text-sm">
                3
              </button>
              <button className="px-2 py-1 text-sm border border-[#939495] rounded text-[#939495]">
                Next
              </button>
            </div>
          </div>
        
      </div>
    </div>
  );
};

export default Progress;
