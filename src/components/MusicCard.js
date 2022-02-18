import React, { Component } from 'react';
import propTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { songs, loading, favoriteSongs, handleFavorite } = this.props;
    return (
      <div className="music-card-container">
        { loading ? <p>Carregando...</p> : (
          songs.map((song) => {
            if (song.previewUrl) {
              return (
                // essa implementação audio foi dada pela trybe no requisito, troquei o src pela info que precisava
                <section key={ song.trackId }>
                  <p className="songTitle">{ song.trackName }</p>
                  <audio data-testid="audio-component" src={ song.previewUrl } controls>
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    {' '}
                    <code>audio</code>
                    .
                  </audio>
                  <label htmlFor={ song.trackId }>
                    Favorita
                    <input
                      type="checkbox"
                      data-testid={ `checkbox-music-${song.trackId}` }
                      checked={ favoriteSongs.some((el) => el.trackId === song.trackId) }
                      id={ song.trackId }
                      onChange={ (event) => handleFavorite(song, event) }
                    />
                  </label>
                </section>
              );
            }
            return null;
          }))}
      </div>
    );
  }
}
// inicialmente estava fazendo o map no comp. album, mas tava dando errado pq renderizava sempre um componente a mais. decidi fazer no card, porem tava dando erro, foi onde entendi que tava pegando um elemento sem a propriedade previewurl, peguei a ideia de fazer a condicional com retorno null no pr do rafael

MusicCard.propTypes = {
  songs: propTypes.arrayOf(propTypes.object).isRequired,
  loading: propTypes.bool.isRequired,
  favoriteSongs: propTypes.arrayOf(propTypes.object).isRequired,
  handleFavorite: propTypes.func.isRequired,
};
export default MusicCard;
