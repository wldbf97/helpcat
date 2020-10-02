import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { Mutation } from "react-apollo";
import Moment from "react-moment";

const USER_DATA_QUERY = gql`
  query {
    me {
      id
      email
      userName
      address
    }
  }
`;

const DELETE_SERVICE_BOARD_MUTATION = gql`
  mutation DeleteServiceBoardMutation($serviceId: Int!) {
    removeService(id: $serviceId)
  }
`;

const SERVICE_ACCEPT_MUTATION = gql`
  mutation ServiceAcceptMutation($serviceId: Int!) {
    giveService(id: $serviceId) {
      id
    }
  }
`;

class BoardDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requester: "",
      acceptor: "",
      requesterTrue: false,
    };
  }

  render() {
    const serviceBoardData = this.props.location.serviceBoardData; //게시글 전체 값
    const serviceId = Number(serviceBoardData.id);
    const startAt = new Date(serviceBoardData.startAt);
    const endAt = new Date(serviceBoardData.endAt);
    this.state.requester = serviceBoardData.reqUser.id;
    return (
      <>
        <Query query={USER_DATA_QUERY}>
          {({ loading, error, data }) => {
            if (loading)
              return (
                <>
                  <div className="map2">Loading...</div>
                </>
              );
            if (error)
              //비 로그인시
              return (
                <>
                  <div className="writeform">
                    <div className="writetitle">제목</div>
                    <input
                      className="writetitleinput"
                      value={serviceBoardData.title}
                      readOnly
                    ></input>
                    <div className="writecontent">내용</div>
                    <textarea
                      className="writecontentinput"
                      value={serviceBoardData.contents}
                      readOnly
                    ></textarea>
                    <div className="writecontent">가격</div>
                    <input
                      className="writetitleinput"
                      value={serviceBoardData.price}
                      readOnly
                    ></input>
                    <div className="writecontent">주소</div>
                    <input
                      className="writetitleinput"
                      value={serviceBoardData.address}
                      readOnly
                    ></input>
                    <div className="writecontent">시작일</div>
                    <Moment format="YYYY년MM월DD일 hh시mm분">{startAt}</Moment>
                    <div className="writecontent">종료일</div>
                    <Moment format="YYYY년MM월DD일 hh시mm분">{endAt}</Moment>
                    <input
                      className="writereset"
                      type="reset"
                      value="뒤로가기"
                      readOnly
                      onClick={this.Goback}
                    ></input>
                  </div>
                </>
              );
            // 게시글 작성자 id와 로그인된 id값이 일치할 경우 true
            if (data) {
              this.state.me = data.me.id;
              if (this.state.requester === this.state.me) {
                this.state.requesterTrue = true;
              }
            }
            //로그인 시
            return (
              <>
                <div className="writeform">
                  <div className="writetitle">제목</div>
                  <input
                    className="writetitleinput"
                    value={serviceBoardData.title}
                    readOnly
                  ></input>
                  <div className="writecontent">내용</div>
                  <textarea
                    className="writecontentinput"
                    value={serviceBoardData.contents}
                    readOnly
                  ></textarea>
                  <div className="writecontent">가격</div>
                  <input
                    className="writetitleinput"
                    value={serviceBoardData.price}
                    readOnly
                  ></input>
                  <div className="writecontent">주소</div>
                  <input
                    className="writetitleinput"
                    value={serviceBoardData.address}
                    readOnly
                  ></input>
                  <div className="writecontent">시작일</div>
                  <Moment format="YYYY년MM월DD일 hh시mm분">{startAt}</Moment>
                  <div className="writecontent">종료일</div>
                  <Moment format="YYYY년MM월DD일 hh시mm분">{endAt}</Moment>
                  <input
                    className="writereset"
                    type="reset"
                    value="뒤로가기"
                    readOnly
                    onClick={this.Goback}
                  ></input>
                  {serviceBoardData.progress ? (//서비스가 완료 되었으면 아무버튼 안뜨게
                  <></>
                  ):(serviceBoardData.ansUser ? ( // 서비스 수락자가 있다면
                    (this.state.requesterTrue ? ( // 서비스 수락자가 있고 글쓴이라면
                      <Link
                        to={{
                          pathname: `/reviewWrite`,
                          serviceBoardData: serviceBoardData,
                          serviceBoardId: serviceId,
                          userData: data
                        }}
                      >
                        <button className="writereset">
                          완료하고 후기 작성하기
                        </button>
                      </Link>

                      ):(<></>)//서비스 수락자가 있고 글쓴이가 아니라면 아무 버튼없음
                    )
                  ) : (this.state.requesterTrue ? ( //서비스 수락자가 없고 글쓴이라면
                    <>
                      <a href="/board">
                        <Mutation
                          mutation={DELETE_SERVICE_BOARD_MUTATION}
                          variables={{ serviceId }}
                        >
                          {(mutation) => (
                            <button className="writereset" onClick={mutation}>
                              삭제하기
                            </button>
                          )}
                        </Mutation>
                      </a>
                      <Link
                        to={{
                          pathname: `/board/update/${serviceId}`,
                          serviceBoardData: serviceBoardData,
                        }}
                      >
                        <input
                          className="writereset"
                          type="reset"
                          value="수정하기"
                          readOnly
                        ></input>
                      </Link>
                    </>
                    )
                    :
                    ( // 서비스 수락자가 없고 글쓴이가 아니라면
                    <>
                    <a href="/board">
                        <Mutation
                          mutation={SERVICE_ACCEPT_MUTATION}
                          variables={{ serviceId }}
                        >
                          {(mutation) => (
                            <button className="writereset" onClick={mutation}>
                              신청하기
                            </button>
                          )}
                        </Mutation>
                      </a>
                    </>
                    )
                    )
                  )
                  }
                </div>
              </>
            );
          }}
        </Query>
      </>
    );
  }
  Goback() {
    window.history.go(-1);
  }
}

export default BoardDetail;
