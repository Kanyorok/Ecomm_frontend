import React, { useEffect, useState } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const SpecialOffers = () => {
  const products = useSelector((state) => state.products.products)
  const { category } = useParams();

  const [data, setData] = useState([]);
  useEffect(() => {
    setData(products);
  }, [data]);

  const catData = Array.isArray(data) ? data.filter((item) => item.category === category) : [];

  return (
    <div className="w-full pb-20">
      <Heading heading="Special Offers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-3 gap-10">
        {catData.length > 0 ? (
          catData.map((data) => (
            <Product
              key={data.id}
              id={data.id}
              img={JSON.parse(data.images)[0]?.url || ''}
              productName={data.name}
              price={data.price}
              color={data.color}
              badge={data.badge}
              des={data.description}
            />
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SpecialOffers;
