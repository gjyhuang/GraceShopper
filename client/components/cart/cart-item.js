import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../../store';

const CartItem = props => (
  <table className="shopping-cart">
    <h1>Your shopping cart</h1>
    <tr className="cart-item" />
  </table>
);

export default CartItem;
