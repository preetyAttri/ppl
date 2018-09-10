import React, { Component } from "react";
import DropZone from "react-dropzone";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "./App.css";
import SinglePost from "./singlePost";
import { type } from "os";
import moment from "moment";
import Timeline from "./timeline";
import Store from "./stores/Store";
import { connect } from "react-redux";
import * as actionCreators from "./action";
class HeaderTimeline extends Component {
  constructor(props) {
    super(props);
  }
  //to like and unlike the post
  toggle_like = id => {
    console.log(localStorage.getItem("username"));
    var data = {
      _id: id,
      username: localStorage.getItem("username")
    };
    if (localStorage.getItem("username") != null) {
      fetch("http://localhost:2007/post/likes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(responseJ => {
          Store.dispatch(actionCreators.arrUpdate(responseJ));
          console.log(this.props.data.arr);
          var a = this.props.data.arr.map(x => {
            return x._id == id;
          });
          a.map((x, index) => {
            if (x) {
              Store.dispatch(
                actionCreators.SinglePostObj(this.props.data.arr[index])
              );
            }
          });
          console.log(this.props.data.SinglePostObj);
        })
        .catch(e => console.log(e));
    }
  };
  //sort all post according to latest first
  latest_first = () => {
    document.getElementById("category").style.display = "none";
    this.props.data.arr.sort(function(a, b) {
      a = new Date(a.date);
      b = new Date(b.date);
      return a > b ? -1 : a < b ? 1 : 0;
    });
    Store.dispatch(actionCreators.arrUpdate(this.props.data.arr));
  };
  //sort all post according to oldest first
  oldest_first = () => {
    document.getElementById("category").style.display = "none";
    this.props.data.arr.sort(function(a, b) {
      a = new Date(a.date);
      b = new Date(b.date);
      return a < b ? -1 : a > b ? 1 : 0;
    });
    Store.dispatch(actionCreators.arrUpdate(this.props.data.arr));
  };
  //sort all post according to most commented
  most_commented = () => {
    document.getElementById("category").style.display = "none";
    console.log(this.props.data.arr);
    this.props.data.arr.sort((a, b) => {
      var x = a.comments.length;
      var y = b.comments.length;
      return y - x;
    });
    Store.dispatch(actionCreators.arrUpdate(this.props.data.arr));
  };
  //on Click a single post
  Single_post = x => {
    document.getElementById("category").style.display = "none";
    Store.dispatch(actionCreators.isSinglePost(true));
    Store.dispatch(actionCreators.isTimeline(false));
    Store.dispatch(actionCreators.SinglePostObj(x));
  };
  //On click add category show the form
  handle_category = () => {
    if (document.getElementById("category").style.display === "none") {
      document.getElementById("category").style.display = "block";
    } else {
      document.getElementById("category").style.display = "none";
    }
    var upload = document.getElementById("uploadPost");
    document.getElementById("dropZoneCt").style.background = "white";
    document.getElementById("addCat").value = "";
    ReactDOM.findDOMNode(upload).style.display = "none";
    Store.dispatch(actionCreators.ChangeCategoryMsg());
  };
  //on change category value in add category form
  add_category = event => {
    Store.dispatch(actionCreators.addCategoryChange(event.target.value));
  };
  //accept the image file selected in dropzone
  onDropCt = (accepted_files, rejectedFiles) => {
    console.log(accepted_files[0]);
    Store.dispatch(actionCreators.fileChange(accepted_files[0]));
    var getImagePath = this.props.data.file.preview;
    document.getElementById("dropZoneCt").style.backgroundImage =
      "url(" + getImagePath + ")";
    document.getElementById("dropZoneCt").style.backgroundRepeat = "no-repeat";
    document.getElementById("dropZoneCt").style.backgroundSize = "cover";
  };
  //on click upload category send all data to back_end
  upload_category = e => {
    e.preventDefault();
    var data = new FormData();
    data.append("files", this.props.data.file);
    data.append("category", this.props.data.addCategory);
    console.log(data + "data check");
    if (this.props.data.file !== null && this.props.data.addCategory !== "") {
      fetch("http://localhost:2007/category/upload", {
        method: "POST",
        body: data
      })
        .then(response => response.json())
        .then(responseJ => {
          if (responseJ == "already there") {
            Store.dispatch(
              actionCreators.ChangeCategoryMsg("category name already exist")
            );
          } else {
            Store.dispatch(actionCreators.categoryArrUpdate(responseJ));
            document.getElementById("category").style.display = "none";
          }
        })
        .catch(e => console.log(e));
      document.getElementById("dropZoneCt").style.background = "white";
      document.getElementById("addCat").value = "";
    }
  };
  //show data according to selected category
  show_category = category => {
    document.getElementById("category").style.display = "none";
    console.log(category);
    Store.dispatch(actionCreators.isSinglePost(false));
    Store.dispatch(actionCreators.isTimeline(true));
    var data = { category: category };

    fetch("http://localhost:2007/post/category", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseJ => {
        Store.dispatch(actionCreators.arrUpdate(responseJ));
      })
      .catch(e => console.log(e));
  };
  //on change description about the post field
  extraDataD = event => {
    Store.dispatch(actionCreators.descriptionChange(event.target.value));
  };
  //on change category about the post field
  extraDataC = event => {
    if (event.target.value !== undefined)
      Store.dispatch(actionCreators.categoryChange(event.target.value));
  };
  //on click upload post show post upload form
  handleUpload = () => {
    var upload = document.getElementById("uploadPost");
    if (ReactDOM.findDOMNode(upload).style.display === "block") {
      ReactDOM.findDOMNode(upload).style.display = "none";
    } else {
      ReactDOM.findDOMNode(upload).style.display = "block";
    }
    document.getElementById("category").style.display = "none";
    document.getElementById("dropZone").style.background = "white";
    document.getElementById("description").style.value = "";
  };
  //set selected image in drop zone
  onDrop = (accepted_files, rejectedFiles) => {
    console.log(accepted_files[0]);
    Store.dispatch(actionCreators.fileChange(accepted_files[0]));
    var getImagePath = this.props.data.file.preview;
    document.getElementById("dropZone").style.backgroundImage =
      "url(" + getImagePath + ")";
    document.getElementById("dropZone").style.backgroundRepeat = "no-repeat";
    document.getElementById("dropZone").style.backgroundSize = "cover";
  };
  //filter login user's post
  myUpload = () => {
    document.getElementById("category").style.display = "none";
    Store.dispatch(actionCreators.isTimeline(true));
    Store.dispatch(actionCreators.isSinglePost(false));
    document.getElementById("myTimeline").style.color = " black";
    document.getElementById("myUpload").style.background = "#ec6a14";
    document.getElementById("myTimeline").style.background = " #f1eff2";
    var user = localStorage.getItem("username");
    this.props.data.arr = this.props.data.arr.filter(x => {
      return x.userId == localStorage.getItem("userId");
    });
    Store.dispatch(actionCreators.arrUpdate(this.props.data.arr));
    console.log(this.props.data.arr);
  };
  //show all post
  myTimeline = () => {
    document.getElementById("category").style.display = "none";
    Store.dispatch(actionCreators.isSinglePost(false));
    Store.dispatch(actionCreators.isTimeline(true));
    document.getElementById("myUpload").style.background = " #f1eff2";
    document.getElementById("myUpload").style.color = " black";
    document.getElementById("myTimeline").style.background = "#ec6a14";
    fetch("http://localhost:2007/POST/timeline", {
      method: "POST"
    })
      .then(response => response.json())
      .then(responseJ => {
        Store.dispatch(actionCreators.arrUpdate(responseJ));
      })
      .catch(e => console.log(e));
  };
  //on click upload post send all data to back end
  uploadImage = event => {
    event.preventDefault();
    console.log(this.props.data.file);
    var data = new FormData();
    data.append("username", localStorage.getItem("username"));
    data.append("userId", localStorage.getItem("userId"));
    data.append("files", this.props.data.file);
    data.append("description", this.props.data.description);
    data.append("category", this.props.data.category);
    console.log(data.get("username"));
    if (
      this.props.data.file !== null &&
      this.props.data.description !== "" &&
      this.props.data.category !== ""
    ) {
      fetch("http://localhost:2007/post/upload", {
        method: "POST",
        body: data
      })
        .then(response => response.json())
        .then(responseJ => {
          Store.dispatch(actionCreators.arrUpdate(responseJ));
        })
        .catch(e => console.log(e));
      var upload = document.getElementById("uploadPost");
      ReactDOM.findDOMNode(upload).style.display = "none";
    }
  };
  componentDidMount() {
    fetch("http://localhost:2007/post/upload", {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJ => {
        Store.dispatch(actionCreators.arrUpdate(responseJ));
        console.log("in timeline");
      })
      .catch(e => console.log(e));
    fetch("http://localhost:2007/category/upload", {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJ => {
        Store.dispatch(actionCreators.categoryArrUpdate(responseJ));
        console.log(this.props.data.categoryArr);
      })
      .catch(e => console.log(e));
  }

  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <title>Home</title>

        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="rght_btn">
                {" "}
                <span className="rght_btn_icon">
                  <img src="/images/btn_iconb.png" alt="up" />
                </span>{" "}
                <span className="btn_sep">
                  <img src="/images/btn_sep.png" alt="sep" />
                </span>{" "}
                <a onClick={this.handleUpload}>Upload Post</a>{" "}
              </div>
              <div className="rght_btn">
                {" "}
                <span className="rght_btn_icon">
                  <img src="/images/btn_icona.png" alt="up" />
                </span>{" "}
                <span className="btn_sep">
                  <img src="/images/btn_sep.png" alt="sep" />
                </span>{" "}
                <a onClick={this.handle_category}>Add category</a>{" "}
              </div>
              <div className="div_a">
                <form id="category" style={{ display: "none", marginLeft: 50 }}>
                  <DropZone
                    id="dropZoneCt"
                    accept="image/jpeg"
                    onDrop={this.onDropCt}
                  />
                  <br />
                  <input type="text" id="addCat" onChange={this.add_category} />
                  <br />
                  <br />
                  <button
                    style={{ marginLeft: 50 }}
                    onClick={e => {
                      this.upload_category(e);
                    }}
                  >
                    Upload category
                  </button>
                  <br />
                  <br />
                  <p
                    style={{
                      color: "red",
                      fontStyle: "italic",
                      marginLeft: "30px"
                    }}
                  >
                    {this.props.data.categoryMsg}
                  </p>
                </form>
              </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="rght_cat_bg">
                  Categories
                </div>

                <div className="rght_list">
                  {this.props.data.categoryArr.map((x, index) => {
                    return (
                      <ul>
                        <li>
                          <a onClick={e => this.show_category(x.category)}>
                            <span className="list_icon">
                              <img
                                className="img"
                                src={`http://localhost:2007/icons/${x.img}`}
                                alt="up"
                              />
                            </span>{" "}
                            {x.category}
                          </a>
                        </li>
                      </ul>
                    );
                  })}
                </div>
              </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="opn_cat_bg">
                  Featured
                </div>
                <div className="sub_dwn">
                  <div className="feat_sec">
                    <div className="feat_sec_img">
                      <img src="/images/feat_img1.png" alt="image" />
                    </div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img">
                      <img src="/images/feat_img2.png" alt="image" />
                    </div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Dogs</div>
                    </div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img">
                      <img src="/images/feat_img3.png" alt="image" />
                    </div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Rabbits</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content_lft">
              <div className="contnt_1">
                <div className="list_1">
                  <ul>
                    <li>
                      <input className="chk_bx" type="checkbox" />
                      Friends
                    </li>
                    <li>
                      <input className="chk_bx" type="checkbox" />
                      Flaged
                    </li>
                  </ul>
                </div>

                <div className="timeline_div">
                  <div className="timeline_div1">
                    <div className="profile_pic">
                      <img src="/images/timeline_img1.png" />
                      <div className="profile_text">
                        <a>Change Profile Pic</a>
                      </div>
                    </div>
                    <div className="profile_info">
                      <div className="edit_div">
                        <a>
                          Edit <img src="/images/timeline_img.png" />
                        </a>
                      </div>
                      <div className="profile_form">
                        <ul>
                          <li>
                            <div className="div_name1">Name :</div>
                            <div className="div_name2">Stefiney Gibbs</div>
                          </li>
                          <li>
                            <div className="div_name1">Sex :</div>
                            <div className="div_name2">Female</div>
                          </li>
                          <li>
                            <div className="div_name1">Description :</div>
                            <div className="div_name3">
                              This is an example of a comment. You can create as
                              many comments like this one or sub comments as you
                              like and manage all of your content inside
                              Account.
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="timeline_div2">
                    <ul>
                      <li>
                        <a id="myTimeline" onClick={this.myTimeline}>
                          Timeline
                        </a>
                      </li>
                      <li>
                        <a>About </a>
                      </li>
                      <li>
                        <a>Album</a>
                      </li>
                      <li>
                        <a> Pets</a>
                      </li>
                      <li>
                        <a id="myUpload" onClick={this.myUpload}>
                          My Uploads{" "}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="div_a">
                <form
                  id="uploadPost"
                  enctype="multipart/form-data"
                  style={{ display: "none" }}
                >
                  <DropZone
                    id="dropZone"
                    accept="image/jpeg"
                    onDrop={this.onDrop}
                  />
                  <br />
                  Category:
                  <li>
                    <select
                      name="category"
                      onChange={e => this.extraDataC(e)}
                      id="catt"
                    >
                      <option>Select a category</option>
                      {this.props.data.categoryArr.map((x, index) => {
                        return (
                          <option value={x.category} key={index}>
                            {x.category}
                          </option>
                        );
                      })}
                    </select>
                  </li>
                  Description:
                  <li>
                    <input
                      type="text"
                      onChange={this.extraDataD}
                      name="description"
                      id="description"
                    />
                  </li>
                  <br />
                  <button onClick={this.uploadImage}>Upload</button>
                </form>
              </div>
              {this.props.data.isTimeline ? (
                <Timeline
                  Single_post={this.Single_post}
                  latest_first={this.latest_first}
                  oldest_first={this.oldest_first}
                  most_commented={this.most_commented}
                  toggle_like={this.toggle_like}
                />
              ) : null}
              {this.props.data.isSinglePost ? (
                <SinglePost toggle_like={this.toggle_like} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log("i want to map all HeaderTimeline states", state);
  return {
    data: state.ReducerTimeline
  };
};
export default connect(mapStateToProps)(HeaderTimeline);
