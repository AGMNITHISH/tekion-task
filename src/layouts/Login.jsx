import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newUser, userLogin } from "../redux/slice/login/LoginSlice";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeState, setActiveState] = useState("login");
  const [inputs, setInputs] = useState([]);
  const { newUserStatus, tokenStatus, token } = useSelector(
    (state) => state.LoginSlice
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, username } = inputs;
    if (activeState === "login") {
      dispatch(userLogin({ email, password }));
    } else if (activeState === "register") {
      dispatch(newUser({ email, password, username }));
    }
  };
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    if (newUserStatus === "success") {
      navigate("/");
      setActiveState("login");
      setInputs([]);
    } else if (newUserStatus === "rejected") {
      message.error("Registration failed");
    }
  }, [newUserStatus, navigate]);
  useEffect(() => {
    if (tokenStatus === "success") {
      localStorage.setItem("token", token);
      navigate("/main");
    } else if (tokenStatus === "rejected") {
      message.error("login failed");
    }
  }, [tokenStatus, navigate, token]);

  return (
    <div className="h-screen 	bg-gray-600 flex items-center justify-center">
      {activeState === "login" ? (
        <div className="w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                name="email"
                value={inputs.email || ""}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="name@flowbite.com"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleInputChange}
                value={inputs.password || ""}
                required
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
            <span className="px-3 text-white">or</span>
            <button
              type="button"
              onClick={() => {
                setActiveState("register");
                setInputs([]);
              }}
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Register new account
            </button>
          </form>
        </div>
      ) : (
        <>
          {activeState === "register" ? (
            <div className="w-1/2">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    User name
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your name"
                    onChange={handleInputChange}
                    value={inputs.username || ""}
                    required
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="name@flowbite.com"
                    onChange={handleInputChange}
                    value={inputs.email || ""}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleInputChange}
                    value={inputs.password || ""}
                    required
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Register
                </button>{" "}
                or
                <button
                  type="button"
                  onClick={() => {
                    setActiveState("login");
                    setInputs([]);
                  }}
                  className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Login
                </button>
              </form>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default Login;
