import React, { Component } from 'react';
import Header from '../components/Header';
// import getMusics from '../services/musicsAPI';

class Album extends Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <p>album page</p>
        <h3 data-testid="artist-name">artista</h3>
        <h4 data-testid="album-name">album</h4>
      </div>
    );
  }
}

export default Album;
