import './App.css';
import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import { Route, Switch, withRouter } from 'react-router-dom'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AddressInput from './components/AddressInput';
import ArticleContainer from './components/ArticleContainer';
import CategoryContainer from './components/CategoryContainer';

class App extends Component {

  state = {
    id: 0,
    username: '',
    token: '',
    categories: []
  }

  login = () => {

  }
  render(){
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* <Route path="/" exact component={Home}/> */}
          <Route path="/Login" component={SignIn}/>
          <Route path="/SignUp" component={SignUp}/>
          <Route path="/Address" component={AddressInput}/>
          <Route path="/Article">
            <CategoryContainer categories={this.state.categories}/>
          </Route>

        </Switch>
      </div>
    </Router>
  );
  }
}


export default App;
