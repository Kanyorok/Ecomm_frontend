import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import { FaDownload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, getProductReviews, clearErrors } from "../../redux/actions/productAction";
import { toast } from "react-toastify";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ListReviews from "../../components/Reviews/ListReviews";

const tabs = [
  {
    id: "Specifications",
    label: "Specifications",
  },
  {
    id: "Reviews",
    label: "Reviews",
    content: "Product has no reviews",
  },
  {
    id: "Video",
    label: "Video",
    content: (
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/watch?v=6e0yIRDVPlA&list=RD6e0yIRDVPlA&start_radio=1"
        title="YouTube Video"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    ),
  },
  // Add more tabs as needed
];

const ProductDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState({});
  const [productDetails, setProductDetails] = useState({});
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const { loading, error, product } = useSelector((state) => state.productDetail);
  const {  reviews } = useSelector((state) => state.productReviews);

  useEffect(() => {
    setProductDetails(location.state.item);
    setPrevLocation(location.pathname);
  }, [location]);

  const prodId = productDetails.id;

  useEffect(() => {
    if (prodId && (!product || prodId !== product.id)) {
      dispatch(getProductDetails(prodId));
      dispatch(getProductReviews(prodId));
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, prodId, product, error]);

  useEffect(() => {
    if (product) {
      setProductInfo(product);
    }
  }, [product]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const parsedImages = productInfo.images ? productInfo.images : [];

  let parsedSpecifications = [];
  if (productInfo.specifications) {
    try {
      const cleanedString = productInfo.specifications;
      parsedSpecifications = cleanedString;
      if (!Array.isArray(parsedSpecifications)) {
        parsedSpecifications = [];
      }
    } catch (e) {
      console.error("Error parsing specifications", e);
      parsedSpecifications = [];
    }
  }

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="" prevLocation={prevLocation} />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-[#ede4dd] p-4">
          <div className="h-full xl:col-span-2">
            <Carousel
              showThumbs={false}
              infiniteLoop={true}
              useKeyboardArrows={true}
              autoPlay={true}
              stopOnHover={true}
              className="rounded-lg shadow-lg"
            >
              {parsedImages && parsedImages.map((image) => (
                <div key={image.public_id}>
                  <img className="w-full object-cover" src={image.url} alt={product.name} />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="h-full w-full md:col-span-2 xl:col-span-4 xl:px-4 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>
        <div>
          <div className="space-x-4 pt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${
                  activeTab === tab.id
                    ? "bg-[#af8965] text-white rounded-md"
                    : "bg-[#424027] text-white rounded-md"
                } py-2 px-4 focus:outline-none`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="my-4">
            {tabs.map((tab) => (
              <div key={tab.id} className={activeTab === tab.id ? "" : "hidden"}>
                {tab.id === "Specifications" && parsedSpecifications.length > 0 ? (
                  <div>
                    <table className="table-auto w-full">
                      <tbody>
                        {parsedSpecifications.map((row) => (
                          <tr key={row.label} className="bg-[#ede4dd]">
                            <td className="border px-4 py-2 font-semibold">
                              {row.label}
                            </td>
                            <td className="border px-4 py-2">{row.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="my-4 flex justify-end">
                      <button className="inline-flex items-center px-4 py-2 border border-gray-300 bg-[#af8965] hover:bg-[#424027] rounded-md text-white font-bodyFont">
                        <FaDownload className="h-5 w-5 mr-2 text-white" />
                        <a
                          href="#"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white"
                        >
                          Download PDF
                        </a>
                      </button>
                    </div>
                  </div>
                ) : tab.id === "Reviews" && reviews ? (
                  <div>
                    <ListReviews reviews={reviews} />
                  </div>
                ) : (
                  <p>{tab.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
