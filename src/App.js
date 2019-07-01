import React from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom'

import NavBar from './components/NavBar'
import LoginPage from './containers/LoginPage'
import ProfilePage from './containers/ProfilePage'
import SignUpPage from './containers/SignUpPage'
import HomePage from './containers/HomePage'
import CompanyPage from './containers/CompanyPage'


import { connect } from 'react-redux'

class App extends React.Component {
  logOut = () => {
    localStorage.removeItem("token")
    this.props.setUser(null)
    this.props.history.push("/")
  }

  componentDidMount(){
    fetch('http://localhost:3000/home_articles')
    .then( r => r.json() )
    .then( data => {
        this.props.setArticles(data)
    })
    
    const token = localStorage.getItem("token")

    if (token){
      fetch("http://localhost:3000/auto_login", {
        headers: {
          "Authorization": token
        }
      })
      .then(res => res.json())
      .then((response) => {
        if (response.errors) {
          console.log('auto-login failed')
          alert(response.errors)
        } else {
          console.log('auto-login success');
          this.props.setUser(response)
        }
      })
    }
  }
  render() {
    console.log(this.props.currentUser)
    return (
      <div className="App">
        <NavBar logOut={this.logOut}/>
        <Switch>
          {this.props.currentUser ? <Route path= {`/profile/${this.props.currentUser.username}`} render={(routeProps) => {
            return <ProfilePage {...routeProps} />
          }} /> : null}

          <Route path= "/login" render={(routeProps) => {
						return <LoginPage {...routeProps}/>
					}} />

          <Route path= "/signup" render={(routeProps) => {
						return <SignUpPage {...routeProps}/>
					}} />

          <Route path= {`/companies/:ticker`} render={(routeProps) => {
            return <CompanyPage {...routeProps} currentStock={routeProps.match.params.ticker} thisStock={this.props.stockInfo}/>
          }} />

          <Route exact path= "/" render={(routeProps) => {
            return <HomePage {...routeProps} />
          }} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    homeArticles: state.homeArticles,
    currentUser: state.currentUser,
    stockInfo: state.stockInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setArticles: (homeArticles) => {
      dispatch({
        type: "SET_HOME_ARTICLES",
        payload: homeArticles
      })
    },
    setStock: (stockSymbol) => {
      dispatch({
        type: "SELECT_STOCK",
        payload: stockSymbol
      })
    },
    setUser: (user) => {
      dispatch({
        type: "SET_USER",
        payload: user
      })
    }}

    }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
