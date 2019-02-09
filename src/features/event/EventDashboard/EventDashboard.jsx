import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { deleteEvent, getEventsForDashboard } from '../eventActions';

import { Grid } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventActivity from '../EventActivity/EventActivity';
import LoadingComponent from '../../../app/layouts/LoadingComponent';

const mapState = state => ({
  events: state.events,
  loading: state.async.loading
});

const actions = {
  deleteEvent,
  getEventsForDashboard
};

class EventDashboard extends Component {
  componentDidMount() {
    this.props.getEventsForDashboard();
  }

  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  };

  render() {
    const { events, loading } = this.props;
    if (loading) return <LoadingComponent inverted={true} />;

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList deleteEvent={this.handleDeleteEvent} events={events} />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: 'events' }])(EventDashboard));
