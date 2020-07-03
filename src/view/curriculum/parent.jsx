import React, { Component } from "react";
import { connect } from "react-redux";
import { DatePicker, List, Button } from "antd-mobile";

class Parent extends Component {
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

    $axios.get("/api/services/Main/WeiXinService/GetCourseByParent?" + data).then((res) => {
      try {
        this.setState({
          dataList: res.data.result.courseDetail
        });
      } catch (error) {
        this.setState({
          dataList: []
        });
      }
    });
  }
  tds(i, type) {
    let W = this.state.date ? this.state.date.getDay() : 1;
    let el = "";
    let name = "";
    if (type === "subject") {
      name = "subjectName";
    } else {
      name = "name";
    }
    if (this.state.dataList.length) {
      if (this.state.dataList[i][type + W]) {
        el = this.state.dataList[i][type + W][name];
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
            <th>学科</th>
            <th style={{ width: "8rem" }}>教师</th>
          </tr>
          <tr>
            <td rowSpan={2} style={{ backgroundColor: "#ccc" }}>
              早自习
            </td>
            <td>1</td>
            <td>{this.tds(0, "subject")}</td>
            <td>{this.tds(0, "employee")}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>{this.tds(1, "subject")}</td>
            <td>{this.tds(1, "employee")}</td>
          </tr>
          <tr>
            <td rowSpan="4" style={{ backgroundColor: "#ccc" }}>
              上午
            </td>
            <td>3</td>
            <td>{this.tds(2, "subject")}</td>
            <td>{this.tds(2, "employee")}</td>
          </tr>
          <tr>
            <td>4</td>
            <td>{this.tds(3, "subject")}</td>
            <td>{this.tds(3, "employee")}</td>
          </tr>
          <tr>
            <td>5</td>
            <td>{this.tds(4, "subject")}</td>
            <td>{this.tds(4, "employee")}</td>
          </tr>
          <tr>
            <td>6</td>
            <td>{this.tds(5, "subject")}</td>
            <td>{this.tds(5, "employee")}</td>
          </tr>
          <tr>
            <td rowSpan="4" style={{ backgroundColor: "#ccc" }}>
              下午
            </td>
            <td>7</td>
            <td>{this.tds(6, "subject")}</td>
            <td>{this.tds(6, "employee")}</td>
          </tr>
          <tr>
            <td>8</td>
            <td>{this.tds(7, "subject")}</td>
            <td>{this.tds(7, "employee")}</td>
          </tr>
          <tr>
            <td>9</td>
            <td>{this.tds(8, "subject")}</td>
            <td>{this.tds(8, "employee")}</td>
          </tr>
          <tr>
            <td>10</td>
            <td>{this.tds(9, "subject")}</td>
            <td>{this.tds(9, "employee")}</td>
          </tr>
          <tr>
            <td rowSpan={2} style={{ backgroundColor: "#ccc" }}>
              晚自习
            </td>
            <td>11</td>
            <td>{this.tds(10, "subject")}</td>
            <td>{this.tds(10, "employee")}</td>
          </tr>
          <tr>
            <td>12</td>
            <td>{this.tds(11, "subject")}</td>
            <td>{this.tds(11, "employee")}</td>
          </tr>
        </table>
      </div>
    );
  }
}
export default connect((state, ownProps) => {
  return state;
})(Parent);
