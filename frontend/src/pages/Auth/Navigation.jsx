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

import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { RiUser3Line } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa6";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FiMenu } from "react-icons/fi";
import { HiMiniXMark } from "react-icons/hi2";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItemss } = useSelector((state) => state.cart);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Apple iPhone 15", price: 599, quantity: 1 },
    { id: 2, name: "Apple iPad Air", price: 499, quantity: 1 },
    { id: 3, name: "Apple Watch SE", price: 598, quantity: 2 },
  ]);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      setIsUserDropdownOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <nav className="bg-white dark:bg-gray-800 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            {/* logo div */}
            <Link to="/" className="text-black">
              logo here
            </Link>
            <div className="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
              <Link
                to="/"
                title=""
                className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
              >
                Home
              </Link>

              <Link
                to="/products"
                title=""
                className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
              >
                Products
              </Link>
            </div>
          </div>

          <div className="flex items-center lg:space-x-2">
            {userInfo ? (
              <>
                {/* cart btn start */}
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
                  <div className="z-10 mx-auto space-y-4 rounded-lg bg-white p-4 antialiased shadow-lg dark:bg-gray-800 absolute bottom-full top-14 right-80 h-fit">
                    {cartItems.map((item) => (
                      <div key={item.id} className="grid grid-cols-2">
                        <div>
                          <a
                            href="#"
                            className="truncate text-sm font-semibold leading-none text-gray-900 dark:text-white hover:underline"
                          >
                            {item.name}
                          </a>
                          <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">
                            RS: {item.price}
                          </p>
                        </div>

                        <div className="flex items-center justify-end gap-6">
                          <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                            Qty: {item.quantity}
                          </p>
                          {/* delele btn */}
                          <button
                            data-tooltip-target={`tooltipRemoveItem${item.id}`}
                            type="button"
                            className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600"
                          >
                            <span className="sr-only">Remove</span>

                            <HiMiniXMark className="h-5 w-5 bg-red-400 text-white rounded-full p-1" />
                          </button>
                          <div
                            id={`tooltipRemoveItem${item.id}`}
                            role="tooltip"
                            className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                          >
                            Remove item
                            <div
                              className="tooltip-arrow"
                              data-popper-arrow
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* Proceed to Checkout btn  */}
                    <button
                      className="mb-2 me-2 inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium bg-[#1D4ED8] text-white hover:bg-[#1d4fd8dc] focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      role="button"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                )}
                {/* cart btn end*/}

                {/* account btn end */}
                <button
                  id="userDropdownButton1"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  type="button"
                  className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
                >
                  <RiUser3Line className="w-5 h-5 me-1" />
                  {userInfo.username}
                  <FaChevronDown className="w-4 h-4 text-gray-900 dark:text-white ms-1" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Signup
                </Link>

                <Link
                  to="/login"
                  className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Login
                </Link>
              </>
            )}
            {isUserDropdownOpen && (
              <div className="absolute bottom-full top-14 right-80 h-fit z-10 w-56 divide-y divide-gray-100 overflow-hidden overflow-y-auto rounded-lg bg-white antialiased shadow dark:divide-gray-600 dark:bg-gray-700">
                <>
                  <NavLink
                    to="/profile"
                    title="My Account"
                    onClick={() => setIsUserDropdownOpen(false)}
                    className={({ isActive }) =>
                      `inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 ${
                        isActive ? "text-red-500" : "text-black"
                      }`
                    }
                  >
                    My Account
                  </NavLink>
                  <NavLink
                    to="/user-orders"
                    title="My Orders"
                    onClick={() => setIsUserDropdownOpen(false)}
                    className={({ isActive }) =>
                      `inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 ${
                        isActive ? "text-red-500" : "text-black"
                      }`
                    }
                  >
                    My Orders
                  </NavLink>
                  <NavLink
                    to="/favorite"
                    title="My Favorites"
                    className={({ isActive }) =>
                      `inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 ${
                        isActive ? "text-red-500" : "text-black"
                      }`
                    }
                  >
                    My Favorites
                  </NavLink>
                  {userInfo.isAdmin && (
                    <>
                      <NavLink
                        to="/admin/dashboard "
                        title="Admin Dashboard"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className={({ isActive }) =>
                          `inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 ${
                            isActive ? "text-red-500" : "text-black"
                          }`
                        }
                      >
                        Admin Dashboard
                      </NavLink>
                      <NavLink
                        to="/admin/productlist"
                        title="Create Products"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className={({ isActive }) =>
                          `inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 ${
                            isActive ? "text-red-500" : "text-black"
                          }`
                        }
                      >
                        Create Products
                      </NavLink>
                      <NavLink
                        to="/admin/allproductslist"
                        title="All Products"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className={({ isActive }) =>
                          `inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 ${
                            isActive ? "text-red-500" : "text-black"
                          }`
                        }
                      >
                        All Products
                      </NavLink>

                      <NavLink
                        to="/admin/categorylist"
                        title="Create Category"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className={({ isActive }) =>
                          `inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 ${
                            isActive ? "text-red-500" : "text-black"
                          }`
                        }
                      >
                        Create Catogry
                      </NavLink>
                      <NavLink
                        to="/admin/orderlist"
                        title="Manage Orders"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className={({ isActive }) =>
                          `inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 ${
                            isActive ? "text-red-500" : "text-black"
                          }`
                        }
                      >
                        Manage Orders
                      </NavLink>
                      <NavLink
                        to="/admin/userlist"
                        title="Manage Users"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className={({ isActive }) =>
                          `inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 ${
                            isActive ? "text-red-500" : "text-black"
                          }`
                        }
                      >
                        Manage Users
                      </NavLink>
                    </>
                  )}

                  <button
                    onClick={logoutHandler}
                    title="My Favorites"
                    className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-black hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Logout
                  </button>
                </>
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
        {/* mobile menu btns */}
        {isMobileMenuOpen && (
          <div className="bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border border-gray-200 rounded-lg py-3 px-4 mt-4">
            <div className="text-gray-900 text-sm font-medium dark:text-white space-y-3">
              <Link
                to="/"
                className="hover:text-primary-700 dark:hover:text-primary-500"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="hover:text-primary-700 dark:hover:text-primary-500"
              >
                Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
