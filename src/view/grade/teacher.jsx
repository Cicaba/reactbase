import React, { Component } from "react";
import { connect } from "react-redux";
import QuerySelector from "@/components/querySelector";
import Date from "@/components/date";
import { ListView, List, InputItem, Toast, Button, Tabs } from "antd-mobile";

class Headmaster extends Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource,
      dataSource1: dataSource,
      no: "",
      name: "",
      SubjectId: [],
      subjectId: [],
      examId: [],
      classId: [],
      startTime: window.Date(),
      endTime: window.Date(),
      page: 1,
      pageSize: 50,
      pageSize1: 50,
      sorting: "",
      initialPage: 0,
      total: 0,
      total1: 0,
      students: [],
      dataList: [],
      dataList1: [],
      classList: [],
      subjectList: [],
      subjectList1: [],
      exmaList: []
    };
  }
  componentWillMount() {
    //查询班级
    $axios
      .get(
        "/api/services/Main/WeiXinService/GetClassListByTeacher?" +
          $qs.stringify({
            StartTime: $date(this.state.startTime, "yyyy-MM-dd"),
            EndTime: $date(this.state.endTime, "yyyy-MM-dd")
          })
      )
      .then((res) => {
        this.setState({
          classList: res.data.result.map((v) => {
            return {
              label: v.name,
              value: v.id
            };
          })
        });
      });
  }
  //科目
  getClassList() {
    $axios
      .get(
        "/api/services/Main/WeiXinService/GetTeacherMgrSubjectList?" +
          $qs.stringify({
            StartTime: $date(this.state.startTime, "yyyy-MM-dd"),
            EndTime: $date(this.state.endTime, "yyyy-MM-dd")
          })
      )
      .then((res) => {
        this.setState({
          classList: res.data.result.map((v) => {
            return {
              label: v.name,
              value: v.id
            };
          })
        });
      });
  }
  //科目
  getSubjectList() {
    $axios
      .get(
        "/api/services/Main/WeiXinService/GetExmaByTeacher?" +
          $qs.stringify({
            StartTime: $date(this.state.startTime, "yyyy-MM-dd"),
            EndTime: $date(this.state.endTime, "yyyy-MM-dd"),
            ClassId: this.state.classId[0]
          })
      )
      .then((res) => {
        this.setState({
          subjectList: res.data.result.map((v) => {
            return {
              label: v.subjectName,
              value: v.id
            };
          })
        });
      });
  }
  //科目
  getSubjectList1() {
    $axios
      .get(
        "/api/services/Main/WeiXinService/GetStudentSubjectList?" +
          $qs.stringify({
            no: this.state.no
          })
      )
      .then((res) => {
        this.setState({
          subjectList1: res.data.result.map((v) => {
            return {
              label: v.subjectName,
              value: v.id
            };
          })
        });
      });
  }
  //考试
  getExmaList() {
    $axios
      .get(
        "/api/services/Main/WeiXinService/GetExmaByTeacher?" +
          $qs.stringify({
            StartTime: $date(this.state.startTime, "yyyy-MM-dd"),
            EndTime: $date(this.state.endTime, "yyyy-MM-dd"),
            ClassId: this.state.classId[0],
            SubjectId: this.state.SubjectId[0]
          })
      )
      .then((res) => {
        this.setState({
          exmaList: res.data.result.map((v) => {
            return {
              label: v.examName,
              value: v.subjectId
            };
          })
        });
      });
  }
  query(bool = true) {
    // if (this.state.total && this.state.total < this.state.pageSize) {
    //   Toast.offline("没有更多的数据了");
    //   return;
    // }
    if (bool) {
      this.setState({ pageSize: this.state.pageSize + 50 });
    }
    let data = {
      filter: {
        examId: this.state.examId[0]
      },
      page: 1,
      pageSize: this.state.pageSize,
      sorting: this.state.sorting
    };
    $axios.post("/api/services/Main/WeiXinService/PagedScoreByTeacher", data).then((res) => {
      this.setState({ dataList: res.data.result.items, total: res.data.result.totalCount });
    });
  }
  query1(bool = true) {
    // if (this.state.total1 && this.state.total1 < this.state.pageSize1) {
    //   Toast.offline("没有更多的数据了");
    //   return;
    // }
    if (bool) {
      this.setState({ pageSize: this.state.pageSize1 + 50 });
    }
    let data = {
      filter: {
        subjectId: this.state.subjectId[0],
        no: this.state.no,
        startTime: $date(this.state.startTime, "yyyy-MM-dd"),
        endTime: $date(this.state.endTime, "yyyy-MM-dd")
      },
      page: 1,
      pageSize: this.state.pageSize1,
      sorting: this.state.sorting
    };
    $axios.post("/api/services/Main/WeiXinService/PagedScoreSingleStudentByTeacher", data).then((res) => {
      this.setState({ dataList1: res.data.result.items, total1: res.data.result.totalCount });
    });
  }
  renderRow(rowData, rowID) {
    return (
      <List.Item extra={<spna style={{ color: "#000" }}>{rowData.scoreValue}分</spna>}>
        {rowData.examStudent.name}
        <List.Item.Brief>考试时间: {$date(rowData.exam.examDate, "yyyy-MM-dd hh:mm:ss")}</List.Item.Brief>
      </List.Item>
    );
  }
  renderRow1(rowData, rowID) {
    return (
      <List.Item extra={<spna style={{ color: "#000" }}>{rowData.scoreValue}分</spna>}>
        {rowData.examStudent.name}
        <List.Item.Brief>
          考试时间: {$date(rowData.exam.examDate, "yyyy-MM-dd hh:mm:ss")}
          <br />
          考试类型: {rowData.exam.examName}
        </List.Item.Brief>
      </List.Item>
    );
  }
  render() {
    const tabs = [{ title: "班级成绩查询" }, { title: "学生成绩查询" }];
    return (
      <div>
        <Tabs tabs={tabs} initialPage={this.state.initialPage} onTabClick={(v, i) => this.setState({ initialPage: i })} tabBarPosition="top" destroyInactiveTab={true}></Tabs>
        {this.state.initialPage === 0 ? (
          <div className="Tabs1">
            <Date
              label={
                <span>
                  <span style={{ color: "red" }}>*</span>选择日期:
                </span>
              }
              startTime={this.state.startTime}
              endTime={this.state.endTime}
              onConfirm={(startTime, endTime) => {
                this.setState({ startTime, endTime }, () => {
                  this.getClassList();
                });
              }}
            />

            <QuerySelector
              label={
                <span>
                  <span style={{ color: "red" }}>*</span>选择班级:
                </span>
              }
              disabled={!this.state.startTime}
              onDismiss={() => this.setState({ classId: [] })}
              onChange={(v) => {
                this.setState({ classId: v }, () => {
                  this.getSubjectList();
                });
              }}
              value={this.state.classId}
              data={this.state.classList}
            ></QuerySelector>
            <QuerySelector
              label={
                <span>
                  <span style={{ color: "red" }}>*</span>选择科目:
                </span>
              }
              disabled={!this.state.classId[0]}
              onDismiss={() => this.setState({ SubjectId: [] })}
              onChange={(v) => {
                this.setState({ SubjectId: v }, () => {
                  this.getExmaList();
                });
              }}
              value={this.state.SubjectId}
              data={this.state.subjectList}
            ></QuerySelector>
            <QuerySelector
              label={
                <span>
                  <span style={{ color: "red" }}>*</span>考试类型:
                </span>
              }
              disabled={!this.state.SubjectId[0]}
              onDismiss={() => this.setState({ examId: "" })}
              onChange={(v) => this.setState({ examId: v })}
              value={this.state.examId}
              data={this.state.exmaList}
            ></QuerySelector>
            <Button disabled={!this.state.examId[0]} onClick={() => this.query(false)} style={{ marginTop: "0.2rem", marginBottom: "0.2rem" }} type="primary">
              查 询
            </Button>
            <ListView
              dataSource={this.state.dataSource.cloneWithRows(this.state.dataList)}
              renderRow={(rowData, id1, i) => this.renderRow(rowData, i)}
              style={{
                height: this.props.clientHeight - 340,
                overflow: "auto"
              }}
              pageSize={10}
              onEndReached={() => this.query(true)}
              onEndReachedThreshold={10}
            />
          </div>
        ) : (
          <div className="Tabs2">
            <Date
              label={
                <span>
                  <span style={{ color: "red" }}>*</span>选择日期:
                </span>
              }
              startTime={this.state.startTime}
              endTime={this.state.endTime}
              onConfirm={(startTime, endTime) => {
                this.setState({ startTime, endTime });
              }}
            />
            <List>
              <InputItem
                value={this.state.no}
                onChange={(v) => {
                  this.setState({ no: v });
                }}
                onBlur={() => {
                  this.getSubjectList1();
                }}
                clear
                placeholder="请输入"
              >
                <span>
                  <span style={{ color: "red" }}>*</span>学号:
                </span>
              </InputItem>
            </List>
            <QuerySelector
              label={
                <span>
                  <span style={{ color: "red" }}>*</span>考试科目:
                </span>
              }
              disabled={!this.state.no}
              onDismiss={() => this.setState({ subjectId: [] })}
              onChange={(v) => this.setState({ subjectId: v })}
              value={this.state.subjectId}
              data={this.state.subjectList1}
            ></QuerySelector>
            <Button disabled={!this.state.subjectId[0]} onClick={() => this.query1(false)} style={{ marginTop: "0.2rem", marginBottom: "0.2rem" }} type="primary">
              查 询
            </Button>
            <ListView
              dataSource={this.state.dataSource1.cloneWithRows(this.state.dataList1)}
              renderRow={(rowData, id1, i) => this.renderRow1(rowData, i)}
              style={{
                height: this.props.clientHeight - 300,
                overflow: "auto"
              }}
              pageSize={10}
              onEndReached={() => this.query1(true)}
              onEndReachedThreshold={10}
            />
          </div>
        )}
      </div>
    );
  }
}
export default connect((state, ownProps) => {
  return state;
})(Headmaster);
