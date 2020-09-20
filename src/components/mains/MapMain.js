import React, { Component } from "react"
import { Query } from "react-apollo";
import gql from "graphql-tag";
import KakaoMap from "./KakaoMap";


const USER_DATA = gql`
  query{
    userAll{
      id,
      userName,
      address
    }
  }
`;

class MapMain extends Component {
  render(){
    return (
      <>
        <Query query={USER_DATA}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error!</p>
            return (
              <KakaoMap data={data}/>
            )
          }}
        </Query>

      </>
    )
  }
}

export default MapMain