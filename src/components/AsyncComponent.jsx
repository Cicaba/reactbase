import React, { Component } from "react";
let asyncComponent = (cmp) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null
      };
    }
    componentDidMount() {
      cmp.then((res) => {
        this.setState({ component: res.default });
      });
    }
    render() {
      let C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  };
};
export default asyncComponent;
