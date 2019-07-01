import React from 'react'
import '../App.css'
import { Menu, Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom'
import Autocomplete from './Autocomplete'
import symbol from '../stocksymbols'

import { connect } from 'react-redux'

class NavBar extends React.Component {
  render() {
    return (
      <Grid.Row className="sticky2">
      <Menu inverted>
      {this.props.currentUser?
        <React.Fragment >
        <Grid.Column width={6}>
        <Menu.Menu position="left" >
        <Link className="item" to={`/`}>
           Stocker
        </Link>

        </Menu.Menu>
        </Grid.Column>
        <Autocomplete
              suggestions={
                symbol.map(symbol => {
                  return `${symbol.symbol} - ${symbol.name}`
                })
              }
        />


        <Menu.Menu position="right">
      	<Link className="item" to={`/profile/${this.props.currentUser.username}`}>
      			{this.props.currentUser.username}
      	</Link>
      	<p className="item" onClick={this.props.logOut}>
      			Log out
      	</p>
        </Menu.Menu>
        </React.Fragment>
      	:

        <React.Fragment>
        <Grid.Column width={6}>
        <Menu.Menu position="left" >
        <Link className="item" to={`/`}>
           Stocker
        </Link>

        </Menu.Menu>
        </Grid.Column>
        <Autocomplete
              suggestions={
                symbol.map(symbol => {
                  return `${symbol.symbol} - ${symbol.name}`
                })
              }
        />


        <Menu.Menu position="right">
					<Link className="item" to="/login">
						Login
					</Link>
					<Link className="item" to="/signup">
						Sign Up
					</Link>
          </Menu.Menu>
        </React.Fragment>
      }
      </Menu>
              </Grid.Row>
    )

  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(NavBar)
