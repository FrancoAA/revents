import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import { connect } from "react-redux";

import { closeModal } from "./modalActions";
import RegisterForm from "../auth/Register/RegisterForm";

const actions = { closeModal };

const inlineStyle = {
  modal: {
    marginTop: "0px !important",
    marginLeft: "auto",
    marginRight: "auto"
  }
};

class RegisterModal extends Component {
  render() {
    return (
      <Modal
        size="mini"
        open={true}
        style={inlineStyle.modal}
        onClose={this.props.closeModal}
      >
        <Modal.Header>Sign Up to Re-vents!</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <RegisterForm />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default connect(
  null,
  actions
)(RegisterModal);
