import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    userName: '',
    isLoading: false,
  }

  componentDidMount() {
    this.getUserName();
  }

  // n coloquei direto no didMount pra ficar + organizado caso precise chamar outra função lá depois
  getUserName = async () => {
    this.setState({ isLoading: true });
    const readyUser = await getUser();
    console.log('retorno do get user', readyUser);
    this.setState({
      isLoading: false,
      userName: readyUser.name,
    });
  }

  render() {
    const { userName, isLoading } = this.state;
    if (isLoading === true) return <Loading />;

    return (
      <header data-testid="header-component">
        <h3>header</h3>
        <h4 data-testid="header-user-name">{ userName }</h4>
      </header>
    );
  }
}

export default Header;
