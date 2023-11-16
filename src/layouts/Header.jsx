import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiSolidShoppingBags } from "react-icons/bi";
import { FaCalculator } from "react-icons/fa";
import { BsTable } from "react-icons/bs";
import { PiPowerBold } from "react-icons/pi";
import { FaFileVideo, FaCircleUser } from "react-icons/fa6";
import { Tooltip } from "antd";
import { findActiveRoute } from "./activeNav";
import { useSelector, useDispatch } from "react-redux";
import { updateSliceStatus } from "../redux/slice/login/LoginSlice";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState("0");
  useEffect(() => {
    setActiveId(findActiveRoute(location.pathname));
  }, [location]);
  const { me, meStatus } = useSelector((state) => state.LoginSlice);

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white h-14 px-8">
      <div className="max-w-full flex flex-wrap items-center justify-between p-4">
        <div>
          <div className="pr-2 text-xl"> Tekion Tasks </div>
        </div>
        <div className="flex">
          <ul className="font-medium flex flex-row justify-evenly ">
            <li className="px-4">
              <Link to="/">
                <Tooltip title={<span>Shopping Cart</span>} placement="bottom">
                  <BiSolidShoppingBags className="text-2xl" />
                </Tooltip>
              </Link>
            </li>
            <li className="px-4">
              <Link to="/emiCalc">
                <Tooltip
                  title={<span>EMI Calaculator</span>}
                  placement="bottom"
                >
                  <FaCalculator className="text-xl" />
                </Tooltip>
              </Link>
            </li>
            <li className="px-4">
              <Link to="/react-tbl">
                <Tooltip title={<span>React Table</span>} placement="bottom">
                  <BsTable className="text-xl" />
                </Tooltip>
              </Link>
            </li>
            <li className="px-4">
              <Link to="/videoGallery">
                <Tooltip title={<span>Video Gallery</span>} placement="bottom">
                  <FaFileVideo className="text-xl" />
                </Tooltip>
              </Link>
            </li>
          </ul>
          <div>
            {" "}
            {meStatus === "success" ? (
              <div className="flex px-2">
                <FaCircleUser className="text-2xl text-orange-400" />
                <div className="flex flex-col relative bottom-2">
                  <div className="pl-2 "> {me.email}</div>
                  <div className="pl-2 text-xs"> {me.id}</div>
                </div>
                <Tooltip title={<span>Logout</span>} placement="bottom">
                  <PiPowerBold
                    className="text-2xl ml-3 cursor-pointer text-red-400 hover:text-red-500"
                    onClick={() => {
                      dispatch(updateSliceStatus());
                      localStorage.setItem("token", "");
                      navigate("/");
                    }}
                  />
                </Tooltip>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
