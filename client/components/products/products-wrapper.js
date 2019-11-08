import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../../store';
import SingleProduct from './single-product';
import {getAllProductsThunk} from '../../store/products';

class ProductsWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    console.log(event);
    event.preventDefault();
    console.log('pressing button!', event.target.name);
    // this.state.cart.products.push();
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
          <SingleProduct
            key={product.id}
            {...product}
            handleSubmit={this.handleSubmit}
          />
        ))}
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    getAllProducts: () => dispatch(getAllProductsThunk())
  };
};

export default connect(null, mapDispatch)(ProductsWrapper);
