import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../../store';

const EmptyCart = () => {
  return (
    <div id="cart-page">
      <h1>Your shopping cart is currently empty!</h1>
    </div>
  );
};

export default EmptyCart;
