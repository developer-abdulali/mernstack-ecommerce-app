// import React, { useState } from "react";
// import {
//   AiOutlineHome,
//   AiOutlineShopping,
//   AiOutlineLogin,
//   AiOutlineUserAdd,
//   AiOutlineShoppingCart,
// } from "react-icons/ai";
// import { FaHeart } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import "./Navigation.css";
// import { useSelector, useDispatch } from "react-redux";
// import { useLogoutMutation } from "../../redux/api/usersApiSlice";
// import { logout } from "../../redux/features/auth/authSlice";
// import FavoritesCount from "../Products/FavoritesCount";

// const Navigation = () => {
//   const { userInfo } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.cart);

//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [showSidebar, setShowSidebar] = useState(false);

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [logoutApiCall] = useLogoutMutation();

//   const logoutHandler = async () => {
//     try {
//       await logoutApiCall().unwrap();
//       dispatch(logout());
//       navigate("/login");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div
//       style={{ zIndex: 9999 }}
//       className={`${
//         showSidebar ? "hidden" : "flex"
//       } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh]  fixed `}
//       id="navigation-container"
//     >
//       <div className="flex flex-col justify-center space-y-4">
//         <Link
//           to="/"
//           className="flex items-center transition-transform transform hover:translate-x-2"
//         >
//           <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
//           <span className="hidden nav-item-name mt-[3rem]">HOME</span>{" "}
//         </Link>

//         <Link
//           to="/shop"
//           className="flex items-center transition-transform transform hover:translate-x-2"
//         >
//           <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
//           <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{" "}
//         </Link>

//         <Link to="/cart" className="flex relative">
//           <div className="flex items-center transition-transform transform hover:translate-x-2">
//             <AiOutlineShoppingCart className="mt-[3rem] mr-2" size={26} />
//             <span className="hidden nav-item-name mt-[3rem]">Cart</span>{" "}
//           </div>

//           {/* badge */}
//           <div className="absolute top-9">
//             {cartItems.length > 0 && (
//               <span>
//                 <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
//                   {cartItems.reduce((a, c) => a + c.qty, 0)}
//                 </span>
//               </span>
//             )}
//           </div>
//         </Link>

//         <Link to="/favorite" className="flex relative">
//           <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
//             <FaHeart className="mt-[3rem] mr-2" size={20} />
//             <span className="hidden nav-item-name mt-[3rem]">
//               Favorites
//             </span>{" "}
//             <FavoritesCount />
//           </div>
//         </Link>
//       </div>

//       <div className="relative">
//         <button
//           onClick={toggleDropdown}
//           className="flex items-center text-gray-800 focus:outline-none"
//         >
//           {userInfo ? (
//             <span className="text-white">{userInfo.username}</span>
//           ) : (
//             <></>
//           )}
//           {userInfo && (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className={`h-4 w-4 ml-1 ${
//                 dropdownOpen ? "transform rotate-180" : ""
//               }`}
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="white"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
//               />
//             </svg>
//           )}
//         </button>

//         {dropdownOpen && userInfo && (
//           <ul
//             className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-600 ${
//               !userInfo.isAdmin ? "-top-20" : "-top-80"
//             } `}
//           >
//             {userInfo.isAdmin && (
//               <>
//                 <li>
//                   <Link
//                     to="/admin/dashboard"
//                     className="block px-4 py-2 hover:bg-gray-100"
//                   >
//                     Dashboard
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/admin/productlist"
//                     className="block px-4 py-2 hover:bg-gray-100"
//                   >
//                     Products
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/admin/categorylist"
//                     className="block px-4 py-2 hover:bg-gray-100"
//                   >
//                     Category
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/admin/orderlist"
//                     className="block px-4 py-2 hover:bg-gray-100"
//                   >
//                     Orders
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/admin/userlist"
//                     className="block px-4 py-2 hover:bg-gray-100"
//                   >
//                     Users
//                   </Link>
//                 </li>
//               </>
//             )}

