import { useState, useEffect } from "react";
import { format } from "date-fns";
import GStats from "./GStats";
import GSearch from "./GSearch.jsx";
import GTable from "./GTable.jsx";
import GPageSize from "./GPageSize.jsx";
import GPagination from "./GPagination.jsx";
import GTabs from "./GTabs.jsx";
import { studentsData } from "./GradeStudentsData";

const GradeManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    localStorage.getItem("selectedCategory") || "All Students"
  );
  const [pageSize, setPageSize] = useState(
    parseInt(localStorage.getItem("pageSize")) || 10
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("currentPage")) || 1
  );

  // Save pagination state to localStorage
  useEffect(() => {
    localStorage.setItem("selectedCategory", selectedCategory);
    localStorage.setItem("pageSize", pageSize);
    localStorage.setItem("currentPage", currentPage);
  }, [selectedCategory, pageSize, currentPage]);

  // Filter data based on search and category
  const filteredStudents = studentsData.filter(
    (student) =>
      (selectedCategory === "All Students" || student.category === selectedCategory) &&
      (student.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination logic
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + pageSize);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          Grading
        </h1>
        <span className="text-sm text-gray-500">
          Last login: {format(new Date(), "MM-dd-yyyy hh:mm:ssaa")}
        </span>
      </div>

      {/* Stats */}
      <GStats />

       {/* Tab, Search, Table and Pagination */}
       <div className="bg-white p-4 rounded-lg shadow-md">
        {/* Tabs */}
        <GTabs selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

        {/* Search Input & Page Size Dropdown */}
        <div className="flex justify-between items-center my-4">
          <GSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <GPageSize pageSize={pageSize} setPageSize={setPageSize} />
        </div>

        {/* Table */}
        <GTable students={paginatedStudents} />

        {/* Pagination */}
        <GPagination
          totalItems={filteredStudents.length}
          pageSize={pageSize}
          setPageSize={setPageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>


    </div>
  );
};

export default GradeManagement;
