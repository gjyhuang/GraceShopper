import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';
import SingleProduct from './products-single';
import getAllProductsThunk from '../store/products';

class Products extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.getAllProducts();
  }

  render() {
    console.log('props >>>', this.props);
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

const mapStateToProps = state => {
  console.log(state);
  return {
    products: state.allProducts
  };
};

const mapDispatch = dispatch => {
  return {
    getAllProducts: () => dispatch(getAllProductsThunk())
  };
};

export default connect(mapStateToProps, mapDispatch)(Products);
