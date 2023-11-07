import React from "react";
import {
  BsFillCartXFill,
  BsFillCartPlusFill,
  BsFillCartDashFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { BiSolidCart } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseProductQty,
  decreaseProductQty,
  removeFromcart,
} from "../../../redux/slice/shoppingCart/cartSlice";
import { BiSolidShoppingBags } from "react-icons/bi";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartData } = useSelector((state) => state.cartSlice);

  const calculateCartTotal = () => {
    const total = cartData.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0);

    return total;
  };
  return (
    <div>
      <div>
        {cartData.length > 0 ? (
          <>
            <div className="flex items-end justify-end mr-96 pt-3 ">
              <span className="border flex px-3 py-2 rounded-md  bg-gray-400 cursor-pointer border-black hover:bg-gray-500 hover:text-white hover:border-white ">
                <Link to="/" className="flex">
                  <BiSolidShoppingBags className="text-2xl  pr-2" /> Back to
                  shop
                </Link>
              </span>
            </div>
          </>
        ) : (
          <></>
        )}

        {cartData.length > 0 ? (
          <div className="flex flex-col items-center justify-center">
            {cartData?.map((item, ind) => {
              return (
                <div
                  className="block w-1/2 m-4 rounded px-9 py-3 bg-slate-400 "
                  key={ind}
                >
                  <div className="text-2xl tracking-widest text-black py-2">
                    {item.title}
                  </div>
                  <div className=" text-black"> {item.description}</div>
                  <div className="tracking-widest text-black font-bold py-2">
                    ${item.price} * {item.quantity} = ${" "}
                    {item.price * item.quantity}
                  </div>
                  <button
                    type="button"
                    onClick={() => dispatch(increaseProductQty(item))}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    <BsFillCartPlusFill />
                  </button>

                  <button
                    type="button"
                    disabled={item.quantity === 1}
                    onClick={() => dispatch(decreaseProductQty(item))}
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    <BsFillCartDashFill />
                  </button>
                  <button
                    type="button"
                    onClick={() => dispatch(removeFromcart(item))}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    {" "}
                    <BsFillCartXFill />
                  </button>
                </div>
              );
            })}
            <div className="block w-1/2 m-4 rounded px-9 py-3 bg-slate-400 ">
              <div className="tracking-widest text-black font-bold py-2">
                {" "}
                Total = ${calculateCartTotal()}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96">
            <BiSolidCart className="text-7xl" />
            <div className="text-3xl font-mono">Your cart is empty</div>
            <Link to="/">
              <button
                type="button"
                className="px-8 py-2 my-4 text-white bg-blue-600 hover:bg-blue-800 rounded-full focus:outline-none disabled:opacity-100"
              >
                Shop now
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
