import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';
import SingleProduct from './products-single';

class Products extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    // const products = this.props.products;
    return (
      <div className="products-list-all">
        <h1>Product list</h1>
        <hr />
        <SingleProduct />
      </div>
    );
  }
}

export default Products;
