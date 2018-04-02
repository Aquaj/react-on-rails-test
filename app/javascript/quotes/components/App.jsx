import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import QuotesDisplay from './QuotesDisplay'

const App = (props) => (
  <Router>
    <Route
      path='/'
      render={(routeProps) => <QuotesDisplay startingAt={props.starting} {...routeProps} />}
    />
  </Router>
)

export default App
