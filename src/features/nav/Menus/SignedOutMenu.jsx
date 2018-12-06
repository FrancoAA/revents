
import React from 'react'
import { Menu, Button } from 'semantic-ui-react';

const SignedOutMenu = ({ signIn, register }) => {
  return (
    <Menu.Item position="right">
      <Button basic inverted content="Login" onClick={signIn}></Button>
      <Button basic inverted content="Register" onClick={register} style={{marginLeft: '0.5em'}} ></Button>
    </Menu.Item>
  );
}

export default SignedOutMenu;
