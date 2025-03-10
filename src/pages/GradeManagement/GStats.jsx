import GStatsToolTip from "./GStatsToolTip.jsx";

const GStats = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="text-3xl font-bold">45</div>
        <div className="text-sm text-gray-500">Proposals Submitted</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="text-3xl font-bold">14</div>
        <div className="text-sm text-gray-500">
          <div className="flex items-center gap-1">
            Status: <span>Proposal Graded - Passed</span>
            <GStatsToolTip text="Proposal Graded - Passed" />
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="text-3xl font-bold">26</div>
        <div className="text-sm text-gray-500">
          <div className="flex items-center gap-1">
            Status: <span>Proposal Graded - Failed</span>
            <GStatsToolTip text="Proposal Graded - Failed" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GStats;
  