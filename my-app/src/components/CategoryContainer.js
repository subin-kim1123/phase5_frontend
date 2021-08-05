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
import hodu from './icon/hodu.jpg'
import './style.css'
import { Link } from 'react-router-dom'
import Popup from 'reactjs-popup';

const moneyId = 1
const filmId = 2
const travelId  = 3
const techId = 4
const educationId = 10
const socialMediaId = 5
const creativityId = 7
const businessId = 6
const designId = 8
const humorId = 9

const futureId= 11

export default class CategoryContainer extends Component {
    state = {
        category: null,
        saved: false,
        article_id: 0,
        my_articles: [],
        isOpen: false
    }   

    duration = 0
    componentDidMount(){
        
        this.handleClick(moneyId) 
    }

    // componentWillUnmount() {
    //     this.state.congrat
    // }

    handleClick = (category) => { 
        this.duration = window.location.search.split('=')[1]
        fetch(`http://localhost:3000/categories/${category}`)
        .then((response)=> response.json())
        .then((data)=> {
            const articles = []
            data.articles.forEach(element => {
               this.duration = this.duration-element.time
               if(this.duration>0){
                articles.push(element)
               }
            });
            data.articles = articles
            this.setState({
                category: data
            })
            // console.log(articles)
            })
        .catch((error)=>{
            console.log(error)
        }) 
    }
    
    handleClose = () => {
        this.props.resetIsRead()
    }

    readArticle = (article_id) => {
       let congrat = (num_article) => {
           console.log(this.props.isRead)
           console.log(num_article)
        //    console.log(this.state.category.articles.length)
           if(num_article==this.state.category.articles.length){     
            this.props.changeCongrat()
           }
       }
        this.props.addReadArticle(article_id, congrat)
    }    
    
    render() {
        console.log(this.props.congrat)
        // console.log(this.state.isRead)
        // if(this.props.congrat==true)

        return (
            <div>
            {this.props.congrat?
                <div className="popup1">
                <h3 style={{fontFamily: 'LucidaStd-bold'}}>Congratulations!</h3>
                <Button onClick={this.handleClose}>Confirm</Button>
                </div>
            :''
            }
                <div className="header">
                    <h2 className="title">Commute Better
                    <Link to={'/address'}><p className="change-direction">Change direction</p></Link>
                            <div className = "dropdown">
                                <button className= "profilebtn"><img className= "profileimg" src={Profile} alt="Profile"/>
                                    <div className = "dropdown-content">
                                        
                                        {/* <a className = "dropdown-menu1" href = "#">Log out</a> */}
                                        <Link to={'/myarticle'}><Button id="my-article" type='primary' style={{fontFamily: 'LucidaStd-bold', marginTop: '7px'}} className="dropdown-menu">Your lists</Button></Link><hr/>
                                        <Button id='logout' type="primary" className="dropdown-menu1" style={{fontFamily: 'LucidaStd-bold', marginBottom: '7px'}} onClick={this.props.logOut}>Log out</Button>
                                    </div>
                                </button>
                            </div>
                    </h2>
                    <div className='category'>
                        <button className = "categorybtn" onClick={(e)=>this.handleClick(moneyId)}><img src={money} alt="Money" style={{width: '65px'}}/><div><label className="category-name">Money</label></div></button>
                        <button className = "categorybtn" onClick={(e)=>this.handleClick(filmId)}><img src={film} alt="Film" style={{width: '65px'}}/><div><label className="category-name">Film</label></div></button>
                        <button className = "categorybtn" onClick={(e)=>this.handleClick(travelId)}><img src={travel} alt="Travel" style={{width: '65px'}}/><div><label className="category-name">Travel</label></div></button>
                        <button className = "categorybtn" onClick={(e)=>this.handleClick(techId)}><img src={tech} alt="Technology" style={{width: '65px'}}/><div><label className="category-name">Tech</label></div></button>
                        <button className = "categorybtn" onClick={(e)=>this.handleClick(socialMediaId)}><img src={sns} alt="SNS" style={{width: '65px'}}/><div><label className="category-name">Social Media</label></div></button>
                        <button className = "categorybtn" onClick={(e)=>this.handleClick(businessId)}><img src={business} alt="Business" style={{width: '65px'}}/><div><label className="category-name">Business</label></div></button>
                    </div>
                    {/* <div>{this.props.congrat=true? <h2>Congrat!!!You read all</h2>: ""}</div> */}
                </div>
                <div>
                    {this.state.category!=null ? this.state.category.articles.map(article => (
                        <div style={{textAlign: 'left', marginLeft: '250px', marginRight: '250px', marginTop: '100px'}}>
                            <div onClick={() => this.readArticle(article.id)} style={{color: '#000000',fontFamily: 'Lucida Std' , display: 'inline-block'}}>
                                <Link to={`/articles/${article.id}` }>
                                    <span className="article-author">{article.author}</span><br/>
                                    <h2 className="article-title">{article.title}</h2><br/>
                                    <span maxlength= "20" className="article-description">{article.description}</span><br/>
                                    <span className="article-time">{article.time}min</span> 
                                </Link>  
                            </div>
                            <div className="img-container" style={{float: 'right', display: 'inline-block', position: 'relative'}}>
                                <img className="article-img" style={{width: '250px', height: '150px'}} src={article.image}/>
                                {/* <button 
                               
                                className="save-btn" style={{border: '1px solid black', borderRadius: '4px', backgroundColor: '#fff', fontFamily: 'LucidaStd', position: 'absolute', top: '10px', right: '10px', paddingTop: '4px'}}>+Add list
                                </button> */}
                            </div>
                            
                        </div>
                        
                        )
                ): ""
            } 
                </div>

                
            </div>
        )
    }
}
