import React, { Component } from "react";
import { connect } from "react-redux";
import { TabBar } from "antd-mobile";
import $axios from "@/axios/config";
window.$axios = $axios;
class Bar extends Component {
  constructor(props) {
    super(props);
  }
  navClick(n) {
    this.props.setSelectedNav(n);
    if (n === 0) {
      this.props.history.replace("/home");
    } else {
      this.props.history.replace("/self");
    }
  }
  render() {
    return (
      <div className="TabBar">
        <TabBar unselectedTintColor="#949494" tintColor="#33A3F4" barTintColor="white">
          <TabBar.Item
            selected={this.props.selectedNav === 0}
            onPress={() => {
              this.navClick(0);
            }}
            title="首页"
            icon={<i className="iconfont iconshouye" />}
            selectedIcon={<i className="iconfont iconshouye" />}
          ></TabBar.Item>
          <TabBar.Item
            title="个人中心"
            selected={this.props.selectedNav === 1}
            onPress={() => {
              this.navClick(1);
            }}
            icon={<i className="iconfont icongerenzhongxin" />}
            selectedIcon={<i className="iconfont icongerenzhongxin" />}
          ></TabBar.Item>
        </TabBar>
      </div>
    );
  }
}
export default connect(
  (state) => state,
  (dispatch) => {
    return {
      setSelectedNav: (data) => dispatch({ type: "selectedNav", data })
    };
  }
)(Bar);
