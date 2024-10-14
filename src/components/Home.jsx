import React from "react";
import { useContext } from "react";
import { cart, cartState, filt } from "../contextRed/Context";
import { Allproducts } from "./Allproducts";
import { Filters } from "./Filters";

// import { cartState } from "../contextRed/Context";

export const Home = () => {
  const {
    state: { products },
    productState: { byStock, byFastDelivery, sort, byRating, searchQuery },
  } = cartState();

  //   const {
  //     state: { products },
  //   } = useContext(cart);

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }
    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }
    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }
    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }
    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }
    return sortedProducts;
  };

  const { filtersOpen } = useContext(filt);

  return (
    <div className="flex">
      {/* <Filters /> */}
      {filtersOpen && <Filters />}
      <div
        className={`flex flex-wrap ${
          filtersOpen ? "justify-start ml-1" : "justify-center ml-0"
        } mt-5 gap-5`}
      >
        {transformProducts().map((prod) => {
          return <Allproducts prod={prod} key={prod.id} />;
        })}
      </div>
    </div>
  );
};
