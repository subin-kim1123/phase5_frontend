import React, {Component, useRef} from 'react'
import Button from '@material-ui/core/Button'
import Dot from './icon/dot.png'
import Map1 from './icon/map1.png'
import Circle from './icon/circle.png'
import Profile from './icon/profile.png'
import './style.css'
import GoogleMapReact from 'google-map-react';
import Popup from 'reactjs-popup';
import Geocode from "react-geocode";
import fetch from 'node-fetch';
import subway from './icon/subway.png'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import {geocodeByAddress, getLatLng} from 'react-google-places-autocomplete';
import Autocomplete from "react-google-autocomplete";


const google = window.google;
const API_KEY = "AIzaSyDPT5H99VpEJEJUq2OD0F9QYJ5cqmMreXA";
const AnyReactComponent = ({text}) => <div>{text}</div>;



export default class AddressInput extends Component {
  state = {
    startingPoint: '',
    destination: '',
    profileMenu: '',
    duration: 0,
    isOpen: false,
    mapOptions: {
          center: {
              lat: 41.879194,
              lng: -87.6564162
          },
          zoom: 14
      }
  }

  handleClick = (menu) => {
    this.setState(() => {
      return {profileMenu: menu}
    })
  }

  latLngArray = [];

  setMapCenter(lat, lng) {
      this.setState({
          mapOptions: {
              center: {
                  lat,
                  lng
              },
              zoom: 15
          }
      })
  }

  onMapClick = ({x, y, lat, lng, event}) => {

    Geocode.setApiKey(API_KEY)

    this.latLngArray.push(new google.maps.LatLng({lat, lng}))

    if (this.latLngArray.length == 1) {
      Geocode.fromLatLng(lat, lng).then(
        (response) => {
          const address = response.results[0].formatted_address;
          this.startPointInput.current.value = address;
          this.setState({
            startingPoint: address
          })
        },
        (error) => {
          console.error(error);
        }
      )
    } else {
      Geocode.fromLatLng(lat, lng).then(
        (response) => {
          const address = response.results[0].formatted_address;
          this.endPointInput.current.value = address;
          this.setState({
            destination: address
          })
        },
        (error) => {
          console.error(error);
        }
      )
    }
  }

  popupClick = (e) => {
    this.props.goToArticle((this.state.duration / 60).toFixed(0))
  }

  handleOpen = () => {
    const directionsService = new google.maps.DirectionsService();

    directionsService
      .route({
        origin: this.latLngArray[0],
        destination: this.latLngArray[1],
        travelMode: google.maps.TravelMode.TRANSIT,
      })
      .then((response) => {
        this.setState({
          isOpen: true,
          duration: response.routes[0].legs[0].duration.value
        })
      })

  }

  handleClose = () => {
    // const address = response.results[0].formatted_address;
    this.latLngArray = []
    this.setState({
      isOpen: false,
      startingPoint: '',
      destination: '',
      duration: 0
    });
  }

  onStartPointSelect(label) {
    this.setState({
      startingPoint: label,
    });
    geocodeByAddress(label)
      .then(results => getLatLng(results[0]))
      .then(({lat, lng}) => {
        if (this.latLngArray.length === 0) {
          this.latLngArray.push(new google.maps.LatLng({lat, lng}))
        } else {
          this.latLngArray = [
            new google.maps.LatLng({lat, lng}),
            ...this.latLngArray.slice(1)
          ]
        }

        this.setMapCenter(lat, lng)
      });
  }

  onEndPointSelect(label) {
    this.setState({
      destination: label,
    });

    geocodeByAddress(label)
      .then(results => getLatLng(results[0]))
      .then(({lat, lng}) => {
        if (this.latLngArray.length === 0) {
          this.latLngArray = [null, new google.maps.LatLng({lat, lng})]
        } else {
          this.latLngArray = [
            this.latLngArray[0],
            new google.maps.LatLng({lat, lng})
          ]
        }

          this.setMapCenter(lat, lng)
      });
  }

constructor(props) {
    super(props);
    this.startPointInput = React.createRef();
    this.endPointInput = React.createRef();
}

