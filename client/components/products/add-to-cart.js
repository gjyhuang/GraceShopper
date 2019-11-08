import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../../store';
import SingleProduct from './single-product';
import {getAllProductsThunk} from '../../store/products';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartQuantity: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  componentDidMount() {
    this.props.getAllProducts();
  }

  render() {
    console.log('props >>>', this.props);
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

const mapDispatch = dispatch => {
  return {
    getAllProducts: () => dispatch(getAllProductsThunk())
  };
};

export default connect(null, mapDispatch)(AddToCart);
