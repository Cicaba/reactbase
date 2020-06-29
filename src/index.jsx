import React from "react";
import ReactDOM from "react-dom";
import Router from "./router/router";
import $axios from "@/axios/config";
import store from "@/store/store";
import * as serviceWorker from "./serviceWorker";
import "@/styles/init.css";
import "@/styles/common.css";
let doc = document.querySelector("body");
store.dispatch({ type: "clientWidth", data: doc.clientWidth });
store.dispatch({ type: "clientHeight", data: doc.clientHeight });
window.onresize = function (e) {
  store.dispatch({ type: "clientWidth", data: doc.clientWidth });
  store.dispatch({ type: "clientHeight", data: doc.clientHeight });
};

window.$axios = $axios;
ReactDOM.render(<React.StrictMode>{Router} </React.StrictMode>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
