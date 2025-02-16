import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AddIssueButton() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        onClick={() => navigate("/addissue")}
        className="bg-gradient-to-r from-amber-500  via-amber-600 to-amber-300 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        aria-label="Add new issue"
      >
        <Plus
          size={24}
          className="transition-transform group-hover:rotate-90 duration-300"
        />
      </button>
    </div>
  );
}

export default AddIssueButton;
