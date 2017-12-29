import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userInput: '55',
      travTime: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  handleChange(event) {
    this.setState({userInput: event.target.value});
  }

  handleRadioChange(event) {
    this.setState({selOption: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const kps = this.state.selOption === 'light' ? 30000 : 30;
    const baseSeconds = Math.floor(this.state.userInput / kps);
    const seconds = baseSeconds % 60;
    //const minutesTotal = ((baseSeconds - seconds) / 60);
    var minutes;
    var tminutes;
    var hours;
    var thours;
    var days;
    var tdays;
    var years;
    var calcTotalTime = `${seconds} seconds`;


    if (baseSeconds > 60) {
      minutes = Math.floor(baseSeconds/60);
      tminutes = minutes;
      calcTotalTime = `${minutes} min ${seconds} seconds`;
    }
    if (tminutes > 60) {
      minutes = tminutes % 60
      hours = Math.floor(tminutes/60);
      thours = hours;
      calcTotalTime = `${hours} hours ${minutes} min ${seconds} seconds`;
    }
    if (thours > 24) {
      hours = thours % 60
      days = Math.floor(thours/24);
      tdays = days;
      calcTotalTime = `${days} days ${hours} hours ${minutes} min ${seconds} seconds`;
    }
    if (tdays > 365) {
      days = tdays % 365
      years = Math.floor(tdays/365);
      calcTotalTime = `${years} years ${days} days ${hours} hours ${minutes} min ${seconds} seconds`;
    }

    //const calcTotalTime = hours + " hours " + minutes + " min " + seconds + " seconds ";
    this.setState({ travTime: calcTotalTime });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div>
          <h2>Meteor Calculator</h2>
          <form onSubmit={this.handleSubmit}>
            <p>Enter the travel the distance in km and select the item you want to calcualte for. </p>
            <input type="radio" value="light"
              checked={this.state.selOption === 'light'}
              onChange={this.handleRadioChange} /> Light
            <input type="radio" value="meteor"
              checked={this.state.selOption === 'meteor'}
              onChange={this.handleRadioChange} /> Meteor
            <input text="distance in km" type="number" onChange= {this.handleChange} />
            <input type="submit" value="Submit" />
            <p>The time it takes the meteor to travel is:
              <div className="distTraveled">{this.state.travTime}</div>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
