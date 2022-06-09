import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Info from './components/pages/Info';
import About from './components/about';
import MapGL from './components/pages/MapGL';
import Login from './components/pages/Login';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/map' component={MapGL} />
          <Route path='/info' component={Info} />
          <Route path='/about' component={About} />
          <Route path='/login' component={Login} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
