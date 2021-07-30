import React, { Component } from 'react'
import MyArticle from './MyArticle'
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
        <List>
            {arrOfMyarticles}
        </List>
      
     )
    }
}
