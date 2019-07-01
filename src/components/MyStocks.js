import React from 'react'
import { connect } from 'react-redux'
import { Feed } from 'semantic-ui-react'

class MyStocks extends React.Component {
  render() {
    return (
      <Feed.Event>
      { this.props.currentUser ?
        <Feed.Content>
          <Feed.Summary style={{color:"white"}}>{this.props.stock.name} - ${this.props.stock.current_price} - {this.props.stock.percent_gain_loss.toFixed(3)}%</Feed.Summary>
        </Feed.Content>
        : null}
      </Feed.Event>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}


export default connect(mapStateToProps)(MyStocks);
