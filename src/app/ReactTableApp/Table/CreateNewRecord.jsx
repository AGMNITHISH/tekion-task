import axios from "axios";
import React, { useEffect, useState } from "react";
import { reactTable_RootURL } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import {
  getAllTableApi,
  getModelBasedOnBrand,
  getCarBodyBasedOnModel,
} from "../../../redux/slice/reactTable/reactTableSlice";

const CreateNewRecord = ({ handleModal, isModalOpen }) => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const { me } = useSelector((state) => state.LoginSlice);
  const {
    carData,
    carStatus,
    carModelData,
    carModelStatus,
    carBodyData,
    carBodyStatus,
  } = useSelector((state) => state.reactTableSlice);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    if (JSON.stringify(inputs) === "{}") {
      console.log("true");
    } else {
      const { brand, model } = inputs;
      if (brand && carModelStatus !== "success") {
        dispatch(getModelBasedOnBrand(brand));
      }
      if (model && carBodyStatus !== "success") {
        dispatch(getCarBodyBasedOnModel(model));
      }
    }
  }, [inputs, carBodyStatus, carModelStatus, dispatch]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = inputs;
    formData["userId"] = me.id;

    axios
      .post(`${reactTable_RootURL}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          message.success("new record added");
          dispatch(getAllTableApi(me.id));
          handleModal(!isModalOpen);
        } else {
          message.error("new row not inserted");
        }
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-6 group">
          <select
            name="brand"
            value={inputs.brand || ""}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
            // disabled={carStatus !== "success"}
            onChange={handleChange}
          >
            {carStatus === "success" ? (
              <>
                <option selected value={null}>
                  Choose a brand
                </option>
                {carData?.map((item, ind) => {
                  return (
                    <>
                      <option key={ind} value={item}>
                        {item}
                      </option>
                    </>
                  );
                })}
              </>
            ) : (
              <option className="flex justify-center items-center">
                loading...
              </option>
            )}
          </select>
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Brand
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <select
            name="model"
            value={inputs.model || ""}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            disabled={carModelStatus !== "success"}
            onChange={handleChange}
          >
            {carModelStatus === "success" ? (
              <>
                <option selected value={null}>
                  Choose a model
                </option>
                {carModelData?.map((item, ind) => {
                  return (
                    <>
                      <option key={ind} value={item.model}>
                        {item.model}
                      </option>
                    </>
                  );
                })}
              </>
            ) : (
              <>{carModelStatus === "idle" ? <></> : <></>}</>
            )}
          </select>
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Model
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <select
              name="car_body"
              value={inputs.car_body || ""}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              disabled={carBodyStatus !== "success"}
              onChange={handleChange}
            >
              {carBodyStatus === "success" ? (
                <>
                  <option selected value={null}>
                    Choose a car body
                  </option>
                  {carBodyData?.map((item, ind) => {
                    return (
                      <>
                        <option key={ind} value={item.car_body}>
                          {item.car_body}
                        </option>
                      </>
                    );
                  })}
                </>
              ) : (
                <>{carBodyStatus === "idle" ? <></> : <></>}</>
              )}
            </select>
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Car Body
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="color"
              id="color"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={handleChange}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Color
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              name="price"
              id="price"
              value={inputs.price || ""}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={handleChange}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Price
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="year"
              id="year"
              value={inputs.year || ""}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={handleChange}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Year
            </label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <select
            name="image"
            value={inputs.image || ""}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={handleChange}
          >
            {" "}
            {carBodyStatus === "success" ? (
              <>
                <option selected value={null}>
                  Choose car image
                </option>
                {carBodyData?.map((item, ind) => {
                  return (
                    <>
                      <option key={ind} value={item.image}>
                        {item.image}
                      </option>
                    </>
                  );
                })}
              </>
            ) : (
              <>{carBodyStatus === "idle" ? <></> : <></>}</>
            )}
          </select>
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Image path
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateNewRecord;
