import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { toastr } from 'react-redux-toastr';
import { withFirestore } from 'react-redux-firebase';
import { objectToArray } from '../../../app/common/util/helpers';
import EventDetailedChats from './EventDetailedChats';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';

const mapState = state => {
  let event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }

  return {
    event
  };
};

class EventDetailedPage extends Component {
  async componentDidMount() {
    const { firestore, match, history } = this.props;

    let event = await firestore.get(`events/${match.params.id}`);
    if (!event) {
      history.push('/events');
      toastr.error('Sorry', 'Event not found');
    }
  }

  render() {
    const { event } = this.props;
    const attendees = event && objectToArray(event.attendees);

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader event={event} />
          <EventDetailedInfo event={event} />
          <EventDetailedChats event={event} />
        </Grid.Column>

        <Grid.Column width={6}>
          <EventDetailedSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(connect(mapState)(EventDetailedPage));
