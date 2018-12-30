import React, { Component } from "react";
import EventListItem from "./EventListItem";

class EventList extends Component {
  render() {
    const { events, deleteEvent } = this.props;
    return (
      <div>
        {events &&
          events.map(e => (
            <EventListItem key={e.id} event={e} deleteEvent={deleteEvent} />
          ))}
      </div>
    );
  }
}

export default EventList;
