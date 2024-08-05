import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

import logo from '../assets/logo.jpg';

class Login extends Component {
  state = {
    userName: '',
    isLoading: false,
    isButtonDisabled: true,
    toRedirect: false,
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateName);
  }

  validateName = () => {
    const { userName } = this.state;
    const minSize = 3;
    if (userName.length >= minSize) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  }

  handleLoginButton = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { userName } = this.state;
    const result = await createUser({ name: userName });
    if (result === 'OK') {
      this.setState({
        isLoading: false,
        toRedirect: true,
      });
    }
  }

  render() {
    const { userName, isButtonDisabled, isLoading, toRedirect } = this.state;
    if (isLoading === true) return <Loading />;
    if (toRedirect === true) return <Redirect to="/search" />;
    return (
      <div className="login-container" data-testid="page-login">
        <div className="black-glass login-content">
          <img src={ logo } alt="logo" className="logo" />
          <form className="form-container">
            <label className="input-label" htmlFor="userName">
              Nome
              <input
                id="userName"
                type="text"
                name="userName"
                className="name-input"
                value={ userName }
                onChange={ this.handleInputChange }
                data-testid="login-name-input"
              />
            </label>
            <button
              type="submit"
              name="LoginButton"
              className="submit-button"
              data-testid="login-submit-button"
              disabled={ isButtonDisabled }
              onClick={ this.handleLoginButton }
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
