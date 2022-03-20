import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import action from '../actions/index.js';

const INITIAL_STATE = {
  email: '',
  password: '',
};

function Login(props) {
  const [state, setState] = useState(INITIAL_STATE);
  const [status, setStatus] = useState(false);

  const validateEmail = ({ target: { value } }) => {
    const validFormat = RegExp(
      /[a-z0-9]+@[a-z0-9]+\.[a-z0-9]{2,3}(\.[a-z0-9]+)?$/,
    );

    if (validFormat.test(value)) {
      setState({
        ...state,
        email: value,
      });
    }
  };

  const validatePassword = ({ target: { value } }) => {
    const THREE = 3;
    if (value.length >= THREE) {
      setState({
        ...state,
        password: value,
      });
    }
  };

  const check = () => {
    const { email, password } = state;

    if (email && password) {
      setStatus(false);
    } else {
      setStatus(true);
    }

    return status;
  };

  const { email, password } = state;
  const { username } = props;

  return (
    <main>
      <h1>Login</h1>
      <input type='text' name='email' onChange={validateEmail} />
      <input type='password' name='password' onChange={validatePassword} />
      <Link to='/carteira' onClick={() => username({ email, password })}>
        <button type='button' disabled={check()}>
          {' '}
          Entrar
        </button>
      </Link>
    </main>
  );
}

const mapDispatchToProps = (dispatch) => ({
  username: (values) => dispatch(action(values)),
});

Login.propTypes = {
  username: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
