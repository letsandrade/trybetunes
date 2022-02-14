import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    artist: '',
    album: '',
    songs: [],
  }

  componentDidMount = () => this.getSongsFromAPI()

  getSongsFromAPI = async () => {
    const { match: { params: { id } } } = this.props;
    const foundSongs = await getMusics(id);
    console.log('response from api', foundSongs);
    this.setState({
      songs: foundSongs,
      artist: foundSongs[0].artistName,
      album: foundSongs[0].collectionName,
    });
  }

  render() {
    const { artist, album, songs } = this.state;
    console.log('songs in state array', songs);
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h3 data-testid="artist-name">{ artist }</h3>
          <h4 data-testid="album-name">{ album }</h4>
          <MusicCard songs={ songs } />
        </div>
      </div>
    );
  }
}

// ref match: https://v5.reactrouter.com/web/api/match
export default Album;
