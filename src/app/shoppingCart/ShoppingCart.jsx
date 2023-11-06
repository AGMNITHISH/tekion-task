import React, { useEffect, useState } from "react";
import { cartApiCall } from "../../redux/slice/shoppingCart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "./content/ProductList";
import { BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";
const ShoppingCart = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const cartSliceData = useSelector((state) => state);
  const { cartData } = useSelector((state) => state.cartSlice);

  useEffect(() => {
    if (cartSliceData.cartSlice.status === "success") {
      setData(cartSliceData.cartSlice.data?.products);
    }
  }, [cartSliceData]);

  useEffect(() => {
    dispatch(cartApiCall());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div className="flex justify-end items-end mr-6">
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 mt-2 ml-3"
        >
          <div>
            <Link to="/cart" className="flex">
              <BsCart4 className="mr-1 text-2xl" />
              <span className="bg-black rounded-full w-5 text-xs flex justify-center  items-center relative bottom-2 right-1">
                {cartData.length}
              </span>
              Go to cart
            </Link>
          </div>
        </button>
      </div>

      <ProductList data={data} />
    </div>
  );
};

export default ShoppingCart;
