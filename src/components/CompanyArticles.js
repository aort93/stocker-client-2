import React from 'react'
import { Icon } from 'semantic-ui-react'


class CompanyArticles extends React.Component {
  render() {
    return (
      <div>
      <a target="_blank" href={this.props.article.url}><Icon disabled name='newspaper' />{this.props.article.headline}</a>
      <p> Date: {this.props.article.datetime}</p>
      <p> Summary: {this.props.article.summary}</p>
      <br />
      </div>
    )
  }
}

export default CompanyArticles
