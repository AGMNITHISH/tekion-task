import React from "react";
import Header from "./layouts/Header";
import Content from "./layouts/Content";
import Footer from "./layouts/Footer";

const App = ({ children }) => {
  return (
    <div>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </div>
  );
};

export default App;
