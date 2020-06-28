import React, { Component } from "react";

export default class Text extends Component {
  add() {
    let arr = this.state.arr.concat([9]);
    this.setState({ arr }, () => {
      this.props.history.push("/found");
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      arr: [1, 2, 3]
    };
  }
  render() {
    return (
      <div>
        {this.state.arr.map((v) => (
          <div key={v}>{v}</div>
        ))}
        <button onClick={() => this.add()}>+</button>
      </div>
    );
  }
}
