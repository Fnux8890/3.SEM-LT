// eslint-disable-next-line no-unused-vars
const { Word } = require('./ExerciseModule');
// Bruges kun i Exercise2
class FocusWordSentence {
  constructor(sentence, focusWord) {
    this.sentence = sentence; // Word()
    this.focusWord = focusWord; // Word()
  }
}

module.exports = { FocusWordSentence };