  render() {
    
    return (
      <div>
        <div className="address">
          <div>
            <h2 className="title">Commute Better
              <div className="dropdown">
                <button className="profilebtn"><img className="profileimg" src={Profile} alt="Profile"/>
                  <div className="dropdown-content">

                    {/* <a className = "dropdown-menu1" href = "#">Log out</a> */}
                    <Button id="my-article" type='primary' style={{fontFamily: 'LucidaStd-bold', marginTop: '7px'}} className="dropdown-menu">Your lists</Button><hr/>
                    <Button id='logout' type="primary" style={{fontFamily: 'LucidaStd-bold', marginBottom: '7px'}} className="dropdown-menu1" onClick={this.props.logOut}>Log
                      out</Button>
                  </div>
                </button>
              </div>
            </h2>
          </div>


          <form className="form" onSubmit={this.handleSubmit}>
            <div>
              <label style={{color: '#00d563', textAlign: 'center', display: 'inline-block'}}>
                <div>
                    <div className="enter-label">Enter your location</div>
                  <img className="circleimg" src={Circle} alt="Circle"/>
                    <Autocomplete
                      ref={this.startPointInput}
                      className="enterlocation"
                      apiKey='AIzaSyDPT5H99VpEJEJUq2OD0F9QYJ5cqmMreXA'
                      options={{

                          types: 'regions'
                      }
                      }
                      placeholder='Begin'
                      onPlaceSelected={(place) => {
                          this.onStartPointSelect(place.formatted_address);
                      }}
                    />
                </div>
              </label>

            <img className="dot" src={Dot} alt="Dot"/>
              <label style={{display: 'inline-block', color: '#00d563', textAlign: 'center'}}>
                <div>
                    <div className="enter-label">Enter destination</div>
                    <img className="map1" src={Map1} alt="Map"/>
                    <Autocomplete
                      ref={this.endPointInput}
                      className="enterdestination"
                      apiKey='AIzaSyDPT5H99VpEJEJUq2OD0F9QYJ5cqmMreXA'
                      placeholder='End'
                      options={{

                          types: 'regions'
                      }
                      }
                      onPlaceSelected={(place) => {
                          this.onEndPointSelect(place.formatted_address);
                      }}
                    />
                  {/*<input className="enterdestination" type ='text' name='destination' id='destination' value={this.state.destination}  placeholder='Destination'/>*/}
                </div>
              </label>
              <Popup trigger={<Button style={{
                color: 'white',
                backgroundColor: '#1a1617',
                fontFamily: 'LucidaStd-Bold',
                textTransform: 'none',
                width: '100px',
                marginLeft: '20px'
              }}>Save</Button>}
                     open={this.state.isOpen}
                     onOpen={this.handleOpen}>
                <div className="popup">
                  <div className="popup-inner">
                    <div className='popup-title'>Starting Point:</div>
                    <div className='popup-text'>{this.state.startingPoint}</div>
                    <br/>
                    <div className='popup-title'>Destination:</div>
                    <div className='popup-text'> {this.state.destination}</div>
                    <br/>
                    <div className='popup-title'>Your Transit Time:</div>
                    <div className='popup-text'>{(this.state.duration / 60).toFixed(0)}min</div>
                    <br/>

                    <div className="popup-btn">
                      <Button style={{display: 'inline-block'}} onClick={this.handleClose}>Cancel</Button>
                      <Button onClick={(e) => {
                        this.popupClick(e)
                      }}>Confirm</Button>
                         </div>
                  </div>
                    <img src={subway} className="popup-subway-image"/>

                </div>

              </Popup>
            </div>
          </form>
          <div>
            <div style={{height: '100vh', width: '100%'}}>
              <GoogleMapReact
                bootstrapURLKeys={{key: "AIzaSyDPT5H99VpEJEJUq2OD0F9QYJ5cqmMreXA"}}
                center={this.state.mapOptions.center}
                zoom={this.state.mapOptions.zoom}
                onClick={(e) => {
                  this.onMapClick(e)
                }}>
              </GoogleMapReact>
            </div>

          </div>
        </div>

      </div>
    )
  }
}
