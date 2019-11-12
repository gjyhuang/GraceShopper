import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../../store';
import CartItem from './cart-item';

const Cart = props => {
  console.log('props in cart component', props);
  const price = props.total.toString();
  return (
    <div id="cart-page">
      <h1>Your shopping cart</h1>
      <table id="cart">
        <tbody>
          {props.cartItems.map(item => (
            <CartItem
              key={item.id}
              {...item}
              handleAdd={props.handleAdd}
              handleRemove={props.handleRemove}
            />
          ))}
        </tbody>
      </table>
      <div id="cart-total">
        Total: ${price.slice(0, price.length - 2)}.
        {price.slice(price.length - 2)}
      </div>
      <div id="cart-checkout">
        <button type="submit" name="checkout" onClick={props.handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
