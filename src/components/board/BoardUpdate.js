import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import {KeyboardDateTimePicker} from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

const BOARD_UPDATE_MUTATION = gql`
  mutation BoardUpdateMutation(
    $id : Int!
    $title: String!
    $contents: String!
    $price: Int!
    $address: String!
    $startAt: DateTime!
    $endAt: DateTime!
  ) {
    editService(
      id: $id
      title: $title
      contents: $contents
      price: $price
      address: $address
      startAt: $startAt
      endAt: $endAt
    )
  }
`;

class BoardUpdate extends Component {
  state = {
    title: this.props.location.serviceBoardData.title,
    contents: "",
    price: Number,
    address: "",
    startAt: "",
    endAt: "",
  };

  changePickerData(target, value) {
    this.setState({
      [target]: value,
    });
  }

  render() {
    const beforeData = this.props.location.serviceBoardData;
    const { title, contents, price, address, startAt, endAt } = this.state;
    console.log(title, contents  );

    const id = Number(beforeData.id)
    return (
      <>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div className="writeform">
          <div className="writetitle">제목</div>
          <input
            className="writetitleinput"
            placeholder={beforeData.title}
            onChange={(e) => this.setState({ title: e.target.value })}
          ></input>
          <div className="writecontent">내용</div>
          <textarea
            className="writecontentinput"
            placeholder={beforeData.contents}
            onChange={(e) => this.setState({ contents: e.target.value })}
          ></textarea>
          <div className="writecontent">가격</div>
          <input
            className="writetitleinput"
            placeholder={beforeData.price}
            onChange={(e) => this.setState({ price: Number(e.target.value) })}
          ></input>
          <div className="writecontent">주소</div>
          <input
            className="writetitleinput"
            placeholder={beforeData.address}
            onChange={(e) => this.setState({ address: e.target.value })}
          ></input>
          <KeyboardDateTimePicker
            disableToolbar
            value={startAt ? startAt : beforeData.startAt}
            onChange={this.changePickerData.bind(this, "startAt")}
            variant="inline"
            format="yyyy/MM/DD LT"
            margin="normal"
            label="시작 예정일"
            style={{ width: "50%" }}
            KeyboardButtonProps={{ "aria-label": "change time" }}
          />
          <KeyboardDateTimePicker
            disableToolbar
            value={endAt ? endAt : beforeData.endAt}
            onChange={this.changePickerData.bind(this, "endAt")}
            variant="inline"
            format="yyyy/MM/DD LT"
            margin="normal"
            label="종료 예정일"
            style={{ width: "50%" }}
            KeyboardButtonProps={{ "aria-label": "change time" }}
          />
          <form>
          <a href="/board">
            <Mutation
              mutation={BOARD_UPDATE_MUTATION}
              variables={{ id, title, contents, price, address, startAt, endAt}}
            >
              {(mutation) => (
                <input
                  className="writesubmit"
                  onClick={mutation}
                  value="제출"
                  readOnly
                >
                </input>
              )}
            </Mutation>
            </a>
            <input className="writereset" type="reset"></input>
          </form>
        </div>
      </MuiPickersUtilsProvider>
      </>
    );
  }

}

export default BoardUpdate;