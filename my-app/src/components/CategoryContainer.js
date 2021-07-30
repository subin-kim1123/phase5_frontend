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

const moneyId = 1
const filmId = 2
const travelId  = 3
const educationId = 4
const socialMediaId = 5
const creativityId = 6
const businessId = 7
const designId = 8
const humorId = 9
const techId = 10
const futureId= 11

export default class CategoryContainer extends Component {
    state = {
        category: null,
        saved: false,
        article_id: 0
    }

    componentDidMount(){ 
        this.handleClick(moneyId)
    }

    handleClick = (category) => { 
        fetch(`http://localhost:3000/categories/${category}`)
        .then((response)=> response.json())
        .then((data)=> {
            this.setState({
                category: data
            }) 
            console.log(this.state.category)
            })
        .catch(()=>{
            console.log("error")
        }) 
    }

    saveClick = (article_id) => {
        fetch(`http://localhost:3000/my_articles`, {
            method: 'POST',
            headers: {"Content-type":"application/json", authorization: this.props.token},
            body: JSON.stringify(
                {
                    "user_id": this.props.userId,
                    "article_id": article_id
                }
            )
        })
        .then(res => res.json())
        .then(data=>
            {this.props.addMyArticles(data)}
        )
    }

    // articleClick = () => {
    //     console.log("hello")
    // }

    render() {
        console.log(window.location.search.split('=')[1])
        // const arrOfArticles = this.props.categories.map(articleObj=>{
        //     return key={articleObj.id} articleObj={articleObj}
        // })
        return (
            <div>
                <div className="header">
                    <h2 className="title">Commute Better
                            <div className = "dropdown">
                                <button className= "profilebtn"><img className= "profileimg" src={Profile} alt="Profile"/>
                                    <div className = "dropdown-content">
                                        
                                        {/* <a className = "dropdown-menu1" href = "#">Log out</a> */}
                                        <Link to={'/myarticle'}><Button id="my-article" type='primary' className="dropdown-manu">My article</Button></Link>
                                        <Button id='logout' type="primary" className="dropdown-menu1" onClick={this.props.logOut}>Log out</Button>
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
                </div>
                <div>
                    {this.state.category!=null ? this.state.category.articles.map(article => (
                        <div style={{textAlign: 'left', marginLeft: '250px', marginRight: '250px', marginTop: '100px'}}>
                            <div style={{color: '#000000',fontFamily: 'Lucida Std' , display: 'inline-block'}}>
                            <Link to={`/articles/${article.id}` }>
                                <span className="article-author">{article.author}</span>
                                <h2 className="article-title">{article.title}</h2>
                                <span className="article-description">Description will be here</span><br/>
                                <span className="article-time">{article.time}min</span> 
                            </Link>  
                            </div>
                            <div className="img-container" style={{float: 'right', display: 'inline-block'}}>
                                <div>
                                <img className="article-img" style={{width: '200px'}} src={hodu}/>
                                <button onClick={(e)=>{
                                    // e.preventDefault();
                                    this.saveClick(article.id)
                                }
                                    } className="save-btn">Save</button>
                                </div>
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
