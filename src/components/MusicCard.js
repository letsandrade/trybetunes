import React, { Component } from 'react';

class MusicCard extends Component {
  render() {
    const { songs } = this.props;
    return (
      <div className="music-card-container">
        {songs.map((song, index) => {
          if (song.previewUrl) {
            return (
              <section key={ index }>
                <p className="songTitle">{ song.trackName }</p>
                <audio data-testid="audio-component" src={ song.previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>

              </section>
            );
          }
          return null;
        })}
      </div>
    );
  }
}
// inicialmente estava fazendo o map no comp. album, mas tava dando errado pq renderizava sempre um componente a mais. decidi fazer no card, porem tava dando erro, foi onde entendi que tava pegando um elemento sem a propriedade previewurl, peguei a ideia de fazer a condicional com retorno null no pr do rafael

export default MusicCard;
