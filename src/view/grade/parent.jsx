import React, { Component } from "react";
import { connect } from "react-redux";
import Date from "@/components/date";
import QuerySelector from "@/components/querySelector";
import { ListView, List, Toast, Button } from "antd-mobile";

class Parent extends Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource,
      subjectId: [],
      examId: [],
      startTime: $date(new window.Date().getTime(), "yyyy-MM-dd"),
      endTime: $date(new window.Date().getTime(), "yyyy-MM-dd"),
      page: 1,
      pageSize: 50,
      sorting: "",
      total: 0,
      visible: false,
      subjectList: [],
      examBySubject: [],
      dataList: []
    };
  }
  componentWillMount() {
    let arr = [$axios.get("/api/services/Main/WeiXinService/GetSubjectListByParent"), $axios.get("/api/services/Main/WeiXinService/GetExamBySubjectOnParent")];
    $axios.all(arr).then((res) => {
      let subjectList = res[0].data.result.map((v) => {
        return {
          value: v.id,
          label: v.subjectName
        };
      });
      let examBySubject = res[1].data.result.map((v) => {
        return {
          value: v.subjectId,
          label: v.examName
        };
      });
      this.setState({ subjectList, examBySubject });
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
        startTime: this.state.startTime,
        endTime: this.state.endTime
      },
      page: 1,
      pageSize: this.state.pageSize,
      sorting: this.state.sorting
    };
    $axios.post("/api/services/Main/WeiXinService/PagedScoreByParent", data).then((res) => {
      this.setState({ dataList: res.data.result.items, total: res.data.result.totalCount });
    });
  }
  renderRow(rowData, rowID) {
    return (
      <List.Item extra={<spna style={{ color: "#000" }}>{rowData.scoreValue}分</spna>}>
        {rowData.exam.examName}
        <List.Item.Brief>考试时间: {$date(rowData.exam.examDate, "yyyy-MM-dd hh:mm:ss")}</List.Item.Brief>
      </List.Item>
    );
  }
  render() {
    return (
      <div>
        <QuerySelector label="考试科目:" onDismiss={() => this.setState({ subjectId: "" })} onChange={(v) => this.setState({ subjectId: v })} value={this.state.subjectId} data={this.state.subjectList}></QuerySelector>
        <QuerySelector label="考试类型:" onDismiss={() => this.setState({ examId: "" })} onChange={(v) => this.setState({ examId: v })} value={this.state.examId} data={this.state.examBySubject}></QuerySelector>
        <Date startTime={this.state.startTime} endTime={this.state.endTime} onConfirm={(startTime, endTime) => this.setState({ startTime, endTime })} />
        <Button onClick={() => this.query(false)} style={{ marginTop: "0.2rem", marginBottom: "0.2rem" }} type="primary">
          查 询
        </Button>
        <ListView
          dataSource={this.state.dataSource.cloneWithRows(this.state.dataList)}
          renderRow={(rowData, id1, i) => this.renderRow(rowData, i)}
          style={{
            height: this.props.clientHeight - 250,
            overflow: "auto"
          }}
          pageSize={10}
          onEndReached={() => this.query(true)}
          onEndReachedThreshold={10}
        />
      </div>
    );
  }
}
export default connect((state, ownProps) => {
  return state;
})(Parent);
