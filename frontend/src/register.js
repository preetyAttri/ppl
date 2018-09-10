import React, { Component } from "react";
import "./App.css";
import { Route, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import Login from "./login";
import Store from "./stores/Store";
import { connect } from "react-redux";
import * as actionCreators from "./action";
class Register extends Component {
  constructor(props) {
    super(props);
  }
  //on check term and condition
  onCheck = () => {
    Store.dispatch(actionCreators.toggleAgree());
    if (!this.props.data.isAgree) {
      var check = document.getElementById("myCheck");
      ReactDOM.findDOMNode(check).style.color = "black";
    }
  };
  //on changing all input fields
  handleChange = e => {
    Store.dispatch(actionCreators.ChangeUserNameMsg());
    Store.dispatch(actionCreators.ChangeFirstNameMsg());
    Store.dispatch(actionCreators.ChangeLastNameMsg());

    if (e.target.name === "psw") {
      if (this.props.data.psw.length < 7 && this.props.data.psw.length != 0) {
        Store.dispatch(actionCreators.ChangePswMsg("Enter Strong Password"));
      } else {
        Store.dispatch(actionCreators.ChangePswMsg());
      }
    }
    Store.dispatch(actionCreators.inputChange(e.target.name, e.target.value));

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
  //on submit
  handleSubmit = event => {
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    event.preventDefault();
    var isUserName = false,
      isEmail = false,
      isPsw = false,
      isFName = false,
      isLName = false;
    if (this.props.data.username.length === 0) {
      Store.dispatch(actionCreators.ChangeUserNameMsg("Enter User Name"));
      isUserName = false;
    } else {
      for (let i = 0; i < this.props.data.username.length; i++) {
        if (this.props.data.username[i] == " ") {
          console.log("whitespace");
          Store.dispatch(
            actionCreators.ChangeUserNameMsg("Whitespace not allowed")
          );
          isUserName = false;
          break;
        } else {
          Store.dispatch(actionCreators.ChangeUserNameMsg());
          isUserName = true;
        }
      }
    }
    if (this.props.data.psw.length === 0) {
      Store.dispatch(actionCreators.ChangePswMsg("Enter Password"));
      isPsw = false;
    } else if (this.props.data.pswMsg === "Enter strong password") {
      Store.dispatch(actionCreators.ChangePswMsg("Enter strong Password"));
      isPsw = false;
    } else {
      for (let i = 0; i < this.props.data.psw.length; i++) {
        if (this.props.data.psw[i] == " ") {
          console.log("whitespace");
          Store.dispatch(actionCreators.ChangePswMsg("Whitespace not allowed"));
          isPsw = false;
          break;
        } else {
          Store.dispatch(actionCreators.ChangePswMsg());
          isPsw = true;
        }
      }
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
    if (this.props.data.firstName.length === 0) {
      Store.dispatch(actionCreators.ChangeFirstNameMsg("Enter First Name"));
      isFName = false;
    } else {
      for (let i = 0; i < this.props.data.firstName.length; i++) {
        if (this.props.data.firstName[i] == " ") {
          console.log("whitespace");
          Store.dispatch(
            actionCreators.ChangeFirstNameMsg("Whitespace not allowed")
          );
          isFName = false;
          break;
        } else {
          Store.dispatch(actionCreators.ChangeFirstNameMsg());
          isFName = true;
        }
      }
    }
    if (this.props.data.lastName.length === 0) {
      Store.dispatch(actionCreators.ChangeLastNameMsg("Enter Last Name"));
      isLName = false;
    }
    if (this.props.data.lastName == " ") {
      Store.dispatch(actionCreators.ChangeLastNameMsg("Enter Last Name"));
      isLName = false;
    } else {
      for (let i = 0; i < this.props.data.lastName.length; i++) {
        if (this.props.data.lastName[i] == " ") {
          console.log("whitespace");
          Store.dispatch(
            actionCreators.ChangeLastNameMsg("Whitespace not allowed")
          );
          isLName = false;
          break;
        } else {
          Store.dispatch(actionCreators.ChangeLastNameMsg());
          isLName = true;
        }
      }
    }
    if (!this.props.data.isAgree) {
      var myCheck = document.getElementById("myCheck");
      ReactDOM.findDOMNode(myCheck).style.color = "red";
    } else {
      var myCheck = document.getElementById("myCheck");
      ReactDOM.findDOMNode(myCheck).style.color = "black";
    }
    if (
      isUserName &&
      this.props.data.isAgree &&
      isEmail &&
      isPsw &&
      isFName & isLName
    ) {
      fetch("http://localhost:2007/register", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          username: this.props.data.username,
          psw: this.props.data.psw,
          email: this.props.data.email,
          firstName: this.props.data.firstName,
          lastName: this.props.data.lastName
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(responseJ => {
          if (responseJ == "already there") {
            Store.dispatch(
              actionCreators.ChangeUserNameMsg("Username Already exist")
            );
          } else {
            document.getElementById("pop").style.visibility = "visible";
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
        <div style={{ visibility: "hidden" }} className="popup_sec" id="pop">
          <div className="clos_btn">
            <img src="/images/clos.png" alt id="clos_pop" />
          </div>
          <div className="pop_hdr">
            A mail has been send to your e-mail Id to verify Your account
          </div>
          <div className="man_contnt">
            <span>Please Check Your Mail Box!</span>
            <Link to="/login">
              <input defaultValue="Ok" type="submit" />
            </Link>
          </div>
        </div>
        <div className="navbar navbar-inverse navbar-fixed-top" />
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="register_sec">
                <h1>Create An Account</h1>
                <ul>
                  <li>
                    <span>Username</span>
                    <input
                      placeholder="Enter your username"
                      type="text"
                      name="username"
                      onChange={this.handleChange}
                    />
                    <p style={{ color: "red", fontStyle: "italic" }}>
                      {this.props.data.userNameMsg}
                    </p>
                  </li>
                  <li>
                    <span>Password</span>
                    <input
                      className="password"
                      placeholder="Enter your password"
                      type="password"
                      name="psw"
                      onChange={this.handleChange}
                    />
                    <p style={{ color: "red", fontStyle: "italic" }}>
                      {this.props.data.pswMsg}
                    </p>
                  </li>
                  <li>
                    <span>Email</span>
                    <input
                      placeholder="Enter your email"
                      type="text"
                      name="email"
                      onChange={this.handleChange}
                    />
                    <p style={{ color: "red", fontStyle: "italic" }}>
                      {this.props.data.emailMsg}
                    </p>
                  </li>
                  <li>
                    <span>First Name</span>
                    <input
                      placeholder="Enter your first name"
                      type="text"
                      name="firstName"
                      onChange={this.handleChange}
                    />
                    <p style={{ color: "red", fontStyle: "italic" }}>
                      {this.props.data.firstNameMsg}
                    </p>
                  </li>
                  <li>
                    <span>Last Name</span>
                    <input
                      placeholder="Enter your last name"
                      type="text"
                      name="lastName"
                      onChange={this.handleChange}
                    />
                    <p style={{ color: "red", fontStyle: "italic" }}>
                      {this.props.data.lastNameMsg}
                    </p>
                  </li>
                  <li>
                    <input type="checkbox" onClick={this.onCheck} />
                    <div id="myCheck">I agree to Term &amp; Conditions </div>
                  </li>
                  <li>
                    <input
                      defaultValue="Register"
                      type="submit"
                      name="submit"
                      onClick={this.handleSubmit}
                    />
                    <p style={{ color: "red", fontStyle: "italic" }} />
                  </li>
                </ul>
                <div className="addtnal_acnt">
                  I already have an account.
                  <Link to="/login">
                    {" "}
                    <a>Login My Account !</a>
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
  console.log("i want to map all states", state);
  return {
    data: state.ReducerRegister
  };
};
export default connect(mapStateToProps)(Register);
