import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginFormConfig from "./LoginFormConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postApi } from "../../Service/CommonService";
import { URLS } from "../../Service/URLS";
import { useDispatch } from "react-redux";
import { setUserData } from "../../Redux/action";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard/CostExplorer");
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formState.email.trim() !== "" && formState.password.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await postApi(URLS.Login, formState);
      localStorage.setItem("token", data.token);
      dispatch(
        setUserData({
          userName: data.name,
          Role: data.role,
        })
      );
      setError("");
      if (data.role == "CUSTOMER") {
        navigate("/dashboard/CostExplorer");
      } else {
        navigate("/dashboard/UserManagement");
      }
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Invalid email or password");
    }
  };

  return (
    <>
      <LoginFormConfig
        email={formState.email}
        password={formState.password}
        error={error}
        isFormValid={isFormValid}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <ToastContainer position="top-right" autoClose={3500} />
    </>
  );
};

export default LoginForm;
