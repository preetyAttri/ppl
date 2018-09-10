import React, { Component } from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import ReactDOM from "react-dom";
import Login from "./login";
import Register from "./register";
import Reset from "./reset";
import Forget from "./forget";
import Header from "./header";
import Footer from "./footer";
import HeaderTimeline from "./headerTimeline";
class MainHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log("in did mount");
  }
  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <div>
          
            <Route
              exact path={[
                "/",
                "/register",
                "/login",
                "/headerTimeline",
        
                "/reset/:number",
                "/forget"
              ]}
              component={Header}
            />
          

          {localStorage.getItem("username") != null ? (
            <Switch>

              <Route exact path="/reset/:number" component={Reset} />
              <Route exact path="/forget" component={Forget} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/headerTimeline" component={HeaderTimeline} />
              <Route exact path="/" component={Register} />
            </Switch>
          ) : (
            <Switch>
              <Route path={["/login", "/headerTimeline"]} component={Login} />
         
              <Route exact path="/reset/:number" component={Reset} />
              <Route exact path="/forget" component={Forget} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/" component={Register} />
            </Switch>
          )}

          
            <Route
             exact path={[
                "/",
                "/register",
                "/login",
                "/headerTimeline",
                  "/reset/:number",
                "/forget"
              ]}
              component={Footer}
            />
          
        </div>
      </div>
    );
  }
}
export default MainHeader;
