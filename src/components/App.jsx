import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider, useAuth } from './Sign/AuthContext'; 
import ProtectedRoute from './Sign/ProtectedRoute'; 

import AboutUs from './AboutUs/AboutUs.jsx';
import Header from './HomePage/Header';
import Background from './HomePage/Background';
import SearchBox from './HomePage/SearchBox';
import Reviews from './HomePage/Reviews';
import Categories from './HomePage/Categories';
import Footer from './HomePage/Footer';
import ProductDetail from './ProductDetail/ProductDetail'; 
import ProductList from './ProductList/ProductList'; 
import SignUp from './Sign/SignUp'; 
import SignIn from './Sign/SignIn'; 

import { ProductProvider } from './ProductDetail/ProductsContext'; 

function App() {
  return (
    <AuthProvider> {/* Use AuthProvider to wrap your app */}
      <ProductProvider>
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact>
              <Background/>
              <SearchBox/>
              <Reviews/>
              <Categories/>
            </Route>
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            {/* Use ProtectedRoute for routes that require authentication */}
            <ProtectedRoute path="/productlist" component={ProductList} />
            <ProtectedRoute path="/product/:productId" component={ProductDetail} />
            <Route path="/about" component={AboutUs} />
          </Switch>
          <Footer/>
        </Router>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
