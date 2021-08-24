import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <h1 style={{paddingTop: '230px', fontFamily: 'LucidaStd-bold', marginBottom: '80px'}}>Commute Better</h1>
                <p style={{marginLeft: '500px', marginRight: '500px', lineHeight: '30px', fontFamily: 'LucidaStd', marginBottom: '50px'}}>"According to the 2017 National Household Travel Survey, americans spend a lot of time commuting to and from work: about 50 minutes per day, on average. This adds up to about 200 hours per year for full-time workers."</p>
                <p style={{marginLeft: '500px', marginRight: '500px', lineHeight: '30px',fontFamily: 'LucidaStd'}}>Commute Better is a service that recommends your favorite articles according to your real-time commuting time. To make your commute time as quality time, let's do Commute Better!</p>
                <Link to='/login'><button style={{marginTop: '160px', marginRight: '25px', color:'black', backgroundColor: '#ffffff', fontFamily: 'LucidaStd-bold', textTransform: 'none', width: '100px', height: '36px', borderRadius: '5px', border: '1px solid'}}>Login</button></Link>
                <Link to='/signUp'><button style={{color:'black', backgroundColor: '#ffffff', fontFamily: 'LucidaStd-bold', textTransform: 'none', width: '100px', height: '36px', borderRadius: '5px', border: '1px solid'}}>Sign Up</button></Link>
            </div>
        )
    }
}
