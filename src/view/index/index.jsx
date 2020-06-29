import React, { Component } from "react";
import { connect } from "react-redux";

class Index extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    return <div className="Index">index</div>;
  }
}
export default connect(
  (state, ownProps) => {
    return state;
  }
  // (dispatch) => {
  //   return {
  //     setWidth: (data) => dispatch({ type: "clientWidth", data }),
  //     setHeight: (data) => dispatch({ type: "clientHeight", data })
  //   };
  // }
)(Index);
