import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';

class Login extends Component {
  state = {
    searchBox: '',
    isButtonDisabled: true,
    isLoading: false,
    currSearch: [],
    searchedArtist: '',
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateSearch);
  }

  validateSearch = () => {
    const { searchBox } = this.state;
    const minSize = 2;
    if (searchBox.length >= minSize) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  }

  handleButtonClick = async (event) => {
    event.preventDefault();
    const { searchBox } = this.state;
    this.setState({ searchBox: '', isLoading: true });
    const searchResult = await searchAlbumsAPIs(searchBox);

    this.setState({
      isLoading: false,
      currSearch: searchResult,
      searchedArtist: searchBox,
    });
    console.log(searchResult);
  }

  prepareResultsForStage = () => {
    const { currSearch, searchedArtist } = this.state;
    const msgSuccess = `Resultado de álbuns de: ${searchedArtist}`;
    return (
      <div className="albumlist-container">
        <h3>{msgSuccess}</h3>
        <section className="albumlist">
          {currSearch
            .map(({ artistName, artworkUrl100, collectionName, collectionId }) => (
              <Link
                data-testid={ `link-to-album-${collectionId}` }
                to={ `/album/${collectionId}` }
                key={ collectionId }
              >
                <div>
                  <img src={ artworkUrl100 } alt={ collectionName } />
                  <h3>{ artistName }</h3>
                  <h4>{ collectionName }</h4>
                </div>
              </Link>
            ))}
        </section>
      </div>
    );
  }

  render() {
    const {
      searchBox,
      isButtonDisabled,
      isLoading,
      currSearch,
      // searchedArtist,
    } = this.state;
    if (isLoading === true) return <Loading />;

    return (
      <div className="searchpage-container" data-testid="page-search">
        <Header />
        <p>search page</p>
        <form>
          <input
            type="text"
            name="searchBox"
            value={ searchBox }
            data-testid="search-artist-input"
            onChange={ this.handleInputChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
            onClick={ this.handleButtonClick }
          >
            Pesquisar
          </button>
        </form>
        <div className="showing-area">
          {currSearch.length > 0
            ? this.prepareResultsForStage()
            : 'Nenhum álbum foi encontrado'}
        </div>
      </div>
    );
  }
}

export default Login;
