import React from "react";
import { Route, Routes } from "react-router-dom";
import ShoppingCart from "../app/shoppingCart/ShoppingCart";
import EMICalculator from "../app/EMICalculator/EMICalculator";
import ReactTableApp from "../app/ReactTableApp/ReactTableApp";
import VideoGallery from "../app/VideoGallery/VideoGallery";
import Cart from "../app/shoppingCart/content/Cart";

const Content = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-500 to-slate-500">
      <Routes>
        <Route path="/" element={<ShoppingCart />} />
        <Route path="/emiCalc" element={<EMICalculator />} />
        <Route path="/react-tbl" element={<ReactTableApp />} />
        <Route path="videoGallery" element={<VideoGallery />} />
        {/* below routes are child routes */}
        <Route path="cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default Content;
