import React, { Component } from 'react';
import Header from '../components/Header';

class Login extends Component {
  state = {
    searchBox: '',
    isButtonDisabled: true,
  }

  handleInputChange = ({ target }) => {
    console.log(target);
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

  render() {
    const { searchBox, isButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
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
      </div>
    );
  }
}

export default Login;
