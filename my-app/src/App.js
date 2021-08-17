import './App.css';
import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom';
// import { Route, Switch, withRouter } from 'react-router-dom'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AddressInput from './components/AddressInput';
import ArticleContainer from './components/ArticleContainer';
import MyArticleContainer from './components/MyArticleContainer';
import CategoryContainer from './components/CategoryContainer';
import Home from './components/Home';

class App extends Component {

  state = {
    id: 0,
    username: '',
    token: '',
    my_articles: [],
    isRead: [],
    congrat: false
  }

  componentDidMount(){
    if(localStorage.token){

      fetch("http://localhost:3000/me", {
        headers: {
          "Authorization": localStorage.token
        }
      })
        .then(res => res.json())
        .then(data => {
          // console.log(data)
          this.setState({
            id: data.user.id,
            my_articles: data.user.my_articles
          })
        })

    }
  }

  login = (userInfo) => {
    console.log(userInfo)
    if (userInfo.token) {
      this.setState({
        id: userInfo.user.id,
        username: userInfo.user.username,
        token: userInfo.token,
        my_articles: userInfo.user.my_articles
      })
      localStorage.token = userInfo.token
      //console.log(this.props.history)
      if (this.props.history.location.pathname === '/login') {
        this.props.history.push('/address')
      }
    }else {
      alert(userInfo.errors)
    }
  }

  logOut = () => {
    this.setState({
      username: "",
      pantries: [],
      token: "",
      id: 0
    })
    localStorage.clear()
    this.props.history.push('/login')
  }

  addMyArticles = (data) => {
    this.setState({
      my_articles: [...this.state.my_articles, data]
    })

  } 

  deleteMyArticles = (deleteID) => {
    let newArr = this.state.my_articles.filter(myArticleObj => {
        return myArticleObj.id !== deleteID
    })
    this.setState({
        my_articles: newArr
    })
}

  goToArticle = (value) => {
    this.props.history.push('/category?duration=' + value)
  }

  resetIsRead = () => {
    this.setState({
      congrat: false,
      isRead: []
    })
  }

  renderArticleContainer = (routerProps) => {
    let articleID = Number(routerProps.match.params.id)
    // console.log(articleID)
    let savedInMyArticle = this.state.my_articles.some(my_article=>{
      return my_article.article.id === articleID
    })
    // console.log(savedInMyArticle)
      return <ArticleContainer savedInMyArticle={savedInMyArticle} addMyArticles={this.addMyArticles} userId={this.state.id} token={this.state.token} logOut={this.logOut}/>
  }

  addReadArticle = (article_id, cb) => {
    this.setState({
      isRead: [...this.state.isRead, article_id].filter(function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      })
    },()=>{cb(this.state.isRead.length)})
  }

  changeCongrat= () => {
    this.setState({
      congrat: true
    })
  }

  render(){
  console.log('app render')
  return (

      <div className="App">
        <Switch>
          {/* <Route path="/" exact component={Home}/> */}
          <Route path="/login">
            <SignIn login={this.login}/>
          </Route>
          <Route path="/signup">
            <SignUp login={this.login}/>
          </Route>
          <Route path="/address">
            <AddressInput logOut={this.logOut} goToArticle={this.goToArticle}/>
          </Route>
          <Route path="/category">
            <CategoryContainer resetIsRead={this.resetIsRead} changeCongrat={this.changeCongrat} congrat={this.state.congrat} isRead={this.state.isRead} addReadArticle={this.addReadArticle} addMyArticles={this.addMyArticles} userId={this.state.id} logOut={this.logOut} token={this.state.token} my_articles={this.state.my_articles}/>
            </Route>
          {/* <Route path="/category">
            <Category categories={this.state.categories} logOut={this.logOut}/>
          </Route> */}
          <Route path="/articles/:id" render={this.renderArticleContainer}>
          </Route>
          <Route path="/myarticle">
            <MyArticleContainer my_articles={this.state.my_articles} deleteMyArticles={this.deleteMyArticles} logOut={this.logOut}/>
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>

  );
  }
}


export default withRouter(App);
