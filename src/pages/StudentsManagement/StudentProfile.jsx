import { useState, useMemo, useEffect, useRef } from "react";
import { format } from "date-fns";
import { FiSearch } from "react-icons/fi";
import { HiArrowLeft } from "react-icons/hi";
import { HiOutlineChartBar, HiOutlineCog } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { studentsData } from "./StudentsData";
import Progress from "./Progress.jsx";
import AccountSettings from "./AccountSettings.jsx";

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

const StudentProfile = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("progress");
  const navigate = useNavigate();
  const { id } = useParams();
  const containerRef = useRef(null);

  console.log("ID from params:", id);
  console.log("DUMMY_DATA:", studentsData);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [id, activeTab]);

  // Use a default student object if none is found
  const defaultStudent = {
    id: "0",
    fullname: "Jenny Wilson",
    email: "jenny.wilson@gmail.com",
    campus: "Kampala",
    schoolCode: "SDLIT",
    category: "Masters",
    status: "Workshop",
    supervisor: "Prof. Benjamin Russel",
    dateOfAdmission: "29/01/2025",
    currentStatus: "Under Examination",
    totalTime: "120 days",
    phone: "(312) 721-700",
    studentId: "STU2023001",
    department: "Computer Science",
    courseDetails: {
      courseName: "Master of Science in Computer Science",
      startDate: "2024-01-15",
      expectedEndDate: "2026-01-15",
      status: "Active"
    }
  };

  const studentData = useMemo(() => {
    const found = studentsData.find((student) => student.id === id);
    console.log("Found student:", found);
    return found || defaultStudent;
  }, [id]);

  console.log("Final studentData:", studentData);

  return (
    <div ref={containerRef} className="min-h-full bg-gray-50">
      <div className="flex flex-col">
        {/* Global Search */}
        <div className="p-6 pb-0 w-1/2">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search"
          />
        </div>

        {/* Horizontal Line */}
        <div className="my-6 border-t border-gray-200"></div>

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            Student Profile
          </h1>
          <div className="text-sm text-gray-500">
            Last login: {format(new Date(), "MM-dd-yyyy hh:mm:ssaa")}
          </div>
        </div>

        {/* Control Panel */}
        <div className="px-6 py-4 mb-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center px-4 py-2 bg-[#23388F] text-white rounded-lg gap-2 hover:bg-blue-600"
                >
                  <HiArrowLeft className="w-5 h-5" />
                  Back
                </button>
                <span className="text-lg font-medium text-gray-900">
                  {studentData.fullname}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveTab("progress")}
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium gap-2 text-semantic-text-primary border-2
                    ${
                      activeTab === "progress"
                        ? "border-[#23388F]"
                        : "border-[#C4C5C6]"
                    }`}
                >
                  <HiOutlineChartBar className="w-5 h-5 text-[#626263]" />
                  Progress
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium gap-2 text-[#070B1D] border-2
                    ${
                      activeTab === "settings"
                        ? "border-[#23388F]"
                        : "border-[#C4C5C6]"
                    }`}
                >
                  <HiOutlineCog className="w-5 h-5 text-[#626263]" />
                  Account Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "progress" && <Progress studentData={studentData} />}
        {activeTab === "settings" && (
          <AccountSettings studentData={studentData} />
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
