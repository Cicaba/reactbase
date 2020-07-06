import React, { Component } from "react";
import $axios from "@/axios/config";
import "./index.scss";
export default class GuardRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "http://www.cicaba.top"
    };
  }
  componentWillMount() {
    $axios.jsonp("http://cicaba.top:3002/base/url").then((res) => {
      try {
        this.setState({
          url: res.data.data.blogUrl
        });
      } catch (error) {}
    });
  }
  render() {
    return (
      <div className="body404" id="particlesJS">
        <div className="info404">
          <header id="header404" className="clearfix">
            <div className="site-name404">
              <i>404</i>
            </div>
          </header>
          <section>
            <div className="title404">
              <p>
                每一个平凡的日常
                <br />
                都是连续发生中的奇迹
              </p>
            </div>
            <span className="index404" onClick={() => (window.location.href = window.location.origin)}>
              返回首页
            </span>
          </section>
          <footer id="footer404">
            &copy; {$date(Number(new Date()), "yyyy")}
            <a href={this.state.url}>CicAba.</a>
          </footer>
        </div>
        <div class="bggif"></div>
      </div>
    );
  }
}
