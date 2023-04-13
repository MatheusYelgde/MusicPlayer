import React, { Component } from 'react';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    isLoading: true,
  };

  userName = async () => {
    await getUser();
  };

  render() {
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          { this.userName() }
          {/* {isLoading? <Loading /> : } */}
        </p>
      </header>
    );
  }
}

export default Header;
