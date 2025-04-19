import React from "react";
import logo from "../../assets/Cloudbalance.png";
import CommonButton from "../../components/Button/CommonButton";

const LoginFormConfig = ({
  email,
  password,
  error,
  isFormValid,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-center mb-0">
          <img
            src={logo}
            alt="CloudBalance Logo"
            className="h-[92px] w- mb-[27px] block"
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold transition ${
              isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            LOGIN
          </button> */}
          <CommonButton
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold transition ${
              isFormValid
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            LOGIN
          </CommonButton>
        </form>
      </div>
    </div>
  );
};

export default LoginFormConfig;
