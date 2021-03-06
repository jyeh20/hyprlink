import React from "react";
import { Redirect } from "react-router-dom";

import "../CSS/createEvents.css";

import firebase from "../firebase/firebase";

let db = firebase.firestore();
let newDocRef;
let director;

class createEvents extends React.Component {
  state = {
    redirect: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      location: "",
      startTime: "00:00",
      endTime: "00:00",
      date: new Date(1, 1, 0),
      description: "",
      rows: 1,
      minRows: 1,
      maxRows: 2,
      rows_1: 5,
      minRows_1: 5,
      maxRows_1: 10,
    };
  }

  handleNameChange = (e) => {
    const textareaLineHeight = 30;
    const { minRows, maxRows } = this.state;

    const previousRows = e.target.rows;
    e.target.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(e.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      e.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      e.target.rows = maxRows;
      e.target.scrollTop = e.target.scrollHeight;
    }

    this.setState({
      name: e.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows,
    });
  };

  handleLocationChange = (e) => {
    this.setState({ location: e.target.value });
  };
  handleStartTimeChange = (e) => {
    this.setState({ startTime: e.target.value });
  };
  handleEndTimeChange = (e) => {
    this.setState({ endTime: e.target.value });
  };
  handleDateChange = (e) => {
    this.setState({ date: e.target.value });
    console.log(e.target.value);
  };

  handleDescriptionChange = (e) => {
    const textareaLineHeight = 14;
    const { minRows_1, maxRows_1 } = this.state;

    const previousRows_1 = e.target.rows_1;
    e.target.rows_1 = minRows_1; // reset number of rows in textarea

    const currentRows_1 = ~~(e.target.scrollHeight / textareaLineHeight);

    if (currentRows_1 === previousRows_1) {
      e.target.rows_1 = currentRows_1;
    }

    if (currentRows_1 >= maxRows_1) {
      e.target.rows_1 = maxRows_1;
      e.target.scrollTop = e.target.scrollHeight;
    }

    this.setState({
      description: e.target.value,
      rows_1: currentRows_1 < maxRows_1 ? currentRows_1 : maxRows_1,
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={director} />;
    }
  };

  submitForm = () => {
    db.collection("events").doc();
    newDocRef = db.collection("events").doc();
    newDocRef.set(this.state);
    const newLink = newDocRef.id;
    console.log(newLink);
    director = `/event/${newLink}`;
    //DONT CHANGE, WORKS FOR LOCAL AND GITHUB
    console.log(director);
    console.log(director);

    //update current event with director and docID
    newDocRef
      .update({
        newLink: newLink,
        director: director,
        date: this.state.date+"T00:00:00"
      })
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
    this.setState({
      redirect: true,
    });
  };

  render() {
    const contentStyle = {
      paddingTop: 40 + 20,
      paddingRight: 20,
      paddingLeft: 20,
    };

    return (
      <div style={contentStyle}>
        <form id="headerGroup">
          <h2 id="headerText">+ CREATE NEW EVENT</h2>
        </form>
        <form id="mainGroup">
          <div className="name-group">
            <label htmlFor="name"></label>
            <textarea
              rows={this.state.rows}
              value={this.state.name}
              onChange={this.handleNameChange}
              id="nameInput"
              placeholder="Add a title"
              autoComplete="off"
            />
          </div>

          <div className="location-group">
            <label htmlFor="locationInput"></label>
            {/* <h5>Location</h5> */}
            <input
              type="text"
              value={this.state.location}
              onChange={this.handleLocationChange}
              id="locationInput"
              placeholder="Address (e.g. 143 Street, www.zoom.com/yourmeeting)"
              autoComplete="off"
            />
          </div>

          <div className="date-group">
            <label htmlFor="dateInput"></label>
            {/* <h5>Date</h5> */}
            <input
              type="date"
              value={this.state.date}
              onChange={this.handleDateChange}
            />
          </div>

          <div className="time-group">
            <label htmlFor="timeInput"></label>
            {/* <h5>Time</h5> */}
            <input
              class="is-floated"
              type="time"
              value={this.state.startTime}
              onChange={this.handleStartTimeChange}
              id="startTime"
            />
            <span id="dash"> - </span>

            <input
              class="is-floated"
              type="time"
              value={this.state.endTime}
              onChange={this.handleEndTimeChange}
              id="endTime"
            />
          </div>

          <div className="description-group">
            <label htmlFor="descriptionInput"></label>
            {/* <h5>Description</h5> */}
            <textarea
              rows_1={this.state.rows_1}
              type="text"
              value={this.state.description}
              onChange={this.handleDescriptionChange}
              id="descriptionInput"
              placeholder="Tell us more about your event!"
              autoComplete="off"
            />
          </div>
          {this.renderRedirect()}
          <button
            id="submitButton"
            className="submit"
            onClick={this.submitForm}
          >
            HYPRLINK IT
          </button>
        </form>
      </div>
    );
  }
}

export default createEvents;
