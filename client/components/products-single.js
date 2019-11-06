import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';

const SingleProduct = () => (
  <div>
    <h1>Excalibur</h1>
    <h4>$100000</h4>
    Image goes here
  </div>
);

export default SingleProduct;
