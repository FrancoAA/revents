import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { deleteEvent, getEventsForDashboard } from '../eventActions';

import { Grid, Loader } from 'semantic-ui-react';
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
  state = {
    loadedEvents: [],
    loadingInitial: true,
    moreEvents: false
  };

  async componentDidMount() {
    let next = await this.props.getEventsForDashboard();
    console.log(next);

    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        loadingInitial: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.events !== nextProps.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...nextProps.events]
      });
    }
  }

  getNextEvents = async () => {
    const { events } = this.props;
    let lastEvent = events && events[events.length - 1];
    console.log(lastEvent);
    let next = await this.props.getEventsForDashboard(lastEvent);
    console.log(next);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      });
    }
  };

  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  };

  render() {
    const { loading } = this.props;
    const { moreEvents, loadedEvents, loadingInitial } = this.state;

    if (loadingInitial) return <LoadingComponent inverted={true} />;

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            loading={loading}
            moreEvents={moreEvents}
            getNextEvents={this.getNextEvents}
            deleteEvent={this.handleDeleteEvent}
            events={loadedEvents}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: 'events' }])(EventDashboard));
