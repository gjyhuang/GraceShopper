import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../../store';
import CartItem from './cart-item';

const Cart = props => {
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
    </div>
  );
};

export default Cart;
