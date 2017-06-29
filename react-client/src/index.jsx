import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './components/header.jsx'; 
import MapContainer from './components/mapContainer.jsx';
import UserPage from './components/userpage.jsx';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

injectTapEventPlugin();

class mapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCenter: {
        lat: 44,
        lng: -122
      },
      zoom: 15,
      currentUser: null,
      markers:[]
    };
    this.updateCenter = this.updateCenter.bind(this);
    this.updateZoom = this.updateZoom.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.save = this.save.bind(this);
    this.github = this.github.bind(this);
  }

  addMarker(position){
    console.log("Currently the marker list is:", this.state.markers);
    var markers = this.state.markers;
    markers.push({
      position: position
    });
    this.setState({
      markers: markers
    });
  }

  github() {
    console.log('hello');
    axios.get('/auth/github')
      .then(res => {
        console.log('github response:', res);
      })
      .catch(err => console.log('ERROR:', err));
  }

  save() {
    console.log('hi');
    // axios.post('/map/save', {state: 'state'})
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
  }

  updateCenter(center) {
    this.setState({
      currentCenter: center
    });
  }

  updateZoom(zoom) {
    this.setState( {
      zoom: zoom
    });
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header save={this.save} git={this.github} savecurrentUser={this.state.currentUser}/>
          <div style={{height: '0.5em'}}>
          </div>
          <MapContainer 
            currentCenter={this.state.currentCenter}
            updateCenter={this.updateCenter}
            updateZoom={this.updateZoom}
            markers={this.state.markers}
            addMarker={this.addMarker}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

const userView = ({match}) => (
  <MuiThemeProvider>
    <UserPage />
  </MuiThemeProvider>
);

class App extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Router>
        <div>
          <Route exact path='/' component={mapView} />
          <Route path='/user' component={userView} />
        </div>
      </Router>
    );
  }
}


render(<App />, document.getElementById('app'));