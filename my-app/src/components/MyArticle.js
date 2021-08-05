import React, { Component } from 'react'
import Profile from './icon/profile.png'
import Button from '@material-ui/core/Button'
import hodu from './icon/hodu.jpg'
import './style.css'
import { Link } from 'react-router-dom'

export default class MyArticle extends Component {
    // noArticle = () => {
    //     if(this.props.myArticle.length=0){
    //         console.log("there is no article") 
    //     }else {

    //     }
    // }
    
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
                   
                    <div>
                    <div style={{textAlign: 'left', marginLeft: '250px', marginRight: '250px', marginTop: '100px'}}>
                        <div style={{color: '#000000',fontFamily: 'Lucida Std' , display: 'inline-block'}}>
                            <Link to={`/articles/${this.props.myArticle.article.id}` }>
                            <span className="article-author">{this.props.myArticle.article.author}</span><br/>
                            <h2 className="article-title">{this.props.myArticle.article.title}</h2><br/>
                            <span className="article-description">{this.props.myArticle.article.description}</span><br/>
                            <span className="article-time">{this.props.myArticle.article.time}min</span><br/>
                            </Link>
                            <button style={{marginTop: '20px', border: '1px solid black', borderRadius: '4px', backgroundColor: '#f4f4f4', fontFamily: 'LucidaStd', paddingTop: '8px', paddingBottom: '3px', paddingLeft: '5px', paddingLight: '5px'}}
                            onClick={this.delMyArticle}
                            >Delete</button>   
                        </div>
                        <div className="img-container" style={{float: 'right', display: 'inline-block'}}>
                            <img className="article-img" style={{width: '250px', height: '150px'}} src={this.props.myArticle.article.image}/> 
                        </div>
                    </div>
                    </div>   
                </div>
               
        )
    }
}
