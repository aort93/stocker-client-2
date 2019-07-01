import React from 'react'
import { Feed } from 'semantic-ui-react'

class MyWatchList extends React.Component {
  render() {
    console.log(this.props)
    return (
      <Feed.Event>
      { this.props.stock ?
        <Feed.Content>
          <Feed.Summary style={{color:"white"}}>{this.props.stock.name} - {this.props.stock.symbol} = {this.props.stock.curr_price}</Feed.Summary>
        </Feed.Content>
        : null}
      </Feed.Event>
    )
  }
}

export default MyWatchList
