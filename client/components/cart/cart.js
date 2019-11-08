import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../../store';

const Cart = props => {
  console.log('props >>>>>> ', props);
  return (
    <div id="cart-page">
      <h1>Your shopping cart</h1>
      <table id="cart">
        <tr className="cart-item" />
      </table>
    </div>
  );
};

export default Cart;
