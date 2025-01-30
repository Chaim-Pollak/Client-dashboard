import axios from "axios";
import { createContext, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../../lib/Toast";

export const ActionContext = createContext();

function ActionProvider({ children }) {
  const [iss, setIss] = useState(null);
  const [emp, setEmp] = useState(null);

  const quaryClient = useQueryClient();
  const { mutate: mutateUpdate } = useMutation({
    mutationKey: ["update_issue"],
    mutationFn: async (idEmpIss) => axios.put("/issues/updateissue", idEmpIss),
    onSuccess: () => {
      quaryClient.invalidateQueries({ queryKey: ["get_issues"] });
      showSuccessToast("issue successfully associated"); //TODO adding the real message
    },
    onError: () => {
      showErrorToast("Failed to update issue"); //TODO adding the real message
    },
  });

  function handleEditIssue(issue) {
    console.log(issue);
    document.getElementById("issue_modal").showModal();
    setIss(issue);
  }

  function handleEditEmployee(employee) {
    document.getElementById("employee_modal").showModal();
    setEmp(employee);
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
    mutateUpdate,
    setIss,
    handleEditIssue,
    iss,
    handleEditEmployee,
    emp,
    getAllDetails,
  };

  return (
    <ActionContext.Provider value={value}>{children}</ActionContext.Provider>
  );
}

export default ActionProvider;
