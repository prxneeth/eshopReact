import React, { createContext, useContext, useReducer, useState } from "react";
import { faker } from "@faker-js/faker";
import { cartReducer, productReducer } from "./Reducer";

export const cart = createContext();
export const filt = createContext();
faker.seed(90);

export const Context = ({ children }) => {
  const products = [...Array(30)].map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price()),
    image: faker.image.url(),
    inStock: faker.helpers.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
  }));

  const [filtersOpen, setFiltersOpen] = useState(false);

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
    sort: "",
  });

  return (
    <cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      <filt.Provider value={{ filtersOpen, setFiltersOpen }}>
        {children}
      </filt.Provider>
    </cart.Provider>
  );
};

export const cartState = () => {
  return useContext(cart);
};
