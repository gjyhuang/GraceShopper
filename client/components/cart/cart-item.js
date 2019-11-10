import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../../store';

const CartItem = props => {
  return (
    <tr className="cart-item">
      <td>{props.name}</td>
      <td>${props.price}</td>
      <td>
        <img src={props.imageUrl} height="60px" />
      </td>
      <td>Quantity: {props.quantity}</td>
      <td>
        <button
          type="submit"
          name="add"
          id={props.id}
          onClick={props.handleAdd}
        >
          +
        </button>
        <button
          type="submit"
          name="subtract"
          id={props.id}
          onClick={props.handleRemove}
        >
          -
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
