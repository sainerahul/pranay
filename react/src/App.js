import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navigation from './components/navigation';
import Login from './components/login';
import PreLogin from './components/prelogin';
import EmployeeDashboard from './components/employeeDashboard';
import CustomerDashboard from './components/customerDashboard';
import InsertCustomer from './components/insertCustomer';
import './App.css';
import { ProtectedRoute } from '../src/components/protectedRoute'
import { CustomerProtectedRoute } from '../src/components/customerProtectedRoute'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={PreLogin}></Route>
          <Route path="/customers/login" exact><Navigation /><Login /></Route>
          <Route path="/customers/signUp" exact><Navigation /><InsertCustomer /></Route>
          <Route path="/employees/login" exact><Navigation /><Login /></Route>
          <ProtectedRoute exact path="/employees/dashboard" component={EmployeeDashboard}></ProtectedRoute>
          <CustomerProtectedRoute exact path="/customers/dashboard" component={CustomerDashboard}></CustomerProtectedRoute>
          <Route path="*" component={() => "404 not found"}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
