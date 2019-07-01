import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'


class TradeComponent extends React.Component {

  state = {
    shares: 1
  }

  handleChange = (e) => {
    this.setState({
      shares: e.target.value
    })
  }

  amountSharesOwned = () => {
    let count = 0;

    if(this.props.currentUser.stocks){
      this.props.currentUser.stocks.forEach( stock => {
        if(stock.symbol === this.props.stockInfo.currentStock) {
          return count += stock.current_shares
        }
      })
    } else {
      return 0
    }


    return count;
  }

  funds = () => {
    return this.props.currentUser.cash_value
  }

  buyStocks = () => {
    let date = new Date()
    fetch("http://localhost:3000/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
				"Accepts": "application/json"
      },
      body: JSON.stringify({
        date: date,
        symbol: this.props.stockInfo.currentStock,
        userId: this.props.currentUser.id,
        shares: this.state.shares
      })
    })
    .then(r => r.json())
    .then(r => {
      if (r.errors) {
        alert(r.errors)
        this.props.buyStocks(this.props.currentUser)
      } else {
        this.props.buyStocks(r)
      }
      this.setState({
        shares: 1
      })
    })
    console.log('buy')
  }

  sellStocks = () => {
    let date = new Date()
    fetch("http://localhost:3000/sell", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
				"Accepts": "application/json"
      },
      body: JSON.stringify({
        date: date,
        symbol: this.props.stockInfo.currentStock,
        userId: this.props.currentUser.id,
        shares: this.state.shares
      })
    })
    .then(r => r.json())
    .then(r => {
      if (r.errors) {
        alert(r.errors)
        this.props.buyStocks(this.props.currentUser)
      } else {
        console.log("hello", r)
        this.props.buyStocks(r)
      }
      this.setState({
        shares: 1
      })
    })
    console.log('sell')
  }
  render() {
    return (
      <div className="sticky">
      {this.props.currentUser ?
        <div  style={{textAlign:"center", marginTop:'30%'}}>
          <h1>Trading!!!</h1>
          <p>{this.props.stockInfo.currentStock.toUpperCase()}</p>

          <p>Number of shares you own: {this.amountSharesOwned()}</p>

          <p>Current Market Value: {this.props.stockInfo ? this.props.stockInfo.company.latestPrice:null}</p>


          <p>How many shares do you wanna buy/sell?</p>
          <input onChange={this.handleChange} type="number" name="number" value={this.state.shares} />
          <br/>

          <p>Estimated Value: {this.state.shares * this.props.stockInfo.company.latestPrice}</p>

          <div >
            <Button inverted color='teal' onClick={this.buyStocks}>Buy</Button>
            <Button inverted color='teal' onClick={this.sellStocks}>Sell</Button>
          </div>

          <p>Funds Avavilbale: {this.funds().toFixed(2)}</p>
          <br /><br />
        </div>
        : null
      }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentStock: state.currentStock,
    stockInfo: state.stockInfo,
    userTransaction: state.userTransaction
  }
}


function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => {
      dispatch({
        type: "SET_USER",
        payload: user
      })
    },
    setStock: (stockSymbol) => {
      dispatch({
        type: "SET_CURRENT_STOCK",
        payload: stockSymbol
      })
    },
    buyStocks: (stock) => {
      dispatch({
        type: "BUY_STOCK",
        payload: stock
      })
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(TradeComponent)
