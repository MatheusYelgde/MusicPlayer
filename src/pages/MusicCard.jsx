import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

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

  render() {
    const { albumInfo } = this.props;
    const { isLoading, favoriteSongs } = this.state;
    return (
      <div>

        <div>
          <ul>{albumInfo.trackName}</ul>
          <audio
            data-testid="audio-component"
            src={ `${albumInfo.previewUrl}` }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
          {isLoading ? <Loading />
            : (
              <label htmlFor="favorite">
                Favorita
                <input
                  type="checkbox"
                  id="favorite"
                  onClick={ this.favoriteSong }
                  data-testid={ `checkbox-music-${albumInfo.trackId}` }
                  checked={ favoriteSongs
                    .some((music) => music.trackId === albumInfo.trackId) }
                />
              </label>)}
        </div>

      </div>
    );
  }
}

MusicCard.propTypes = {
  albumInfo: PropTypes.string.isRequired,
};

export default MusicCard;
