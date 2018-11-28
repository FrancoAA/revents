import React, { Component } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react';


export default class EventForm extends Component {

  state = {
    event : {
      title : '',
      date : '',
      city : '',
      venue : '',
      hostedBy : '',
      attendees : []
    }
  }

  onInputChange = (evt) => {
    const newEvent = this.state.event;
    newEvent[evt.target.name] = evt.target.value;
    this.setState({
      event : newEvent
    });
  }

  onFormSubmit = (evt) => {
    evt.preventDefault();
    this.props.createEvent(this.state.event);
  }

  render() {
    const { handleCancel } = this.props;

    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label>Event Title</label>
            <input name="title" onChange={this.onInputChange} value={this.state.event.title} placeholder="First Name" />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input name="date" type="date" onChange={this.onInputChange} value={this.state.event.date} placeholder="Event Date" />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input name="city" onChange={this.onInputChange} value={this.state.event.city} placeholder="City event is taking place" />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input name="venue" onChange={this.onInputChange} value={this.state.event.venue} placeholder="Enter the Venue of the event" />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input name="hostedBy" onChange={this.onInputChange} pvalue={this.state.event.hostedBy} laceholder="Enter the name of person hosting" />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button type="button" onClick={handleCancel}>Cancel</Button>
        </Form>
      </Segment>
    )
  }
}
