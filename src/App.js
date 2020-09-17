import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./styles.css";
import Login from './Login';
import Buyer from './Buyer';
import Seller from './Seller';
import AddLand from './AddLand'
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        
        <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/buyer" exact component={Buyer} />
        <Route path="/seller" exact component={Seller}/>
        <Route path="/seller/addLand" exact component={AddLand}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;