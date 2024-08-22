import React, { Fragment, useState } from "react";
import MetaData from "../Layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";
import { countries } from "countries-list";
import CheckoutSteps from "./CheckoutSteps";

const Shipping = () => {
  const countriesList = Object.values(countries);
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [country, setCountry] = useState(shippingInfo.country);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingInfo({ address, city, postalCode, phoneNo, country }));
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title={`Shipping Information`} />
      <CheckoutSteps shipping />
      <div className="row wrapper flex justify-center">
        <div className="col-10 col-lg-5 mb-4">
          <form
            className="shadow-lg w-full lgl:w-[500px] h-screen flex justify-center"
            onSubmit={submitHandler}
          >
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Shipping Info
              </h1>
              <div className="flex flex-col gap-3">
                <div className="form-group">
                  <label className="font-titleFont text-base font-semibold text-gray-600" htmlFor="address_field">Address</label>
                  <input
                    type="text"
                    id="address_field"
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="font-titleFont text-base font-semibold text-gray-600" htmlFor="city_field">City</label>
                  <input
                    type="text"
                    id="city_field"
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="font-titleFont text-base font-semibold text-gray-600" htmlFor="phone_field">Phone No</label>
                  <input
                    type="phone"
                    id="phone_field"
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="font-titleFont text-base font-semibold text-gray-600" htmlFor="postal_code_field">Postal Code</label>
                  <input
                    type="number"
                    id="postal_code_field"
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="font-titleFont text-base font-semibold text-gray-600" htmlFor="country_field">Country</label>
                  <select
                    id="country_field"
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  >
                    {countriesList.map((country) => (
                      <option key={country.name} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  id="shipping_btn"
                  type="submit"
                  className="btn btn-block bg-[#8d8d75] hover:bg-gray-500 w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300 cursor-pointer"
                >
                  CONTINUE
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
