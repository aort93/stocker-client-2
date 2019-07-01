import React from 'react'
import { Grid, Container, Card, Feed, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { v4 } from 'uuid'
import { Bar } from 'react-chartjs-2'

import HomeArticle from '../components/HomeArticle'
import MyStocks from '../components/MyStocks'
// import MyWatchList from '../components/MyWatchList'

class HomePage extends React.Component {

  state = {
        data: {}
  }

  componentDidMount(){
    let high = []
    let low = []
    let symbol = []
    fetch('https://cloud.iexapis.com/stable/stock/market/list/mostactive/?token=pk_a8bb38e4ca7443d6a65134cd95b51606')
    .then(res => res.json())
    .then(data => {
    data.forEach(s => {
                high.push(s.high)
                low.push(s.low)
                symbol.push(s.symbol)
            })

      this.setState({
          data: {
            labels:[...symbol],
            datasets: [{
            label: "Market Low",
            backgroundColor: "rgba(255, 0, 255, 0.75)",
            data: [...low]
              },
              {
              label: "Market High",
              backgroundColor: "rgba(0, 255, 0, 0.75)",
              data: [...high]
              }]}
      })
    })
  }

  componentWillUnmount() {
    console.log("after")
  }

  renderArticles = () => {
    return this.props.homeArticles.map(article => {
      return <HomeArticle key={ v4() } article={article}/>
    })
  }

  renderWatchedStocks = () => {
    // return this.props.currentUser.watched_stocks.map(stock => {
    //   return <MyWatchList key={v4()} stock={stock}/>
    // })
    return 'TSLA - $226.93 - 0.000%'
  }

  renderMyStocks = () => {
    return this.props.currentUser.array.map(stock => {
      return <MyStocks key={ v4() }stock={stock} />
    })
    // return 'hi'
  }

  render() {
    return (
      <Grid>
        <Grid.Column width={12}>
          <h1>Today's Market High and Low</h1>
          <Bar ref="chart" data={this.state.data} />
          <Container text>
          <br/><br/>
          <h3>Today's Top News</h3>
          <Divider style={{backgroundColor:'white'}}/>
          {this.renderArticles()}
          </Container>
        </Grid.Column>

        <Grid.Column width={4}>
        <br/>
        <Card className="sticky3" style={{background:'#333'}}>
          <Card.Content>
            <Card.Header style={{color:"white"}}>Invested Stocks</Card.Header>
            <Divider style={{backgroundColor:'white'}}/>
          </Card.Content>
          <Card.Content>
            <Feed>
              {this.props.currentUser ? this.renderMyStocks() :   null}
            </Feed>
          </Card.Content>
          <Divider style={{backgroundColor:'white'}} />

          <Card.Content>
            <Card.Header style={{color:"white"}}>My WatchList </Card.Header>
            <Divider style={{backgroundColor:'white'}}/>
          </Card.Content>
          <Card.Content>
            <Feed>
              {this.props.currentUser ? this.renderWatchedStocks() : null}
            </Feed>
          </Card.Content>
        </Card>
        </Grid.Column>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    homeArticles: state.homeArticles,
    currentUser: state.currentUser,
    currentStock: state.currentStock
  }
}

export default connect(mapStateToProps)(HomePage);
