import React from "react";
import ReactDOM from "react-dom";
function Loading(props) {
  return (
    <div className="loading-container">
      <img src={require("@/icons/loading.svg")} alt="加载中" />
    </div>
  );
}
Loading.show = function (props) {
  this.div = document.createElement("div");
  this.div.className = "loading";
  document.body.appendChild(this.div);
  ReactDOM.render(<Loading {...props} />, this.div);
};
Loading.hide = function () {
  this.div && ReactDOM.unmountComponentAtNode(this.div); //从div中移除已挂载的Loading组件
  this.div && this.div.parentNode.removeChild(this.div); //移除挂载的容器
};
export default Loading;
