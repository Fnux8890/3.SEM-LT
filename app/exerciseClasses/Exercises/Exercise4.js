// eslint-disable-next-line no-unused-vars
const { Exercise, Word } = require('../ExerciseModule');

class Exercise4 extends Exercise {
  // eslint-disable-next-line
  constructor(sentences) {
    // audioRecording variable ting?
    // eslint-disable-next-line
    this.words = sentences; // Word[]
  }
}

module.exports = { Exercise4 };
