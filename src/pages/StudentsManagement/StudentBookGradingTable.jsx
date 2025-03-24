import React, { useState } from "react";
import { useReactTable, getCoreRowModel, flexRender,  getPaginationRowModel,
  getFilteredRowModel, createColumnHelper } from "@tanstack/react-table";
import { useNavigate } from 'react-router-dom';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icon } from "@iconify-icon/react";

const StudentBookGradingTable = ({ statuses, columnVisibility, setColumnVisibility, setIsStatusDrawerOpen, setSelectedStatus }) => {
    const navigate = useNavigate();
  const [globalFilter, setGlobalFilter] = React.useState("");

  if (!statuses || statuses?.length === 0) {
    return (
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-8 text-center text-gray-500">
        No Book Grades Available
      </div>
    );
  }

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("grade", {
      header: "Grade",
      cell: (info) => (
        <span className="font-medium">
          {info.getValue() || 'Not graded'}
        </span>
      )
    }),
    columnHelper.accessor("bookTitle", {
      header: "Book Title",
      cell: (info) => info.getValue() || '-'
    }),
    columnHelper.accessor("submittedAt", {
      header: "Submitted Date",
      cell: (info) => info.getValue() ? new Date(info.getValue()).toLocaleDateString() : '-'
    }),
    columnHelper.accessor("gradedAt", {
      header: "Graded Date",
      cell: (info) => info.getValue() ? new Date(info.getValue()).toLocaleDateString() : '-'
    }),
    columnHelper.accessor("feedback", {
      header: "Feedback",
      cell: (info) => {
        const feedback = info.getValue();
        if (!feedback) return '-';
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-1">
                  <Icon icon="mdi:comment" className="w-4 h-4 text-gray-400" />
                  <span>View Feedback</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>{feedback}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }
    }),
    columnHelper.accessor("gradedBy.name", {
      header: "Graded By",
      cell: (info) => {
        const gradedBy = info.row.original.gradedBy;
        return (
          <div className="flex items-center gap-1">
            <span>{gradedBy?.name || '-'}</span>
            {gradedBy && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Icon
                      icon="tdesign:info-circle-filled"
                      className="w-4 h-4 text-gray-400"
                    />
                  </TooltipTrigger>
                  <TooltipContent>{gradedBy.email}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        );
      }
    }),
    columnHelper.accessor("id", {
      header: "",
      cell: (info) => (
        <button
          onClick={() => {
            setSelectedStatus(info.row.original);
            setIsStatusDrawerOpen(true);
          }}
          className="rounded border text-gray-700 border-semantic-bg-border shadow-sm py-4px px-8px hover:bg-gray-50 font-[Roboto-Medium] text-sm"
        >
          View Details
        </button>
      )
    })
  ];

  const table = useReactTable({
    data: statuses,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
    <table className="w-full">
      <thead className="bg-[#f9fafd]">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th 
                key={header.id} 
                className="px-4 py-3 text-left text-[#111827] text-opacity-90 font-[Inter-SemiBold] text-sm"
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td 
                key={cell.id} 
                className="px-4 py-2 whitespace-nowrap text-[#111827] font-[Inter-Regular] text-[14px] leading-[20px]"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>

      {/* Pagination Controls */}
      <div className="px-6 py-3  flex items-center justify-between border-t border-gray-200 bg-white">
        <div className="flex font-[Roboto-Regular] items-center text-sm text-gray-500">
          Showing{" "}
          <span className="font-[Roboto-Medium] mx-1">
            {table.getState().pagination.pageSize *
              table.getState().pagination.pageIndex +
              1}
          </span>
          to{" "}
          <span className="font-[Roboto-Medium] mx-1">
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              table.getPrePaginationRowModel().rows.length
            )}
          </span>
          of{" "}
            <span className="font-[Roboto-Medium] mx-1">
            {table.getPrePaginationRowModel().rows.length}
          </span>{" "}
          results
        </div>
        <div className="flex items-center gap-2">
        <button
        className="border border-gray-300 rounded p-1 font-[Roboto-Regular] text-sm disabled:opacity-50"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </button>
          {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map(pageNumber => (
        <button
          key={pageNumber}
          className={`w-8 h-8 rounded text-sm ${
            pageNumber === table.getState().pagination.pageIndex + 1
              ? 'bg-blue-50 text-blue-600 font-[Roboto-Medium]'
              : 'text-gray-500'
          }`}
          onClick={() => table.setPageIndex(pageNumber - 1)}
        >
          {pageNumber}
        </button>
      ))}
           <button
        className="border border-gray-300 rounded p-1 font-[Roboto-Regular] text-sm disabled:opacity-50"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </button>
        </div>
      </div>
  </div>
  );
};

export default StudentBookGradingTable;
