import { useContext } from "react";
import { ErrorMessage, Formik, useFormik } from "formik";
import { LoginSchema } from "../../../schema/Index";
import { AuthContext } from "../../contexts/AuthContext";

function LoginForm() {
  const { handleLogin } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      employeeEmail: "",
      employeePassword: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { resetForm }) => {
      await handleLogin(values);
      resetForm();
    },
  });

  return (
    <form className="space-y-6" onSubmit={formik.handleSubmit}>
      <div className="space-y-2">
        <label
          htmlFor="employeeEmail"
          className="block text-sm font-semibold text-amber-800 tracking-wide"
        >
          Email
        </label>
        <div className="relative">
          <input
            id="employeeEmail"
            name="employeeEmail"
            type="email"
            className="block w-full pl-10 rounded-xl border-2 border-amber-200 bg-amber-50 py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600 transition-all duration-200"
            placeholder="Enter your email"
            required
            {...formik.getFieldProps("employeeEmail")}
          />
          {formik.touched.employeeEmail && formik.errors.employeeEmail && (
            <p className="text-red-500 text-base font-semibold">
              {formik.errors.employeeEmail}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="employeePassword"
          className="block text-sm font-semibold text-amber-800 tracking-wide"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="employeePassword"
            name="employeePassword"
            type="password"
            className="block w-full pl-10 rounded-xl border-2 border-amber-200 bg-amber-50 py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-600 transition-all duration-200"
            placeholder="Enter your password"
            required
            {...formik.getFieldProps("employeePassword")}
          />
          {formik.touched.employeeEmail && formik.errors.employeeEmail && (
            <p className="text-red-500 text-base font-semibold">
              {formik.errors.employeeEmail}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="w-full bg-gradient-to-r from-amber-500  via-amber-600 to-amber-300 text-white rounded-xl py-3 px-4 font-semibold hover:from-amber-700 hover:to-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
      >
        {formik.isSubmitting ? "inProcess..." : "Sign In"}
      </button>
    </form>
  );
}

export default LoginForm;
