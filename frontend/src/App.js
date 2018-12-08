import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Home from './Home';
import QSI from './QSI';
import Regression from './Regression';
import Simplex from './Simplex';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar inverse fluid fixedTop>
          <Navbar.Header>
            <Navbar.Brand><a href="/">S1MPLE 50LVER</a></Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem href="/regression">Polynomial Regression</NavItem>
            <NavItem href="/qsi">Quadratic Spline Interpolation</NavItem>
            <NavItem href="/simplex">Simplex</NavItem>
          </Nav>
        </Navbar>
        <Router>
          <div style={{paddingTop: 40,paddingLeft: 20, paddingRight: 20}}>
            <Route exact={true} path="/" component={Home}/>
            <Route exact={true} path="/qsi" component={QSI}/>
            <Route exact={true} path="/regression" component={Regression}/>
            <Route exact={true} path="/simplex" component={Simplex}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
