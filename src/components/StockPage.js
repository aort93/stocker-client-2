import React from 'react'
import { connect } from 'react-redux'
import { Doughnut, Pie } from 'react-chartjs-2';
import {Grid} from 'semantic-ui-react'

class StockPage extends React.Component {

  state = {
    currentNetStockValue: {},
    currentCashValue: {}
  }

  componentDidMount () {
    fetch(`http://localhost:3000/users/${this.props.currentUser.id}`)
    .then (r => r.json())
    .then(data => {
      let total = 0
      let ticker = []
      let totalStocks = []
      let background = []

      const getColor = () => {
        let str = '0123456789ABCDEF'
        let color = "#"

        for(let i = 0; i < 6; i++) {
          color += str[Math.floor(Math.random() * 16)]
        }

        return color
      }

      data.array.forEach( stock => {
        total += stock.total_market_val
        ticker.push(stock.symbol)
        totalStocks.push(stock.total_market_val)
        background.push(getColor())
      })

      this.setState({
        currentNetStockValue: {labels: [
      		"Cash", "Stocks"
      	],
      	datasets: [{
      		data: [data.cash_value, total],
      		backgroundColor: [
      		'#FF6384',
      		'#36A2EB'
      		],
      		hoverBackgroundColor: [
      		'#FF6384',
      		'#36A2EB'
      		]
      	}]},
        currentCashValue:{labels: [
      		...ticker
      	],
      	datasets: [{
      		data: [...totalStocks],
      		backgroundColor: [
      		...background
      		],
      		hoverBackgroundColor: [
      		...background
      		]
      	}]}
      })
    })
  }

  render() {
    return (
      <Grid>
          <Grid.Column width={7}>
            <h2>Portfolio Value</h2>
            <Doughnut data={this.state.currentNetStockValue} options={{
            responsive: true,
            maintainAspectRatio: true,
            }}/>
          </Grid.Column>
          <Grid.Column width={7}>
            <h2>Stocks Invetsments</h2>
            <Pie data={this.state.currentCashValue} options={{
            responsive: true,
            maintainAspectRatio: true,
            }}/>
          </Grid.Column>
      </Grid>

    )
  }
}

function mapStateToProps(state) {
  return {
    homeArticles: state.homeArticles,
    currentUser: state.currentUser,
    userTransaction: state.userTransaction

  }
}

function mapDispatchToProps(dispatch) {
  return {
    setTransaction: (userTransaction) => {
      dispatch({
        type: "GET_TRANSACTION",
        payload: userTransaction
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockPage);
