import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';
import {addToCart} from '../store/cart';
import {removeFromCart} from '../store/cart';
// add import statement for Grace's cart item component and empty cart component!
// import {CartItems} from './cart/cartItem';
// import {EmptyCart} from './cart/emptyCart';

// if cart empty - load the <cart is empty> component
export const Cart = () =>
  state.itemsInCart ? (
    <CartItems
      cartItems={state.itemsInCart}
      handleAdd={state.addItem}
      handleRemove={state.removeItem}
    />
  ) : (
    <EmptyCart />
  );

{
  /* <div className="shopping-cart">
    <h1>Your shopping cart</h1>
  </div> */
}

// get the list of items in the cart from the store
const mapStateToProps = function(state) {
  return {
    itemsInCart: state.cart.products
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    // get the add item function from store
    addItem: dispatch(addToCart(product)),
    // get the remove item function
    removeItem: dispatch(removeFromCart(product))
  };
};

const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart);

export default ConnectedCart;
