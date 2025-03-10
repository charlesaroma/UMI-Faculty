const GTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        <button
          onClick={() => setActiveTab("Proposal Defense")}
          className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
            activeTab === "Proposal Defense"
              ? "border-indigo-500 text-indigo-600"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
          }`}
        >
          Proposal Defense
        </button>
        <button
          onClick={() => setActiveTab("Book Examination")}
          className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
            activeTab === "Book Examination"
              ? "border-indigo-500 text-indigo-600"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
          }`}
        >
          Book Examination
        </button>
      </nav>
    </div>
  );
};

export default GTabs;
  