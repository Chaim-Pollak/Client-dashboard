import EmployeeForm from "../pages/forms/EmployeeForm";

function EmployeeModal() {
  return (
    <dialog id="employee_modal" className="modal">
      <EmployeeForm />
    </dialog>
  );
}

export default EmployeeModal;
