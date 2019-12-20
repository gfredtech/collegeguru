import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  return (
    <Fragment>
      <h1>Landing</h1>
      <div className="buttons">
        {isAuthenticated ? (
          <Link to="/dashboard" className="btn">
            My Dashboard
          </Link>
        ) : (
          <Link to="/login" className="btn">
            Sign in
          </Link>
        )}
        <Link to="/register">Register</Link>
      </div>
    </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
