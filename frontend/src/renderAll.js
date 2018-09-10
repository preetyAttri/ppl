import React from "react";
import "./App.css";
//import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Switch, Route } from "react-router-dom";

import MainHeader from "./mainHeader";
class RenderAll extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" component={MainHeader} />
        </Switch>
      </div>
    );
  }
}
export default RenderAll;
