import React, { Component } from 'react'
import EventListItem from './EventListItem';


class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <div>
        <h1>Event List</h1>
        {
          events.map(e => (<EventListItem key={e.id} event={e}></EventListItem>))
        }
      </div>
    )
  }
}

export default EventList;