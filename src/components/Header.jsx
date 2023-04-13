import React, { Component } from 'react';
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
      </header>
    );
  }
}

export default Header;
