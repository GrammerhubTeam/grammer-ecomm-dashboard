import React from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
// import logo from './logo.svg';
import Dashboard from './Dashboard'
import './App.css'
import SignUp from './SignUp'
import Login from './Login'

const App = () => {
  const windowActive = typeof window !== 'undefined'

  const ValidateUserForDashboard = () => {
    if (windowActive) {
      const signedIn = window.localStorage.getItem('isSignedIn')

      if (signedIn) {
        return <Dashboard />
      }
      return <Redirect to="/signup" />
    }
    return <Redirect to="/signup" />
  }

  const RenderPublicPage = (Component) => () => {
    // if (windowActive) {
    //   // const signedIn = window.localStorage.getItem('isSignedIn')

    //   if (signedIn) {
    //     return <Dashboard />
    //   }
    //   return <Redirect to="/signup" />
    // }
    return <Component />
  }

  const Homepage = () => {
    return <h1>HOMEPAGE GRAH</h1>
  }

  const RenderDashboard = () => {
    return <Dashboard />
  }

  return (
    <Router>
      <Route path="/" exact render={Homepage} />
      <Route path="/login" exact render={RenderPublicPage(Login)} />
      <Route path="/signup" exact render={RenderPublicPage(SignUp)} />
      <Route path="/dashboard" exact render={ValidateUserForDashboard} />
    </Router>
  )
}

export default App;
