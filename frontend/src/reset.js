import React, { Component } from "react";
//import logo from './logo.svg';
import Store from "./stores/Store";
import { connect } from "react-redux";
import * as actionCreators from "./action";
import "./App.css";
class Reset extends Component {
  constructor(props) {
    super(props);
  }
  //on changing password fields set value to state
  handleChange = e => {
    Store.dispatch(actionCreators.inputChange(e.target.name, e.target.value));
    if (e.target.name === "psw") {
      if (this.props.data.psw.length < 7) {
        Store.dispatch(actionCreators.ChangePswMsg("Enter Strong Password")); 
         } else {
          Store.dispatch(actionCreators.ChangePswMsg());
      }
    }
  };
  //on submit confirm both password if match then update in back end
  submit = e => {
    Store.dispatch(actionCreators.ChangeConfirmPswMsg());
    var isAgree=false;
    if (e.target.name === "psw") {
      if (this.props.data.psw.length < 7) {
        isAgree = false;
        Store.dispatch(actionCreators.ChangePswMsg("Enter Strong Password"));
      } else {
        isAgree = true;
        Store.dispatch(actionCreators.ChangePswMsg());
      }
    }
    console.log(isAgree);
    if(this.props.data.psw.length==0){
      Store.dispatch(actionCreators.ChangePswMsg("Enter Password"));
    }else if (this.props.data.psw != this.props.data.psw1) {
      Store.dispatch(actionCreators.ChangeConfirmPswMsg("should match above password" ));
      isAgree = false;
    } else {
      Store.dispatch(actionCreators.ChangeConfirmPswMsg());
      isAgree = true;
          }
      if (isAgree) {
        fetch("http://localhost:2007/reset", {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({
            email: this.props.match.params.number,
            psw: this.props.data.psw
          }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .catch(e => console.log(e));
          this.props.history.push("/login");
        }
    };

  componentDidMount() {
    console.log("in did mount");
  }
  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <title>Reset Password</title>
        <div className="navbar navbar-inverse navbar-fixed-top" />

        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="register_sec">
                <h1>Reset Password</h1>
                <ul>
                  <li>
                    <span>Enter New Password</span>
                    <input
                      placeholder="Enter your new password"
                      type="password"
                      name="psw"
                      onChange={this.handleChange}
                    />
                  </li>
                  <p style={{ color: "red", fontStyle: "italic" }}>
                    {this.props.data.pswMsg}{" "}
                  </p>
                  <li>
                    <span>Confirm Password</span>
                    <input
                      placeholder="Enter your password again"
                      type="password"
                      name="psw1"
                      onChange={this.handleChange}
                    />
                  </li>
                  <p style={{ color: "red", fontStyle: "italic" }}>
                    {this.props.data.confirmPswMsg}{" "}
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
  console.log("i want to map all Reset states", state);
  return {
    data: state.ReducerReset
  };
};
export default connect(mapStateToProps)(Reset);