//             <li>
//               <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
//                 Profile
//               </Link>
//             </li>
//             <li>
//               <button
//                 onClick={logoutHandler}
//                 className="block w-full px-4 py-2 text-left hover:bg-gray-100"
//               >
//                 Logout
//               </button>
//             </li>
//           </ul>
//         )}
//         {!userInfo && (
//           <ul>
//             <li>
//               <Link
//                 to="/login"
//                 className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
//               >
//                 <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
//                 <span className="hidden nav-item-name">LOGIN</span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/register"
//                 className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
//               >
//                 <AiOutlineUserAdd size={26} />
//                 <span className="hidden nav-item-name">REGISTER</span>
//               </Link>
//             </li>
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navigation;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiUser3Line } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa6";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsCartOpen(true);
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-800 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="shrink-0">
              <a href="#" title="" className="">
                <img
                  className="block w-auto h-8 dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/logo-full.svg"
                  alt=""
                />
                <img
                  className="hidden w-auto h-8 dark:block"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/logo-full-dark.svg"
                  alt=""
                />
              </a>
            </div>

            <ul className="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
              <li>
                <Link
                  to="/"
                  title=""
                  className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                >
                  Home
                </Link>
              </li>
              <li className="shrink-0">
                <Link
                  to="/shop"
                  title=""
                  className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                >
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center lg:space-x-2">
            <button
              id="myCartDropdownButton1"
              onClick={() => setIsCartOpen(!isCartOpen)}
              type="button"
              className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
            >
              <span className="sr-only">Cart</span>
              <HiOutlineShoppingCart className="w-5 h-5 lg:me-1" />

              <span className="hidden sm:flex">My Cart</span>
              <FaChevronDown className="hidden sm:flex w-4 h-4 text-gray-900 dark:text-white ms-1" />
            </button>

            {isCartOpen && (
              <div
                id="myCartDropdown1"
                className="z-10 mx-auto max-w-sm space-y-4 overflow-hidden rounded-lg bg-white p-4 antialiased shadow-lg dark:bg-gray-800"
              >
                {/* Your cart items here */}
              </div>
            )}

            <button
              id="userDropdownButton1"
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              type="button"
              className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
            >
              <RiUser3Line className="w-5 h-5 me-1" />
              Account
              <FaChevronDown className="w-4 h-4 text-gray-900 dark:text-white ms-1" />
            </button>
            {isUserDropdownOpen && (
              <div
                id="userDropdown1"
                className="z-10 w-56 divide-y divide-gray-100 overflow-hidden overflow-y-auto rounded-lg bg-white antialiased shadow dark:divide-gray-600 dark:bg-gray-700"
              >
                <Link to="#" className="text-black">
                  Admin
                </Link>
                {/* Your user dropdown items here */}
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-controls="ecommerce-navbar-menu-1"
              aria-expanded={isMobileMenuOpen}
              className="inline-flex lg:hidden items-center justify-center hover:bg-gray-100 rounded-md dark:hover:bg-gray-700 p-2 text-gray-900 dark:text-white"
            >
              <span className="sr-only">Open Menu</span>

              <FiMenu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            id="ecommerce-navbar-menu-1"
            className="bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border border-gray-200 rounded-lg py-3 px-4 mt-4"
          >
            <ul className="text-gray-900 dark:text-white text-sm font-medium dark:text-white space-y-3">
              <li>
                <a
                  href="#"
                  className="hover:text-primary-700 dark:hover:text-primary-500"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-700 dark:hover:text-primary-500"
                >
                  Best Sellers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-700 dark:hover:text-primary-500"
                >
                  Gift Ideas
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-700 dark:hover:text-primary-500"
                >
                  Games
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-700 dark:hover:text-primary-500"
                >
                  Electronics
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-700 dark:hover:text-primary-500"
                >
                  Home & Garden
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
