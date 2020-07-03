import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import CacheRoute from "react-router-cache-route";
import { NavBar, Icon } from "antd-mobile";

class Nav extends Component {
  constructor(props) {
    super(props);
    if (this.props.match.path === "/") {
      this.props.history.replace("/index");
    }
  }
  LeftClick() {
    this.props.history.goBack();
  }
  render() {
    let ReuteType = this.props.buffer ? CacheRoute : Route;
    return (
      <div className="Nav">
        <NavBar
          onLeftClick={() => {
            this.LeftClick();
          }}
          rightContent={this.props.rightContent}
          mode="light"
          icon={<Icon type="left" />}
        >
          {this.props.name}
        </NavBar>
        {this.props.children ? (
          <div className="mainContent" style={{ height: this.props.clientHeight - 45 + "px" }}>
            <ReuteType className="CacheRoute" path={this.props.match.url} render={() => (this.props.children ? this.props.children : "")}></ReuteType>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default connect((state, ownProps) => {
  return state;
})(Nav);
