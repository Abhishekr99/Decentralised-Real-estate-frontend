import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./styles.css";
import Login from './Login';
//import Buyer from './Buyer';
import User from './User';
import AddLand from './AddLand'
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        
        <Switch>
        <Route path="/" exact component={Login} />
        
        <Route path="/user" exact component={User}/>
        <Route path="/user/addLand" exact component={AddLand}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;