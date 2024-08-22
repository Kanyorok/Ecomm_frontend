import React from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import { useSelector } from "react-redux";

const NewArrivals = () => {
  const products = useSelector((state) => state.products.products)
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <Slider {...settings}>
      {products
          .filter((product) => product.product_section === "new collection")
          .map((product) => (
            <div className="px-2" key={product.id}>
              <Product
                id={product.id}
                img={product.images[0].url}
                productName={product.name}
                price={product.price}
                color={product.color}
                badge={product.badge}
                des={product.description}
              />
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default NewArrivals;
