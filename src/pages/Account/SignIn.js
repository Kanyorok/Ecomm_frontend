import React, { Fragment, useState, useEffect } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import { login, clearErrors } from "../../redux/actions/userActions";
import { toast } from "react-toastify";
import Loader from "../Layout/Loader";


const SignIn = () => {
  // ============= Initial State Start here =============
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, error, message, loading, } = useSelector(state => state.auth);
  const redirect = location.search ? location.search.split('=')[1] : '/';

  // ============= Event Handler Start here =============
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  useEffect(() => {

    if (isAuthenticated) {
        navigate(redirect)
    }

    if (error) { 
        toast.error(error);
        dispatch(clearErrors)
    }

}, [dispatch, toast, isAuthenticated, error, redirect, navigate])

  // ============= Event Handler End here ===============
  const handleSignIn = (e) => {
    e.preventDefault();

    if (!email) {
      setErrEmail("Enter your email");
    }

    if (!password) {
      setErrPassword("Create a password");
    }
    // ============== Getting the value ==============
    if (email && password) {

      dispatch(login(email, password))
      setEmail("");
      setPassword("");
    }
  };

  return (
    <Fragment>
    {loading ? <Loader/> : ( <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-[#ede4dd] px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl text-[#262626] font-medium">
              Stay sign in for more
            </h1>
            <p className="text-base text-black">When you sign in, you are with us!</p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-black">
              <span className="text-black font-semibold font-titleFont">
                Get started fast with KAMANDORA
              </span>
              <br />
              Discover a wide range of stylish and durable bags at KAMANDORA. Whether you're looking for backpacks, handbags, or travel bags, we have something for everyone.
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-black">
              <span className="text-black font-semibold font-titleFont">
                Access all KAMANDORA services
              </span>
              <br />
              Join our community of satisfied customers today!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-black">
              <span className="text-black font-semibold font-titleFont">
                Trusted by online Shoppers
              </span>
              <br />
              Shop with confidence and find your perfect bag today.
            </p>
          </div>
          <div className="flex items-center justify-between mt-3 mb-4">
            <Link to="/">
              <p className="text-sm font-titleFont font-semibold text-black hover:text-[#af8965] cursor-pointer duration-300">
                © Kamandora
              </p>
            </Link>
            <p className="text-sm font-titleFont font-semibold text-black hover:text-[#af8965] cursor-pointer duration-300">
              Terms
            </p>
            <p className="text-sm font-titleFont font-semibold text-black hover:text-[#af8965] cursor-pointer duration-300">
              Privacy
            </p>
            <p className="text-sm font-titleFont font-semibold text-black hover:text-[#af8965] cursor-pointer duration-300">
              Security
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lgl:w-1/2 h-full">
        
          <form className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
                Sign in
              </h1>
              <div className="flex flex-col gap-3">
                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Email
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="john@workemail.com"
                  />
                  {errEmail && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errEmail}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Password
                  </p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Create password"
                  />
                  {errPassword && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPassword}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleSignIn}
                  className="bg-[#af8965] hover:bg-[#424027] text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
                >
                  Sign In
                </button>
                <div className="flex justify-between">
                    <p className="text-sm font-titleFont font-medium">
                      Don't have an Account?{" "}
                      <br/>
                      <Link to="/signup">
                        <span className="hover:text-blue-600 duration-300">
                          Sign up
                        </span>
                      </Link>
                    </p>
                    <p className="text-sm font-titleFont font-medium">
                      Change Login Details?{" "}
                      <br/>
                      <Link to="/password/forgot">
                        <span className="hover:text-blue-600 duration-300">
                          Forgot Password
                        </span>
                      </Link>
                    </p>
                </div>
              </div>
              {error ? <div className="bg-red-500 text-white p-4 mt-5">{message}</div>: ''}
            </div>
          </form>
      </div>
    </div>)}
    </Fragment>
  );
};

export default SignIn;
