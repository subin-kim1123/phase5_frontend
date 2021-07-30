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
        content: ''

    }
    // handleClick = (e) => {
    //     fetch('http://localhost:3000/my_articles', {
    //         method: 'POST',
    //         headers: {"Content-type":"application/json"},
    //         body: JSON.stringify()
    //     })
    //     .then(res => res.json())
    //     .then(my_articles => {
    //         console.log(my_articles)
    //     })

    // }
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
                content: articleObj.content
            })
        });
    }

    saveClick = () => {
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
            <div> 
                <h1 style={{fontFamily: 'LucidaStd-bold'}}>{this.state.title}</h1>
                <span style={{fontFamily: 'LucidaStd'}}>{this.state.author}</span><br/>
                <span style={{fontFamily: 'LucidaStd'}}>{this.state.time} min</span><br/> 
                <div style={{fontFamily:'Lucida Std' ,lineHeight: '180%', marginLeft: '320px', marginRight: '320px', marginTop: '100px', fontSize: '20px'}}>
                <button onClick={this.saveClick}>Save</button><br/>
                <span>{this.state.content}</span><br/>
                </div>
                    <button>Back</button>
                    <button>Next</button><br/>
                </div>
            </div>  
        )
    }
}

