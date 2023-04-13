import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    isSaveButtonDisabled: true,
    isLoading: false,
  };

  goToSearch = async () => {
    const { history, loginName } = this.props;
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
  };

  render() {
    const { isSaveButtonDisabled, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        <label htmlFor="name">
          <input
            data-testid="login-name-input"
            type="text"
            id="name"
            onChange={ this.validation }
          />
        </label>
        <button
          type="button"
          disabled={ isSaveButtonDisabled }
          onClick={ this.goToSearch }
        >
          {isLoading ? 'Carregando...' : 'Entrar'}
        </button>
      </div>
    );
  }
}

export default Login;
