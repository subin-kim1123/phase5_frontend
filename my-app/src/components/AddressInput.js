import React, { Component, useRef } from 'react'
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


const AnyReactComponent = ({ text }) => <div>{text}</div>;
const defaultProps = {
    center: {
      lat: 41.879194,
      lng: -87.6564162
    },
    zoom: 14
  };



export default class AddressInput extends Component {
    state={
        startingPoint: '',
        destination: '',
        profileMenu: '',
        duration: 0,
        isOpen: false
    }

    handleClick = (menu) => {
        this.setState(()=>{
            return {profileMenu: menu}
        })
    }

    latLngArray = [];

    onClick = ({x, y, lat, lng, event}) => {
        // console.log(x, y, lat, lng, event)
        // console.log(window.google.maps.geometry.spherical.computeDistanceBetween)

        const google = window.google;

        Geocode.setApiKey("AIzaSyDPT5H99VpEJEJUq2OD0F9QYJ5cqmMreXA")

        this.latLngArray.push(new google.maps.LatLng({lat, lng}))

        if(this.latLngArray.length == 1) {
            Geocode.fromLatLng(lat, lng).then(
                (response) => {
                const address = response.results[0].formatted_address;

                    this.setState({
                        startingPoint: address
                    })
                },
                (error) => {
                console.error(error);
                }
            )
        }else {
            Geocode.fromLatLng(lat, lng).then(
                (response) => {
                const address = response.results[0].formatted_address;
                    this.setState({
                        destination: address
                    })
                },
                (error) => {
                console.error(error);
                }
            )

            const directionsService = new google.maps.DirectionsService();

            directionsService
              .route({
                  origin: this.latLngArray[0],
                  destination: this.latLngArray[1],
                  travelMode: google.maps.TravelMode.TRANSIT,
              })
              .then((response) => {
                  this.setState({
                    duration: response.routes[0].legs[0].duration.value
                  })
                // this.props.goToArticle(response.routes[0].legs[0].duration.value);
                  
              })
        }
    }

    popupClick = (e) => {
        this.props.goToArticle((this.state.duration/60).toFixed(0))
    }
   
    handleOpen = () => {
        this.setState({ isOpen: true });
      }
      
    handleClose = () => {
        // const address = response.results[0].formatted_address;
        this.latLngArray = []
        this.setState({ 
            isOpen: false,
            startingPoint: '',
            destination: ''
         });
      }

    render() {

        return (
            <div>
                <div className="address">
                    <div>
                        <h2 className="title">Commute Better
                            <div className = "dropdown">
                                <button className= "profilebtn"><img className= "profileimg" src={Profile} alt="Profile"/>
                                    <div className = "dropdown-content">

                                        {/* <a className = "dropdown-menu1" href = "#">Log out</a> */}
                                        <Button id="my-article" type='primary' className="dropdown-manu">My article</Button>
                                        <Button id='logout' type="primary" className="dropdown-menu1" onClick={this.props.logOut}>Log out</Button>
                                    </div>
                                </button>
                            </div>
                        </h2>
                    </div>



                    <form className = "form" onSubmit={this.handleSubmit} >
                        <div>
                            <label style={{color: '#00d563', textAlign: 'center', display: 'inline-block'}}><div>Enter your location</div><div><img className= "circleimg" src={Circle} alt="Circle"/><input className = "enterlocation" type ='text' name='startingPoint' id='startingPoint' value={this.state.startingPoint} placeholder='Starting point'/></div></label>

                            <label
                            style={{display: 'inline-block', color: '#00d563', textAlign: 'center'}}><div>Enter destination</div>
                            <div><img className="dot" src={Dot} alt="Dot"/><img className="map1" src={Map1} alt="Map"/><input className="enterdestination" type ='text' name='destination' id='destination' value={this.state.destination}  placeholder='Destination'/></div>
                            </label>
                            <Popup trigger={<Button style={{color:'white', backgroundColor: '#1a1617', fontFamily: 'LucidaStd-Bold', textTransform: 'none', width: '100px', marginLeft: '20px'}}>Save</Button>}
                            open={this.state.isOpen}
                            onOpen={this.handleOpen}>
                            <div className = "popup">
                                <div className = "popup-inner">
                                    <div className='popup-title'>Starting Point:</div> <div className='popup-text'>{this.state.startingPoint}</div><br/>
                                    <div className='popup-title'>Destination:</div> <div className='popup-text'> {this.state.destination}</div><br/>
                                    <div className='popup-title'>Transit Time:</div><div className='popup-text'>{(this.state.duration/60).toFixed(0)}min</div><br/>
                                    
                                    <div className="popup-btn">
                                    <Button style={{display: 'inline-block'}} onClick={this.handleClose}>Cancel</Button>
                                    <Button onClick={(e)=>{this.popupClick(e)}}>Confirm</Button>
                                    {/* <img src={subway} alt="Money" style={{transform: 'translate(150%, -50%)', width: '200px', display: 'flex'}}/> */}
                                    </div>
                                </div>
                            </div>
                                    
                            </Popup>
                        </div>
                    </form>
                    <div>
                    {/* <Map
                        google={this.props.google}
                        zoom={8}
                        style={mapStyles}
                        initialCenter={{ lat: 47.444, lng: -122.176}}
                    /> */}
                            <div style={{ height: '100vh', width: '100%' }}>
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: "AIzaSyDPT5H99VpEJEJUq2OD0F9QYJ5cqmMreXA" }}
                                    defaultCenter={defaultProps.center}
                                    defaultZoom={defaultProps.zoom}
                                    onClick={(e) => {this.onClick(e)}}>
                                </GoogleMapReact>
                            </div>

                    </div>
                </div>

            </div>
        )
    }
}
