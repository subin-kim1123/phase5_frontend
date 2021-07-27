import React, { Component } from 'react'
import money from './icon/money.png'
import money2 from './icon/money2.png'
import film from './icon/film.png'
import travel from './icon/travel.png'
import business from './icon/business.png'
import tech from './icon/tech.png'
import sns from './icon/sns.png'
import Profile from './icon/profile.png'
import Button from '@material-ui/core/Button'
import './style.css'

export default class CategoryContainer extends Component {
    state = {
        helloText: ''
    }

    handleClick = (category) => { 
        this.setState(()=>{
            return {helloText: category}
        })
    }

    render() {
        return (
            <div>
                <div className="header">
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
                    <div className='category'>
                        <button className = "categorybtn" onClick={(e)=>this.handleClick('Money')}><img src={money} alt="Money" style={{width: '65px'}}/><div><label className="category-name">Money</label></div></button>
                        <button className = "categorybtn" onClick={(e)=>this.handleClick('Film')}><img src={film} alt="Film" style={{width: '65px'}}/><div><label className="category-name">Film</label></div></button>
                        <button className = "categorybtn" onClick={(e)=>this.handleClick('Travel')}><img src={travel} alt="Travel" style={{width: '65px'}}/><div><label className="category-name">Travel</label></div></button>
                        <button className = "categorybtn" onClick={(e)=>this.handleClick('Tech')}><img src={tech} alt="Technology" style={{width: '65px'}}/><div><label className="category-name">Tech</label></div></button>
                        <button className = "categorybtn" onClick={(e)=>this.handleClick('Social Media')}><img src={sns} alt="SNS" style={{width: '65px'}}/><div><label className="category-name">Social Media</label></div></button>
                        <button className = "categorybtn" onClick={(e)=>this.handleClick('Business')}><img src={business} alt="Business" style={{width: '65px'}}/><div><label className="category-name">Business</label></div></button>
                    </div>
                </div>
                <div>
                    <h1>Article</h1>
                    {this.state.helloText}

                </div>
            </div>
        )
    }
}
