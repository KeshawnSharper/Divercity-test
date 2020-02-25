import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link
} from "react-router-dom";
import Profile from "./Profile";
import Login from "./login";
import Jobs from "./jobs";
import Job from "./Job";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./register"
function App(props) {
  console.log(props)
  const logOut = (props) => {
    localStorage.clear()
  
  };
  
  return (
    <div>
      <Router>
      <nav className="navbar">
       
        <img className="logo" src="https://i.gyazo.com/bd465e1e414e3e006bd65881bb874ffc.png" alt="Image from Gyazo" width="150"/>
        <div className="nav-list">
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
          <NavLink to="/register" activeClassName="active">
            Sign Up
          </NavLink>
          <NavLink to="/login" activeClassName="active">
            Log In
          </NavLink>
          <NavLink onClick={logOut} activeClassName="active" to="/">Log Out
          </NavLink>
        </div>
      </nav>
      <div className="content">
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register}></Route>
      <ProtectedRoute exact path="/profile/:id" component={Profile} />
      <Route exact path="/" component={Jobs} />
      <Route exact path="/job/:id" component={Job} />
      </div>
      <footer>
        <div className="footer-text">
        <p>&copy; 2019 JobSearch</p>
  </div>
</footer>
      </Router>
    </div>
  );
}


export default App;
