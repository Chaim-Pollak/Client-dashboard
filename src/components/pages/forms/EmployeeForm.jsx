import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ActionContext } from "../../contexts/ActionContext";
import ProfessionSelectBox from "./ProfessionSelectBox";
import { showErrorToast, showSuccessToast } from "../../../lib/Toast";

const initialValues = {
  employeeName: "",
  employeeEmail: "",
  employeePassword: "",
  employeeId: "",
};

function EditEmployeeForm() {
  // Body OF Component run => useState implemented =>
  // useEffect for Side Effect when component Mounting =>
  // setState Values => rerender body of Component =>
  // setState Values when onChange Event triggered => rerender body of Component

  const queryClient = useQueryClient();

  const { mutate: editMutate } = useMutation({
    mutationKey: ["edit_employee"],
    mutationFn: async ({ values, id }) =>
      await axios.put(`users/employee/update/${id}`, values),
    onSuccess: (msg) => {
      queryClient.invalidateQueries({ queryKey: ["get_employees"] });
      document.getElementById("employee_modal").close();
      showSuccessToast(msg.data.message);
    },

    onError: (error) => {
      showErrorToast(error.response.data.message);
    },
  });

  const { employee } = useContext(ActionContext);
  const [values, setValues] = useState(null);
  const [displayValue, setDisplayValue] = useState("********");

  const handleFocus = () => {
    setDisplayValue("");
  };

  const handleBlur = () => {
    setDisplayValue(values ? values.manager_password : "********");
  };

  function handleChange(e) {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
    setDisplayValue(value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      editMutate({ values, id: values?._id });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!employee) return setValues(initialValues);
    setValues({ ...employee });
  }, [employee]);

  function handleCancel() {
    {
      !employee && setValues(initialValues);
    }
    document.getElementById("employee_modal").close();
  }

  return (
    <div className="bg-orange-50 p-6 rounded-2xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-amber-900 mb-6 text-center">
        Edit Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <h3 className="text-lg text-center font-semibold text-amber-800 mb-4">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium text-amber-700 mb-1"
                htmlFor="employeeName"
              >
                Name
              </label>
              <input
                name="employeeName"
                id="employeeName"
                type="text"
                className="w-full rounded-xl border-2 border-amber-200 bg-amber-50 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Enter first name"
                value={values?.employeeName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-amber-700 mb-1"
                htmlFor="employeeEmail"
              >
                Email
              </label>
              <input
                name="employeeEmail"
                id="employeeEmail"
                type="email"
                className="w-full rounded-xl border-2 border-amber-200 bg-amber-50 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Enter email address"
                value={values?.employeeEmail}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-amber-700 mb-1"
                htmlFor="employeePassword"
              >
                Password
              </label>
              <input
                name="employeePassword"
                id="employeePassword"
                type="password"
                className="w-full rounded-xl border-2 border-amber-200 bg-amber-50 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Enter your password"
                value={displayValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-amber-700 mb-1"
                htmlFor="profession"
              >
                Profession
              </label>
              <ProfessionSelectBox
                value={values?.employeeId?._id || values?.employeeId}
                handleChange={handleChange}
                placeholder="Select Profession"
                id={"employeeId"}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 border-2 border-amber-600 text-amber-600 rounded-xl hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors duration-200"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-amber-600 text-white rounded-xl hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Edit Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditEmployeeForm;
