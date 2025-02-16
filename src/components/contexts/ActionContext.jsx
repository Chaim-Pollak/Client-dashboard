import axios from "axios";
import { createContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../../lib/Toast";

export const ActionContext = createContext();

function ActionProvider({ children }) {
  const [activeIssue, setActiveIssue] = useState(null);
  const [employee, setActiveEmployee] = useState(null);

  const queryClient = useQueryClient();
  const { mutate: mutateUpdateAssociate } = useMutation({
    mutationKey: ["associate_issue"],
    mutationFn: async (idEmpIss) =>
      axios.put("/issues/updateIssueAssociate", idEmpIss),
    onSuccess: (msg) => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      showSuccessToast(msg.data.message);
    },
    onError: (error) => {
      showErrorToast(error.response.data.message);
    },
  });

  function handleEditIssue(issue) {
    console.log(issue);
    document.getElementById("issue_modal").showModal();
    setActiveIssue(issue);
  }

  function handleEditEmployee(employee) {
    document.getElementById("employee_modal").showModal();
    setActiveEmployee(employee);
  }

  async function getAllDetails(url) {
    try {
      const { data } = (await axios.get(url)).data;

      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const value = {
    activeIssue,
    setActiveIssue,
    employee,
    mutateUpdateAssociate,
    handleEditIssue,
    handleEditEmployee,
    getAllDetails,
  };

  return (
    <ActionContext.Provider value={value}>{children}</ActionContext.Provider>
  );
}

export default ActionProvider;
