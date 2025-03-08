const SStats = () => {
    return (
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-3xl font-bold">100,000</div>
          <div className="text-sm text-gray-500">All Student 2024/2028</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-3xl font-bold">45</div>
          <div className="text-sm text-gray-500">Recently Enrolled</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-3xl font-bold">14</div>
          <div className="text-sm text-gray-500">Status: Workshop</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-3xl font-bold">26</div>
          <div className="text-sm text-gray-500">Status: Normal Progress</div>
        </div>
      </div>
    );
  };
  
  export default SStats;
  