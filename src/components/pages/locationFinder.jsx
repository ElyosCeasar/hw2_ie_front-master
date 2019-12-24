import React, { Component } from "react";

import Map2Component from "../reuseable/map2Component";
import { Input } from "antd";
class LocationFinder extends Component {
  state = { lat: "", lng: "" };
  render() {
    return (
      <div
        style={{
          textAlign: this.props.direc === "rtl" ? "right" : "left"
        }}
      >
        <h3 style={{ color: "white", marginRight: "20px", marginLeft: "20px" }}>
          {this.props.direc === "rtl" ? "پیدا کردن مکان" : "find location"}
        </h3>
        <div
          style={{
            backgroundColor: "white",
            margin: "20px",
            padding: 10
          }}
        >
          <div style={{ marginTop: "20px", display: "block" }}>
            <label htmlFor={"lat"}>lat :</label>
            <Input
              id={"lat"}
              style={{
                width: "80%",
                marginLeft: "10px",
                marginRight: "10px"
              }}
              value={this.state.lat}
            ></Input>
          </div>
          <div style={{ marginTop: "20px", display: "block" }}>
            <label htmlFor={"lng"}>lng :</label>
            <Input
              id={"lng"}
              style={{
                width: "80%",
                marginLeft: "10px",
                marginRight: "10px"
              }}
              value={this.state.lng}
            ></Input>
          </div>
          <div
            style={{
              marginTop: "20px",
              display: "block",
              height: "500px",
              marginBottom: "40px"
            }}
          >
            <Map2Component clickHandler={this.clickHandler}></Map2Component>
          </div>
        </div>
      </div>
    );
  }
  clickHandler = (lat, lng) => {
    this.setState({ lat: lat, lng: lng });
  };
}

export default LocationFinder;
