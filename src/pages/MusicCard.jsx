import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import '../css/AlbumDetails.css';

class MusicCard extends Component {
  state = {
    isLoading: false,
    favoriteSongs: [],
  };

  async componentDidMount() {
    await this.saveIt();
  }

  saveIt = async () => {
    const addFavorite = await getFavoriteSongs();
    this.setState({
      favoriteSongs: addFavorite,
    });
  };

  favoriteSong = async () => {
    const { albumInfo } = this.props;
    this.setState({
      isLoading: true,
    });
    await addSong(albumInfo);
    await this.saveIt();
    this.setState({
      isLoading: false,
    });
  };

  removeIt = async () => {
    const { albumInfo } = this.props;
    const { favoriteSongs } = this.state;
    const index = favoriteSongs.findIndex((music) => music.trackId === albumInfo.trackId);

    if (index !== -1) {
      favoriteSongs.splice(index, 1);
      localStorage.setItem('favorite_songs', JSON.stringify(favoriteSongs));

      this.setState({
        favoriteSongs,
      });
    }
  };

  render() {
    const { albumInfo } = this.props;
    const { isLoading, favoriteSongs } = this.state;

    const isFavorite = favoriteSongs.some((music) => music.trackId === albumInfo.trackId);

    return (
      <div className="album-details">
        <div className="album-info">
          <div className="music-list-container">
            <div className="music-list-border">
              <img className="" src={ albumInfo.artworkUrl100 } />
              <ul className="track-list">
                <li className="track-list-item">
                  <div className="audio-and-title">
                    <audio
                      data-testid="audio-component"
                      src={ albumInfo.previewUrl }
                      controls
                    >
                      <track kind="captions" />
                      O seu navegador não suporta o elemento
                      {' '}
                      <code>audio</code>
                      .
                    </audio>
                    <div className="title">{albumInfo.trackName}</div>
                  </div>
                </li>
                ...
              </ul>
            </div>
          </div>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="favorite-container">
            <label className="favorite-label" htmlFor="favorite">
              <span
                className="heart-icon"
                onClick={ isFavorite ? this.removeIt : this.favoriteSong }
                data-testid={ `checkbox-music-${albumInfo.trackId}` }
              >
                <FontAwesomeIcon icon={ faHeart } color={ isFavorite ? 'red' : 'grey' } />
              </span>
            </label>
          </div>
        )}
      </div>

    );
  }
}

MusicCard.propTypes = {
  albumInfo: PropTypes.string.isRequired,
};

export default MusicCard;
