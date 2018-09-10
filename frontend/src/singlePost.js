import React, { Component } from "react";
//import logo from './logo.svg';
import ReactDOM from "react-dom";
import "./App.css";
import moment from "moment";
import Store from "./stores/Store";
import { connect } from "react-redux";
import * as actionCreators from "./action";
class SinglePost extends Component {
  constructor(props) {
    super(props);
  }
  //set comment on comment text change
  comment = event => {
    Store.dispatch(actionCreators.ChangeComment(event.target.value));
  };
  //on submit send comment details to back end
  submit = e => {
    e.preventDefault();
    document.getElementById("comment").value = "";
    var data = {
      _id: this.props.data.SinglePostObj._id,
      comments: this.props.data.comment,
      commentBy: localStorage.getItem("username")
    };
    if (this.props.data.comment.length != 0) {
      fetch("http://localhost:2007/post/addComment", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(responseJ => {
          Store.dispatch(actionCreators.ChangeCommentArray(responseJ));
        })
        .catch(e => console.log(e));
    }
  };
  componentDidMount() {
    Store.dispatch(
      actionCreators.ChangeCommentArray(this.props.data.SinglePostObj.comments)
    );
  }
  render() {
    return (
      <div>
        {console.log("-------------------", this.props.data)}
        <meta charSet="utf-8" />
        <div className="content_lft">
          <div className="contnt_2" style={{ width: "130%" }}>
            <div className="div_singlePost">
              <div className="div_title">
                {this.props.data.SinglePostObj.description}
              </div>
              <div className="btm_rgt">
                <div className="btm_arc">
                  {this.props.data.SinglePostObj.category}
                </div>
              </div>
              <div className="div_top">
                <div className="div_top_lft">
                  <img src="/images/img_6.png" />
                  {this.props.data.SinglePostObj.username}
                </div>
                <div className="div_top_rgt">
                  <span className="span_date">
                    {moment(this.props.data.SinglePostObj.date).format(
                      "DD MMM YYYY"
                    )}
                  </span>
                  <span className="span_time">
                    {moment(this.props.data.SinglePostObj.date).format(
                      "hh:mm a"
                    )}
                  </span>
                </div>
              </div>
              <div className="div_image">
                <img
                  src={`http://localhost:2007/uploads/${
                    this.props.data.SinglePostObj.img
                  }`}
                  alt="pet"
                />
              </div>
              <div className="div_btm">
                <div className="btm_list">
                  <ul style={{ width: "280%" }}>
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
                      <a
                        onClick={event =>
                          this.props.toggle_like(
                            this.props.data.SinglePostObj._id
                          )
                        }
                      >
                        {this.props.data.SinglePostObj.likes.includes(
                          localStorage.getItem("username")
                        ) ? (
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
                        {this.props.data.SinglePostObj.likes.length} Likes
                      </a>
                    </li>
                    <li>
                      <a>
                        <span className="btn_icon">
                          <img src="/images/icon_004.png" alt="share" />
                        </span>
                        {this.props.data.SinglePostObj.comments.length} Comments
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {this.props.data.comments.map((i, index) => {
            return (
              <div className="contnt_3" style={{ width: "130%" }} key={index}>
                <ul>
                  <li>
                    <div className="list_image">
                      <div className="image_sec">
                        <img src="/images/post_img.png" />
                      </div>
                      <div className="image_name">{i.commentBy}</div>
                    </div>
                    <div className="list_info">{i.comment}</div>
                  </li>
                </ul>
              </div>
            );
          })}
          <div className="contnt_3" style={{ width: "130%" }}>
            <ul>
              <li>
                <div className="cmnt_div">
                  <input
                    placeholder="Add a Comment"
                    className="cmnt_bx"
                    id="comment"
                    type="text"
                    onChange={this.comment}
                  />
                  <input
                    className="sub_bttn"
                    defaultValue="Submit Comment"
                    type="submit"
                    onClick={this.submit}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log("i want to map all SinglePost states", state);
  return {
    data: state.ReducerTimeline
  };
};
export default connect(mapStateToProps)(SinglePost);
