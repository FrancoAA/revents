import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import { toastr } from "react-redux-toastr";
import { withFirestore } from "react-redux-firebase";
import { objectToArray } from "../../../app/common/util/helpers";
import EventDetailedChats from "./EventDetailedChats";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { auth } from "firebase";

const mapState = state => {
  let event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }

  return {
    event,
    auth: state.firebase.auth
  };
};

class EventDetailedPage extends Component {
  async componentDidMount() {
    const { firestore, match, history } = this.props;

    let event = await firestore.get(`events/${match.params.id}`);

    if (!event.exists) {
      history.push("/events");
      toastr.error("Sorry", "Event not found");
      return;
    }

    this.setState({
      event
    });
  }

  render() {
    const { event, auth } = this.props;
    const attendees = event && objectToArray(event.attendees);
    const isHost = event.hostUid === auth.uid;
    const isGoing = attendees && attendees.find(a => a.id === auth.uid);

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader
            event={event}
            isHost={isHost}
            isGoing={isGoing}
          />
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
