import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'


class SignIn extends Component {
    
    state = {
        username: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {username, password} = this.state
        const loginInfo = {username: username, password: password}
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(loginInfo)
        })
        .then(res => res.json())
        .then(userInfo => {this.props.login(userInfo)
            this.setState({
                username: '',
                password: ''
            })
        })
    }    
    
    render() {
        // console.log(this.state)

        return (
            <div style={{width: '100%', height: '100%', paddingTop: '230px'}}>
                <h1 style={{fontFamily: 'Lucida Std'}}>Commute Better</h1>
                <h3 style={{fontFamily: 'Lucida Std', color: '#00d563', marginRight: '280px'}}>Welcome back!</h3>
                <form onSubmit={this.handleSubmit} style={{display:'block'}}>
                <input style={{padding: '0px 15px',border: '1.5px solid #00d563', color: '#8e8e8e', borderRadius: '4px', width: '25%', height: '40px', marginBottom: '20px'}} type ='text' name='username' id='username' value={this.state.username} onChange={this.handleChange} placeholder='Email account'/><br/>
                <input style={{padding: '0px 15px',border: '1.5px solid #00d563', color: '#8e8e8e', borderRadius: '4px', width: '25%', height: '40px'}} type ='password' name='password' id='password' value={this.state.password} onChange={this.handleChange} placeholder='Password'/><br/>
                <Button type='submit'style={{color:'white', backgroundColor: '#1a1617', fontFamily: 'LucidaStd-bold', textTransform: 'none', width: '200px', marginTop: '20px'}}>Login</Button>
                {/* <p>Do not have account yet?</p> */}
                <Link to='/signup' style={{textDecoration: 'none'}}><p style={{color: '#00d563'}}>Sign up</p></Link>
                </form>
            </div>
        )
    }
}
export default withRouter(SignIn)