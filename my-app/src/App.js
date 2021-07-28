import './App.css';
import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom';
// import { Route, Switch, withRouter } from 'react-router-dom'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AddressInput from './components/AddressInput';
import ArticleContainer from './components/ArticleContainer';
import MyArticle from './components/MyArticle';
import CategoryContainer from './components/CategoryContainer';

class App extends Component {

  state = {
    id: 0,
    username: '',
    token: '',
    categories: []
  }

  componentDidMount(){ 
    fetch(`http://localhost:3000/category`)
    .then((response)=> response.json())
    .then((data)=> {
        this.setState({
            categories: data}) 
        })
    .catch(()=>{
        console.log("error")
    })
}

  login = (userInfo) => {
    console.log(userInfo)
    if (userInfo.token) {
      this.setState({
        id: userInfo.user.id,
        username: userInfo.user.username,
        token: userInfo.token
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


  goToArticle = (value) => {
    this.props.history.push('/category?duration=' + value)
  }

  render(){
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
            <CategoryContainer logOut={this.logOut} categories={this.state.categories}/>
            </Route>
          {/* <Route path="/category">
            <Category categories={this.state.categories} logOut={this.logOut}/>
          </Route> */}
          <Route path="/article">
            <ArticleContainer/>
          </Route>
          <Route path="/myarticle">
            <MyArticle/>
          </Route>
        </Switch>
      </div>

  );
  }
}


export default withRouter(App);
