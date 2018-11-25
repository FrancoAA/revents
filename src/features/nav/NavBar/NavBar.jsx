import React, { Component } from 'react'
import { Container, Menu, Button } from 'semantic-ui-react';


export default class NavBar extends Component {
  render() {
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item header>
            <img src="assets/logo.png" alt="logo" />
            Revents
          </Menu.Item>
          <Menu.Item name="Events"></Menu.Item>
          <Menu.Item>
            <Button floated="right" positive inverted content="Create Event"></Button>
          </Menu.Item>
          <Menu.Item position="right">
            <Button basic inverted content="Login"></Button>
            <Button basic inverted content="Sign Out" style={{marginLeft: '0.5em'}}></Button>
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}
