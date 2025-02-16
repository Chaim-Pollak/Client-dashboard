import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { ActionContext } from "../contexts/ActionContext.jsx";
import useSuggestions from "../hooks/useSuggestions.jsx";
import { exportToXL } from "../../lib/index.jsx";
import { UserPlus } from "lucide-react";
import ExportButton from "../ui/ExportButton.jsx";
import SearchInput from "../ui/SearchInput.jsx";
import WaveLoader from "../ui/WaveLoader.jsx";

function CardIssues() {
  const { mutateUpdate, handleEditIssue, getAllDetails } =
    useContext(ActionContext);

  const { user } = useContext(AuthContext);
  const idProfession = user.employeeId;

  const [statusFilter, setStatusFilter] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["issues", statusFilter, urgencyFilter],
    queryFn: async () =>
      await axios.get(
        `/issues/allIssuesByProfession/${idProfession}?status=${statusFilter}&urgency=${urgencyFilter}`
      ),
    select: (data) => data.data.data,
  });

  const [currentIndexes, setCurrentIndexes] = useState({});

  const nextImage = (issueId, maxLength) => {
    setCurrentIndexes((prev) => ({
      ...prev,
      [issueId]: prev[issueId] === maxLength - 1 ? 0 : (prev[issueId] || 0) + 1,
    }));
  };

  const prevImage = (issueId, maxLength) => {
    setCurrentIndexes((prev) => ({
      ...prev,
      [issueId]: prev[issueId] === 0 ? maxLength - 1 : (prev[issueId] || 0) - 1,
    }));
  };

  const [suggestions, setSearchInput] = useSuggestions("issues");
  const [selected, setSelected] = useState(null);

  async function downloadXl() {
    const result = await getAllDetails("/issues/getAllIssues");

    if (!result) return;
    const prepareDataForExcel = result.map((item) => {
      return {
        id: item._id,
        building: item.issue_building,
        floor: item.issue_floor,
        apartment: item.issue_apartment,
        description: item.issue_description,
        status: item.issue_status,
        urgency: item.issue_urgency,
        profession: item.issue_profession?.profession_name,
        "Created At": item.createdAt,
        "Updated At": item.updatedAt,
      };
    });

    exportToXL(prepareDataForExcel, "IssuesSheet");
  }

  return (
    <div className="w-[80%] mx-auto mt-5 p-4 rounded-xl mb-6 animate-slide-down">
      <div className=" bg-white border-solid border-2 border-amber-300  my-auto p-4 shadow-md rounded-xl mb-6 animate-slide-down flex flex-wrap gap-4 items-center justify-between">
        <ExportButton download={downloadXl} />
        <SearchInput
          setSearchInput={setSearchInput}
          suggestions={suggestions}
          suggestionKey={"issue_apartment"}
          onClick={(current) => {
            setSelected(current);
          }}
        />

        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold text-amber-900">
            Issues Management
          </h1>
        </div>

        <div>
          <select
            className="w-full rounded-lg border-2 border-amber-200 bg-amber-50 py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            id="status"
            name="issue_status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="" disabled selected>
              Filter by Status
            </option>
            <option value="all">All</option>
            <option value="New">New</option>
            <option value="In process">In process</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div>
          <select
            className="w-full rounded-lg border-2 border-amber-200 bg-amber-50 py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            id="urgency"
            name="issue_urgency"
            onChange={(e) => setUrgencyFilter(e.target.value)}
          >
            <option value="" disabled selected>
              Filter by Urgency
            </option>
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-[50vh]">
          <WaveLoader />
        </div>
      )}

      {isError && <div>{error}</div>}

      <div className="flex flex-wrap gap-4 justify-evenly">
        {/* Issue Card */}
        {data?.map((element) => (
          <div
            key={element._id}
            className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-3xl shadow-xl w-80"
          >
            {/* Location Pills */}
            <div className="flex space-x-2 mb-3">
              <div className="bg-white px-3 py-1.5 rounded-xl shadow-md flex items-center space-x-2 border border-amber-100">
                <svg
                  className="w-4 h-4 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <div>
                  <div className="text-xs text-amber-600">Building</div>
                  <div className="font-bold text-sm text-amber-900">
                    {element.issue_building}
                  </div>
                </div>
              </div>
              <div className="bg-white px-3 py-1.5 rounded-xl shadow-md flex items-center space-x-2 border border-amber-100">
                <svg
                  className="w-4 h-4 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <div>
                  <div className="text-xs text-amber-600">Floor</div>
                  <div className="font-bold text-sm text-amber-900">
                    {element.issue_floor}
                  </div>
                </div>
              </div>
              <div className="bg-white px-3 py-1.5 rounded-xl shadow-md flex items-center space-x-2 border border-amber-100">
                <svg
                  className="w-4 h-4 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <div>
                  <div className="text-xs text-amber-600">apartment</div>
                  <div className="font-bold text-sm text-amber-900">
                    {element.issue_apartment}
                  </div>
                </div>
              </div>
            </div>

            {/* Image Carousel */}
            <div className="relative h-48 mb-4 rounded-xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
              <div className="flex transition-transform duration-300 h-full">
                <img
                  src={element.issue_images[currentIndexes[element._id] || 0]}
                  alt="Issue"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() =>
                  prevImage(element._id, element.issue_images.length)
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/90 text-white hover:text-amber-600 p-2 rounded-full backdrop-blur-sm transition-all duration-200 transform hover:scale-110"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() =>
                  nextImage(element._id, element.issue_images.length)
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/90 text-white hover:text-amber-600 p-2 rounded-full backdrop-blur-sm transition-all duration-200 transform hover:scale-110"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-2 right-2 bg-white/10 backdrop-blur-md text-white px-3 py-0.5 rounded-full text-xs font-medium border border-white/20">
                {(currentIndexes[element._id] || 0) + 1}/
                {element.issue_images.length}
              </div>
            </div>

            {/* Issue Details */}
            <div className="bg-white rounded-xl p-4 shadow-md border border-amber-100 h-[180px] flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium border border-yellow-200">
                  {element.issue_status}
                </span>
                <div className="flex items-center space-x-1 text-amber-600 text-sm">
                  <button
                    onClick={() =>
                      mutateUpdate({
                        issues: element._id,
                        employees: user?._id,
                      })
                    }
                  >
                    {!element.employees ? <UserPlus size={16} /> : ""}
                  </button>
                  <span>{element.employees?.employeeName}</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto hover:overflow-y-scroll pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-amber-100 [&::-webkit-scrollbar-track]:rounded-lg [&::-webkit-scrollbar-thumb]:bg-amber-500 [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar-thumb]:hover:bg-amber-600">
                <h3 className="text-base font-bold text-amber-900">
                  {element.issue_description}
                </h3>
              </div>

              <div className="mt-4 flex justify-between items-center pt-3 border-t border-amber-100">
                <div className="flex items-center space-x-1">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  <span className="text-xs font-medium text-red-600">
                    {element.issue_urgency}
                  </span>
                </div>

                <button
                  onClick={() => handleEditIssue(element)}
                  className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 text-xs font-medium"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <Pagination listLength={data?.count} limit={limit} setPage={setPage} /> */}
    </div>
  );
}

export default CardIssues;
