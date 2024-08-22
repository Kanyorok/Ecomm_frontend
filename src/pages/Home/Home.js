import React, {useEffect} from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import Sale from "../../components/home/Sale/Sale";
import { getProducts } from "../../redux/actions/productAction";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {

    dispatch(getProducts());
  }, [dispatch]);
  return (
    <div className="w-full mx-auto">
      <Banner />
      <BannerBottom />
      <div className="max-w-container mx-auto px-4">
        <Sale />
        <NewArrivals />
        <BestSellers />
      </div>
    </div>
  );
};

export default Home;
