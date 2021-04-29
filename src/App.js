import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Pages/login";
import Register from "./Pages/signup";
import Movies from "./Pages/movies";
import Movie from "./Pages/movie";
import Profile from "./Pages/profile";


function App() {
  return (
    <div className="App">
     <Router>
     <Switch>
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/profile" render={() => <Profile />} />
          <Route exact path="/movies" render={() => <Movies/>} />
          <Route exact path="/movie" render={() => <Movie/>} />
          <Route exact path="/" render={() => <Register />} />
        </Switch>
     </Router>
    </div>
  );
}

export default App;
