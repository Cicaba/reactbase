import React, { Component } from "react";
import { connect } from "react-redux";
import QuerySelector from "@/components/querySelector";
import Date from "@/components/date";
import { ListView, List, Toast, Button, Tabs } from "antd-mobile";

class Headmaster extends Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource,
      dataSource1: dataSource,
      name: "",
      subjectId: [],
      examId: [],
      studentId: [],
      startTime: "",
      endTime: "",
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
      subjectList: [],
      examBySubject: []
    };
  }
  componentWillMount() {
    let arr = [
      $axios.post("/api/services/Main/WeiXinService/PageCurrentUserMgrStudents", { page: 1, pageSize: 1000, sorting: "" }),
      $axios.get("/api/services/Main/WeiXinService/GetSubjectListByMgr"),
      $axios.get("/api/services/Main/WeiXinService/GetExamBySubjectOnMgr")
    ];
    $axios.all(arr).then((res) => {
      let students = res[0].data.result.items.map((v) => {
        return {
          value: v.id,
          label: v.name
        };
      });
      let subjectList = res[1].data.result.map((v) => {
        return {
          value: v.id,
          label: v.subjectName
        };
      });
      let examBySubject = res[2].data.result.map((v) => {
        return {
          value: v.subjectId,
          label: v.examName
        };
      });
      this.setState({ students, subjectList, examBySubject });
    });
    // this.query();
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
        subjectId: this.state.subjectId[0],
        examId: this.state.examId[0]
      },
      page: 1,
      pageSize: this.state.pageSize,
      sorting: this.state.sorting
    };
    if ($validate(data, ["subjectId", "examId"], ["考试科目", "考试类型"])) return;
    $axios.post("/api/services/Main/WeiXinService/PagedScoreByMgr", data).then((res) => {
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
        studentId: this.state.studentId[0],
        startTime: $date(this.state.startTime, "yyyy-MM-dd"),
        endTime: $date(this.state.endTime, "yyyy-MM-dd")
      },
      page: 1,
      pageSize: this.state.pageSize1,
      sorting: this.state.sorting
    };
    if ($validate(data, ["subjectId", "studentId"], ["考试科目", "学生"])) return;
    $axios.post("/api/services/Main/WeiXinService/PagedScoreSingleStudentByMgr", data).then((res) => {
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
    const tabs = [{ title: "班级成绩查询" }, { title: "学生历史成绩" }];
    return (
      <div>
        <Tabs tabs={tabs} initialPage={this.state.initialPage} onTabClick={(v, i) => this.setState({ initialPage: i })} tabBarPosition="top" destroyInactiveTab={true}></Tabs>
        {this.state.initialPage === 0 ? (
          <div className="Tabs1">
            <QuerySelector
              label={
                <span>
                  <span style={{ color: "red" }}>*</span>考试科目:
                </span>
              }
              onDismiss={() => this.setState({ subjectId: "" })}
              onChange={(v) => this.setState({ subjectId: v })}
              value={this.state.subjectId}
              data={this.state.subjectList}
            ></QuerySelector>
            <QuerySelector
              label={
                <span>
                  <span style={{ color: "red" }}>*</span>考试类型:
                </span>
              }
              onDismiss={() => this.setState({ examId: "" })}
              onChange={(v) => this.setState({ examId: v })}
              value={this.state.examId}
              data={this.state.examBySubject}
            ></QuerySelector>
            <Button onClick={() => this.query(false)} style={{ marginTop: "0.2rem", marginBottom: "0.2rem" }} type="primary">
              查 询
            </Button>
            <ListView
              dataSource={this.state.dataSource.cloneWithRows(this.state.dataList)}
              renderRow={(rowData, id1, i) => this.renderRow(rowData, i)}
              style={{
                height: this.props.clientHeight - 260,
                overflow: "auto"
              }}
              pageSize={10}
              onEndReached={() => this.query(true)}
              onEndReachedThreshold={10}
            />
          </div>
        ) : (
          <div className="Tabs2">
            <QuerySelector
              label={
                <span>
                  <span style={{ color: "red" }}>*</span>考试科目:
                </span>
              }
              onDismiss={() => this.setState({ subjectId: [] })}
              onChange={(v) => this.setState({ subjectId: v })}
              value={this.state.subjectId}
              data={this.state.subjectList}
            ></QuerySelector>
            <QuerySelector
              label={
                <span>
                  <span style={{ color: "red" }}>*</span>选择学生:
                </span>
              }
              onDismiss={() => this.setState({ studentId: [] })}
              onChange={(v) => this.setState({ studentId: v })}
              value={this.state.studentId}
              data={this.state.students}
            ></QuerySelector>
            <Date startTime={this.state.startTime} endTime={this.state.endTime} onConfirm={(startTime, endTime) => this.setState({ startTime, endTime })} />
            <Button onClick={() => this.query1(false)} style={{ marginTop: "0.2rem", marginBottom: "0.2rem" }} type="primary">
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
