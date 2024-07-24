import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className={`mt-8 bg-[#CFE1E1] p-8 sm:grid sm:grid-cols-3 sm:gap-8`}
      // className={`mt-8 bg-[#CFE1E1] p-8 ${
      //   showFilter ? "hidden" : null
      // } sm:grid sm:grid-cols-3 sm:gap-8`}
    >
      <div className="mb-8 sm:mb-0">
        <Link to="/" className="text-4xl font-bold text-[#49625F]">
          ScentYard
        </Link>
        <div className="text-sm">
          Choose from our wide variety of fragrances
        </div>
        <div className="social mt-2">
          <Link
            to="https://github.com/himadri2110"
            target="_blank"
            className="text-[#384A48] mr-2"
          >
            <i className="fa fa-github"></i>
          </Link>
          <Link
            to="https://twitter.com/himadri2110"
            target="_blank"
            className="text-[#384A48] mr-2"
          >
            <i className="fa fa-twitter"></i>
          </Link>
          <Link
            to="https://linkedin.com/in/himadri2110"
            target="_blank"
            className="text-[#384A48]"
          >
            <i className="fa fa-linkedin"></i>
          </Link>
        </div>
      </div>

      <div className="quick-links mb-8 sm:mb-0">
        <div className="heading font-bold mb-2">Quick Links</div>
        <div className="sub-heading text-sm">
          <Link to="/products">Products</Link>
        </div>
        <div className="sub-heading text-sm">
          <Link to="/wishlist">Wishlist</Link>
        </div>
        <div className="sub-heading text-sm">
          <Link to="/cart">Cart</Link>
        </div>
      </div>

      <div className="contact">
        <div className="heading font-bold mb-2">Contact Us</div>

        <div className="sub-heading address text-sm">
          <i className="fa fa-map-marker mr-2"></i>Garden East, Karachi,
          Pakistan
        </div>
        <div className="sub-heading phone text-sm">
          <i className="fa fa-phone mr-2"></i>+92 306 6189479
        </div>
        <div className="sub-heading e-mail text-sm">
          <i className="fa fa-envelope mr-2"></i>scentsyard@gmail.com
        </div>
      </div>
    </footer>
  );
};

export default Footer;
