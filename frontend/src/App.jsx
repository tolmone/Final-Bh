import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import DonateScreen from './pages/DonateScreen';
import InvolvedScreen from './pages/InvolvedScreen';
import RegistrationScreen from './pages/RegistrationScreen';
import LoginScreen from './pages/LoginScreen';
import ProductListScreen from './pages/ProductListScreen';
import ProductScreen from './pages/ProductScreen';
import ProfileScreen from './pages/ProfileScreen';
import LayoutRoute from './components/LayoutRoute';
import GuestLayoutRoute from './components/GuestLayoutRoute';
import PrivateLayoutRoute from './components/PrivateLayoutRoute';
import DonateLayoutRoute from './components/DonateLayoutRoute';
import CartScreen from './pages/CartScreen';
import TestDonate from './pages/Stepper';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <LayoutRoute path="/" exact={true} component={HomeScreen} />
        <DonateLayoutRoute path="/donate" exact={true} component={DonateScreen} />
        <LayoutRoute path="/involved" exact={true} component={InvolvedScreen} />
        <LayoutRoute path="/products" exact={true} component={ProductListScreen} />
        <LayoutRoute path="/product" exact={true} component={ProductScreen} />
        <LayoutRoute path="/testdonate" exact={true} component={TestDonate} />
        <GuestLayoutRoute path="/register" exact={true} component={RegistrationScreen} />
        <GuestLayoutRoute path="/login" exact={true} component={LoginScreen} />
        <LayoutRoute path="/addtocart" exact={true} component={CartScreen} />
        <LayoutRoute path="/profile" exact={true} component={ProfileScreen} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
