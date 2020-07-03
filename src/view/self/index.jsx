import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Button } from "antd-mobile";
import Bar from "@/components/bar";
import "./index.scss";
class Self extends Component {
  constructor(props) {
    super(props);
  }
  listClick(path) {
    this.props.history.push(path);
  }
  parent() {
    if (this.props.rote == "parent") {
      return (
        <List className="selfList">
          <List.Item extra={this.props.user.winXinBindingOut.student ? this.props.user.winXinBindingOut.student.name : ""} align="top" thumb={<i className="iconfont iconxuesheng"></i>} multipleLine>
            学生
          </List.Item>
        </List>
      );
    } else if (this.props.rote == "headmaster") {
      return (
        <List className="selfList">
          <List.Item extra={this.props.user.winXinBindingOut.stuClass ? this.props.user.winXinBindingOut.stuClass.name : ""} align="top" thumb={<i className="iconfont iconbanji"></i>} multipleLine>
            班级
          </List.Item>
        </List>
      );
    } else {
      return null;
    }
  }
  logout() {
    $axios.post("/api/services/Main/WeiXinService/UnBinding").then(() => {
      localStorage.clear();
      sessionStorage.clear();
      this.props.history.push("/login");
    });
  }
  render() {
    return (
      <div className="self">
        <Bar {...this.props} />
        <div className="head">
          <div className="headImg">
            <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="头像" />
          </div>
          <div className="headText">
            <p>{this.props.user.userDisplayName}</p>
            <p>{this.props.user.userName}</p>
          </div>
        </div>
        <List className="selfList">
          <List.Item onClick={() => this.listClick("/self/school")} extra={this.props.user.tennantDisplayname} align="top" thumb={<i className="iconfont iconxuexiao"></i>} multipleLine>
            学校
          </List.Item>
        </List>
        <List className="selfList">
          <List.Item onClick={() => this.listClick("/self/rote")} extra={this.props.user.currentRole.displayName} align="top" thumb={<i className="iconfont iconjiaoseguanli"></i>} multipleLine>
            角色
          </List.Item>
        </List>
        {this.parent()}
        <List className="selfList">
          <List.Item extra="1.2" align="top" thumb={<i className="iconfont iconbanben"></i>} multipleLine>
            版本
          </List.Item>
        </List>
        <Button onClick={() => this.logout()} type="warning" style={{ margin: ".8rem 0" }}>
          注 销
        </Button>
      </div>
    );
  }
}
export default connect((state) => state)(Self);
