import React, { Component } from "react";
//import logo from './logo.svg';
import { Route, Link, Switch, Redirect } from "react-router-dom";
import ReactDOM from "react-dom";
import "./App.css";
import Store from "./stores/Store";
import { connect } from "react-redux";
import * as actionCreators from "./action";
//import HeaderTimeline from "./headerTimeline";
class Login extends Component {
  constructor(props) {
    super(props);
  }
  //on changing input fields
  handleChange = e => {
    Store.dispatch(actionCreators.inputChange(e.target.name, e.target.value));
    if (e.target.name === "psw") {
      if (this.props.data.psw.length < 7 && this.props.data.psw.length != 0) {
        Store.dispatch(actionCreators.ChangePswMsg("Enter Strong Password"));
      } else {
        Store.dispatch(actionCreators.ChangePswMsg());
      }
    }

    if (e.target.name === "email") {
      var reg = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

      var emailValid = reg.test(e.target.value);
      if (!emailValid) {
        Store.dispatch(actionCreators.ChangeEmailMsg("Enter valid mail"));
      } else {
        Store.dispatch(actionCreators.ChangeEmailMsg());
      }
    }
  };
  //on submit send email and password to back end if no match then through msg else login account and render to timeline field
  handleSubmit = event => {
    console.log(this.props.data.psw);
    event.preventDefault();
    var isEmail = false,
      isPsw = false;
    if (this.props.data.psw.length === 0) {
      Store.dispatch(actionCreators.ChangePswMsg("Enter Password"));
      isPsw = false;
    } else if (this.props.data.pswMsg === "Enter Strong Password") {
      Store.dispatch(actionCreators.ChangePswMsg("Enter Strong Password"));
      isPsw = false;
    } else {
      Store.dispatch(actionCreators.ChangePswMsg());
      isPsw = true;
    }
    if (this.props.data.email.length === 0) {
      Store.dispatch(actionCreators.ChangeEmailMsg("Enter Email Address"));
      isEmail = false;
    } else if (this.props.data.emailMsg === "Enter valid mail") {
      Store.dispatch(actionCreators.ChangeEmailMsg("Enter valid mail"));
      isEmail = false;
    } else {
      Store.dispatch(actionCreators.ChangeEmailMsg());
      isEmail = true;
    }
    if (isEmail && isPsw) {
      fetch("http://localhost:2007/login", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          email: this.props.data.email
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(responseJ => {
          console.log(responseJ);
          if (Object.keys(responseJ).length !== 0) {
            fetch("http://localhost:2007/login/verify", {
              method: "POST",
              mode: "cors",
              body: JSON.stringify({
                email: this.props.data.email
              }),
              headers: { "Content-Type": "application/json" }
            })
              .then(response => response.json())
              .then(responseJ => {
                console.log(responseJ);
                if (Object.keys(responseJ).length !== 0) {
                  fetch("http://localhost:2007/login/password", {
                    method: "POST",
                    mode: "cors",
                    body: JSON.stringify({
                      psw: this.props.data.psw,
                      email: this.props.data.email
                    }),
                    headers: { "Content-Type": "application/json" }
                  })
                    .then(response => response.json())
                    .then(responseJ => {
                      console.log(responseJ);
                      if (Object.keys(responseJ).length !== 0) {
                        Store.dispatch(actionCreators.ChangeEmailMsg("Exist"));
                        localStorage.setItem("userId", responseJ[0]._id);
                        localStorage.setItem("username", responseJ[0].username);
                        this.props.history.push("/headerTimeline", null);

                        console.log(localStorage.getItem("username"));
                      } else {
                        Store.dispatch(
                          actionCreators.ChangeEmailMsg("Password Incorrect")
                        );
                      }
                    })
                    .catch(e => console.log("err", e));
                  {
                    localStorage.getItem("username") != null
                      ? this.props.history.push("/headerTimeline")
                      : null;
                  }
                } else {
                  Store.dispatch(actionCreators.ChangeEmailMsg("Not Verified"));
                }
              })
              .catch(e => console.log("err", e));
          } else {
            Store.dispatch(actionCreators.ChangeEmailMsg("Not Exist"));
          }
        })
        .catch(e => console.log("err", e));
    }
  };
  componentDidMount() {
    console.log("in did mount");
  }
  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <div className="navbar navbar-inverse navbar-fixed-top" />

        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="login_sec">
                <h1>Log In</h1>
                <ul>
                  <li>
                    <span>Email-ID</span>
                    <input
                      placeholder="Enter your email"
                      type="text"
                      onChange={this.handleChange}
                      name="email"
                    />
                    <p style={{ color: "red", fontStyle: "italic" }}>
                      {this.props.data.emailMsg}{" "}
                    </p>
                  </li>
                  <li>
                    <span>Password</span>
                    <input
                      className="password"
                      placeholder="Enter your password"
                      type="password"
                      onChange={this.handleChange}
                      name="psw"
                    />
                    <p style={{ color: "red", fontStyle: "italic" }}>
                      {this.props.data.pswMsg}
                    </p>
                  </li>
                  <li>
                    <input type="checkbox" id="myCheck" />
                    Remember Me
                  </li>
                  <li>
                    {" "}
                    <a onClick={this.handleSubmit}>
                      <input defaultValue="Log In" type="submit" />
                    </a>
                  </li>
                  <li>
                    <Link to="/forget">Forgot Password</Link>
                  </li>
                </ul>
                <div className="addtnal_acnt">
                  I do not have any account yet.
                  <Link to="/register">
                    <a>Create My Account Now !</a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="content_lft">
              <h1>Welcome from PPL!</h1>
              <p className="discrptn">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn't anything embarrassing
                hidden in the middle of text.{" "}
              </p>
              <img src="/images/img_9.png" alt />{" "}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log("i want to map all  Login states", state);
  return {
    data: state.ReducerLogin
  };
};
export default connect(mapStateToProps)(Login);
