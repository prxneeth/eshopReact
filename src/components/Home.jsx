import React from "react";
import { useContext } from "react";
import { cart, cartState, filt } from "../contextRed/Context";
import { Allproducts } from "./Allproducts";
import { Filters } from "./Filters";

// import { cartState } from "../contextRed/Context";

export const Home = () => {
  const {
    state: { products },
  } = cartState();

  //   const {
  //     state: { products },
  //   } = useContext(cart);

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
        {products.map((prod) => {
          return <Allproducts prod={prod} key={prod.id} />;
        })}
      </div>
    </div>
  );
};
