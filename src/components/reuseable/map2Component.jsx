import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

class Map2Component extends Component {
  render() {
    console.log("sfx");
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={{ width: "60%", height: "500px" }}
        initialCenter={{ lat: 35.715298, lng: 51.404343 }}
        onClick={this.clickHandler}
      ></Map>
    );
  }
  clickHandler = (props, marker, e) => {
    this.props.clickHandler(e.latLng.lat(), e.latLng.lng());
  };
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyDjs0u02-62FMwrtxMxci5pc6PIubSyW28"
})(Map2Component);
