const { Set } = require('./Set');
const { Exercise } = require('./Exercise');
const { Exercise1 } = require('./Exercises/Exercise1');
const { Exercise2 } = require('./Exercises/Exercise2');
const { Exercise4 } = require('./Exercises/Exercise4');
const { Test } = require('./Exercises/Test');
const { Question } = require('./Question');
const { Word } = require('./Word');
const FocuseWordSentence = require('./FocusWordSentence').FocusWordSentence;

class ExerciseModule {
  constructor(ID, name, description, sets) {
    this.ID = ID; // int
    this.name = name; // string
    this.description = description; // string
    this.sets = sets; // Set[]
  }
}

module.exports = {
  ExerciseModule,
  Set,
  Exercise,
  Exercise1,
  Exercise2,
  Exercise4,
  Test,
  Question,
  Word,
  FocuseWordSentence,
};
