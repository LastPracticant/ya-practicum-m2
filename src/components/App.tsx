import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Signin from '../pages/signin/Signin'
import './App.css'

class App extends Component {
  render () {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route path='/users'>users</Route>

            <Route path='/about'>about</Route>
            <Route exact path='/'>
              <Signin />
            </Route>
          </Switch>
        </Router>
      </React.Fragment>
    )
  }
}
export default App
