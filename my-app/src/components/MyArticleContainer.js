import React, { Component } from 'react'
import MyArticle from './MyArticle'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Profile from './icon/profile.png'
import List from '@material-ui/core/List';

export default class MyArticleContainer extends Component {
    render() {
        let arrOfMyarticles = this.props.my_articles.map(myArticle=>{
        return <MyArticle 
        key={myArticle.id} 
        myArticle={myArticle} 
        deleteMyArticles={this.props.deleteMyArticles} 
        logOut={this.logOut}
        />
    })
    return (
        <div className="header1">
                    <h2 className="title">Commute Better
                            <div className = "dropdown">
                                <button className= "profilebtn"><img className= "profileimg" src={Profile} alt="Profile"/>
                                    <div className = "dropdown-content">
                                        
                                        {/* <a className = "dropdown-menu1" href = "#">Log out</a> */}
                                        <Link to="/myarticle"><Button id="my-article" type='primary' className="dropdown-manu">My article</Button></Link>
                                        <Button id='logout' type="primary" className="dropdown-menu1" onClick={this.props.logOut}>Log out</Button>
                                    </div>
                                </button>
                            </div>
                    </h2>  
                    <p className="my-article">My Article</p>
                    
                    {arrOfMyarticles}
        </div>
        
            
        
      
     )
    }
}