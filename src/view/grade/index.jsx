import React, { Component } from "react";
import { connect } from "react-redux";
import Parent from "./parent";
import Headmaster from "./headmaster";
import Teacher from "./teacher";
//成绩查询
class Grade extends Component {
  constructor(props) {
    super(props);
  }
  haed() {
    if (this.props.rote === "parent") {
      return <Parent />;
    } else if (this.props.rote === "teacher") {
      return <Teacher />;
    } else {
      return <Headmaster />;
    }
  }
  render() {
    return (
      <div className="Grade" style={{ padding: "0.6rem" }}>
        {this.haed()}
      </div>
    );
  }
}
export default connect((state) => {
  return state;
})(Grade);
