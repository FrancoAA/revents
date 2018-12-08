import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import { incrementAsync, decrementAsync } from './testActions';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import Script from 'react-load-script';
import { GOOGLE_MAPS_KEY } from '../../app/common/API_KEYS';
import { openModal } from '../modals/modalActions';


const mapState = (state) => ({
  data: state.test.data,
  loading : state.test.loading
});

const actions = {
  incrementAsync,
  decrementAsync,
  openModal
};


class TestComponent extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  state = {
    address : '',
    scriptLoaded : false
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  onChange = (address) => this.setState({ address })

  handleScriptLoad = () => {
    this.setState({
      scriptLoaded : true
    });
  }

  render() {
    const { incrementAsync, decrementAsync, data, openModal, loading } = this.props;

    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }

    return (
      <div>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&libraries=places`}
          onLoad={this.handleScriptLoad}
        />
        <h1>Test Area</h1>
        <h3>The answer is: {data}</h3>
        <Button loading={loading} content="Increment" onClick={incrementAsync} color="green"/>
        <Button loading={loading}  content="Decrement" onClick={decrementAsync} color="red"/>
        <Button content="Open Modal" onClick={() => openModal('TestModal', {data: 43})} color="teal"/>
        <br/>
        <br/>
        <form onSubmit={this.handleFormSubmit}>
          {this.state.scriptLoaded && <PlacesAutocomplete inputProps={inputProps} />}
          <button type="submit">Test</button>
        </form>
      </div>

    )
  }
}

export default connect(mapState, actions)(TestComponent);