import React, { useContext, useState } from "react";
import ExportButton from "../ui/ExportButton.jsx";
import { exportToXL } from "../../lib";
import { ActionContext } from "../contexts/ActionContext.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function CardIssues() {
  const { user } = useContext(AuthContext);
  const { getAllDetails } = useContext(ActionContext);
  console.log(user);

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

  const { handleEditIssue } = useContext(ActionContext);
  const { data } = useQuery({
    queryKey: ["my_issues"],
    queryFn: async () => axios.get(`/users/getemployeebyid/${user._id}`),
    select: (data) => data.data.data,
  });

  return (
    <div className="container mx-auto px-4 py-8  ">
      <div className="flex-1 text-center">
        <h1 className="text-2xl font-bold text-amber-900">My Issues</h1>
      </div>
      <ExportButton download={downloadXl} />
      <div className="flex flex-wrap flex-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-evenly">
        {/* Issue Card */}
        {/* {isLoading && <div>Loading...</div>}
        {isError && <div>{error}</div>} */}
        {data?.map((issue) => (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-3xl shadow-xl w-80">
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
                    {issue.issue_building}
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
                    {issue.issue_floor}
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
                    {issue.issue_apartment}
                  </div>
                </div>
              </div>
            </div>
            {/* Image Carousel */}
            <div className="relative h-48 mb-4 rounded-xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
              <div className="flex transition-transform duration-300 h-full">
                <img
                  src={issue.issue_images[currentIndexes[issue._id] || 0]}
                  alt="Issue"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() => prevImage(issue._id, issue.issue_images.length)}
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
                  nextImage(issue?._id, issue?.issue_images.length)
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
                {(currentIndexes[issue._id] || 0) + 1}/
                {issue.issue_images.length}
              </div>
            </div>
            {/* Issue Details */}
            {/* <div className="bg-white rounded-xl p-4 shadow-md border border-amber-100 h-60"> */}
            <div className="bg-white rounded-xl p-4 shadow-md border border-amber-100 h-[180px] flex flex-col">
              {/* <div className="flex items-center justify-between mb-3"> */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium border border-yellow-200">
                  {issue.issue_status}
                </span>
                <div className="flex items-center space-x-1 text-amber-600">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <span>{issue.employees?.employeeName}</span>
                  <span>
                    {issue.employees?.issue_profession?.profession_name}
                  </span>
                </div>
              </div>

              {/* <div className="max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-200 scrollbar-track-amber-50 pr-2"> */}
              <div className="flex-1 overflow-y-auto hover:overflow-y-scroll pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-amber-100 [&::-webkit-scrollbar-track]:rounded-lg [&::-webkit-scrollbar-thumb]:bg-amber-500 [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar-thumb]:hover:bg-amber-600">
                {/* <h3 className="text-base font-bold text-amber-900"> */}
                <h3 className="text-base font-bold text-amber-900">
                  {issue.issue_description}
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
                    {issue.issue_urgency}
                  </span>
                </div>

                <button
                  onClick={() => handleEditIssue(issue)}
                  className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 text-xs font-medium"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardIssues;
