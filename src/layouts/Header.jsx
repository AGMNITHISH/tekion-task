import React from "react";
import { Link } from "react-router-dom";
import { BiSolidShoppingBags } from "react-icons/bi";
import { FaCalculator } from "react-icons/fa";
import { BsTable } from "react-icons/bs";
import { FaFileVideo } from "react-icons/fa6";
import { Tooltip } from "antd";

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white h-14 px-8">
      <div className="max-w-full flex flex-wrap items-center justify-between p-4">
        <div>Tekion Tasks</div>
        <div>
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
        </div>
      </div>
    </div>
  );
};

export default Header;
