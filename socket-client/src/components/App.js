import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

import './App.css';

class App extends Component {
  state = {
    endpoint: 'localhost:4001',
    color: 'white'
  };

  // Send sockets
  send = () => {
    const socket = socketIOClient(this.state.endpoint);

    socket.emit('change color', this.state.color);
  }

  setColor = color => {
    this.setState({ color });
  }

  componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);

    setInterval(this.send(), 1000);
    socket.on('change color', color => {
      document.body.style.backgroundColor = color;
    })
  }

  render() {
    // test for connections
    const socket = socketIOClient(this.state.endpoint);

    return (
      <div className="App">
        <button onClick={() => this.send()}>Change color</button>

        <button id="blue" onClick={() => this.setState({ color: 'blue' })}>Blue</button>
        <button id="red" onClick={() => this.setState({ color: 'red' })}>Red</button>
      </div>
    );
  }
}

export default App;
