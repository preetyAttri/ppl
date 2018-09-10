import React, { component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Register from "./register";
import Login from "./login";
import SinglePost from "./singlePost";
import Reset from "./reset";
import Forget from "./forget";
import HeaderTimeline from "./headerTimeline";
import Timeline from "./timeline";
import loginSignUp from "./loginSignUp";
import MainHeader from "./mainHeader"
import MainFooter from "./mainFooter" 
class Main extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={loginSignUp} />
          <Route exact path="/reset" component={Reset} />
          <Route exact path="/reset/:number" component={Reset} />
          <Route exact path="/forget" component={Forget} />
          <Route exact path="/headerTimeline" component={HeaderTimeline} />
          <Route exact path="/mainHeader" component={MainHeader} />
          <Route exact path="/mainFooter" component={MainFooter} />
          </Switch>
      </div>
    );
  }
}
export default Main;
