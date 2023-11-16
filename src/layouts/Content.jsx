import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../redux/slice/login/LoginSlice";
import { useNavigate } from "react-router-dom";

const Content = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { meStatus } = useSelector((state) => state.LoginSlice);
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (meStatus === "rejected") {
      navigate("/");
    }
  }, [meStatus, navigate]);
  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-500 to-slate-500">
      {children}
    </div>
  );
};

export default Content;
