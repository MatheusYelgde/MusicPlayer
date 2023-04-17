import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  state = {
    isSaveButtonDisabled: true,
    isLoading: false,
    loginName: '',
  };

  goToSearch = async () => {
    const { history } = this.props;
    const { loginName } = this.state;
    this.setState({
      isLoading: true,
    });
    await createUser({ name: loginName });
    this.setState({
      isLoading: false,
    });
    history.push('/search');
  };

  validation = ({ target: { value } }) => {
    const length = 3;
    if (value.length >= length) {
      this.setState({
        isSaveButtonDisabled: false,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
    this.setState({
      loginName: value,
    });
  };

  render() {
    const { isSaveButtonDisabled, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        {isLoading ? <Loading /> : (
          <div>
            <label htmlFor="name">
              <input
                data-testid="login-name-input"
                type="text"
                id="name"
                onChange={ this.validation }
              />
            </label>
            <button
              data-testid="login-submit-button"
              type="button"
              disabled={ isSaveButtonDisabled }
              onClick={ this.goToSearch }
            >
              Entrar
            </button>
          </div>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Login;
