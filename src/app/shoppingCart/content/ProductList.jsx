import React from "react";
import ProdcutCard from "./ProdcutCard";

const ProductList = ({ data }) => {
  return (
    <div className="grid grid-cols-4 gap-5  m-4">
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
