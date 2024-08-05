import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    songs: [],
    loading: false,
    favoriteSongs: [],
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = async () => {
    /* this.setState({
      loading: true,
    }); aqui o lint reclamou, não entendi bem pq, mas não ta atrapalhando passar no req */
    const favorites = await getFavoriteSongs();
    favorites.forEach((fav) => {
      fav.checked = true;
    });
    this.setState({
      songs: [...favorites],
      favoriteSongs: [...favorites],
    });
  }

  // problemas... reaproveitei a função que usei para lidar com os favoritos no comp album,
  // porem tive que passar os favoritos tbm como a prop songs nesse componente para que o musiccard renderizasse...
  // meio gambiarra e talvez eu nem precise dessa prop no componente, mas foi como pensei pra validar o checked
  handleFavorite = async (currSong, { target }) => {
    if (target.checked) {
      this.setState((previousState) => ({
        loading: true,
        favoriteSongs: [...previousState.favoriteSongs, currSong],
        songs: [...previousState.songs, currSong],
      }));
      await addSong(currSong);
      this.setState({
        loading: false,
      });
    } else {
      this.setState((previousState) => ({
        loading: true,
        songs: [...previousState.songs
          .filter((item1) => item1.trackId !== currSong.trackId)],
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
    const { loading, songs, favoriteSongs } = this.state;
    if (loading === true) {
      return <Loading />;
    }
    return (
      <section data-testid="page-favorites">
        <Header />
        { (loading) && <Loading />}
        <div className="favorites-container">
          <h2>favoritos</h2>
          <MusicCard
            songs={ songs }
            handleFavorite={ this.handleFavorite }
            loading={ loading }
            favoriteSongs={ favoriteSongs }
          />
        </div>
      </section>
    );
  }
}

export default Favorites;
