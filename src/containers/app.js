import App from "../App";
import { connect } from "react-redux";

export let mapStateToProps = (state, ownProps) => {
  return state
};
export let mapDispatchToProps = (dispatch) => {
  return {
    setWidth: () => dispatch("screenWidth"),
    setHeight: () => dispatch("screenHeight")
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);