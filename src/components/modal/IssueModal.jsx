import React from "react";
import IssueForm from "../pages/forms/IssueForm";
import { useContext } from "react";
import { ActionContext } from "../contexts/ActionContext";

function IssueModal() {
  const { setActiveIssue } = useContext(ActionContext);

  function handleCancel() {
    document.getElementById("issue_modal").close();
    setActiveIssue(null);
  }
  return (
    <dialog id="issue_modal" className="modal">
      <IssueForm />
    </dialog>
  );
}

export default IssueModal;
