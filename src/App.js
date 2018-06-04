import React, { Component } from 'react';
import states from './states.json';
import Parks from './Parks.js'
import GoogleApiWrapper from './Map.js'
import axios from 'axios';
import './App.css';

const npsAPIKEY = '5qSFAW7V3Z1wVyDoULWIrTVsMO9dV7Ym2I3GRQEq'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parks: [],
      latLong: {},
      center: {},
      select: ''
    };
    this.handleClick = this.handleClick.bind(this)
    this.handleChange= this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({select: event.target.value })
  }

  handleClick() {
    var stateCode = this.state.select
    let newCenter = null;
    for (var i = 0; i < states.length; i++) {
      if (states[i].name == stateCode) {
        console.log(states[i])
        newCenter = states[i].center;
      }
    }
    axios
      .get('https://developer.nps.gov/api/v1//parks?stateCode=' + stateCode + '&api_key=' + npsAPIKEY)
      .then(response => response.data)
      .then(parks => {
        parks.data = parks.data.filter(p => p.latLong !== '')
        this.setState({ parks, center: newCenter })
      })
  }

  loadMap() {

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>National Park Location and Information App</h1>
          <select onChange={this.handleChange}>
            <option>Pick A State</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>	
          <button type="button" className="btn btn-light" onClick={this.handleClick}>Enter</button>
        </header>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-8'>
              {
              (this.state.parks.data === undefined)
              ? <div></div>
              : <GoogleApiWrapper parks={this.state.parks} center={this.state.center} />
              }
            </div>
            <div className='col-sm-4'>
              <ol>
              {
              (this.state.parks.data === undefined)
              ? <div></div>
              : <div>{this.state.parks.data.map(park => (
                <li key={park.fullName}>{park.fullName}</li>
                ))}</div>
              }
              </ol>
            </div>
          </div>
        </div>
        <div className='card'>
          <ol className='list-group list-group-flush'>
            {
              (this.state.parks.data === undefined)
              ? <div></div>
              : <div>{this.state.parks.data.map(park => (
                <Parks 
                  key={ park.id }
                  fullName={ park.fullName }
                  description={ park.description }
                  weatherInfo={ park.weatherInfo }
                  url={ park.url }
                />
              ))}</div>
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default App;
