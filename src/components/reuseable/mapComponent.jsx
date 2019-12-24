import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Polygon from "./mapElements/Polygon";

class MapComponent extends Component {
  lastId = 0;
  render() {
    // console.log("x");
    return (
      <Map
        google={this.props.google}
        zoom={10}
        style={{ width: "30%", height: "300px" }}
        initialCenter={{ lat: 35.715298, lng: 51.404343 }}
        onClick={this.clickHandler}
      >
        {this.drawPolygon()}
        {this.props.points.map(x => (
          <Marker
            onClick={this.onMarkerClick}
            name={"Current location"}
            position={{ lat: x.lat, lng: x.lng }}
            id={x.pointId}
            key={x.pointId}
          />
        ))}
      </Map>
    );
  }
  clickHandler = (props, marker, e) => {
    // console.log("lng", e.latLng.lng());
    //   console.log("lat", e.latLng.lat());
    let newPoints = [...this.props.points];
    newPoints.push({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      pointId: this.lastId
    });
    this.lastId = this.lastId + 1;
    console.log("z", newPoints);
    this.props.clickHandler(this.props.itemId, newPoints);
  };
  onMarkerClick = evt => {
    const pos = evt.position;
    const index = this.props.points.findIndex(x => {
      return x.pointId === evt.id;
    });
    let newPoints = [...this.props.points];
    newPoints.splice(index, 1);
    this.props.clickHandler(this.props.itemId, newPoints);
  };
  drawPolygon = () => {
    if (this.props.points.length >= 3) {
      return (
        <Polygon
          paths={this.props.points}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="#0000FF"
          fillOpacity={0.35}
        />
      );
    }
  };
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyDjs0u02-62FMwrtxMxci5pc6PIubSyW28"
})(MapComponent);
