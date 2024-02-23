import './App.css';
import { Component } from 'react';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import data from './data';
import dataEdit from "./dataEdit";
import dataSearch from './dataSearch';

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/vaccinestatus' exact={true} component={data}/>
            <Route path='/vaccinestatus/get' component={dataSearch}/>
            <Route path='/vaccinestatus/:id' component={dataEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;
