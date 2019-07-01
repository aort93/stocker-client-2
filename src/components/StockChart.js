import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Line } from 'react-chartjs-2'
import { Container, Grid, Button } from "semantic-ui-react"


const API_KEY = `${process.env.REACT_APP_API_KEY}`


class StockChart extends React.Component {
  state = {
    chart: {},
    stock: {},
    data: [],
    date: [],
    title: '',
    watched: false
  }

  componentDidMount() {
    this.props.setStock(this.props.match.params.ticker)
    let date = []
    let close = []
    fetch(`https://cloud.iexapis.com/stable/stock/${this.props.match.params.ticker}/chart/1m/?token=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        this.props.setData(data.map(chart => chart.close))
        this.props.setDate(data.map(chart => chart.label))
        this.props.setTitle(this.props.match.params.ticker)
          data.map(p => {
              close.push(p.close)
              date.push(p.date)
              return 'done'
          })
          this.setState({
              data: close,
              date: date
          })
      })
      this.setState({
        data: [],
        date: []
      })
  }

  getData = (time, search, title) => {
    let close = []
    let date = []

    fetch(`https://cloud.iexapis.com/stable/stock/${this.props.match.params.ticker}/chart/${time}/?token=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        this.props.setData(data.map(chart => chart.close))
        this.props.setDate(data.map(chart => chart.label))
        this.props.setTitle(this.props.currentStock)
          data.map(p => {
              close.push(p.close)
              time === "1d" ? date.push(p.minute) : date.push(p.date)
              return 'done'
          })
          this.setState({
              data: close,
              date: date
          })
      })
      this.setState({
        data: [],
        date: []
      })
  }


    oneDay = () => {
        this.getData("1d", this.props.stockInfo.currentStock, "one day")
    }

    oneMonth = () => {
        this.getData("1m", this.props.stockInfo.currentStock, "one month")
    }

    threeMonth = () => {
        this.getData("3m", this.props.stockInfo.currentStock, "three month")
    }

    sixMonth = () => {
        this.getData("6m", this.props.stockInfo.currentStock, "six month")
    }

    oneYear = () => {
        this.getData("1y", this.props.stockInfo.currentStock, "one year")
    }

    twoYear = () => {
        this.getData("2y", this.props.stockInfo.currentStock, "two year")
    }


    fiveYear = () => {
        this.getData("5y", this.props.stockInfo.currentStock, "five year")
    }

    buttonWatch = () => {
      let exists = null

      this.props.currentUser.stocks.forEach( stock => {
        if(stock.symbol.toLowerCase() === this.props.stockInfo.currentStock.toLowerCase()) {
          exists = true;
        } else {
          exists = false;
        }
      })

      if(!exists) {
        let date = new Date()
        fetch("http://localhost:3000/watch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
    				"Accepts": "application/json"
          },
          body: JSON.stringify({
            date: date,
            symbol: this.props.stockInfo.currentStock,
            userId: this.props.currentUser.id,
          })
        })
        .then(r => r.json())
        .then( r => {
          console.log(r)
          this.setState({
            watched: true
          })
        }
        )
      } else {
        console.log('already watching')
      }
    }

    renderButton = () => {
      if (this.state.watched) {
        return <Button color="teal" onClick={this.buttonWatch}> Watching </Button>
      } else {
        return <Button inverted color="teal" onClick={this.buttonWatch}> Watch </Button>
      }

    }


  render() {
    console.log(this.props)
    return (
      <Container>
        <br/><br/>
        <Grid><img src={this.props.stockInfo.logo.url} alt={this.props.stockInfo.company.companyName}/> <h1>{this.props.stockInfo.company.companyName}</h1></Grid>
        <br/>

        {this.props.currentStock ? <Button inverted color='teal' onClick={this.oneDay}>1 Day</Button> : null}
        {this.props.currentStock ? <Button inverted color='teal' onClick={this.oneMonth}>1 Month</Button> : null}
        {this.props.currentStock ? <Button inverted color='teal' onClick={this.threeMonth}>3 Months</Button > : null}
        {this.props.currentStock ? <Button inverted color='teal' onClick={this.sixMonth}>6 Months</Button> : null}
        {this.props.currentStock ? <Button inverted color='teal' onClick={this.oneYear}>1 Year</Button> : null}
        {this.props.currentStock ? <Button inverted color='teal' onClick={this.twoYear}>2 Year</Button> : null}
        {this.props.currentStock ? <Button inverted color='teal' onClick={this.fiveYear}>5 Year</Button> : null}


        <br/><br/>

        <div style={{position:"relative", width:'100%', height: '50%' }} >
                {this.props.currentStock ?
                  <Line
                    ref="chart"
                    data={{
                    labels: this.props.date,
                    datasets: [{
                        label: this.props.title.toUpperCase(),
                        backgroundColor: "rgba(75,192,192,0.4)",
                        data: this.props.data,
                        lineTension: 0.0,
                        fill: false,
                        borderColor: "rgba(75,192,192,1)",
                        pointHoverRadius: 2,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 0,
                        pointHitRadius: 2
                    }]}} options= {{
        legend: {
            labels: {fontColor: 'white'},
            label: {fontColor: 'white'}
        }
    }}
                    /> : <div className="ping">...</div>}
            </div>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentStock: state.currentStock,
    stockInfo: state.stockInfo,
    date: state.date,
    data: state.data,
    title: state.title
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setData: (data) => {
      dispatch({
        type: "SET_DATA",
        payload: data
      })
    },
    setDate: (date) => {
      dispatch({
        type: "SET_DATE",
        payload: date
      })
    },
    setTitle: (stock) => {
      dispatch({
        type: "SET_TITLE",
        payload: stock
      })
    },
    setStock: (stock) => {
      dispatch({
        type: "SET_CURRENT_STOCK",
        payload: stock
      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StockChart));
