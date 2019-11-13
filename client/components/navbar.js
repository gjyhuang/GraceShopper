import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';

const Navbar = ({handleClick, isLoggedIn, cartSize}) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div id="nav-bar">
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/products">See all our products</Link>
          <Link to="/cart">Cart {`(${cartSize})`}</Link>
          <Link to="/profile">My Account</Link>
        </div>
      ) : (
        <div id="nav-bar">
          <div id="nav-left">
            <Link to="/">THE ARMORY</Link>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
          </div>
          <div id="nav-right">
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/cart">Cart {`(${cartSize})`}</Link>
          </div>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => ({
  isLoggedIn: !!state.user.id,
  // cartSize: state.cart.products.length
  cartSize: state.cart.products.reduce((acc, currItem) => {
    return currItem.quantity + acc;
  }, 0)
});

const mapDispatch = dispatch => ({
  handleClick() {
    dispatch(logout());
  }
});

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
