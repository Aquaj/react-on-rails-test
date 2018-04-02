import React from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import axios from 'axios'

import QuoteText from './QuoteText'
import QuoteNavigation from './QuoteNavigation'

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
        this.quoteId = this.props.startingAt;
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
      <div className='quote-container'>
        { prevQuote && <QuoteNavigation direction='previous' otherQuote={prevQuote} /> }
        <QuoteText quote={this.state.quote} />
        { nextQuote && <QuoteNavigation direction='next' otherQuote={nextQuote} /> }
      </div>
    )
  }
}

export default QuotesDisplay
