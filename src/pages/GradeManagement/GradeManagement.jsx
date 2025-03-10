import { useState, useEffect } from "react";
import { format } from "date-fns";
import GStats from "./GStats";
import GSearch from "./GSearch.jsx";
import GTable from "./GTable.jsx";
import GPageSize from "./GPageSize.jsx";
import GPagination from "./GPagination.jsx";
import GTabs from "./GTabs.jsx";
import { proposalData, bookExaminationData } from "./GradeStudentsData.js";

const GradeManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(
    parseInt(localStorage.getItem("pageSize")) || 10
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("Proposal Defense");

  // Get the correct data based on active tab
  const getCurrentData = () => {
    return activeTab === "Book Examination"
      ? bookExaminationData
      : proposalData;
  };

  // Filter data based on search
  const filteredData = getCurrentData().filter((item) =>
    item.student.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  // Reset pagination when switching tabs
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Grading</h1>
        <span className="text-sm text-gray-500">
          Last login: {format(new Date(), "MM-dd-yyyy hh:mm:ssaa")}
        </span>
      </div>

      {/* Stats */}
      <GStats activeTab={activeTab} />

      {/* Tab, Search, Table and Pagination */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        {/* Tabs */}
        <GTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Search Input & Page Size Dropdown */}
        <div className="flex justify-between items-center my-4">
          <div className="flex-1 max-w-sm">
            <GSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Show:</span>
            <GPageSize pageSize={pageSize} setPageSize={setPageSize} />
          </div>
        </div>

        {/* Table */}
        <GTable 
          students={paginatedData} 
          activeTab={activeTab}
        />

        {/* Pagination - Updated to match STable's style */}
        <GPagination
          totalItems={filteredData.length}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default GradeManagement;
