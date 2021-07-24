import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Dot from './icon/dot.png'
import Map1 from './icon/map.png'
import Circle from './icon/circle.png'
import Profile from './icon/profile.png'
import './style.css'
import { Map, GoogleApiWrapper } from 'google-maps-react';

class AddressInput extends Component {
    state={
        startingPoint: '',
        destination: '',
        profileMenu: ''
    }

    handleClick = (menu) => {
        this.setState(()=>{
            return {profileMenu: menu}
        })
    }

    render() {
        const mapStyles = {
            width: '100%',
            height: '100%',
          };
        return (
            <div>
                <div className="address">
                    <div>
                        <h2 className="title">Commute Better
                            <div className = "dropdown">
                                <button className= "profilebtn"><img className= "profileimg" src={Profile} alt="Profile"/>
                                    <div className = "dropdown-content">
                                        <a className = "dropdown-menu" href = "#">My Article</a>
                                        <a className = "dropdown-menu1" href = "#">Log Out</a>
                                    </div>
                                </button>
                            </div>
                        </h2>
                    </div>

                        

                    <form className = "form" onSubmit={this.handleSubmit} >
                        <div>
                            <label style={{color: '#00d563', textAlign: 'center', display: 'inline-block'}}><div>Enter your location</div><div><img className= "circleimg" src={Circle} alt="Circle"/><input className = "enterlocation" type ='text' name='startingPoint' id='startingPoint' value={this.state.username} onChange={this.handleChange} placeholder='Starting point'/></div></label>

                            <label 
                            style={{display: 'inline-block', color: '#00d563', textAlign: 'center'}}><div>Enter destination</div>
                            <div><img className="dot" src={Dot} alt="Dot"/><img className="map1" src={Map1} alt="Map"/><input className="enterdestination" type ='text' name='destination' id='destination' value={this.state.username} onChange={this.handleChange} placeholder='Destination'/></div>
                            </label>

                            <Button type='submit' style={{color:'white', backgroundColor: '#1a1617', fontFamily: 'Lucida Std', textTransform: 'none', width: '100px', marginLeft: '20px'}}>Save</Button>
                        </div>
                    </form>
                    <div>
                    <Map
                        google={this.props.google}
                        zoom={8}
                        style={mapStyles}
                        initialCenter={{ lat: 47.444, lng: -122.176}}
                    />
                </div>
                </div>
                
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ''
  })(AddressInput);