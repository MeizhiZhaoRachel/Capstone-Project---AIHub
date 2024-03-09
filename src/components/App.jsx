import React, { useState } from "react";
import Header from "./Header";
import SearchBox from "./SearchBox";
import Categories from "./Categories";
import Footer from "./Footer";

function App() {
    return (
    <div>
      <Header />
      <SearchBox />
      <Categories />
      <Footer/>
    </div>
  );
}

export default App;
