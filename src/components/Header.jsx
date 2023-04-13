import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    isLoading: true,
    getName: '',
  };

  componentDidMount() {
    this.userName();
  }

  userName = async () => {
    const { name } = await getUser();
    this.setState({
      getName: name,
      isLoading: false,
    });
  };

  render() {
    const { isLoading, getName } = this.state;
    return (
      <header data-testid="header-component">
        { isLoading ? (<Loading />)
          : (
            <p data-testid="header-user-name">
              {getName}
            </p>)}
        <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
