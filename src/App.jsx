import { useState } from "react";

import "./index.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Cart } from "./components/Cart";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          {/* <Route path="" element={<></>} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/components/Cart" element={<Cart />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
