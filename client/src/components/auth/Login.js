import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login({ email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="login-page hold-transition">
        <div className="login-box">
          <div className="login-logo">
            <Link to="/">
              <b>College</b>Guru
            </Link>
          </div>
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Sign in to start your session</p>

              <form onSubmit={e => onSubmit(e)}>
                <div className="input-group mb-3">
                  <input
                    name="email"
                    placeholder="Email Address"
                    className="form-control"
                    onChange={e => onChange(e)}
                    type="email"
                    value={email}
                    required
                  />

                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    name="password"
                    placeholder="Password"
                    onChange={e => onChange(e)}
                    className="form-control"
                    type="password"
                    value={password}
                  />

                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <div className="icheck-primary">
                      <input type="checkbox" id="remember" />
                      <label for="remember">Remember Me</label>
                    </div>
                  </div>
                  <div className="col-4">
                    <input
                      type="submit"
                      className="btn btn-primary btn-block"
                      value="Login"
                    />
                  </div>
                </div>
              </form>

              <p className="mb-0">
                Don't have an account?{' '}
                <Link to="/register" className="text-center">
                  Sign Up.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );

  /** <Fragment>
        <input
          name="email"
          placeholder="Email Address"
          onChange={e => onChange(e)}
          type="email"
          value={email}
          required
        />
        <input
          name="password"
          placeholder="Password"
          onChange={e => onChange(e)}
          type="password"
          value={password}
        />
      </form>
    </Fragment>
        **/
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
