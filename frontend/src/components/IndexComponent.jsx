import React, { Component } from "react";
import IndexService from "../services/IndexService";

class IndexComponent extends Component {

  state = {
    indexInfos: [],
  }

  componentDidMount() {
    IndexService.getInfo().then((res) => {
      this.setState({ indexInfos: res.data })
    })
  }

  render() {
    return (
      <div>
        { this.state.indexInfos }
      </div>
    )
  }

}

export default IndexComponent
