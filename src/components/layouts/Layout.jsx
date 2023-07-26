import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="h-[90vh] sm:h-[80vh]">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
