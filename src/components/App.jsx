import React, { useState } from "react";
import Header from "./Header";
import SearchBox from "./SearchBox";
import Categories from "./Categories";
import Footer from "./Footer";
import Reviews from "./Reviews";
import Background from "./Background";

function App() {
    return (
    <div>
      <Header />
      <Background/>
      <SearchBox />
      <Reviews/>
      <Categories />
      <Footer/>
    </div>
  );
}

export default App;
