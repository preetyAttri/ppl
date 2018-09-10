import React, { Component } from "react";
import "./App.css";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  logout = () => {
    localStorage.removeItem("username");
    this.props.history.push("/login");
  };
  componentDidMount() {
    console.log("in did mount");
  }
  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <div className="navbar navbar-inverse navbar-fixed-top">
          <div className="navbar-inner">
            <div className="container">
              <button
                type="button"
                className="btn btn-navbar"
                data-toggle="collapse"
                data-target=".nav-collapse"
              >
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <a className="brand" href>
                PPL
              </a>
              <div className="pro_info pull-right">
                <div className="pro_icn">
                  <img src="/images/pic_small.png" />
                </div>
                <div className="pro_txt">
                  Me
                  <b className="caret" />
                </div>
                <ul
                  className="dropdown-menu"
                  role="menu"
                  aria-labelledby="dLabel"
                >
                  <li>
                    <a tabIndex={-1} href="#">
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a tabIndex={-1} href="#">
                      Message Box
                    </a>
                  </li>
                  <li>
                    <a tabIndex={-1} href="#">
                      Change Language
                    </a>
                  </li>
                  <li className="divider" />
                  <li>
                    <a tabIndex={-1} href="#">
                      <input placeholder="search" type="text" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="nav-collapse collapse">
                <ul className="nav">
                  <li className="active">
                    <a href>Home</a>
                  </li>
                  <li className>
                    <a href>E-Coupons</a>
                  </li>
                  <li className>
                    <a href>E-Brands</a>
                  </li>
                  <li className>
                    <a href>Resuse Market</a>
                  </li>
                  <li className>
                    <a href>Lost and Found</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="header">
          <div className="header_lft">
            <div className="logo">
              <a href="#">
                <img src="/images/logo.png" />
              </a>
            </div>
            <div className="navigatn">
              <ul>
                <li>
                  <a href="#" className="active">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#"> E-Coupons </a>
                </li>
                <li>
                  <a href="#">E-Brands </a>
                </li>
                <li>
                  <a href="#"> Resuse Market </a>
                </li>
                <li>
                  <a href="#"> Lost and Found</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="header_rgt">
            <div className="flag_div">
              <img src="/images/flag.png" />
            </div>
            <input placeholder="Search" className="txt_box" type="text" />
            <div className="msg_box">
              <a href="#">
                <span className="msg_count">100</span>
              </a>
            </div>

            {localStorage.getItem("username") != null ? (
              <div className="info_div">
                <div className="image_div">
                  <img src="/images/pic.png" />{" "}
                </div>
                <a  className="info_div1" onClick={this.logout}>
                  Logout
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
export default Header;
