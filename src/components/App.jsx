import React from 'react';
// Imports necessary components for routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// About Us
import AboutUs from './AboutUs/AboutUs.jsx';
// HomePage
import Header from './HomePage/Header';
import Background from './HomePage/Background';
import SearchBox from './HomePage/SearchBox';
import Reviews from './HomePage/Reviews';
import Categories from './HomePage/Categories';
import Footer from './HomePage/Footer';
// ProductDetail
import ProductDetail from './ProductDetail/ProductDetail'; 
// ProductList
import ProductList from './ProductList/ProductList'; 
// Sign
import SignUp from './Sign/SignUp'; 
import SignIn from './Sign/SignIn'; 

function App() {
  return (
    /*wrap your application or specific parts of it to make the user's information
     (the state stored in UserProvider) accessible throughout your component tree*/
    <UserProvider>
      <ProductProvider>
    <Router>
      <Header />
      // The Switch component renders the first child Route or Redirect that matches the current URL
      <Switch>
        // Matches only when URL path is exactly "/"
        <Route path="/" exact>
          <Background/>
          <SearchBox/>
          <Reviews/>
          <Categories/>
        </Route>
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/productlist" component={ProductList} />
        <Route path="/product/:productId" component={ProductDetail} />
        <Route path="/about" component={AboutUs} />
      </Switch>
      <Footer/>
    </Router>
    </ProductProvider>
    </UserProvider>
  );
}

export default App;
