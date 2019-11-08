import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../../store';

const SingleProduct = props => {
  console.log('singleproduct props >>>> ', props);
  const price = props.price.toString();
  return (
    <div>
      <h2>{props.name}</h2>
      <h4>
        ${price.slice(0, price.length - 2)}.{price.slice(price.length - 2)}
      </h4>
      <img src={props.imageUrl} height="50%" width="50%" />
      <form>
        <button type="submit" name={props.id} onClick={props.handleSubmit}>
          Add to cart
        </button>
      </form>
    </div>
  );
};

export default SingleProduct;
