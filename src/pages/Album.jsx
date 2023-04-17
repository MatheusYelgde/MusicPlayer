import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends Component {
  state = {
    albumInfos: [],
  };

  componentDidMount() {
    this.musicList();
  }

  musicList = async () => {
    const { match: { params: { id } } } = this.props;
    const albumInfos = await getMusics(id);
    this.setState({
      albumInfos,
    });
  };

  render() {
    const { albumInfos } = this.state;
    const firstAlbumInfo = albumInfos.length > 0 ? albumInfos[0] : {};
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{firstAlbumInfo.artistName}</h1>
        <h2 data-testid="album-name">{firstAlbumInfo.collectionName}</h2>
        <ul>
          {albumInfos.filter((albumInfo) => albumInfo.kind === 'song')
            .map((albumInfo, idx) => (
              <MusicCard albumInfo={ albumInfo } key={ idx } />
            ))}
        </ul>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
};

export default Album;
