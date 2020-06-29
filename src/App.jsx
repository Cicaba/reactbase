import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import CacheRoute from "react-router-cache-route";

class App extends Component {
  constructor(props) {
    super(props);
    if (this.props.match.path == "/") {
      this.props.history.replace("/index");
    }
  }
  componentDidMount() {}
  render() {
    let ReuteType = this.props.buffer ? CacheRoute : Route;
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code> src / App.js </code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
        <ReuteType path={this.props.match.url} render={() => (this.props.children ? this.props.children : "")}></ReuteType>
      </div>
    );
  }
}
export default connect(
  (state, ownProps) => {
    return state;
  },
  (dispatch) => {
    return {
      setWidth: () => dispatch("screenWidth"),
      setHeight: () => dispatch("screenHeight")
    };
  }
)(App);
