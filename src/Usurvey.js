 import React, { Component } from 'react'
 let firebase = require('firebase');
 let uuid = require('uuid');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC0NhmsOYUrUqOBU0tZc6Kxg63hj2WSz2I",
  authDomain: "u-survey-63610.firebaseapp.com",
  databaseURL: "https://u-survey-63610.firebaseio.com",
  projectId: "u-survey-63610",
  storageBucket: "u-survey-63610.appspot.com",
  messagingSenderId: "280632464524"
};
firebase.initializeApp(config);


class Usurvey extends Component {
  nameSubmit(){
    let studentName = this.refs.name.value;
    this.setState({studentName: studentName}, function(){
      console.log(this.state);
    });
  }
  answerSelected(event){
    let answers = this.state.answers;
    if (event.target.name === 'answer1'){
      answers.answer1 = event.target.value;
    }else if (event.target.name === 'answer2'){
      answers.answer2 = event.target.value;
    }else if (event.target.name === 'answer3'){
      answers.answer3 = event.target.value;
    }else if (event.target.name === 'answer4'){
      answers.answer4 = event.target.value;
    }
    this.setState({answers: answers}, function(){
      console.log(this.state);
    });
  }
  
  questionSubmit(){
    firebase.database().ref('uSurvey/'+this.state.uid).set({
      studenName: this.state.studentName,
      answers: this.state.answers
    });
    this.setState({isSubmitted:true});
  }

  constructor(props){
    super(props);

    this.state = {
      uid: uuid.v1(),
      studentName: '',
      answers: {
        answer1 : '',
        answer2 : '',
        answer3 : '',
        answer4 : '',

      },
      isSubmitted: false
    };
    this.nameSubmit = this.nameSubmit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.questionSubmit = this.questionSubmit.bind(this);
  }

  render() {
    let studentName;
    let questions;

    if(this.state.studentName === '' && this.state.isSubmitted === false){
      studentName = <div>
      <h1>Hey student, Please let us know your name:</h1>
      <form onSubmit= {this.nameSubmit}>
        <input className='Mike' type='text' placeholder='Enter your name' ref = 'name'/>
      </form>
      </div>;
      questions = ''
    }else if(this.state.studentName !== '' && this.state.isSubmitted === false){
      studentName = <h1> Welcome to Usurvey, {this.state.studentName}</h1>
      questions = <div>
        <h2>Here are some questions: </h2>
        <form onSubmit={this.questionSubmit}>
          <div className='card'>
          <label>What kind of courses do you like the most: </label> <br />
          <input type ='radio' name="answer1" value='technology' onChange={this.answerSelected}/>Technology
          <input type ='radio' name="answer1" value='design' onChange={this.answerSelected}/>Design
          <input type ='radio' name="answer1" value='marketing' onChange={this.answerSelected}/>Marketing
        </div>
        <div className='card'>
          <label>What is your Profession: </label> <br />
          <input type ='radio' name="answer2" value='student' onChange={this.answerSelected}/>Student
          <input type ='radio' name="answer2" value='worker' onChange={this.answerSelected}/>Worker
          <input type ='radio' name="answer2" value='freelancer' onChange={this.answerSelected}/>Freelancer
        </div>
        <div className='card'>
          <label>Is online learning helpful: </label> <br />
          <input type ='radio' name="answer3" value='yes' onChange={this.answerSelected}/>yes
          <input type ='radio' name="answer3" value='no' onChange={this.answerSelected}/>no
          <input type ='radio' name="answer3" value='maybe' onChange={this.answerSelected}/>Maybe
        </div>
        <div className='card'>
          <label>Are you Married: </label> <br />
          <input type ='radio' name="answer4" value='yes' onChange={this.answerSelected}/>yes
          <input type ='radio' name="answer4" value='no' onChange={this.answerSelected}/>no
          <input type ='radio' name="answer4" value='maybe' onChange={this.answerSelected}/>Maybe
        </div>
        <input className="feedback-button" type="submit" value="submit"/>
        </form>
      </div>
    }else if(this.state.isSubmitted === true){
      studentName = <h1>Thanks, {this.state.studentName}</h1>
    }
    return (
      <div>
       {studentName}
       --------------------------
       {questions}
      </div>
      );
    }
  }
  
export default Usurvey;