import propTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    artist: '',
    album: '',
    songs: [],
    loading: false,
    favoriteSongs: [],
  }

  componentDidMount = () => this.getSongsFromAPI()

  getSongsFromAPI = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({
      loading: true,
    });
    const foundSongs = await getMusics(id);
    const favSongs = await getFavoriteSongs();
    this.setState({
      songs: foundSongs,
      artist: foundSongs[0].artistName,
      album: foundSongs[0].collectionName,
      loading: false,
      favoriteSongs: favSongs,
    });
  }

  handleFavorite = async (currSong, { target }) => {
    if (target.checked) {
      this.setState((previousState) => ({
        loading: true,
        favoriteSongs: [...previousState.favoriteSongs, currSong],
      }));
      await addSong(currSong);
      this.setState({
        loading: false,
      });
    } else {
      this.setState((previousState) => ({
        loading: true,
        favoriteSongs: [...previousState.favoriteSongs
          .filter((item) => item.trackId !== currSong.trackId)],
      }));
      await removeSong(currSong);
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const { artist, album, songs, loading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading
          ? (<Loading />)
          : (
            <div className="album-container">
              <h3 data-testid="artist-name">{ artist }</h3>
              <h4 data-testid="album-name">{ album }</h4>
              <MusicCard
                songs={ songs }
                loading={ loading }
                handleFavorite={ this.handleFavorite }
                favoriteSongs={ favoriteSongs }
              />
            </div>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }).isRequired,
};

// ref match: https://v5.reactrouter.com/web/api/match
export default Album;
