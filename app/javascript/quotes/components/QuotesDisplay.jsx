import React from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import axios from 'axios'

class QuotesDisplay extends React.Component {
  constructor () {
    super()
    this.state = {
      quote: {}
    }
  }

  fetchQuote (id) {
    axios.get(`/api/quotes/${id}`)
      .then(response => {
        this.setState({ quote: response.data })
      })
      .catch(error => {
        this.quoteId = this.props.starting;
        this.props.history.push(`/?quote=${this.quoteId}`);
      })
  }

  setQuoteId (query) {
    this.params = queryString.parse(query)
    if (this.params.quote) {
      this.quoteId = Number(this.params.quote);
    } else {
      this.quoteId = this.props.starting;
      this.props.history.push(`/?quote=${this.quoteId}`);
    }
  }

  componentDidMount () {
    this.setQuoteId(this.props.location.search)
    this.fetchQuote(this.quoteId)
  }

  componentWillReceiveProps (nextProps) {
    this.setQuoteId(nextProps.location.search)
    this.fetchQuote(this.quoteId)
  }

  render () {
    const prevQuote = this.state.quote.prev_quote
    const nextQuote = this.state.quote.next_quote
    return (
      <div>
        { prevQuote && <Link to={`/?quote=${prevQuote}`}>Prev</Link> }
        { nextQuote && <Link to={`/?quote=${nextQuote}`}>Next</Link> }
        <p>{this.state.quote.text}</p>
        <p>{this.state.quote.author}</p>
      </div>
    )
  }
}

export default QuotesDisplay
