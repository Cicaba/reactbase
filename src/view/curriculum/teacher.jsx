import React, { Component } from "react";
import { connect } from "react-redux";
import { DatePicker, List, Button } from "antd-mobile";

class Teacher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new window.Date(),
      dataList: []
    };
  }
  componentWillMount() {
    this.query();
  }

  query() {
    let data = this.state.date
      ? $qs.stringify({
          Date: $date(this.state.date, "yyyy-MM-dd")
        })
      : "";

    $axios.get("/api/services/Main/WeiXinService/GetCourseItemListByTeacher?" + data).then((res) => {
      this.setState({
        dataList: res.data.result
      });
    });
  }
  tds(i, type) {
    let el = "";

    if (this.state.dataList.length) {
      if (this.state.dataList[i] && this.state.dataList[i].sort == i + 1) {
        if (type === "subject") {
          el = this.state.dataList[i].subject.subjectName;
        } else {
          el = this.state.dataList[i].stuClass.name;
        }
      }
    }
    return el;
  }
  render() {
    return (
      <div>
        <DatePicker mode="date" title="选择日期" extra="请选择" value={this.state.date} onChange={(date) => this.setState({ date })} onDismiss={() => this.setState({ date: "" })}>
          <List.Item arrow="horizontal">选择日期:</List.Item>
        </DatePicker>
        <Button onClick={() => this.query(false)} style={{ marginTop: "0.2rem", marginBottom: "0.2rem" }} type="primary">
          查 询
        </Button>
        <table className="CurriculumTable" border="1">
          <tr>
            <th style={{ width: "4rem" }}>时段</th>
            <th style={{ width: "3rem" }}>序号</th>
            <th style={{ width: "8rem" }}>班级</th>
            <th>学科</th>
          </tr>
          <tr>
            <td rowSpan={2} style={{ backgroundColor: "#ccc" }}>
              早自习
            </td>
            <td>1</td>
            <td>{this.tds(0, "stuClass")}</td>
            <td>{this.tds(0, "subject")}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>{this.tds(1, "stuClass")}</td>
            <td>{this.tds(1, "subject")}</td>
          </tr>
          <tr>
            <td rowSpan="4" style={{ backgroundColor: "#ccc" }}>
              上午
            </td>
            <td>3</td>
            <td>{this.tds(2, "stuClass")}</td>
            <td>{this.tds(2, "subject")}</td>
          </tr>
          <tr>
            <td>4</td>
            <td>{this.tds(3, "stuClass")}</td>
            <td>{this.tds(3, "subject")}</td>
          </tr>
          <tr>
            <td>5</td>
            <td>{this.tds(4, "stuClass")}</td>
            <td>{this.tds(4, "subject")}</td>
          </tr>
          <tr>
            <td>6</td>
            <td>{this.tds(5, "stuClass")}</td>
            <td>{this.tds(5, "subject")}</td>
          </tr>
          <tr>
            <td rowSpan="4" style={{ backgroundColor: "#ccc" }}>
              下午
            </td>
            <td>7</td>
            <td>{this.tds(6, "stuClass")}</td>
            <td>{this.tds(6, "subject")}</td>
          </tr>
          <tr>
            <td>8</td>
            <td>{this.tds(7, "stuClass")}</td>
            <td>{this.tds(7, "subject")}</td>
          </tr>
          <tr>
            <td>9</td>
            <td>{this.tds(8, "stuClass")}</td>
            <td>{this.tds(8, "subject")}</td>
          </tr>
          <tr>
            <td>10</td>
            <td>{this.tds(9, "stuClass")}</td>
            <td>{this.tds(9, "subject")}</td>
          </tr>
          <tr>
            <td rowSpan={2} style={{ backgroundColor: "#ccc" }}>
              晚自习
            </td>
            <td>11</td>
            <td>{this.tds(10, "stuClass")}</td>
            <td>{this.tds(10, "subject")}</td>
          </tr>
          <tr>
            <td>12</td>
            <td>{this.tds(11, "stuClass")}</td>
            <td>{this.tds(11, "subject")}</td>
          </tr>
        </table>
      </div>
    );
  }
}
export default connect((state, ownProps) => {
  return state;
})(Teacher);
