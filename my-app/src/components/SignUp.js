import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

export default class SignUp extends Component {

    state = {
        username: '',
        password: ''
    }
    // const [password, setPassword] = useState('');

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // handleSubmit = (event) => {
    //     event.preventDefault()
    //     const {username, password} = formData
    //     const userData = {username: username, password: password}
    //     fetch('/users', {
    //         method: 'POST',
    //         headers: {"Content-type":"application/json"},
    //         body: JSON.stringify(userData)
    //     })
    //     .then(res => res.json())
    //     .then(userInfo => {props.login(userInfo)
    //         setFormData({
    //             username: '',
    //             password: ''
    //         })
    //     })
    // }

    render() {
        return (
            <div style={{justifyContent: 'center'}}>
                <h1 style={{fontFamily: 'Lucida Std'}}>Commute Better</h1>
                <h3 style={{fontFamily: 'Lucida Std', color: '#00d563', marginRight: '280px'}}>Create Account</h3>
                <form onSubmit={this.handleSubmit} style={{display:'block'}}>
                <input style={{padding: '0px 15px',border: '1.5px solid #00d563', color: '#8e8e8e', borderRadius: '4px', width: '25%', height: '40px', marginBottom: '20px'}} type ='text' name='username' id='username' value={this.state.username} onChange={this.handleChange} placeholder='Email account'/><br/>
                <input style={{padding: '0px 15px',border: '1.5px solid #00d563', color: '#8e8e8e', borderRadius: '4px', width: '25%', height: '40px', marginBottom: '20px'}} type ='password' name='password' id='password' value={this.state.password} onChange={this.handleChange} placeholder='Password'/><br/>
                <input style={{padding: '0px 15px',border: '1.5px solid #00d563', color: '#8e8e8e', borderRadius: '4px', width: '25%', height: '40px'}} type ='password' name='password' id='password' value={this.state.password} onChange={this.handleChange} placeholder='Confirm Password'/><br/>
                <Button type='submit'style={{color:'white', backgroundColor: '#1a1617', fontFamily: 'Lucida Std', textTransform: 'none', width: '200px', marginTop: '20px'}}>Sign Up</Button>
                </form>
            </div>
        )
    }
}
