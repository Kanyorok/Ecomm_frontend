import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../../redux/actions/productAction";
import { useParams } from "react-router-dom";

function Items({ currentItems, selectedBrands, selectedCategories }) {
  // Filter items based on selected brands and categories
  const filteredItems = currentItems.filter((item) => {
    const isBrandSelected =
      selectedBrands.length === 0 ||
      selectedBrands.some((brand) => brand.brand === item.brand);

    const isCategorySelected =
      selectedCategories.length === 0 ||
      selectedCategories.some((category) => category.cat === item.category);

    // const isSectionClicked =
    //   chosenSection.length === 0 ||
    //   chosenSection.some((section) => section.section === item.product_section);

    return isBrandSelected && isCategorySelected;
  });

  return (
    <>
      {filteredItems.map((item) => (
        <div key={item.id} className="w-full">
          <Product
            id={item.id}
            img={item.images[0].url}
            productName={item.name}
            price={item.price}
            color={item.color}
            badge={item.badge}
            description={item.description}
            pdf={item.pdf}
            specifications={item.specifications}
          />
        </div>
      ))}
    </>
  );
}

const Pagination = ({ itemsPerPage }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 100000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();

  const endOffset = itemOffset + itemsPerPage;
  const items = useSelector(
    (state) => state.products.products
  );
  const currentItems = items.slice(itemOffset, endOffset);
  
  const { keyword } = useParams();

  const Keyword = keyword;

  useEffect(() => {

    dispatch(getProducts(Keyword, currentPage, price, category, rating));
  }, [dispatch, Keyword, category, alert, currentPage, price, rating]);

  const selectedBrands = useSelector(
    (state) => state.kamandoraReducer.checkedBrands
  );
  const selectedCategories = useSelector(
    (state) => state.kamandoraReducer.checkedCategories
  );

  const chosenSection = useSelector(
    (state) => state.kamandoraReducer.products
  )

  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    const newStart = newOffset + 1; // Adjust the start index

    setItemOffset(newOffset);
    setItemStart(newStart);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items
          currentItems={currentItems}
          selectedBrands={selectedBrands}
          selectedCategories={selectedCategories}
          chosenSection={chosenSection}
        />{" "}
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />

        <p className="text-base font-normal text-lightText">
          Products from {itemStart} to {Math.min(endOffset, items.length)} of{" "}
          {items.length}
        </p>
        <button onClick={() => console.log(selectedBrands)}> </button>
      </div>
    </div>
  );
};

export default Pagination;
