import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

const gmapKEY = 'AIzaSyCSQRAcnyMZxB8Z96-xwIekHrgMviwRv1w'
 
export class MapContainer extends Component {

  formatCoord = (coord) => {

      coord = coord.replace(/[o]/g, '').split(", ")

      const second = coord.map(e => e.split(":")[1]); 
      return {
        lat: second[0],
        lng: second[1]
      }
  }

  render() {
    return (
      <div style={{height: 856}}>
      <Map google={this.props.google} 
           zoom={6} 
           center={this.props.center}
           initialCenter={this.props.center}>

        {this.props.parks.data.map(park => (
          <Marker
            key={ park.id }
            title={ park.fullName }
            position={ this.formatCoord(park.latLong) } />
        ))}
      </Map>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: gmapKEY
})(MapContainer)