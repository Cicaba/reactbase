import React, { Component } from "react";
import { connect } from "react-redux";
import Parent from "./parent";
import Headmaster from "./headmaster";
//请假
class Vacation extends Component {
  constructor(props) {
    super(props);
  }
  haed() {
    if (this.props.rote === "parent") {
      return <Parent />;
    } else {
      return <Headmaster />;
    }
  }
  render() {
    return (
      <div className="Vacation" style={{ padding: "0.6rem" }}>
        {this.haed()}
      </div>
    );
  }
}
export default connect((state) => {
  return state;
})(Vacation);
