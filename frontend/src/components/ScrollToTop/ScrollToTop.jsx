import React, { useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa6";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
      setIsScrolled(true);
    } else {
      setIsVisible(false);
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <div
          className={`fixed bottom-5 right-5 cursor-pointer bg-[#436C68] text-white w-10 h-10 rounded-full flex justify-center items-center shadow-md hover:bg-primary/90 duration-300 z-50 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
          onClick={scrollToTop}
        >
          <FaChevronUp />
        </div>
      )}
    </>
  );
};

export default ScrollToTop;
