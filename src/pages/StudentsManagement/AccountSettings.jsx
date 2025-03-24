/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import { queryClient } from "@/utils/tanstack";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import ViewStudentPersonalInfo from "./Forms/ViewStudentPersonalInfo.jsx";
import ViewStudentCourseApplication from "./Forms/ViewStudentCourseApplication.jsx";

const STEPS = [
  { id: 1, description: "Personal Information" },
  { id: 2, description: "Course Application Summary" },
  
];

const AccountSettings = ({ studentData }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: studentData?.fullname || "Jenny Wilson",
    email: studentData?.email || "jenny.wilson@example.com",
    phone: studentData?.phone || "(312) 721-700",
    uuid: studentData?.studentId || "SBM",
    courseDetails: studentData?.courseDetails || {
      courseName: "Master of Science in Computer Science",
      startDate: "2024-01-15",
      expectedEndDate: "2026-01-15",
      status: "Active"
    },
    accessLevel: "Student",
    permissions: ["View Course Content", "Submit Assignments", "Access Library Resources"]
  });

  const [errors, setErrors] = useState({});

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.fullName) newErrors.fullName = "Full Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
          newErrors.email = "Invalid email address";
        }
        if (!formData.phone) newErrors.phone = "Phone number is required";
        if (!formData.uuid) newErrors.uuid = "UUID is required";
        break;
      case 2:
        if (!formData.courseDetails.courseName) newErrors.courseName = "Course name is required";
        if (!formData.courseDetails.startDate) newErrors.startDate = "Start date is required";
        if (!formData.courseDetails.expectedEndDate) newErrors.expectedEndDate = "Expected end date is required";
        break;
      case 3:
        if (!formData.accessLevel) newErrors.accessLevel = "Access level is required";
        if (!formData.permissions || formData.permissions.length === 0) {
          newErrors.permissions = "At least one permission must be selected";
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Please enter the school email"
                className={`w-full px-3 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <div className="flex">
                <div className="bg-gray-100 px-3 py-2 border rounded-l-md text-gray-600">
                  +256
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border border-l-0 rounded-r-md focus:ring-primary-500 focus:border-primary-500 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UUID (Universally Unique Identifier)
              </label>
              <input
                type="text"
                name="uuid"
                value={formData.uuid}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                  errors.uuid ? "border-red-500" : "border-gray-300"
                }`}
                readOnly
              />
              {errors.uuid && (
                <p className="mt-1 text-sm text-red-500">{errors.uuid}</p>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Name
              </label>
              <input
                type="text"
                name="courseName"
                value={formData.courseDetails.courseName}
                className="w-full px-3 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="text"
                value={formData.courseDetails.startDate}
                className="w-full px-3 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected End Date
              </label>
              <input
                type="text"
                value={formData.courseDetails.expectedEndDate}
                className="w-full px-3 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <input
                type="text"
                value={formData.courseDetails.status}
                className="w-full px-3 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500"
                readOnly
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Access Level
              </label>
              <input
                type="text"
                value={formData.accessLevel}
                className="w-full px-3 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Permissions
              </label>
              <div className="space-y-2">
                {formData.permissions.map((permission, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{permission}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };


   //handle display form
   const FormDisplay = (step) => {
    switch (step) {
      case 1:
        return <ViewStudentPersonalInfo studentData={studentData} />;
      case 2:
        return <ViewStudentCourseApplication studentData={studentData} />;
      default:
        return null;
    }
  };
  return (
    <div className="mt-6 mb-8 bg-white rounded-[6px] shadow mx-6">
       <div className="border-b border-gray-200">
       <div className="flex">
        {STEPS.map((step) => {
         
          return (
            <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`px-6 py-3 text-sm font-[Inter-Medium] border-b-2 ${
                  currentStep === step.id
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {step.description}
              </button>
          );
        })}
      </div>


       </div>
   
      <div className="p-6">
        {FormDisplay(currentStep)}

        {/** navigation buttons */}
        <div className="mt-8 flex justify-end gap-8">
          <button
            onClick={handleBack}
            className={`px-4 py-2 text-sm font-[Inter-Medium] rounded-[6px] border border-gray-300 ${
              currentStep === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-50"
            }`}
            disabled={currentStep === 1}
          >
            Previous Step
          </button>
          <button
            onClick={handleNext}
            className={`px-4 py-2 text-sm font-medium text-gray-700 border-2 border-gray-200 rounded-md hover:text-gray-500 bg-gray-50 ${
              currentStep === STEPS.length
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={currentStep === STEPS.length}
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
