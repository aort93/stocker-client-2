import React from 'react'
import { connect } from 'react-redux'
import StockPage from '../components/StockPage'
import StockList from '../components/StockList'
import TableCell from '../components/TableCell'
import { Table, Container } from 'semantic-ui-react'
import { v4 } from 'uuid'


class ProfilePage extends React.Component {

  state = {
    data: null
  }

  renderTransactions = () => {
    return this.props.currentUser.stocks.map(stock => {
      return <StockList key={ v4() } stock={stock}/>
    })
  }

  renderTableData = () => {
    if(this.props.currentUser) {
      return this.props.currentUser.array.map( obj => {
        return <TableCell key={ v4() } stock={obj} />
      })
    } else {
      return null
    }
  }

  renderPortfolioValue = () => {
    let total = 0
    if(this.props.currentUser) {
      this.props.currentUser.array.forEach(obj => total += obj.total_market_val)
    }

    return <h2>${total + this.props.currentUser.cash_value}</h2>
  }


  render() {
    console.log(this.props)
    return (
      <Container>
        <br/>
        <Container>
        <h2>Welcome, {this.props.currentUser.username}</h2>
        <h4>{this.props.currentUser.first_name}  {this.props.currentUser.last_name}</h4>
        <h4>Portfolio Value</h4>
        { this.props.currentUser ? this.renderPortfolioValue() : null}
        <p>Portfolio Value represents the total value of all the holdings in your account, including cash.</p>
        </Container>

        <StockPage data={this.state.data}/>

        <br/><br/><br/>
        <Container>
        <Table inverted>
          <Table.Header >
          <Table.Row>
            <Table.HeaderCell>Current Holding</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
            <Table.Row>
              <Table.HeaderCell>Company</Table.HeaderCell>
              <Table.HeaderCell>Symbol</Table.HeaderCell>
              <Table.HeaderCell>Stocks You Own</Table.HeaderCell>
              <Table.HeaderCell>Market Price</Table.HeaderCell>
              <Table.HeaderCell>Your Avg Price</Table.HeaderCell>
              <Table.HeaderCell>Market Total</Table.HeaderCell>
              <Table.HeaderCell>Percent Gain/Loss</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { this.renderTableData() }
          </Table.Body>
        </Table>
        </Container>


        <br/><br/><br/>


        {this.props.currentUser ?
          <Container>

            <Table inverted>
              <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Transaction History</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>Stock Company</Table.HeaderCell>
                <Table.HeaderCell>Symbol</Table.HeaderCell>
                <Table.HeaderCell>Price at Purchase</Table.HeaderCell>
                <Table.HeaderCell>Trade Type</Table.HeaderCell>
                <Table.HeaderCell>Purchase/Sell Date</Table.HeaderCell>
                <Table.HeaderCell>Quantity Purchased/Sold</Table.HeaderCell>
                <Table.HeaderCell>Total</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>

            <Table.Body>
            { this.renderTransactions() }
            </Table.Body>
            </Table>
          </Container>
          : null}
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentStock: state.currentStock,
    portfolio: state.portfolio
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setPortfolio: (portfolio) => {
      dispatch({
        type: "SET_PORTFOLIO",
        payload: portfolio
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
