import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddForm from "./AddForm";
import Visualize from "./Visualize";

export default function SideBar() {
  return (
    <Router>
      <div className="container col-2 col-sm-4 col-md-4" style={{backgroundColor:'#808080', height:'100vh'}}>
        <ul style={{paddingLeft:'0px'}} className="pt-2">
          <li className="link" style={{listStyle: 'none', paddingLeft:'10px'}}>
            <Link style={{textDecoration: 'none',color:'#ffffff',fontSize:'24px'}} to="/">AddForm</Link>
          </li>
          <li className="link" style={{listStyle: 'none', paddingLeft:'10px'}}>
            <Link style={{textDecoration: 'none',color:'#ffffff',fontSize:'24px' }} to="/visualize">Visualize</Link>
          </li>
        </ul>
      </div>
      <Switch>
        <Route exact path="/">
          <AddForm />
        </Route>
        <Route path="/visualize">
          <Visualize />
        </Route>
      </Switch>
    </Router>
  );
}
