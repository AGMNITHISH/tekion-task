import React from "react";

const Content = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-500 to-slate-500">
      {children}
    </div>
  );
};

export default Content;
