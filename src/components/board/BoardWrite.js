import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import FileUpload from "./FileUpload";

const BOARD_UPROAD_MUTATION = gql`
  mutation BoardUproadMutation(
    $title: String!
    $contents: String!
    $price: Int
    $address1: String
    $address2: Stirng
    $lat: Float
    $lon: Float
    $imgFiles: [String]
    $startAt: DateTime
    $endAt: DateTime
  ) {
    addService(
      title: $title
      contents: $contents
      price: $price
      address1: $address1
      address2: $address2
      lat: $lat
      lon: $lon
      imgFiles: $imgFiles
      startAt: $startAt
      endAt: $endAt
    )
  }
`;

class BoardWrite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      contents: "",
      price: Number,
      address: "",
      imgFiles: "",
      startAt: Date(),
      endAt: Date(),
    };
  }

  changePickerData(target, value) {
    this.setState({
      [target]: value,
    });
  }

  updateImages = (newImages) => {
    this.setState({
      imgFiles: newImages,
    });
  };

  render() {
    const { title, contents, price, address1, imgFiles, startAt, endAt } = this.state;

    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div className="writeform">
          <img alt="글쓰기" className="nomargin" src="writecat.png" width="80px"></img>
          <div className="writetitle">제목</div>
          <input
            className="writetitleinput"
            onChange={(e) => this.setState({ title: e.target.value })}
          ></input>
          <div className="writecontent">내용</div>
          <textarea
            className="writecontentinput"
            onChange={(e) => this.setState({ contents: e.target.value })}
          ></textarea>
          <div className="writecontent">가격</div>
          <input
            className="writetitleinput"
            onChange={(e) => this.setState({ price: Number(e.target.value) })}
          ></input>
          <div className="writecontent">주소</div>
          <input
            className="writetitleinput"
            onChange={(e) => this.setState({ address: e.target.value })}
          ></input>
          <FileUpload refreshFunction={this.updateImages.bind(this)} />
          <div className="startday">
            <KeyboardDateTimePicker
              disableToolbar
              value={this.state.startAt}
              onChange={this.changePickerData.bind(this, "startAt")}
              format="yyyy/MM/DD LT"
              label="시작 예정일"
              KeyboardButtonProps={{ "aria-label": "change time" }}
            />
          </div>
          <div className="endday">
            <KeyboardDateTimePicker
              disableToolbar
              value={this.state.endAt}
              onChange={this.changePickerData.bind(this, "endAt")}
              format="yyyy/MM/DD LT"
              label="종료 예정일"
              KeyboardButtonProps={{ "aria-label": "change time" }}
            />
          </div>
          <form>
            <a href="/board">
              <Mutation
                mutation={BOARD_UPROAD_MUTATION}
                variables={{ title, contents, price, address1, imgFiles, startAt, endAt }}
              >
                {(mutation) => (
                  <input className="writesubmit" onClick={mutation} value="제출" readOnly></input>
                )}
              </Mutation>
            </a>
            <input
              type="reset"
              className="writereset"
              onClick={this.reload}
              readOnly
              value="초기화"
            ></input>
          </form>
        </div>
      </MuiPickersUtilsProvider>
    );
  }
  reload() {
    window.location.reload();
  }
}

export default BoardWrite;