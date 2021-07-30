import React, { Component } from 'react'
import Profile from './icon/profile.png'
import Button from '@material-ui/core/Button'
import hodu from './icon/hodu.jpg'
import './style.css'
import { Link } from 'react-router-dom'

export default class MyArticle extends Component {
 
    
    delMyArticle = () => {
        const id = this.props.myArticle.id
        fetch(`http://localhost:3000/my_articles/${id}`, {
          method: "DELETE",
        })  
        .then(res=>res.json())
        .then(data=>{
          this.props.deleteMyArticles(id)  
        })
      }

    render() {
        return (
                <div>
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
                    </div>
                    <div>
                    <p className="my-article">My Article</p>
                    
                    <div>
                    
                    <div style={{textAlign: 'left', marginLeft: '250px', marginRight: '250px', marginTop: '100px'}}>
                        <div style={{color: '#000000',fontFamily: 'Lucida Std' , display: 'inline-block'}}>
                            <span className="article-author">{this.props.myArticle.article.author}</span>
                            <h2 className="article-title">{this.props.myArticle.article.title}</h2>
                            <span className="article-description">Description will be here</span><br/>
                            <span className="article-time">{this.props.myArticle.article.time}</span><br/>
                            <button 
                            onClick={this.delMyArticle}
                            >Delete</button>   
                        </div>
                        <div className="img-container" style={{float: 'right', display: 'inline-block'}}>
                            <img className="article-img" style={{width: '200px'}} src={hodu}/>
                            
                        </div>
                    </div>
                        
                  
                    </div>
                    

            </div>
                </div>
        )
    }
}
