import React from 'react';
import './static/App.css';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './routes/Home';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Logout from './routes/Logout';
import Dashboard from './routes/Dashboard';
import MyWorkouts from './routes/MyWorkouts';
import Workout from './routes/Workout';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div style={{ minHeight: 90+"vh", width: 100+"%" }}>
        <Switch>
          <Redirect from="/Home" to="/" />
          <Route exact path="/" component={Home} />

          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/logout" component={Logout} />
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/My Workouts" component={MyWorkouts} />

          <Route path="/workout/:id" component={Workout} />
        </Switch>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
