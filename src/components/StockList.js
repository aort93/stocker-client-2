import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'
import { connect } from 'react-redux'


class StockList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Table.Row>
          <Table.Cell>{this.props.stock.name}</Table.Cell>
          <Table.Cell>{this.props.stock.symbol.toUpperCase()}</Table.Cell>
          <Table.Cell>{this.props.stock.price_at_purchase}</Table.Cell>
          <Table.Cell>{this.props.stock.shares_day_purchased > 0 ? "Purchase" : "Sell"}</Table.Cell>
          <Table.Cell>{this.props.stock.date}</Table.Cell>
          <Table.Cell>{this.props.stock.shares_day_purchased > 0 ? this.props.stock.shares_day_purchased : this.props.stock.shares_day_purchased * (-1)}</Table.Cell>
          <Table.Cell> ${this.props.stock.total_day_bought > 0 ? this.props.stock.total_day_bought.toFixed(2) : this.props.stock.total_day_bought.toFixed(2) * (-1) }</Table.Cell>
          <Table.Cell>
          <Link to={`/companies/${this.props.stock.symbol}`}>
          <button>
                Info
              </button>
          </Link>
          </Table.Cell>
        </Table.Row>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentStock: state.currentStock,
    stockInfo: state.stockInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setStock: (stockSymbol) => {
      dispatch({
        type: "SELECT_STOCK",
        payload: stockSymbol
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockList);
