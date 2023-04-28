import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import Loading from './Loading';
import '../css/Favorites.css';

class Favorites extends Component {
  state = {
    favorites: [],
    isLoading: false,
  };

  componentDidMount() {
    this.setState({
      favorites: JSON.parse(localStorage.getItem('favorite_songs')),
    });
  }

  removeIt = (trackId) => {
    const favorites = JSON.parse(localStorage.getItem('favorite_songs'));
    const index = favorites.findIndex((music) => music.trackId === trackId);
    this.setState({
      isLoading: true,
    });
    if (index !== -1) {
      favorites.splice(index, 1);
      localStorage.setItem('favorite_songs', JSON.stringify(favorites));

      this.setState({
        favorites,
      });
    }
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { favorites, isLoading } = this.state;
    return (
      <div data-testid="page-favorites" className="favorites-container">
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <Header />
            <h1 className="favorites-heading">Músicas Favoritas</h1>
            {favorites.map(({ trackName, trackId, artworkUrl100, previewUrl }) => (
              <div key={ trackId } className="favorite-item">
                <img className="favorite-item-image" src={ artworkUrl100 } alt={ trackName } />
                <div className="favorite-item-details">
                  <h2 className="favorite-item-title">{ trackName }</h2>
                  <audio
                    data-testid="audio-component"
                    src={ previewUrl }
                    controls
                    className="favorite-item-audio"
                  >
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    {' '}
                    <code>audio</code>
                    .
                  </audio>
                  <span onClick={ () => this.removeIt(trackId) } className="favorite-item-remove">
                    <FontAwesomeIcon icon={ faHeart } className="favorite-item-remove-icon" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
export default Favorites;
