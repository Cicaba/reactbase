import React, { Component } from "react";
import { connect } from "react-redux";
import Parent from "./parent";
import Headmaster from "./headmaster";
import Teacher from "./teacher";
import "./index.scss";
// 课表
class Curriculum extends Component {
  constructor(props) {
    super(props);
  }
  haed() {
    if (this.props.rote === "parent") {
      return <Parent />;
    } else if (this.props.rote === "headmaster") {
      return <Headmaster />;
    } else {
      return <Teacher />;
    }
  }
  render() {
    return (
      <div className="Curriculum" style={{ padding: "0.6rem" }}>
        {this.haed()}
      </div>
    );
  }
}
export default connect((state) => {
  return state;
})(Curriculum);
