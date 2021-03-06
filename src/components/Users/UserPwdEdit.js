import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";


const USER_PASSWORD_UPDATE_MUTATION = gql`
  mutation UserPasswordUpdateMutation($oldPwd: String!, $newPwd: String!) {
    editPwd(oldPwd: $oldPwd, newPwd: $newPwd)
  }
`;

class UserPwdEdit extends Component {
  state = {
    oldPwd: "",
    newPwd: "",
  };
  render() {
    const { oldPwd, newPwd } = this.state;
    return (
      <>
            <div className="loginInput">
              <div className="updatePWD">
              <img alt="" className="nomargin" src="/membercat.png" width="80px"></img>
                <input
                  value={oldPwd}
                  onChange={(e) => this.setState({ oldPwd: e.target.value })}
                  type="text"
                  placeholder="현재 비밀번호"
                />
              </div>
              <div className="updateNewPWD">
                <input
                  value={newPwd}
                  onChange={(e) => this.setState({ newPwd: e.target.value })}
                  type="password"
                  placeholder="새 비밀번호"
                />
              </div>
              <Link to="/">
              <Mutation
                mutation={USER_PASSWORD_UPDATE_MUTATION}
                variables={{ oldPwd, newPwd }}
              >
                {(mutation) => (
                  <button className="pwdEditbutton" onClick={mutation}>
                    수정하기
                  </button>
                )}
              </Mutation>
              </Link>
            </div>

      </>
    );
  }

}

export default UserPwdEdit;
