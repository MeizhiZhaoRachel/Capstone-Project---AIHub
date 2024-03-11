import React, { useState } from "react";
import Header from "./Header";
import SearchBox from "./SearchBox";
import Categories from "./Categories";
import Footer from "./Footer";
import Reviews from "./Reviews";

function App() {
    return (
    <div>
      <Header />
      <SearchBox />
      <Reviews/>
      <Categories />
      <Footer/>
    </div>
  );
}

export default App;
