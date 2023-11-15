import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./layouts/Login";
import ShoppingCart from "./app/shoppingCart/ShoppingCart";
import EMICalculator from "./app/EMICalculator/EMICalculator";
import ReactTableApp from "./app/ReactTableApp/ReactTableApp";
import VideoGallery from "./app/VideoGallery/VideoGallery";
import Cart from "./app/shoppingCart/content/Cart";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route
          path="/main"
          element={
            <App>
              <ShoppingCart />
            </App>
          }
        />
        <Route
          path="/emiCalc"
          element={
            <App>
              <EMICalculator />
            </App>
          }
        />
        <Route
          path="/react-tbl"
          element={
            <App>
              <ReactTableApp />
            </App>
          }
        />
        <Route
          path="/videoGallery"
          element={
            <App>
              <VideoGallery />
            </App>
          }
        />
        <Route
          path="/cart"
          element={
            <App>
              <Cart />
            </App>
          }
        />
      </Routes>
    </Router>
  </Provider>
);
