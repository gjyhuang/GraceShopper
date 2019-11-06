import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';

const Cart = () => (
  <div>
    <h1>Your cart is empty!</h1>
    <hr />
  </div>
);

export default Cart;
