import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <iframe title="currVideo" width="560" height="315" src="https://www.youtube.com/embed/LTXTeAt2mpg" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
        <YoutubeLoader />
        <AnnotationList />
      </div>
    );
  }

}

class AnnotationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      annotations: []
    }
  }

  createNewAnnotation(){
    this.setState({
      annotations: this.state.annotations.concat(this.renderAnnotation())
    })
  }

  renderAnnotation() {
    return (
      <Annotation />
    )
  }

  render() {
    return (
      <div className="AnnotationList">
        <button id="newAnnotationBtn" onClick={() => this.createNewAnnotation()}>New Annotation</button>
        <ul id="annotationListView">
          {this.state.annotations.map(annotation => {
            return(
              annotation
            )}
          )}
        </ul>
      </div>
    )
  }
}

class Annotation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: Math.random(),
      vidId: "VIDID",
      timeStamp: 0,
      comment: "I'm a new comment!",
      isEditing: false
    }

    this.editComment = this.editComment.bind(this)
  }

  toggleEdit() {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  editComment(event) {
    this.setState({comment: event.target.value});
  }
  
  render() {
    if (this.state.isEditing) {
      return (
        <li className="Annotation" key={this.state.key}>
          <h1 id="vidId">{this.state.vidId}</h1>
          <h2 id="timeStamp">{this.state.timeStamp}</h2>
          <label>
            Comment:
            <input type="text" name="comment" onChange={this.editComment} value={this.state.comment}></input>
          </label>
          <br></br>
          <button id="editBtn" onClick={() => this.toggleEdit()}>Edit</button>
        </li>
      )

    } else {
      return (
        <li className="Annotation" key={this.state.key}>
          <h1 id="vidId">{this.state.vidId}</h1>
          <h2 id="timeStamp">{this.state.timeStamp}</h2>
          <p id="comment">{this.state.comment}</p>
          <button id="editBtn" onClick={() => this.toggleEdit()}>Edit</button>
        </li>
      )

    }
  }
}

class YoutubeLoader extends Component {
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
    let inputLink = document.getElementById('vidLink').value;
    if (inputLink !== "") {
      inputLink = this.getId(inputLink)
      if (inputLink !== 'error') {
        this.setState({vidLink: 'https://www.youtube.com/embed/' + inputLink});
        console.log(this.vidLink)
        this.injectNewVideo();
      }
    }
  }

  injectNewVideo() {
    document.getElementById('vidCode').innerHTML = '<iframe width="560" height="315" src=' + this.vidLink + ' frameBorder="0" allowFullScreen></iframe>';
  }

  render() {
    return(
      <div className="YoutubeLoader">
        <label htmlFor="vidLink">Youtube link: </label>
        <input type="text" id="vidLink" name="vidLink" required></input>
        <input type="submit" value="Submit" id="submitBtn" onClick={() => this.handleSubmit()}></input>
        <div id="vidCode"></div>
      </div>
    )
  }

}

class FileVideoLoader extends Component {

  handleSubmit() {
    let inputFile = this.fileUpload.files[0]
    console.log(inputFile)
  }

  render() {
    return(
      <div className="FileVideoLoader">
        <label htmlFor="fileInput">Youtube link: </label>
        <input type="file" id="fileInput" name="fileInput" accept="video/*" ref={(ref) => this.fileUpload = ref}></input>
        <input type="submit" value="Submit" id="submitBtn" onClick={() => this.handleSubmit()}></input>
        <video width="560" height="315" controls>
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }

}

export default App;
