import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import home from './icon/home.png'
import './style.css'

export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <Link to='/login'><button>Login</button></Link>
                <Link to='/signUp'><button>Sign up</button></Link>
            </div>
        )
    }
}
