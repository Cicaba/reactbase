import React, { Component } from "react";

export default class Text extends Component {
  constructor(props) {
    super(props);

    this.state = {
      n: 11233333
    };
  }
  componentDidCache = () => {
    console.log("List cached");
  };

  componentDidRecover = () => {
    console.log("List recovered");
  };
  render() {
    return (
      <div>
        {this.state.n}
        <button>+</button>
      </div>
    );
  }
}
