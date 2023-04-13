import React, { Component } from 'react';
import { getUser } from '../services/userAPI';

class Header extends Component {
  userName = async () => {
    await getUser();
  };

  render() {
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          { this.userName }
        </p>
      </header>
    );
  }
}

export default Header;
