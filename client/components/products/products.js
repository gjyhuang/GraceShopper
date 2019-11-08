import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../../store';
import SingleProduct from './single-product';
import {getAllProductsThunk} from '../../store/products';

class Products extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllProducts();
  }

  render() {
    const products = this.props.products;
    return (
      <div className="products-list-all">
        <h1>Product list</h1>
        <hr />
        {products.map(product => (
          <SingleProduct key={product.id} {...product} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

const mapDispatch = dispatch => {
  return {
    getAllProducts: () => dispatch(getAllProductsThunk())
  };
};

export default connect(mapStateToProps, mapDispatch)(Products);
