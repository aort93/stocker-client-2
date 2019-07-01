import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'
import { connect } from 'react-redux'


class TableCell extends React.Component {

  render() {
    // console.log(this.props)
    return (
      <React.Fragment>
        <Table.Row>
          <Table.Cell><Link to={`/companies/${this.props.stock.symbol}`}>{this.props.stock.name}</Link></Table.Cell>
          <Table.Cell>{this.props.stock.symbol.toUpperCase()}</Table.Cell>
          <Table.Cell>{this.props.stock.total_stocks}</Table.Cell>
          <Table.Cell>{this.props.stock.current_price.toFixed(2)}</Table.Cell>
          <Table.Cell>{this.props.stock.avg_pps ? this.props.stock.avg_pps.toFixed(2) : 0}</Table.Cell>
          <Table.Cell>{this.props.stock.total_market_val.toFixed(2)}</Table.Cell>
          <Table.Cell>{parseFloat(this.props.stock.percent_gain_loss).toFixed(5)}</Table.Cell>
        </Table.Row>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentStock: state.currentStock,
    stockInfo: state.stockInfo,
    portfolio: state.portfolio
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

export default connect(mapStateToProps, mapDispatchToProps)(TableCell);
