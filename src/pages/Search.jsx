import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    isSaveButtonDisabled: true,
  };

  validation = ({ target: { value } }) => {
    const length = 2;
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
    const { isSaveButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="">
          <input
            onChange={ this.validation }
            data-testid="search-artist-input"
            type="text"
            placeholder="Nome Do Artista"
          />
        </label>
        <button
          disabled={ isSaveButtonDisabled }
          type="button"
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
