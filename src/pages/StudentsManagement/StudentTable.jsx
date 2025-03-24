import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { useNavigate } from 'react-router-dom';
import SToolTip from "./SToolTip.jsx";

const StudentTable = ({ students }) => {
  const navigate = useNavigate();

  const handleOpenProfile = (studentId) => {
    console.log("Navigating to student:", studentId);
    navigate(`/students/profile/${studentId}`);
  };

  const columns = [
    { 
      accessorKey: "fullname",
      header: "Fullname",
      cell: ({ row }) =>  <span className="capitalize">{row.original.firstName} {row.original.lastName}</span>
    },
    { accessorKey: "email", header: "Email Address" },
    { accessorKey: "campus", header: "Campus", cell: ({ row }) => row.original?.campus?.name },
    { 
      accessorKey: "schoolCode",
      header: "School Code",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          {row.original?.school?.code}
          <SToolTip text={row.original?.school?.name} />
        </div>
      )
    },
    { 
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <span className="bg-[#FDD388] px-2 py-1 rounded-md capitalize">
          {row.original?.programLevel}
        </span>
      )
    },
    { 
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
        style={{
          color: row.original.statuses?.find(s => s.isCurrent)?.definition?.color || '#000',
          backgroundColor: `${row.original.statuses?.find(s => s.isCurrent)?.definition?.color}18` || '#00000018',
          border: `1px solid ${row.original.statuses?.find(s => s.isCurrent)?.definition?.color || '#000'}`,
          padding: '0.25rem 0.5rem',
          borderRadius: '0.375rem',
          display: 'inline-block'
        }}
        className="capitalize"
      >
        {row.original.statuses?.find(s => s.isCurrent)?.definition?.name?.toLowerCase() || 'Unknown'}
      </span>
      )
    },
    {
      accessorKey: "actions",
      header: "",
      cell: ({ row }) => (
        <button 
          className="w-[47px] h-6 rounded border border-[#E5E7EB] text-sm  font-inter font-normal text-[#111827] shadow-[0px_1px_2px_0px_#0000000D] hover:bg-gray-50"
          onClick={() => handleOpenProfile(row.original.id)}
        >
          Open
        </button>
      )
    }
  ];

  const table = useReactTable({
    data: students,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
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

export default StudentTable;
