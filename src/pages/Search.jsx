import { toHaveDescription } from '@testing-library/jest-dom/dist/matchers';
import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import AlbunsCard from './AlbunsCard';

class Search extends Component {
  state = {
    validationValue: '',
    isSaveButtonDisabled: true,
    isLoading: false,
    albums: [],
    artist: '',
  };

  // validation = ({ target: { value } }) => {
  //   const length = 2;
  //   if (value.length >= length) {
  //     this.setState({
  //       validationValue: value,
  //       isSaveButtonDisabled: false,
  //     });
  //   } else {
  //     this.setState({
  //       isSaveButtonDisabled: true,
  //     });
  //   }
  // };

  handleChange = ( { target: { value }}) => {
    this.setState({
      validationValue: value,
    });
  };

  bringTheArtist = async () => {
    const { isLoading, validationValue } = this.state;
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
    const { isSaveButtonDisabled, albums, validationValue, isLoading, artist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="">
          <input
            onChange={ this.handleChange }
            data-testid="search-artist-input"
            value={ validationValue }
            type="text"
            placeholder="Nome Do Artista"
          />
        </label>
        {isLoading ? (<Loading />) : (
          <button
            disabled={ validationValue.length < 2 }
            type="button"
            data-testid="search-artist-button"
            onClick={ this.bringTheArtist }
          >
            Pesquisar
          </button>
        )}
        {albums.length > 0
          && <h1>Resultado de álbuns de: { artist }</h1>
        }
        {(albums.length === 0 && artist) && <p>Nenhum álbum foi encontrado</p>}
        {albums.map((album) => (
          <div key={ album.id }>
            {/* <p>{album.artistId}</p> */}
            <p>{album.artistName}</p>
            {/* <p>{album.collectionId}</p> */}
            {/* <p>{album.collectionName}</p> */}
            {/* <p>{album.collectionPrice}</p> */}
            {/* <p>{album.releaseDate}</p> */}
            {/* <p>{album.trackCount}</p> */}
            <img src={ album.artworkUrl100 } alt="" />
            <Link
              to={ `/album/${album.collectionId}` }
              data-testid={ `link-to-album-${album.collectionId}` }
            >
              { album.collectionName }
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default Search;
