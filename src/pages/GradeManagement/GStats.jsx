import GStatsToolTip from "./GStatsToolTip.jsx";

const GStats = ({ activeTab }) => {
  const isBookExamination = activeTab === "Book Examination";

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="text-3xl font-bold">{isBookExamination ? "21" : "45"}</div>
        <div className="text-sm text-gray-500">
          {isBookExamination ? "Books Submitted" : "Proposals Submitted"}
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="text-3xl font-bold">{isBookExamination ? "12" : "14"}</div>
        <div className="text-sm text-gray-500">
          <div className="flex items-center gap-1">
            Status: <span>{isBookExamination ? "Proposal Graded - Passed" : "Proposal Graded - Passed"}</span>
            <GStatsToolTip text={isBookExamination ? "Proposal Graded - Passed" : "Proposal Graded - Passed"} />
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
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
  