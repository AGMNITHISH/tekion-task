import React from "react";
import ProdcutCard from "./ProdcutCard";
import { useSelector } from "react-redux";

const ProductList = () => {
  const { data } = useSelector((state) => state.cartSlice);
  return (
    <div className="grid grid-cols-4 gap-4  m-4">
      {data?.map((item, ind) => {
        return (
          <div key={ind}>
            <ProdcutCard key={ind} item={item} />
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
