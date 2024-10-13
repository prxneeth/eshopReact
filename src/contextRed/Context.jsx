import React, { createContext, useContext } from "react";
import { faker } from "@faker-js/faker";
import { useReducer } from "react";
import { cartReducer } from "./Reducer";
import { useState } from "react";

export const cart = createContext();
export const filt = createContext();
faker.seed(90);

export const Context = ({ children }) => {
  const products = [...Array(20)].map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
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

  return (
    <cart.Provider value={{ state, dispatch }}>
      <filt.Provider value={{ filtersOpen, setFiltersOpen }}>
        {children}
      </filt.Provider>
    </cart.Provider>
  );
};

// Custom hook to use the cart context
export const cartState = () => {
  return useContext(cart);
};
