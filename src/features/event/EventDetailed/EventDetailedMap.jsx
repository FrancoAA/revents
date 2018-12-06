import React from 'react'
import GoogleMapReact from 'google-map-react';
import { Segment, Icon } from 'semantic-ui-react';

import {GOOGLE_MAPS_KEY} from '../../../app/common/API_KEYS';

const Marker = () => (<Icon name="marker" size="big" color="red"/>);

const EventDetailedMap = ({lat, lng}) => {
  const zoom = 14;
  const center = [lat, lng];
  return (
    <Segment attached="bottom" style={{padding: 0}}>
      <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_MAPS_KEY }}
          defaultCenter={center}
          defaultZoom={zoom}>
          <Marker
            lat={lat}
            lng={lng}
          />
        </GoogleMapReact>
      </div>
    </Segment>
  )
}

export default EventDetailedMap
