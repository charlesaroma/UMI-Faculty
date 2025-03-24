import { HiOutlineChevronDown } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { useGetStudentStatuses } from "@/store/tanstackStore/services/queries";
import { Icon } from "@iconify-icon/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import StudentStatusTable from "./StudentStatusTable.jsx";
import StudentProposalGradingTable from "./StudentProposalGradingTable.jsx";
import StudentBookGradingTable from "./StudentBookGradingTable.jsx";
import StudentStatusDrawer from "./StudentStatusDrawer.jsx";

const StudentProgress = ({ studentData }) => {
  const [activeTab, setActiveTab] = useState("status");
  const [activeView, setActiveView] = useState("tracker");
  const [isStatusDrawerOpen, setIsStatusDrawerOpen] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState({
    fullname: true,
    email: true,
    campus: true,
    schoolCode: true,
    program: true,
    status: true
  });
  const [selectedStatus, setSelectedStatus] = useState(null);

  const { data: studentStatuses, isLoading: isLoadingStudentStatuses } = useGetStudentStatuses(studentData?.student?.id);

  if (!studentData) {
    return <div>Loading...</div>;
  }

  const currentStatus = studentData.student?.statuses?.find((s) => s.isCurrent);
  const currentSupervisor = studentData.student?.supervisors?.[0];

    // Calculate total days from when the student was enrolled/created to now
    const enrollmentDate = studentData?.student?.createdAt
    ? new Date(studentData?.student?.createdAt)
    : new Date();
  const totalDays = Math.ceil(
    (new Date() - enrollmentDate) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="space-y-6 px-6">
      {/* Section 1: Student Information Details */}
      <div className="grid grid-cols-3 gap-x-16">
        <div>
          <h3 className="text-sm font-[Inter-Regular] text-[#626263] mb-1">Supervisor</h3>
          <div className="flex gap-2">
            <span className="text-sm font-[Inter-Regular] text-gray-900"> {currentSupervisor
                ? `${currentSupervisor.title} ${currentSupervisor.name} `
                : "No supervisor assigned"}</span>
            <button className="text-[#626263]">
             <Icon icon="tabler:selector" width="20" height="20" className=" text-[#626263]" />
            </button>
          </div>
        </div>

        <div>
            <h3 className="text-sm font-[Inter-Regular] text-[#626263] mb-1">
            Current Status
          </h3>
          <span
            style={{
              color: currentStatus?.definition?.color || "#6B7280",
              backgroundColor:
                `${currentStatus?.definition?.color}18` || "#F3F4F6",
              border: `1px solid ${
                currentStatus?.definition?.color || "#6B7280"
              }`,
            }}
            className="inline-flex px-2 py-0.5 rounded-[4px] text-sm capitalize"
          >
            {currentStatus?.definition?.name || "Unknown"}
          </span>
        </div>

        <div>
          <h3 className="text-sm font-[Inter-Regular] text-[#626263] mb-1">Total Time</h3>
          <span className="text-sm font-[Inter-Regular] text-gray-900">{totalDays} days</span>
        </div>
      </div>

      {/* Section 2: Timeline */}
      <div>
        <h3 className="text-sm font-[Inter-Regular] text-gray-500 mb-4">Timeline</h3>

        {/* Timeline Progress Bar */}
        <div className="space-y-2">
        <div className="relative flex items-center justify-between text-xs font-medium text-[#626263]">
            {studentData.student?.statuses?.map((status, index) => {
              const startDate = new Date(status.startDate);
              const endDate =
                index < studentData.student.statuses.length - 1
                  ? new Date(studentData.student.statuses[index + 1].startDate)
                  : new Date();
              const duration = Math.ceil(
                (endDate - startDate) / (1000 * 60 * 60 * 24)
              );
              const position = Math.ceil(
                (startDate - enrollmentDate) / (1000 * 60 * 60 * 24)
              );

              return (
                <span
                  key={status.id}
                  className="absolute"
                  style={{
                    left: `${position * 2 + duration}px`,
                    transform: "translateX(-50%)",
                  }}
                >
                  {duration}
                </span>
              );
            })}
          </div>
          <div className="relative h-8 bg-white shadow-md">
            {studentData.student?.statuses?.map((status, index) => {
              const startDate = new Date(status.startDate);
              const endDate =
                index < studentData.student.statuses.length - 1
                  ? new Date(studentData.student.statuses[index + 1].startDate)
                  : new Date();
              const duration = Math.ceil(
                (endDate - startDate) / (1000 * 60 * 60 * 24)
              );
              const position = Math.ceil(
                (startDate - enrollmentDate) / (1000 * 60 * 60 * 24)
              );

              return (
                <TooltipProvider key={status.id} className="z-[9999] h-full">
                  <Tooltip className="z-[9999] h-full">
                    <TooltipTrigger className="z-[9999] h-full">
                      <div
                        key={status.id}
                        className=" h-full group cursor-pointer"
                        style={{
                          width: `${duration * 2}px`,
                          left: `${position * 2}px`,
                          backgroundColor:
                            status?.definition?.color || "#313132",
                        }}
                       
                      ></div>
                    </TooltipTrigger>
                    <TooltipContent>
                        {status?.definition?.name} (
                      {new Date(status?.startDate).toLocaleDateString()} -{" "}
                      {index < studentData?.student?.statuses?.length - 1
                        ? new Date(
                            studentData?.student?.statuses[index + 1]?.startDate
                          ).toLocaleDateString()
                        : "Present"}
                      )
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </div>

        {/* Timeline Legend */}
        <div className="flex items-center justify-between gap-4 mt-3">
        {studentData.student?.statuses?.map((status) => (
            <div key={status.id} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-sm"
                style={{
                  backgroundColor: status.definition?.color || "#313132",
                }}
              />
              <span className="text-xs font-[Inter-Regular] text-[#626263] capitalize">
                {status.definition?.name || "Unknown"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Status Action Tracker Section */}
      <div className="bg-white rounded-lg">
        {/* Options */}
        <div className="flex gap-4 px-4 pt-4">
        <button 
            onClick={() => setActiveView("tracker")}
            className={`text-sm font-[Inter-Medium] border py-1 px-2 rounded-lg  ${
              activeView === "tracker" 
                ? "border-secondary-800 bg-secondary-100  text-primary-800"
                : "border-secondary-700 bg-white text-secondary-800"
            }`}
          >
            Status Action Tracker
          </button>

          <button 
            onClick={() => setActiveView("proposal")}
            className={`text-sm font-[Inter-Medium] border py-1 px-2 rounded-lg  ${
              activeView === "proposal"
                ? "border-secondary-800 bg-secondary-100  text-primary-900" 
                : "border-secondary-700 bg-white text-secondary-800"
            }`}
          >
            Proposal Grading
          </button>

          <button 
            onClick={() => setActiveView("book")}
            className={`text-sm font-[Inter-Medium] border py-1 px-2 rounded-lg  ${
              activeView === "book"
                ? "border-secondary-800 bg-secondary-100  text-primary-900" 
                : "border-secondary-700 bg-white text-secondary-800"
            }`}
          >
            Book Grading
          </button>
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
        {activeView === "tracker" &&  (
          <>
            {/* Status Tracker Table */}
            <StudentStatusTable 
              statuses={studentStatuses?.statuses || []}
              isLoading={isLoadingStudentStatuses}
              columnVisibility={columnVisibility}
              setColumnVisibility={setColumnVisibility}
              setIsStatusDrawerOpen={setIsStatusDrawerOpen}
              setSelectedStatus={setSelectedStatus}
             
            />
          </>
        )}
        {activeView === "proposal" && (
          /* Grading Progress Table */
          <StudentProposalGradingTable  
            statuses={studentData?.student?.proposalGrades || []}
            columnVisibility={columnVisibility}
            setColumnVisibility={setColumnVisibility}
            setIsStatusDrawerOpen={setIsStatusDrawerOpen}
            setSelectedStatus={setSelectedStatus} 
          />
        )}
        {activeView === "book" && (
          /* Grading Progress Table */
          <StudentBookGradingTable   statuses={studentData?.student?.proposalGrades || []}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
          setIsStatusDrawerOpen={setIsStatusDrawerOpen}
          setSelectedStatus={setSelectedStatus} />
        )}

      
        
      </div>

      <StudentStatusDrawer 
        isOpen={isStatusDrawerOpen}
        onClose={() => setIsStatusDrawerOpen(false)}
        studentId={studentData?.student?.id}
        studentData={studentData?.student}
        selectedStatus={selectedStatus}
      />
    </div>
  );
};

export default StudentProgress;
