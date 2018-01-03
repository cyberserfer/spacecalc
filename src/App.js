import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userInput: '',
      sTravTime: '',
      sSeconds: '',
      sMinutes: '',
      sHours: '',
      sDays: '',
      sYears: '',
      histArray: [],
      selOption: 'light',
      selPicture: <img className="App-pic" alt="light" src="http://en.es-static.us/upl/2012/03/light_beam_star.jpg" />
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  handleChange(event) {
    this.setState({userInput: event.target.value});
  }

  handleRadioChange(event) {
    this.setState({sTravTime: ''});
    this.setState({sSeconds: ''});
    this.setState({sMinutes: ''});
    this.setState({sHours: ''});
    this.setState({sDays: ''});
    this.setState({sYears: ''});
    this.setState({selOption: event.target.value});
    const picDisplay = event.target.value === 'light' ?
    <img className="App-pic" alt="light" src="http://en.es-static.us/upl/2012/03/light_beam_star.jpg" /> :
    <img className="App-pic" alt="comet" src="http://i.telegraph.co.uk/multimedia/archive/03586/comet_3586013b.jpg" />
    this.setState({ selPicture: picDisplay });
  }

  handleSubmit(event) {
    event.preventDefault();
    const kps = this.state.selOption === 'light' ? 300000 : 30;
    const baseSeconds = Math.floor(this.state.userInput / kps);
    const seconds = baseSeconds % 60;
    this.setState({ sSeconds: seconds + " seconds"});

    var minutes;
    var hours;
    var days;
    var years;

    if (baseSeconds > 60) {
      minutes = Math.floor(baseSeconds/60);
      this.setState({ sMinutes: minutes + " minutes"});
    }
    if (minutes > 60) {
      hours = Math.floor(minutes/60);
      minutes = minutes % 60
      this.setState({ sMinutes: minutes + " minutes"});
      this.setState({ sHours: hours + " hours"});
    }
    if (hours > 24) {
      days = Math.floor(hours/24);
      hours = hours % 60
      this.setState({ sHours: hours + " hours"});
      this.setState({ sDays: days + " days"});
    }
    if (days > 365) {
      years = Math.floor(days/365);
      days = days % 365
      //calcTotalTime = `${years} years ${days} days ${hours} hours ${minutes} min ${seconds} seconds`;
      this.setState({ sDays: days + " days"});
      this.setState({ sYears: years + " years"});
    }

    var newArray = this.state.histArray.slice();
    newArray.push(<p>The time it takes the {this.state.selOption} to travel {this.state.userInput} km is:
      {this.state.sYears} {this.state.sDays} {this.state.sHours} {this.state.sMinutes} {this.state.sSeconds}
    </p>);
    this.setState({histArray:newArray});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div className="CalcBox">
          <h2>Space Time/Distance Calculator</h2>
          <form onSubmit={this.handleSubmit}>
            <p>Enter the traveled the distance in km and select the item you want to calcualte for. </p>
            <input type="radio" value="light"
              checked={this.state.selOption === 'light'}
              onChange={this.handleRadioChange} /> Light
            <input type="radio" value="meteor"
              checked={this.state.selOption === 'meteor'}
              onChange={this.handleRadioChange} /> Meteor
            <br />
            {this.state.selPicture}
            <br />
            <input text="distance in km" type="number" onChange= {this.handleChange} />
            <input type="submit" value="Submit" />
            <p>The time it takes the {this.state.selOption} to travel is:
              <div className="distTraveled">{this.state.sYears} {this.state.sDays} {this.state.sHours} {this.state.sMinutes} {this.state.sSeconds}</div>
            </p>
          </form>
        </div>
        <div className="HistBox">
          <h2>Previous Calcs</h2>
          <div>
            {this.state.histArray[0]}
            {this.state.histArray[1]}
            {this.state.histArray[2]}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
