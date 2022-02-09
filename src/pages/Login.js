import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

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
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            name="userName"
            value={ userName }
            onChange={ this.handleInputChange }
            data-testid="login-name-input"
          />
          <button
            type="submit"
            name="LoginButton"
            data-testid="login-submit-button"
            disabled={ isButtonDisabled }
            onClick={ this.handleLoginButton }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
