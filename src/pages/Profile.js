import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    userName: '',
    userEmail: '',
    userDescription: '',
    userPic: '',
    loading: false,
  }

  componentDidMount = () => {
    this.setState({
      loading: true,
    });
    this.getUserInfo();
  }

  getUserInfo = async () => {
    const foundUser = await getUser();
    // console.log(foundUser);
    this.setState({
      userName: foundUser.name,
      userEmail: foundUser.email,
      userPic: foundUser.image,
      userDescription: foundUser.description,
      loading: false,
    });
  }

  render() {
    const { userName, userEmail, userDescription, userPic, loading } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : (
          <div>
            <p>Página de Perfil</p>
            <img
              src={ userPic }
              alt="foto do usuário"
              data-testid="profile-image"
            />
            <h3>{ userName }</h3>
            <h4>{userEmail}</h4>
            <p>{userDescription}</p>
            <Link to="/profile/edit">
              <button type="button">Editar perfil</button>
            </Link>
          </div>)}
      </div>
    );
  }
}
// inicialmente havia tentado usar o redirect dentro de uma função
// para que quando houvesse o click no botão ele redirecionasse, porém não estava conseguindo fazer funcionar
// relendo os materiais e pesquisando sobre o routerdom vi que poderia fazer com o <Link>
// não sei sé é boa pratica tacar o link assim no meio do código, mas é o que tem pra hj

export default Profile;
