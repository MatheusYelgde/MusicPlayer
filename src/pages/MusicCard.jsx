import React, { Component } from 'react';

class MusicCard extends Component {
  render() {
    const { albumInfo } = this.props;
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
        </div>

      </div>
    );
  }
}

export default MusicCard;
