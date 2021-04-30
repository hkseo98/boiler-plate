import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import React from "react";
import LoginPage from './components/views/LoginPage/LoginPage'
import LandingPage from './components/views/LandingPage/LandingPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import NavBar from './components/views/NavBar/NavBar'
import Footer from './components/views/Footer/Footer'


function App() {
  return (
    <Router>
       <div>
    <ul>
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/login'}>
            Login
          </Link>
        </li>
      </ul>
      <Switch>
          <Route exact path="/">
            <LandingPage/>
          </Route>
          <Route exact path="/login">
            <LoginPage/>
          </Route>
        </Switch>
        </div>
      </Router>
  );
}

export default App;
