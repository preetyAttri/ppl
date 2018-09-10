import React, { Component } from "react";
//import logo from './logo.svg';
import "./App.css";
import ReactDOM from "react-dom";
import Store from "./stores/Store";
import { connect } from "react-redux";
import * as actionCreators from "./action";
class Forget extends Component {
  constructor(props) {
    super(props);
  }
  handleChange = e => {
    Store.dispatch(actionCreators.inputChange(e.target.name, e.target.value));
    var reg = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    var emailValid = reg.test(e.target.value);
    if (!emailValid) {
      Store.dispatch(actionCreators.ChangeEmailMsg("Enter valid mail"));
    } else {
      Store.dispatch(actionCreators.ChangeEmailMsg());
    }
  };
  ok = () => {
    var pop = document.getElementById("pop_forgt");
    ReactDOM.findDOMNode(pop).style.visibility = "hidden";
    this.props.history.push("/login");
  };
  submit = e => {
    var isEmail = false;
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
    if (isEmail) {
      fetch("http://localhost:2007/forget", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          email: this.props.data.email
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(responseJ => {
          if (responseJ) {
            Store.dispatch(actionCreators.ChangeEmailMsg());

            var pop = document.getElementById("pop_forgt");
            ReactDOM.findDOMNode(pop).style.visibility = "visible";
          } else {
            Store.dispatch(actionCreators.ChangeEmailMsg("Not Exist"));
            var pop = document.getElementById("pop_forgt");
            ReactDOM.findDOMNode(pop).style.visibility = "hidden";
          }
        })
        .catch(e => console.log(e));
    }
  };
  componentDidMount() {
    console.log("in did mount");
  }
  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <title>Forgot Password</title>
        <div
          style={{ visibility: "hidden" }}
          className="popup_sec"
          id="pop_forgt"
        >
          <div className="clos_btn">
            <img src="/images/clos.png" alt id="clos_pop" />
          </div>
          <div className="pop_hdr">
            A mail has been send to your e-mail Id for Reset Password Link
          </div>
          <div className="man_contnt">
            <span>Please Check Your Mail Box!</span>
            <input defaultValue="Ok" type="submit" onClick={this.ok} />
          </div>
        </div>
        <div className="navbar navbar-inverse navbar-fixed-top" />
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="register_sec">
                <h1>Forgot Password</h1>
                <ul>
                  <li>
                    <span>Enter E-mail ID</span>
                    <input
                      placeholder="User@gmail.com"
                      type="text"
                      name="email"
                      onChange={this.handleChange}
                    />
                  </li>
                  <p id="mycheck" style={{ color: "red", fontStyle: "italic" }}>
                    {this.props.data.emailMsg}
                  </p>
                  <li>
                    <input
                      defaultValue="Submit"
                      type="submit"
                      onClick={this.submit}
                    />
                  </li>
                </ul>
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
  console.log("i want to map all  Forget states", state);
  return {
    data: state.ReducerForget
  };
};
export default connect(mapStateToProps)(Forget);
