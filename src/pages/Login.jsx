import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import SignUp from '../css/SignUp.css';

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
      <div class="page" data-testid="page-login">
      {isLoading ? <Loading /> : (
        <div class="container">
          <h1 class="title">Bem-vindo!</h1>
          <form class="form" action="#">
            <div class="form-control">
              <label for="name" class="label" />
              <input type="text" id="name" placeholder="Digite seu nome" onChange={ this.validation } required />
            </div>
            <button type="submit" class="button" onClick={ this.goToSearch } disabled={isSaveButtonDisabled}>Entrar</button>
          </form>
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
