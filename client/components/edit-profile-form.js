import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const EditProfile = props => {
  return (
    <div id="container">
      <div className="edit-profile" />\
      <form>
        <label htmlFor="firstname">First Name:</label>
        <input id="firstname" placeholder={props.firstName} />
        <label htmlFor="lastname">Last Name:</label>
        <input id="lastname" placeholder={props.lastName} />
        <label htmlFor="email">Email:</label>
        <input id="email" placeholder={props.email} />
        <label htmlFor="password">Password:</label>
        <input id="password" />
        <label htmlFor="verify-password">Verify Password:</label>
        <input id="verify-password" />
      </form>
      <button type="submit">Save</button>
    </div>
  );
};

const mapStateToProps = props => {
  return {
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email
  };
};

export default connect(mapStateToProps)(EditProfile);
