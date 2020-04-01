import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questionCount = 1;
  questionType: string = "easy";
  questions: any;
  currentQuestion = {
    question: '',
    correctAnswer: '',
    answers: []
  };
  questionIndex = 0;
  hasQuestions;
  isLastQuestion;
  sumbittedAnswers = [];

  score = 0;
  submitted;

  constructor() { }

  ngOnInit() {
  }

  questionTypeChange(e) {
    this.questionType = e.target.value;
  }

  getStarted() {
    $.ajax({
      type: 'GET',
      url: `https://opentdb.com/api.php?amount=${this.questionCount}&difficulty=${this.questionType}&type=multiple`,
      success: (data) => {
        this.questions = data.results;
        this.hasQuestions = this.questions.length > 0;
        this.repopulateAnswers();
        this.currentQuestion = {
          question: this.escapeHtml(this.questions[this.questionIndex].question),
          correctAnswer: this.questions[this.questionIndex].correct_answer,
          answers: this.questions[this.questionIndex].incorrect_answers
        };
        this.isLastQuestion = this.questionIndex + 1  == this.questions.length;
      },
      error: (err) => {
        console.log('error -- '+ err);
      }
    });
  }

  repopulateAnswers() {
    this.questions.forEach(question => {
      question.incorrect_answers.push(question.correct_answer);
    });
  }

  nextQuestion() {
    let selectedAnswer =  $('.answerButton.selectedAnswer').first().text();
    this.sumbittedAnswers.push({
      selected: selectedAnswer.trim(),
      correct: this.currentQuestion.correctAnswer.trim()
    });

    this.questionIndex++;
    if (this.questionIndex < this.questions.length) {
      this.isLastQuestion = this.questionIndex + 1  == this.questions.length;
      this.currentQuestion = {
        question: this.escapeHtml(this.questions[this.questionIndex].question),
        correctAnswer: this.questions[this.questionIndex].correct_answer,
        answers: this.questions[this.questionIndex].incorrect_answers
      };
    }
  }

  //helper to get rid off special HTML entities.
  escapeHtml(string) {
    return string.replace(/&quot;/g, '\"')
                 .replace(/&#039;/g, '\'')
                 .replace(/&amp;/g, '\&')
                 .replace(/&lt;/g, '\<')
                 .replace(/&gt;/g, '\>');
  }


  submitQuiz(){
    let selectedAnswer =  $('.answerButton.selectedAnswer').first().text();
    this.sumbittedAnswers.push({
      selected: selectedAnswer.trim(),
      correct: this.currentQuestion.correctAnswer.trim()
    });

    this.sumbittedAnswers.forEach((answerObject)=>{
      if(answerObject.selected === answerObject.correct){
        this.score ++;
      }
    });
    this.submitted = true;
  }

  answerBtnClick(e){
    $('.answerButton').each((i, btn)=>{
      btn.classList.remove('selectedAnswer');
    });
    e.target.classList.add('selectedAnswer');
  }

  restartQuiz(){
    window.document.location.reload();
  }
}
