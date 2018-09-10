import React, { Component } from "react";
//import logo from './logo.svg';
import DropZone from "react-dropzone";
import ReactDOM from "react-dom";
import "./App.css";
import SinglePost from "./singlePost";
import { type } from "os";
import moment from "moment";
import Store from "./stores/Store";
import { connect } from "react-redux";
class Timeline extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log("arr in timeline" + this.props.data.arr);
    console.log(this.props);
  }
  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <div className="post_div">
          <div className="post_list">
            <ul>
              <li>
                <a id="latest" onClick={this.props.latest_first}>
                  <span className="list_img">
                    <img src="images/img_1.png" />
                  </span>
                  Latest First
                </a>
              </li>
              <li>
                <a id="oldest" onClick={this.props.oldest_first}>
                  <span className="list_img">
                    <img src="images/img_2.png" />
                  </span>
                  Oldest First
                </a>
              </li>
              <li>
                <a>
                  <span className="list_img">
                    <img src="images/img_3.png" />
                  </span>
                  Most Pet
                </a>
              </li>
              <li>
                <a>
                  <span className="list_img">
                    <img src="images/img_4.png" />
                  </span>
                  Most Clicks
                </a>
              </li>
              <li>
                <a onClick={this.props.most_commented}>
                  <span className="list_img">
                    <img src="images/img_5.png" />
                  </span>
                  Most Commented
                </a>
              </li>
            </ul>
          </div>
          <div className="post_txt">4 New Post Updates</div>
        </div>

        {this.props.data.arr.map((x, index) => (
          <div className="contnt_2">
            <div className="div_a">
              <div className="div_title">{x.description}</div>
              <div className="btm_rgt">
                <div className="btm_arc">{x.category}</div>
              </div>
              <div className="div_top">
                <div className="div_top_lft">
                  <img src="/images/img_6.png" />
                  {x.username}
                </div>
                <div className="div_top_rgt">
                  <span className="span_date">
                    {moment(x.date).format("DD MMM YYYY")}
                  </span>
                  <span className="span_time">
                    {moment(x.date).format("hh:mm a")}
                  </span>
                </div>
              </div>
              <div className="div_image">
                <img
                  src={`http://localhost:2007/uploads/${x.img}`}
                  alt="pet"
                  onClick={() => this.props.Single_post(x)}
                />
              </div>
              <div className="div_btm">
                <div className="btm_list">
                  <ul>
                    <li>
                      <a>
                        <span className="btn_icon">
                          <img src="/images/icon_001.png" alt="share" />
                        </span>
                        Share
                      </a>
                    </li>
                    <li>
                      <a>
                        <span className="btn_icon">
                          <img src="/images/icon_002.png" alt="share" />
                        </span>
                        Flag
                      </a>
                    </li>
                    <li>
                      <a onClick={event => this.props.toggle_like(x._id)}>
                        {x.likes.includes(localStorage.getItem("username")) ? (
                          <span>
                            <span className="btn_icon">
                              <img src="/images/aadlike.png" alt="share" />
                            </span>
                            Unlike
                          </span>
                        ) : (
                          <span>
                            <span className="btn_icon">
                              <img src="/images/aalike.png" alt="share" />
                            </span>
                            Like
                          </span>
                        )}
                      </a>
                    </li>
                    <li>
                      <a>
                        <span className="btn_icon">
                          <img src="/images/icon_003.png" alt="share" />
                        </span>
                        {x.likes.length} Likes
                      </a>
                    </li>
                    <li>
                      <a>
                        <span className="btn_icon">
                          <img src="/images/icon_004.png" alt="share" />
                        </span>
                        {x.comments.length} Comments
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("i want to map all Timeline states", state);
  return {
    data: state.ReducerTimeline
  };
};
export default connect(mapStateToProps)(Timeline);
