import React, { Component } from 'react'
import { Container, Menu, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';

class NavBar extends Component {
  state = {
    authenticated : false
  };

  handleSignIn = () => {
    this.setState({
      authenticated : true
    });
  }

  handleSignOut = () => {
    this.setState({
      authenticated : false
    });
    this.props.history.push('/');
  }

  render() {
    const { authenticated } = this.state;
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item header as={NavLink} to="/">
            <img src="/assets/logo.png" alt="logo" />
            Revents
          </Menu.Item>
          {authenticated  &&  <Menu.Item as={NavLink} to="/events" name="Events"></Menu.Item>}
          {authenticated  &&  <Menu.Item as={NavLink} to="/test" name="Test"></Menu.Item>}
          {authenticated  && <Menu.Item as={NavLink} to="/people" name="People"></Menu.Item>}
          <Menu.Item>
            <Button as={Link} to="/createEvent" floated="right" positive inverted content="Create Event"></Button>
          </Menu.Item>
          {authenticated ? <SignedInMenu signOut={this.handleSignOut}/> : <SignedOutMenu signIn={this.handleSignIn}/>}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(NavBar);