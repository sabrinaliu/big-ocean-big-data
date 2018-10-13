import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/LTXTeAt2mpg" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        <input type="file" name="file" accept="video/*"></input>
      </div>
    );
  }
}

export default App;
