import React, { Component, useRef } from 'react'
import Button from '@material-ui/core/Button'
import Dot from './icon/dot.png'
import Map1 from './icon/map.png'
import Circle from './icon/circle.png'
import Profile from './icon/profile.png'
import './style.css'
import GoogleMapReact from 'google-map-react';
import Popup from 'reactjs-popup';
import Geocode from "react-geocode";


const AnyReactComponent = ({ text }) => <div>{text}</div>;
const defaultProps = {
    center: {
      lat: 47.444,
      lng: -122.176
    },
    zoom: 11
  };



export default class AddressInput extends Component {
    state={
        startingPoint: 'begin',
        destination: 'end',
        profileMenu: ''
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
            const result = google.maps.geometry.spherical.computeDistanceBetween(this.latLngArray[0], this.latLngArray[1]);
            console.log(result)
        }
        console.log(lat, lng)  
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
                            <Popup trigger={<Button style={{color:'white', backgroundColor: '#1a1617', fontFamily: 'Lucida Std', textTransform: 'none', width: '100px', marginLeft: '20px'}}>Save</Button>}>
                            <div className = "popup">
                                <div classNmae = "popup-inner">
                                    <div>Starting Point: {this.state.startingPoint}</div>
                                    <div>Destination: {this.state.destination}</div>
                                    <div>Distance: {this.result}</div>
                                    <Button>Cancel</Button>
                                    <Button>Confirm</Button>
                                    
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