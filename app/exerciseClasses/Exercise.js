// eslint-disable-next-line no-unused-vars
const { Question, Word } = require('./ExerciseModule');

class Exercise {
  constructor(ID, name, description, words, instructions) {
    this.ID = ID; // int
    this.name = name; // string
    this.description = description; // string
    this.words = words; // Questions()
    this.instruction = instructions; // Word()
  }

  // eslint-disable-next-line class-methods-use-this
  SetUpExercise() {}

  // eslint-disable-next-line class-methods-use-this
  RegisterChoice(userAnswer) {
    let currentQuestion;

    currentQuestion.Evaluate(userAnswer);
  }

  // eslint-disable-next-line class-methods-use-this
  Finish() {
    let wordsStats; // JSON object

    return wordsStats;
  }
}

module.exports = { Exercise };
