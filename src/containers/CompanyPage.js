import React from 'react'
import { connect } from 'react-redux'
import { Grid, Container } from 'semantic-ui-react'

import StockChart from '../components/StockChart'
import CompanyInfo from '../components/CompanyInfo'
import TradeComponent from '../components/TradeComponent'

class CompanyPage extends React.Component {
  componentDidMount() {
    this.props.setStock(this.props.match.params.ticker)
    this.props.setCurrentSymbol(this.props.match.params.ticker)
    fetch(`http://localhost:3000/companies/${this.props.match.params.ticker}`)
    .then(r => r.json())
    .then(data => {
      // this.props.setFinancials(data.financials)
      this.props.setCurrentCompany(data.company)
      this.props.setCurrentArticle(data.company_news)
      this.props.setLogo(data.logo)
    })
  }


  render() {
    console.log(this.props)
    return (
      <Grid>
        <Grid.Column width={12}>
          <Container>
            <StockChart />
            <CompanyInfo />
          </Container>
        </Grid.Column>
        <Grid.Column width={4}>
          <TradeComponent />
        </Grid.Column>
      </Grid>
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
    setArticles: (homeArticles) => {
      dispatch({
        type: "SET_HOME_ARTICLES",
        payload: homeArticles
      })
    },
    setUser: (user) => {
      dispatch({
        type: "SET_USER",
        payload: user
      })
    },
    setStock: (stockSymbol) => {
      dispatch({
        type: "SELECT_STOCK",
        payload: stockSymbol
      })
    },
    setCurrentSymbol: (symbol) => {
      dispatch({type: "SET_CURRENT_STOCK", payload: symbol})
    },
    setFinancials: (financials) => {
      dispatch({type: "SET_FINANCIALS", payload: financials})
    },
    setCurrentCompany: (company) => {
      dispatch({type: "SET_COMPANY_INFO", payload: company})
    },
    setCurrentArticle: (article) => {
      dispatch({type: "SET_ARTICLE_INFO", payload: article})
    },
    setLogo: (logo) => {
      dispatch({type: "SET_LOGO", payload: logo})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyPage);
