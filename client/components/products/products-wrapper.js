import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../../store';
import SingleProduct from './single-product';
import {
  getAllProductsThunk,
  addToCartThunkProducts
} from '../../store/products';

class ProductsWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const productId = Number(event.target.name);
    const productToAdd = this.props.products.find(
      item => item.id === productId
    );
    productToAdd.quantity = 1;
    this.props.addToCart(productToAdd);
  }

  componentDidMount() {
    this.props.getAllProducts();
  }

  render() {
    const products = this.props.products;
    return (
      <div className="products-list-all">
        <h1>Swords</h1>
        <hr />
        <div className="product-div-wrapper">
          {products.map((product, index) => (
            <div id="product-div" key={`${index}`}>
              <SingleProduct
                key={product.id}
                {...product}
                handleSubmit={this.handleSubmit}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    getAllProducts: () => dispatch(getAllProductsThunk()),
    addToCart: product => dispatch(addToCartThunkProducts(product))
  };
};

export default connect(null, mapDispatch)(ProductsWrapper);
