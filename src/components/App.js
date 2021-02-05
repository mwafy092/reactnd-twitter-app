import React, { Component } from 'react';
import * as API from '../utils/api';
class App extends Component {
  componentDidMount() {
    API.getInitialData().then((data) => console.log(data));
  }
  render() {
    return <div></div>;
  }
}

export default App;
