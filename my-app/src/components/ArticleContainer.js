import React, { Component } from 'react'
import Profile from './icon/profile.png'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

export default class ArticleContainer extends Component {

    state = {
        id: '',
        title: '',
        author: '',
        time: '',
        image: '',
        content: '',
        isSaved: false

    }
 
    componentDidMount=()=> {
        const article_num= window.location.pathname.split("/")[2]
        console.log(article_num)
        fetch(`http://localhost:3000/articles/${article_num}}`)
        .then((r) => r.json())
        .then((articleObj) => {
            this.setState({
                id: articleObj.id,
                title: articleObj.title,
                author: articleObj.author,
                time: articleObj.time,
                image: articleObj.image,
                content: articleObj.content
            })
            
        }); 
            if(localStorage.token){
        
              fetch("http://localhost:3000/me", {
                headers: {
                  "Authorization": localStorage.token
                }
              })
                .then(res => res.json())
                .then(data => {
                //   // console.log(data)
                //   this.setState({
                //     id: data.user.id,
                //     my_articles: data.user.my_articles
                        const result = data.user.my_articles.filter(my_article => {
                            return my_article.article.id == article_num
                        })
                        console.log(result)
                        this.setState({
                            isSaved: result.length>0
                        })
                        console.log(this.state.isSaved)
                //   })
                })
          }
    }

    // componentWillUpdate = () => {
    //     const article_num= window.location.pathname.split("/")[2]
    //     if(this.props.my_articles.length>0) {
    //         const result = this.props.my_articles.filter(my_article => {
    //             return my_article.article.id == article_num
    //         })
    //         console.log(result)
    //         this.setState({
    //             isSaved: result.length>0
    //         })
    //     }
    //     console.log(this.state.isSaved)
    // }

    saveClick = () => {
        this.setState((currentState) => ({
            isSaved: !currentState.isSaved, 
        }));

        fetch(`http://localhost:3000/my_articles`, {
            method: 'POST',
            headers: {"Content-type":"application/json", authorization: this.props.token},
            body: JSON.stringify(
                {
                    "user_id": this.props.userId,
                    "article_id": this.state.id
                }
            )
        })
        .then(res => res.json())
        .then(data=>
            {this.props.addMyArticles(data)}
        )
    }
//     

    render() {
        return (
            <div className="header1">
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
            <div style={
                {marginBottom: '20px'}
            }> 
                <h1 style={{marginBottom: '20px', fontFamily: 'LucidaStd-bold'}}>{this.state.title}</h1>
                <img className="article-image" style={{width: '1000px', height: '630px', marginBottom: '20px'}} src={this.state.image}/><br/>
                <span style={{fontFamily: 'LucidaStd'}}>{this.state.author}</span><br/>
                <span style={{fontFamily: 'LucidaStd'}}>{this.state.time} min</span><br/> 
                
                <div style={{fontFamily:'Lucida Std' ,lineHeight: '180%', marginLeft: '320px', marginRight: '320px', fontSize: '20px'}}>
                <button className= "toggle-btn" style={{marginBottom: '50px',color: '#fff' , backgroundColor: '#000000', width: '70px', height:'30px', borderRadius: '20px', boxShadow: 'initial'}} onClick={this.saveClick}>{this.state.isSaved? '❤️' : 'Save'}</button><br/>
                <span>{this.state.content}</span><br/>
                </div>
                <div style={{paddingTop: '20px', paddingBottom: '150px'}}>
                    <button style={{marginRight: '10px'}}>Back</button>
                    <button>Next</button><br/>
                </div>
                </div>
            </div>  
        )
    }
}

