import { useState, useEffect, useMemo } from "react";
import { format } from "date-fns";
import StudentTabs from "./StudentTabs.jsx";
import SStats from "./SStats.jsx";
import SSearch from "./SSearch.jsx";
import StudentTable from "./StudentTable.jsx";
import SPageSize from "./SPageSize.jsx";
import SPagination from "./SPagination.jsx";
import { useGetAllStudents } from "../../store/tanstackStore/services/queries.ts";

const StudentsManagement = () => {
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

  // Query to fetch all students
  const { data: studentsData, isLoading, error } = useGetAllStudents();

  // Save pagination state to localStorage
  useEffect(() => {
    localStorage.setItem("selectedCategory", selectedCategory);
    localStorage.setItem("pageSize", pageSize);
    localStorage.setItem("currentPage", currentPage);
  }, [selectedCategory, pageSize, currentPage]);

  // Filter students based on search and category using useMemo
  const filteredStudents = useMemo(() => {
    return (studentsData?.students || []).filter(
      (student) =>
        (selectedCategory === "All Students" || student?.programLevel === selectedCategory) &&
        (student?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student?.email?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [studentsData?.students, selectedCategory, searchTerm]);

  // Pagination logic with useMemo
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    let paginatedData = filteredStudents.slice(startIndex, startIndex + pageSize);
    
    if (paginatedData.length === 0 && filteredStudents.length > 0) {
      setCurrentPage(1);
      paginatedData = filteredStudents.slice(0, pageSize);
    }
    
    return paginatedData;
  }, [filteredStudents, currentPage, pageSize]);

  if (isLoading) {
    return <div className="p-6">Loading students...</div>;
  }

  if (error) {
    return <div className="p-6">Error loading students: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Top Search Bar */}
      <div>
        <SSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="border-b border-gray-300 h-1 w-full mx-auto mt-3"></div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Postgraduate Students Records</h1>
        <span className="text-sm text-gray-500">
          Last login: {format(new Date(), "MM-dd-yyyy hh:mm:ssaa")}
        </span>
      </div>

      {/* Stats */}
      <SStats />

      {/* Tab, Search, Table and Pagination */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        {/* Tabs */}
        <StudentTabs selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} students={studentsData?.students || []} />

        {/* Search Input & Page Size Dropdown */}
        <div className="flex justify-between items-center my-4">
          <SSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <SPageSize pageSize={pageSize} setPageSize={setPageSize} />
        </div>

        {/* Table */}
        <StudentTable students={paginatedStudents} />

        {/* Pagination */}
        <SPagination
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

export default StudentsManagement;
