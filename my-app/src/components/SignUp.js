import React from 'react'
import { useState } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

function SignUp(props) {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    // const [password, setPassword] = useState('');

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    } 

    const handleSubmit = (event) => {
        event.preventDefault()
        const {username, password} = formData
        const userData = {username: username, password: password}
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(userInfo => {props.login(userInfo)
            setFormData({
                username: '',
                password: ''
            })
        })
    }
        return (
            <div style={{justifyContent: 'center'}}>
                <h1 style={{fontFamily: 'Lucida Std'}}>Commute Better</h1>
                <h3 style={{fontFamily: 'Lucida Std', color: '#00d563', marginRight: '280px'}}>Create Account</h3>
                <form onSubmit={handleSubmit} style={{display:'block'}}>
                <input style={{padding: '0px 15px',border: '1.5px solid #00d563', color: '#8e8e8e', borderRadius: '4px', width: '25%', height: '40px', marginBottom: '20px'}} type ='text' name='username' id='username' value={formData.username} onChange={handleChange} placeholder='Email account'/><br/>
                <input style={{padding: '0px 15px',border: '1.5px solid #00d563', color: '#8e8e8e', borderRadius: '4px', width: '25%', height: '40px', marginBottom: '20px'}} type ='password' name='password' id='password' value={formData.password} onChange={handleChange} placeholder='Password'/><br/>
                {/* <input style={{padding: '0px 15px',border: '1.5px solid #00d563', color: '#8e8e8e', borderRadius: '4px', width: '25%', height: '40px'}} type ='password' name='password' id='password' value={this.state.password} onChange={this.handleChange} placeholder='Confirm Password'/><br/> */}
                <Button type='submit'style={{color:'white', backgroundColor: '#1a1617', fontFamily: 'LucidaStd-bold', textTransform: 'none', width: '200px', marginTop: '20px'}}>Sign Up</Button>
                <Link to='/login' style={{textDecoration: 'none'}}><p style={{color: '#00d563'}}>Back</p></Link>
                </form>
            </div>
        )
}
export default withRouter(SignUp)