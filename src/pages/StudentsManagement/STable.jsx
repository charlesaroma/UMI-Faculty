import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { useNavigate } from 'react-router-dom';
import SToolTip from "./SToolTip.jsx";

// Add this school mapping inside your component or better yet, in a separate file
const schoolNames = {
  'SBM': 'School of Business And Management',
  'SDLIT': 'School of Distance Learning And Information Technology',
  'SCPAG': 'School of Civil Service, Public Administration And Governance',
  'SMS': 'School of Management Sciences',
  'RC': 'Regional Centres'
};

const STable = ({ students }) => {
  const navigate = useNavigate();

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Workshop':
        return 'text-[#6B7280] bg-[#F3F4F6] border border-[#6B7280] rounded-md px-2 py-1';
      case 'Normal Progress':
        return 'text-[#0F766E] bg-[#CCFBF1] border border-[#0F766E] rounded-md px-2 py-1';
      default:
        return 'px-2 py-1';
    }
  };

  const handleOpenProfile = (studentId) => {
    console.log("Navigating to student:", studentId);
    navigate(`/dashboard/students/${studentId}`);
  };

  const columns = [
    { accessorKey: "fullname", header: "Fullname" },
    { accessorKey: "email", header: "Email Address" },
    { accessorKey: "campus", header: "Campus" },
    { 
      accessorKey: "schoolCode",
      header: "School Code",
      cell: ({ row }) => {
        const schoolCode = row.original.schoolCode;
        const fullSchoolName = schoolNames[schoolCode] || 'Unknown School';
        
        return (
          <div className="flex items-center gap-1">
            {schoolCode}
            <SToolTip text={fullSchoolName} />
          </div>
        );
      }
    },
    { 
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <span className="bg-[#FDD388] px-2 py-1 rounded-md">
          {row.original.category}
        </span>
      )
    },
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
      cell: ({ row }) => (
        <button 
          className="w-[47px] h-6 rounded border border-[#E5E7EB] px-2 py-1 text-sm font-inter font-normal text-[#111827] shadow-[0px_1px_2px_0px_#0000000D] hover:bg-gray-50"
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

export default STable;
