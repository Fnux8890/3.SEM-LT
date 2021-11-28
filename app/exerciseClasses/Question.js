// eslint-disable-next-line no-unused-vars
const { Word } = require('./ExerciseModule');

class Question {
  constructor(question, answer, answerOptions) {
    this.question = question; // Word()
    this.answer = answer; // string
    this.answerOptions = answerOptions; // string[]
  }

  // evaluate weather they got the answer correct or not
  Evaluate(userAnswer) {
    let bool;
    // eslint-disable-next-line no-undef
    if (this.answerOptions[answer] === userAnswer) {
      bool = true;
    } else {
      bool = false;
    }
    return bool;
  }
}

module.exports = { Question };
