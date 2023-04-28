import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import '../css/Home.css';

class Search extends Component {
  state = {
    validationValue: '',
    isLoading: false,
    albums: [],
    artist: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({
      validationValue: value,
    });
  };

  bringTheArtist = async () => {
    const { validationValue } = this.state;
    this.setState({
      isLoading: true,
      artist: validationValue,
    });

    const albumsReturn = await searchAlbumsAPI(validationValue);
    this.setState({
      isLoading: false,
      albums: albumsReturn,
      validationValue: '',
    });
  };

  render() {
    const {
      albums,
      validationValue,
      isLoading,
      artist } = this.state;
    return (
      <div className="page-search">
        <div className="header">
          <Header />
        </div>
        <div className="search-container">
          <label htmlFor="search-artist-input">
            <input
              onChange={ this.handleChange }
              data-testid="search-artist-input"
              value={ validationValue }
              type="text"
              placeholder="Nome Do Artista"
            />
            <button
              className="search-button"
              disabled={ validationValue.length < 2 }
              type="button"
              data-testid="search-artist-button"
              onClick={ this.bringTheArtist }
            >
              Pesquisar
            </button>
          </label>
        </div>
        {isLoading ? <Loading /> : null}
        {albums.length > 0 ? (
          <div className="album-list">
            {albums.map((album) => (
              <div className="album-item" key={ album.id }>
                <div className="album-image">
                  <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                </div>
                <div className="album-details">
                  <div className="album-title">{album.collectionName}</div>
                  <div className="album-artist">{album.artistName}</div>
                  <Link
                    className="album-link"
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    Ver Álbum
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {albums.length === 0 && artist && (
          <p>Nenhum álbum foi encontrado</p>
        )}
      </div>

    );
  }
}

export default Search;
