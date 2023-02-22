import React from "react";
import Header from "../../components/Header/header.jsx";
import Footer from "../../components/Footer/footer.jsx";
import {Link} from "react-router-dom";

function NotFound() {
  return (
    <>
      <Header />
      <div className="mainApp">
          <h1>Unknown beverage</h1>
          <h3>Highly advised to not drink this...</h3>
          <button><Link to="/">Go back to home</Link></button>
      </div>
      <Footer/>
    </>
  );
}

export default NotFound;
