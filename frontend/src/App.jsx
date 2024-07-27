import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import React from "react";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <ScrollToTop />
      <Footer />
    </>
  );
};

export default App;
