import React, { useEffect, useRef, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Country, State } from 'country-state-city';
import MetaData from '../layout/MetaData';
import PinDropIcon from '@mui/icons-material/PinDrop';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIcon from '@mui/icons-material/Phone';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import CheckoutSteps from './CheckoutSteps';
import { saveShippingInfo } from '../../actions/cartActions';

const Shipping = () => {
  const { shippingInfo } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CountryTextColor = useRef('');
  const StateTextColor = useRef('');

  const [address, setaddress] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [country, setcountry] = useState('');
  const [pinCode, setpinCode] = useState('');
  const [phoneNo, setphoneNo] = useState('');

  useEffect(() => {
    setaddress(shippingInfo.address);
    setcity(shippingInfo.city);
    setstate(shippingInfo.state);
    setcountry(shippingInfo.country);
    setpinCode(shippingInfo.pinCode);
    setphoneNo(shippingInfo.phoneNo);
  }, [shippingInfo]);

  const CountryTextColorHandler = (e) => {
    if (e.target.value === '') {
      CountryTextColor.current.classList.add('text-gray-400');
      CountryTextColor.current.classList.remove('text-black');
    } else {
      CountryTextColor.current.classList.remove('text-gray-400');
      CountryTextColor.current.classList.add('text-black');
    }
  };
  const StateTextColorHandler = (e) => {
    if (e.target.value === '') {
      StateTextColor.current.classList.add('text-gray-400');
      StateTextColor.current.classList.remove('text-black');
    } else {
      StateTextColor.current.classList.remove('text-gray-400');
      StateTextColor.current.classList.add('text-black');
    }
  };

  const shippingSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate('/order/confirm');
  };

  return (
    <>
      <MetaData title="Order Shipping Details -- Ecommerce" />
      <div className="mt-8 mx-16">
        <CheckoutSteps activeStep={0} />
        <h1 className="text-center text-2xl text-indigo-600 border-b border-gray-300 w-fit px-6 mx-auto pb-3">
          Shipping Details
        </h1>
        <form className="mx-auto max-w-sm p-4" onSubmit={shippingSubmit}>
          <div className="mb-3 border border-gray-300 flex items-center gap-4 px-4">
            <HomeIcon className="text-gray-500" />
            <input
              type="text"
              placeholder="Address"
              maxLength={100}
              className="bg-transparent w-full py-3 focus:outline-none"
              required
              value={address}
              onChange={(e) => {
                setaddress(e.target.value);
              }}
            />
          </div>

          <div className="mb-3 border border-gray-300 flex items-center gap-4 px-4">
            <LocationCityIcon className="text-gray-500" />
            <input
              type="text"
              placeholder="City"
              className="bg-transparent w-full py-3 focus:outline-none"
              maxLength={50}
              required
              value={city}
              onChange={(e) => setcity(e.target.value)}
            />
          </div>

          <div className="mb-3 border border-gray-300 flex items-center gap-4 px-4">
            <PinDropIcon className="text-gray-500" />
            <input
              type="number"
              placeholder="Pincode"
              className="bg-transparent w-full py-3 focus:outline-none"
              required
              value={pinCode}
              onChange={(e) => setpinCode(e.target.value.slice(0, 10))}
            />
          </div>

          <div className="mb-3 border border-gray-300 flex items-center gap-4 px-4">
            <PhoneIcon className="text-gray-500" />
            <input
              type="number"
              placeholder="Phone Number"
              className="bg-transparent w-full py-3 focus:outline-none"
              required
              value={phoneNo}
              onChange={(e) => setphoneNo(e.target.value.slice(0, 12))}
            />
          </div>

          <div className="mb-3 border border-gray-300 flex items-center gap-4 px-4">
            <PublicIcon className="text-gray-500" />

            <select
              ref={CountryTextColor}
              className="bg-transparent w-full py-3 focus:outline-none text-gray-400"
              defaultValue=""
              value={country}
              onChange={(e) => {
                setcountry(e.target.value);
                CountryTextColorHandler(e);
              }}
              required
            >
              <option value="" disabled className="text-gray-400">
                Country
              </option>
              {Country.getAllCountries().map((item) => (
                <option
                  key={item.isoCode}
                  value={item.isoCode}
                  className="text-black"
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3 border border-gray-300 flex items-center gap-4 px-4">
            <TransferWithinAStationIcon className="text-gray-500" />

            <select
              ref={StateTextColor}
              className="bg-transparent w-full py-3 focus:outline-none text-gray-400"
              defaultValue=""
              value={state}
              onChange={(e) => {
                setstate(e.target.value);
                StateTextColorHandler(e);
              }}
              required
            >
              <option value="" disabled className="text-gray-400">
                State
              </option>
              {country &&
                State.getStatesOfCountry(country ? country : '').map((item) => (
                  <option
                    key={item.isoCode}
                    value={item.isoCode}
                    className="text-black"
                  >
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="my-6">
            <input
              disabled={state ? false : true}
              type="submit"
              value="Continue"
              className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 text-white w-full py-2 text-lg tracking-wide focus:outline-none"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Shipping;
