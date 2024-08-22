import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { paginationItems } from "../../../constants";
import { BsSuitHeartFill } from "react-icons/bs";
import { logout } from "../../../redux/actions/userActions";
import { toast } from "react-toastify";

const HeaderBottom = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { user, loading } = useSelector((state) => state.auth);
  const products = useSelector((state) => state.products.products)
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  const logoutHandler = () => {
    dispatch(logout());
    toast.success('Logged out successfully!');
  };

  return (
    <div className="w-full bg-[#ede4dd] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <div
            onClick={() => setShow(!show)}
            ref={ref}
            className="flex h-14 cursor-pointer items-center gap-2 text-[#af8965]"
          >
            <HiOutlineMenuAlt4 className="w-5 h-5" />
            <p className="text-[14px] font-normal">Styles</p>
            {show && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-16 z-50 bg-[#424027] w-auto text-[#767676] h-auto p-4 pb-6"
              >
                <Link to="category/travel">
                  <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Travel
                  </li>
                </Link>
                <Link to="category/laptop">
                  <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Laptop
                  </li>
                </Link>
                <Link to="category/everydaybag">
                  <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Everyday Bag
                  </li>
                </Link>
                <Link to="category/safiri">
                  <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Safiri Collection
                  </li>
                </Link>
              </motion.ul>
            )}
          </div>
          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              onChange={handleSearch}
              value={searchQuery}
              placeholder="Search your products here"
            />
            <FaSearch className="w-5 h-5" color="#af8965" />
            {searchQuery && (
              <div
                className="w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer"
              >
                {filteredProducts.map((item) => (
                  <div
                    onClick={() => {
                      navigate(`/product/${item.name.toLowerCase().split(" ").join("")}`, {
                        state: {  item: item, },
                      });
                      console.log()
                      setShowSearchBar(true);
                      setSearchQuery("");
                    }}
                    key={item.id}
                    className="max-w-[600px] h-28 bg-[#ede4dd] mb-3 flex items-center gap-3"
                  >
                    <img className="w-24" src={JSON.parse(item.images)[0].url} alt="productImg" />
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-lg">{item.name}</p>
                      <p className="text-xs">
                        {item.description.length > 100 ? `${item.description.slice(0, 100)}...` : item.description}
                      </p>
                      <p className="text-sm">
                        Price: <span className="text-primeColor font-semibold">Ksh. {item.price}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
            <div onClick={() => setShowUser(!showUser)} className="flex">
              <p className="text-[14px] font-semibold text-[#af8965] font-titleFont mr-2">{user && user.name}</p>
              
              <FaUser color="#af8965" />
              <FaCaretDown color="#af8965" />
            </div>
            {showUser && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-6 z-50 bg-[#424027] w-auto text-[#767676] h-auto p-3 pb-6"
              >
                {user ? (
                  <>
                    {user.role === "admin" && (
                      <Link to="/dashboard">
                        <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                          Dashboard
                        </li>
                      </Link>
                    )}
                    <Link to="/orders/me">
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Orders
                      </li>
                    </Link>
                    <Link to="/me">
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Profile
                      </li>
                    </Link>
                    <Link to="/" >
                      <li onClick={logoutHandler} className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Logout
                      </li>
                    </Link>
                    
                  </>
                ) : (
                  <>
                    {!loading && (
                      <>
                        <Link to="/signin">
                          <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                            Login
                          </li>
                        </Link>
                        <Link to="/signup">
                          <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                            Sign Up
                          </li>
                        </Link>
                      </>
                    )}
                  </>
                )}
              </motion.ul>
            )}
            <Link to="/cart">
              <div className="relative">
                <FaShoppingCart color="#af8965" />
                <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-[#af8965] text-white">
                  {cartItems.length}
                </span>
              </div>
            </Link>
            <BsSuitHeartFill color="#af8965" />
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
