import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiSolidShoppingBags } from "react-icons/bi";
import { FaCalculator } from "react-icons/fa";
import { BsTable } from "react-icons/bs";
import { FaFileVideo } from "react-icons/fa6";
import { Tooltip } from "antd";
import { findActiveRoute } from "./activeNav";

const Header = () => {
  const location = useLocation();
  const [activeId, setActiveId] = useState("0");
  useEffect(() => {
    setActiveId(findActiveRoute(location.pathname));
  }, [location]);

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white h-14 px-8">
      {console.log("activeId", activeId)}
      <div className="max-w-full flex flex-wrap items-center justify-between p-4">
        <div>
          {activeId !== "0" ? (
            <div className="flex">
              <div className="pr-2 text-xl"> Tekion Tasks </div>/
              <div className="text-sky-300 text-xl pl-2">
                {activeId[0]?.name}
              </div>
            </div>
          ) : (
            <>Tekion Tasks </>
          )}
        </div>
        <div>
          {activeId !== "0" ? (
            <>
              {" "}
              <ul className="font-medium flex flex-row justify-evenly ">
                <li className="px-4">
                  <Link to="/">
                    <Tooltip
                      title={<span>Shopping Cart</span>}
                      placement="bottom"
                    >
                      <BiSolidShoppingBags
                        className={`text-2xl ${
                          activeId[0].id === "1" ? "text-sky-400" : ""
                        }`}
                      />
                    </Tooltip>
                  </Link>
                </li>
                <li className="px-4">
                  <Link to="/emiCalc">
                    <Tooltip
                      title={<span>EMI Calaculator</span>}
                      placement="bottom"
                    >
                      <FaCalculator
                        className={`text-xl ${
                          activeId[0].id === "2" ? "text-sky-400" : ""
                        }`}
                      />
                    </Tooltip>
                  </Link>
                </li>
                <li className="px-4">
                  <Link to="/react-tbl">
                    <Tooltip
                      title={<span>React Table</span>}
                      placement="bottom"
                    >
                      <BsTable
                        className={`text-xl ${
                          activeId[0].id === "3" ? "text-sky-400" : ""
                        }`}
                      />
                    </Tooltip>
                  </Link>
                </li>
                <li className="px-4">
                  <Link to="/videoGallery">
                    <Tooltip
                      title={<span>Video Gallery</span>}
                      placement="bottom"
                    >
                      <FaFileVideo
                        className={`text-xl ${
                          activeId[0].id === "4" ? "text-sky-400" : ""
                        }`}
                      />
                    </Tooltip>
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <>
              {" "}
              <ul className="font-medium flex flex-row justify-evenly ">
                <li className="px-4">
                  <Link to="/">
                    <Tooltip
                      title={<span>Shopping Cart</span>}
                      placement="bottom"
                    >
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
                    <Tooltip
                      title={<span>React Table</span>}
                      placement="bottom"
                    >
                      <BsTable className="text-xl" />
                    </Tooltip>
                  </Link>
                </li>
                <li className="px-4">
                  <Link to="/videoGallery">
                    <Tooltip
                      title={<span>Video Gallery</span>}
                      placement="bottom"
                    >
                      <FaFileVideo className="text-xl" />
                    </Tooltip>
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
