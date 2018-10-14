import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <iframe title="currVideo" width="560" height="315" src="https://www.youtube.com/embed/LTXTeAt2mpg" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
        <input type="file" name="file" accept="video/*"></input>
        <VideoLoader />
      </div>
    );
  }

}

class VideoLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vidLink: "https://www.youtube.com/embed/LTXTeAt2mpg"
    };
  }

  getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length === 11) {
        return match[2];
    } else {
        return 'error';
    }
  }

  handleSubmit() {
    console.log('here!')
    let inputLink = document.getElementById('vidLink').value;
    if (inputLink !== "") {
      inputLink = this.getId(inputLink)
      if (inputLink !== 'error') {
        this.vidLink = 'https://www.youtube.com/embed/' + inputLink
        console.log(this.vidLink)
        this.injectNewVideo();
      }
    }
  }

  injectNewVideo() {
    document.getElementById('vidCode').innerHTML = '<iframe width="560" height="315" src=' + this.vidLink + ' frameBorder="0" allowFullScreen></iframe>';
    console.log("post inject " + this.vidLink)
  }

  render() {
    return(
      <div>
        <label htmlFor="vidLink">Youtube link: </label>
        <input type="text" id="vidLink" name="vidLink" required></input>
        <input type="submit" value="Submit" id="submitBtn" onClick={() => this.handleSubmit()}></input>
        <div id="vidCode"></div>
      </div>
    )
  }

}

export default App;
