import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { RiUser3Line } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa6";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FiMenu } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";
import { MdLogin, MdShoppingCart } from "react-icons/md";
import { IoMdHeart } from "react-icons/io";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  const [logoutApiCall] = useLogoutMutation();

  const dropdownRef = useRef(null);

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
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isUserDropdownOpen &&
        !event.target.closest("#userDropdownButton1") &&
        !event.target.closest(".absolute.bottom-full.top-14.right-0")
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserDropdownOpen]);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/products?search=${searchInput}`);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 antialiased shadow-md mb-2">
      <div className="px-2 lg:px-10 mx-auto py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* logo div */}
            <Link to="/" className="text-black text-4xl font-medium">
              ScentYard
            </Link>
            <div className="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 ">
              <Link
                to="/products"
                className="underline ml-2 flex text-lg font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
              >
                Shop
              </Link>
              {/* {userInfo.isAdmin && (
                <Link
                  to="/products"
                  title=""
                  className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                >
                  Products
                </Link>
              )} */}
            </div>
          </div>
          <div className="hidden md:block">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search"
                value={searchInput}
                onChange={handleSearchInputChange}
                className="border border-[#436C68] py-2 px-2 rounded-md w-[218px]"
              />
            </form>
          </div>

          <div className="flex items-center lg:space-x-2">
            {userInfo ? (
              <>
                <NavLink
                  to="/cart"
                  className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white relative"
                >
                  <HiOutlineShoppingCart className="w-5 h-5 lg:me-1" />
                  <span className="hidden md:block">My Cart</span>
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 left-5 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[12px]">
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </span>
                  )}
                </NavLink>

                {/* account btn for desktop */}
                <button
                  id="userDropdownButton1"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  type="button"
                  className="hidden sm:inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
                >
                  <RiUser3Line className="w-5 h-5 me-1" />
                  {userInfo.username}
                  <FaChevronDown className="w-4 h-4 text-gray-900 dark:text-white ms-1" />
                </button>
              </>
            ) : (
              <>
                <Link to="/favorite" className="text-[#436C68] text-xl">
                  <span>
                    <IoMdHeart />
                  </span>
                </Link>
                <Link to="/cart" className="text-[#436C68] text-xl">
                  <span>
                    <MdShoppingCart />
                  </span>
                </Link>
                <Link to="/login" className="text-[#436C68] text-xl">
                  <span>
                    <MdLogin />
                  </span>
                </Link>
              </>
            )}
            {/* admin nav links */}
            {isUserDropdownOpen && (
              <div
                ref={dropdownRef}
                className={`absolute bottom-full top-14 right-0 h-fit z-10 w-56 divide-y divide-gray-100 overflow-hidden overflow-y-auto rounded-lg bg-white antialiased shadow dark:divide-gray-600 dark:bg-gray-700 ${
                  isUserDropdownOpen ? "" : "hidden"
                }`}
              >
                <>
                  <NavLink
                    to="/profile"
                    title="My Account"
                    onClick={() => {
                      setIsUserDropdownOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                    className={({ isActive }) =>
                      `inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 ${
                        isActive ? "text-blue-600" : "text-black"
                      }`
                    }
                  >
                    My Account
                  </NavLink>
                  <NavLink
                    to="/user-orders"
                    title="My Orders"
                    onClick={() => {
                      setIsUserDropdownOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                    className={({ isActive }) =>
                      `inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 ${
                        isActive ? "text-blue-600" : "text-black"
                      }`
                    }
                  >
                    My Orders
                  </NavLink>
                  <NavLink
                    to="/wishlist"
                    title="My Wishlist"
                    onClick={() => {
                      setIsUserDropdownOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                    className={({ isActive }) =>
                      `inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 ${
                        isActive ? "text-blue-600" : "text-black"
                      }`
                    }
                  >
                    My Wishlist
                  </NavLink>
                  {userInfo.isAdmin && (
                    <>
                      <NavLink
                        to="/admin/dashboard "
                        title="Admin Dashboard"
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                        className={({ isActive }) =>
                          `inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 ${
                            isActive ? "text-blue-600" : "text-black"
                          }`
                        }
                      >
                        Admin Dashboard
                      </NavLink>
                      <NavLink
                        to="/admin/productlist"
                        title="Create Products"
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                        className={({ isActive }) =>
                          `inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 ${
                            isActive ? "text-blue-600" : "text-black"
                          }`
                        }
                      >
                        Create Products
                      </NavLink>
                      <NavLink
                        to="/admin/allproductslist"
                        title="All Products"
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                        className={({ isActive }) =>
                          `inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 ${
                            isActive ? "text-blue-600" : "text-black"
                          }`
                        }
                      >
                        All Products
                      </NavLink>

                      <NavLink
                        to="/admin/categorylist"
                        title="Create Category"
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                        className={({ isActive }) =>
                          `inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 ${
                            isActive ? "text-blue-600" : "text-black"
                          }`
                        }
                      >
                        Create Catogry
                      </NavLink>
                      <NavLink
                        to="/admin/orderlist"
                        title="Manage Orders"
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                        className={({ isActive }) =>
                          `inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 ${
                            isActive ? "text-blue-600" : "text-black"
                          }`
                        }
                      >
                        Manage Orders
                      </NavLink>
                      <NavLink
                        to="/admin/userlist"
                        title="Manage Users"
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                        className={({ isActive }) =>
                          `inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 ${
                            isActive ? "text-blue-600" : "text-black"
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
                    className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-black hover:bg-gray-200 dark:hover:bg-gray-600"
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
              className="inline-flex lg:hidden items-center justify-center hover:bg-gray-200 rounded-md dark:hover:bg-gray-700 p-2 text-gray-900 dark:text-white"
            >
              <span className="sr-only">Open Menu</span>

              <FiMenu className="w-5 h-5" />
            </button>
          </div>
        </div>
        {/* mobile menu btns */}
        {isMobileMenuOpen && (
          <div className="bg-gray-50 dark:bg-gray-700 dark:border-gray-600  rounded-lg py-3 px-4 mt-4">
            {/* account btn for small */}
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="inline-flex items-center rounded-lg justify-center hover:bg-gray-200 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white md:hidden"
            >
              {/* <RiUser3Line className="w-5 h-5 me-1" /> */}
              <span className="hover:text-primary-700 dark:hover:text-primary-500">
                {userInfo.username}
              </span>
              <FaChevronDown className="w-4 h-4 text-gray-900 dark:text-white ms-1" />
            </button>
            <div className="text-gray-900 text-sm font-medium dark:text-white space-y-3">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-primary-700 dark:hover:text-primary-500"
              >
                Home
              </Link>{" "}
              <br />
              <Link
                to="/products"
                onClick={() => setIsMobileMenuOpen(false)}
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
