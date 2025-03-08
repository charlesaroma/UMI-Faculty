const SPagination = ({ totalItems, pageSize, setPageSize, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  // Handle Previous Button Click
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Handle Next Button Click
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="px-6 py-4 border-t bg-white shadow rounded-lg">
      <div className="flex items-center justify-between">
        {/* Showing X of Y Results */}
        <div className="text-sm text-gray-500">
          Showing {Math.min(pageSize, totalItems - (currentPage - 1) * pageSize)} of {totalItems} Results
        </div>

        {/* Pagination Buttons */}
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 border rounded text-sm ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : ""}`}
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`px-3 py-1 border rounded text-sm ${currentPage === index + 1 ? "bg-blue-50 text-blue-600 border-blue-200" : ""}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className={`px-3 py-1 border rounded text-sm ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : ""}`}
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SPagination;
