import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    number: '',
    dob: '',
    address: '',
    password: '',
    password2: '',
  });

  const {
    firstname,
    lastname,
    email,
    number,
    dob,
    address,
    password,
    password2,
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do no match', 'danger', 3000);
    } else {
      register({ firstname, lastname, email, number, dob, address, password });
      console.log('Sucess');
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <form onSubmit={e => onSubmit(e)}>
        <input
          type="text"
          placeholder="First Name"
          name="firstname"
          value={firstname}
          onChange={e => onChange(e)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastname"
          value={lastname}
          onChange={e => onChange(e)}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={e => onChange(e)}
          required
        />

        <input
          type="text"
          placeholder="Phone Number"
          name="number"
          value={number}
          onChange={e => onChange(e)}
          required
        />
        <input
          type="text"
          placeholder="Date of Birth"
          name="dob"
          value={dob}
          onChange={e => onChange(e)}
          required
        />

        <input
          type="text"
          placeholder="Address"
          name="address"
          value={address}
          onChange={e => onChange(e)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={e => onChange(e)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          name="password2"
          value={password2}
          onChange={e => onChange(e)}
          required
        />
        <input type="submit" value="Register" />
      </form>
      <p>
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
