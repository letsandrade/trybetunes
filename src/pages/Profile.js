import React, { Component } from 'react';
import Header from '../components/Header';

class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <p>profile page</p>
      </div>
    );
  }
}

export default Profile;
