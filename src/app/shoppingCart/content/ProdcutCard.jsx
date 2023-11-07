import React from "react";
import {
  addcart,
  updateIncart,
} from "../../../redux/slice/shoppingCart/cartSlice";
import { useDispatch } from "react-redux";
// import { MdOutlineAddShoppingCart } from "react-icons/md";

const ProdcutCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    let newData = { ...item, quantity: 1 };

    dispatch(addcart(newData));
    dispatch(updateIncart(item));
  };
  let desc =
    item.description.length > 40
      ? item.description.substr(0, 40) + "..."
      : item.description;

  return (
    <>
      <div className="block  p-4 bg-slate-700 text-white h-96	 rounded-md shadow-md">
        {" "}
        <img
          src={item.thumbnail}
          alt={`${item.title}`}
          className="object-fill h-64 w-full rounded transition duration-300 ease-in-out hover:scale-110 cursor-pointer"
        ></img>
        <div className="font-sans pt-1 font-bold">{item.title}</div>
        <div className="text-xs font-medium	">{desc}</div>
        <div className="text-yellow-400 font-bold	py-3">
          ${item.price}
          <span className="float-right text-lg cursor-pointer">
            {item.incart === "Yes" ? (
              <>
                <button
                  type="button"
                  disabled
                  className="text-white bg-green-600 cursor-not-allowed hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Already in cart
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handleAddToCart(item)}
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Add to cart
                </button>
              </>
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default ProdcutCard;
