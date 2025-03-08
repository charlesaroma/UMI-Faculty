import { useState, useMemo, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineChevronDown } from "react-icons/hi";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

const SearchBar = ({ value, onChange, placeholder = "Search" }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <FiSearch className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
};

const Progress = ({ studentData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);

  const statusActions = useMemo(() => [
    {
      status: "Proposal Defense Graded - Passed",
      date: "02/06/2025",
      updatedBy: { initial: "T", name: "Tumusiime Mugisa" },
      notificationSent: "Yes"
    },
    {
      status: "Proposal in Review",
      date: "02/06/2025",
      updatedBy: { initial: "A", name: "Akello Okello" },
      notificationSent: "Yes"
    },
    {
      status: "Proposal Received",
      date: "02/06/2025",
      updatedBy: { initial: "A", name: "Akello Okello" },
      notificationSent: "Yes"
    },
    {
      status: "Proposal Defense Graded - Failed",
      date: "02/06/2025",
      updatedBy: { initial: "T", name: "Tumusiime Mugisa" },
      notificationSent: "No"
    }
  ], []);

  const columns = useMemo(() => [
    {
      accessorKey: "status",
      header: "Student Status",
      cell: info => <span className="text-xs text-gray-900">{info.getValue()}</span>
    },
    {
      accessorKey: "date",
      header: "Status Date",
      cell: info => <span className="text-xs text-gray-500">{info.getValue()}</span>
    },
    {
      accessorKey: "updatedBy",
      header: "Updated By",
      cell: info => {
        const user = info.getValue();
        return (
          <div className="flex items-center gap-1">
            <span className="h-4 w-4 rounded-full bg-primary-500 flex items-center justify-center text-white text-[10px]">
              {user.initial}
            </span>
            <span className="text-xs text-gray-900">{user.name}</span>
          </div>
        );
      }
    },
    {
      accessorKey: "notificationSent",
      header: "Notification Sent",
      cell: info => (
        <span className={`px-1.5 py-0.5 rounded-full text-xs ${
          info.getValue() === "Yes"
            ? "bg-semantic-bg-success text-semantic-fg-success"
            : "bg-semantic-bg-error text-semantic-fg-error"
        }`}>
          {info.getValue()}
        </span>
      )
    },
    {
      id: "actions",
      header: " ",
      cell: () => (
        <button className="text-xs text-primary-500 hover:text-primary-600">
          Open
        </button>
      )
    }
  ], []);

  const table = useReactTable({
    data: statusActions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination: {
        pageSize,
        pageIndex: 0
      },
      globalFilter: searchQuery,
    },
    onGlobalFilterChange: setSearchQuery,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-6 space-y-6">
      {/* Section 1: Student Information Details */}
      <div className="grid grid-cols-4 gap-8 px-6">
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Supervisor</h3>
          <div className="flex items-center gap-2">
            <span className="text-semantic-text-primary">{studentData.supervisor}</span>
            <button className="text-semantic-text-primary">
              <HiOutlineChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Date of Admission</h3>
          <span className="text-semantic-text-primary">{studentData.dateOfAdmission}</span>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Current Status</h3>
          <span className="inline-flex px-3 py-1 rounded-full text-sm bg-accent1-200/50 backdrop-blur-sm text-semantic-text-primary">
            {studentData.currentStatus}
          </span>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Time</h3>
          <span className="text-semantic-text-primary">{studentData.totalTime}</span>
        </div>
      </div>

      {/* Horizontal Divider */}
      <div className="my-6 border-t border-gray-200"></div>

      {/* Section 2: Timeline */}
      <div className="px-6">
        {/* Timeline Title */}
        <h3 className="text-sm font-medium text-gray-500 mb-4">Timeline</h3>
        
        {/* Timeline Progress Bar */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">0 Days</span>
            <span className="text-sm text-gray-500">120 Days</span>
            <span className="text-sm text-gray-500">240 Days</span>
          </div>
          <div className="relative h-2 bg-gray-200/50 backdrop-blur-sm rounded-full">
            <div className="absolute left-0 h-full w-1/6 bg-gray-800/70 rounded-l-full"></div>
            <div className="absolute left-1/6 h-full w-1/2 bg-emerald-600/70"></div>
            <div className="absolute left-2/3 h-full w-1/12 bg-red-600/70"></div>
            <div className="absolute left-3/4 h-full w-1/4 bg-blue-600/70 rounded-r-full"></div>
          </div>
        </div>

        {/* Timeline Legend */}
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-800/70 rounded"></div>
            <span>Break</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-600/70 rounded"></div>
            <span>Normal Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-600/70 rounded"></div>
            <span>Proposal in Review</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600/70 rounded"></div>
            <span>Under Examination</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-600/70 rounded"></div>
            <span>Minutes Pending</span>
          </div>
        </div>
      </div>

      {/* Status Action Tracker Section */}
      <div className="mt-6 p-6">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Table Header */}
          <div className="p-4">
            <h2 className="text-lg font-medium text-semantic-text-primary">
              Status Action Tracker
            </h2>
          </div>

          {/* Search and Controls */}
          <div className="p-4 flex justify-between items-center border-b">
            <div className="w-[240px]">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by Action Type"
              />
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Show:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  const newSize = Number(e.target.value);
                  setPageSize(newSize);
                  table.setPageSize(newSize);
                }}
                className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
              >
                {[5, 10, 20, 30, 40, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table Structure */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm divide-y divide-gray-200">
              {/* Table Header */}
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              {/* Table Body */}
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-3 py-1.5 whitespace-nowrap text-xs text-gray-900"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200 bg-white">
            <div className="flex items-center text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium mx-1">
                {table.getState().pagination.pageSize *
                  table.getState().pagination.pageIndex +
                  1}
              </span>
              to{" "}
              <span className="font-medium mx-1">
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                  table.getPrePaginationRowModel().rows.length
                )}
              </span>
              of{" "}
              <span className="font-medium mx-1">
                {table.getPrePaginationRowModel().rows.length}
              </span>{" "}
              results
            </div>
            <div className="flex items-center gap-2">
              <button
                className="border rounded p-1 text-sm disabled:opacity-50"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </button>
              {Array.from(
                { length: table.getPageCount() },
                (_, index) => (
                  <button
                    key={index}
                    className={`border rounded p-1 text-sm ${
                      table.getState().pagination.pageIndex === index
                        ? "bg-primary-500 text-white"
                        : ""
                    }`}
                    onClick={() => table.setPageIndex(index)}
                  >
                    {index + 1}
                  </button>
                )
              )}
              <button
                className="border rounded p-1 text-sm disabled:opacity-50"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
