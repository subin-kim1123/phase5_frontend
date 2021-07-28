import React, { Component } from 'react'
import Profile from './icon/profile.png'
import Button from '@material-ui/core/Button'
import hodu from './icon/hodu.jpg'
import './style.css'
import { Link } from 'react-router-dom'

export default class MyArticle extends Component {
    render() {
        return (
            
                <div className="header1">
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

                    <div>
                    <h1>My Article</h1>
                    <Link to='/article'>
                        <div style={{textAlign: 'left', marginLeft: '250px', marginRight: '250px', marginTop: '100px'}}>
                    <div style={{fontFamily: 'Lucida Std' , display: 'inline-block'}}>
                        <span>Author</span>
                        <h2>Article1</h2>
                        <span>Description will be here</span><br/>
                        <span>Time</span>   
                    </div>
                    <div className="img-container" style={{float: 'right', display: 'inline-block'}}>
                        <img className="article-img" style={{width: '200px'}} src={hodu}/>
                        {/* <button className="savebtn" onClick={this.saveClick()}>Save</button> */}
                    </div>
                    </div>
                    </Link>

                    <Link to='/article'>
                    <div style={{textAlign: 'left', marginLeft: '250px', marginRight: '250px', marginTop: '100px'}}>
                    <div style={{fontFamily: 'Lucida Std' , display: 'inline-block'}}>
                        <span>Author</span>
                        <h2>Article2</h2>
                        <span>Description will be here</span><br/>
                        <span>Time</span>   
                    </div>
                    <div style={{float: 'right', display: 'inline-block'}}><img style={{width: '200px'}} src={hodu}/></div>
                    </div>
                    </Link>
                    
                    <Link to='/article'>
                    <div style={{textAlign: 'left', marginLeft: '250px', marginRight: '250px', marginTop: '100px'}}>
                    <div style={{fontFamily: 'Lucida Std', display: 'inline-block'}}>
                        <span>Author</span>
                        <h2>Article3</h2>
                        <span>Description will be here</span><br/>
                        <span>Time</span>   
                    </div>
                    <div style={{float: 'right', display: 'inline-block'}}><img style={{width: '200px'}} src={hodu}/></div>
                    </div>
                    </Link>

                    <Link to='/article'>
                    <div style={{textAlign: 'left', marginLeft: '250px', marginRight: '250px', marginTop: '100px'}}>
                    <div style={{fontFamily: 'Lucida Std', display: 'inline-block'}}>
                        <span>Author</span>
                        <h2>Article4</h2>
                        <span>Description will be here</span><br/>
                        <span>Time</span>   
                    </div>
                    <div style={{float: 'right', display: 'inline-block'}}><img style={{width: '200px'}} src={hodu}/></div>
                    </div>
                    </Link>

                    <Link to='/article'>
                    <div style={{textAlign: 'left', marginLeft: '250px', marginRight: '250px', marginTop: '100px'}}>
                    <div style={{fontFamily: 'Lucida Std', display: 'inline-block'}}>
                        <span>Author</span>
                        <h2>Article5</h2>
                        <span>Description will be here</span><br/>
                        <span>Time</span>   
                    </div>
                    <div style={{float: 'right', display: 'inline-block'}}><img style={{width: '200px'}} src={hodu}/></div>
                    </div>
                    </Link>
                </div>    
                </div>
        )
    }
}
