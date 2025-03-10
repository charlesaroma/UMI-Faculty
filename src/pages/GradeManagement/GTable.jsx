import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import GToolTip from "./GToolTip.jsx";

const GTable = ({ students, activeTab }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'PASSED':
        return 'text-[#15803D] bg-[#DCFCE7] border border-[#15803D] rounded-md px-2 py-1 text-xs font-medium';
      case 'FAILED':
        return 'text-[#DC2626] bg-[#FEE2E2] border border-[#DC2626] rounded-md px-2 py-1 text-xs font-medium';
      case 'NOT GRADED':
        return 'text-[#6B7280] bg-[#F3F4F6] border border-[#6B7280] rounded-md px-2 py-1 text-xs font-medium';
      default:
        return 'px-2 py-1';
    }
  };

  const proposalDefenseColumns = [
    { 
      accessorKey: "proposalId",
      header: "Proposal ID",
      cell: ({ row }) => (
        <span className="text-[#4F46E5]">{row.original.proposalId}</span>
      )
    },
    { accessorKey: "student", header: "Student" },
    { accessorKey: "defenseDate", header: "Defense Date" },
    { accessorKey: "panelists", header: "Panelists" },
    { accessorKey: "markRange", header: "Mark Range" },
    { 
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className={getStatusStyle(row.original.status)}>
          {row.original.status}
        </span>
      )
    },
    {
      accessorKey: "actions",
      header: "",
      cell: () => (
        <button 
          className="w-[47px] h-6 rounded border border-[#E5E7EB] text-sm font-inter font-normal text-[#111827] shadow-[0px_1px_2px_0px_#0000000D] hover:bg-gray-50"
        >
          Open
        </button>
      )
    }
  ];

  const bookExaminationColumns = [
    { 
      accessorKey: "proposalId",
      header: "Proposal ID",
      cell: ({ row }) => (
        <span className="text-[#4F46E5]">{row.original.proposalId}</span>
      )
    },
    { accessorKey: "student", header: "Student" },
    { accessorKey: "scoreInternal1", header: "Score Internal 1" },
    { accessorKey: "scoreInternal2", header: "Score Internal 2" },
    { accessorKey: "averageScore", header: "Average Score" },
    { 
      accessorKey: "status",
      header: "Category",
      cell: ({ row }) => (
        <span className={getStatusStyle(row.original.status)}>
          {row.original.status}
        </span>
      )
    },
    {
      accessorKey: "actions",
      header: "",
      cell: () => (
        <button 
          className="w-[47px] h-6 rounded border border-[#E5E7EB] text-sm font-inter font-normal text-[#111827] shadow-[0px_1px_2px_0px_#0000000D] hover:bg-gray-50"
        >
          Open
        </button>
      )
    }
  ];

  const columns = activeTab === "Book Examination" 
    ? bookExaminationColumns 
    : proposalDefenseColumns;

  const table = useReactTable({
    data: students,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="w-full">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th 
                  key={header.id} 
                  className="px-6 py-3 text-left text-[#111827] font-inter font-semibold text-[14px] leading-[20px]"
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
                  className="px-6 py-2 whitespace-nowrap text-[#111827] font-inter font-normal text-[14px] leading-[20px]"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GTable;
