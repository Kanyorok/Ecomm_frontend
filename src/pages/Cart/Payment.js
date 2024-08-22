import React, { Fragment, useState, useEffect } from 'react'
import MetaData from "../Layout/MetaData";
import CheckoutSteps from './CheckoutSteps';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addUserInfo } from '../../redux/kamandoraSlice';
import { removeUserInfo } from '../../redux/kamandoraSlice';


const Payment = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const url = '/api/v1/payment'
  const dispatch = useDispatch();
  
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice)*100,
    full_name: fullName,
    email: email
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    document.querySelector('#pay_btn').disabled = true;

    const config = {
      headers: {
        'Content-Type':'application/json'
      }
    }

    dispatch(removeUserInfo());

    await axios.post(
      url, paymentData, config
    ).then( response => {
      let redirect_link = response.data.data.data.authorization_url;
      window.location.href= redirect_link;
      dispatch(addUserInfo({...orderInfo}))
    }).catch(function(error){
      document.querySelector('#pay_btn').disabled = false;
      console.log(error)
    })
  }

  return (
    <Fragment>
      <MetaData title={"Payment"} />
      <CheckoutSteps shipping confirmOrder payment />
      <div className="row wrapper flex justify-center">
        <div className="col-10 col-lg-5 mb-4">
          <form className="shadow-lg w-full lgl:w-[500px] h-screen flex justify-center" onSubmit={submitHandler}>
          <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
            <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">Payment Info</h1>
            <div className="flex flex-col gap-3">
            <div className="form-group">
              <label className="font-titleFont text-base font-semibold text-gray-600" htmlFor="card_num_field">Email</label>
              <input 
                type="email"
                id="email_field"
                className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                placeholder='Email Address'
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="form-group">
              <label className="font-titleFont text-base font-semibold text-gray-600" htmlFor="card_exp_field">Full Name</label>
              <input
                type="text"
                id="full_names_field"
                className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                placeholder='Full Names'
                onChange={(e)=>setFullName(e.target.value)}
                value={fullName}
              />
            </div>

            <button id="pay_btn" type="submit" className="btn btn-block bg-[#8d8d75] hover:bg-gray-500 w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300 cursor-pointer">
              Pay {`- Ksh. ${orderInfo && orderInfo.totalPrice}`}
            </button>
            
            </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Payment