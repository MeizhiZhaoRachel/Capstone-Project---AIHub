import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./Sign/AuthContext";
import ProtectedRoute from "./Sign/ProtectedRoute";
import { ProductProvider } from "./ProductDetail/ProductsContext";
import { ReviewProvider } from "./ProductDetail/BlockChainReview";

import AboutUs from "./AboutUs/AboutUs.jsx";
import Header from "./HomePage/Header";
import Background from "./HomePage/Background";
import SearchBox from "./HomePage/SearchBox";
import Reviews from "./HomePage/Reviews";
import Categories from "./HomePage/Categories";
import Footer from "./HomePage/Footer";
import ProductDetail from "./ProductDetail/ProductDetail";
import ProductList from "./ProductList/ProductList";
import SignUp from "./Sign/SignUp";
import SignIn from "./Sign/SignIn";
import ContactUs from "./ContactUs/ContactUs.jsx";
import ThankYou from "./ProductList/ThankYou";

function App() {
  return (
      <AuthProvider>
        <ProductProvider>
          <Router>
            <Header />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Background />
                    <SearchBox />
                    <Reviews />
                    <Categories />
                  </>
                }
              />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              {/* Protected routes will also need to use the `element` prop */}
              <Route path="/productlist" element={<ProductList />} />

              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/thankyou" element={<ThankYou />} />
              <Route path="/contact" element={<ContactUs />} />
            </Routes>
            <Footer />
          </Router>
        </ProductProvider>
      </AuthProvider>
  
  );
}

export default App;
