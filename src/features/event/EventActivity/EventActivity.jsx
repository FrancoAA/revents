import React from 'react'
import { Header, Segment } from 'semantic-ui-react';


const EventActivity = () => {
  return (
    <div>
      <Header attached="top" content="Recent Activity"/>
      <Segment attached>
        <p>Recenty Activity</p>
      </Segment>
    </div>
  );
}

export default EventActivity;
