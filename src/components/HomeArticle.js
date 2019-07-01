import React from 'react'
import { Container, Icon, Divider } from 'semantic-ui-react'


class HomeArticle extends React.Component {

  render() {
    // console.log(this.props)
    return (
      <Container text>
          <a target="_blank" href={this.props.article.link}><Icon disabled name='newspaper' /> {this.props.article.headline}</a>
          <p>Date: {this.props.article.date}</p>
          <p>Summary: {this.props.article.summary}</p>
          <br />
          <Divider style={{backgroundColor:'white'}}/>
      </Container>
    )
  }
}

export default HomeArticle
