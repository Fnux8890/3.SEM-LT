const {Exercise4, FocusWordSentence} = require('../ExerciseModule');

//dette er øvelsen hvor man skal optage ét ord af en sætning
class Exercise2 extends Exercise4 {
    constructor(sentences){
        this.words = sentences; //FocusWordSentence[]
    }
}

module.exports = {'Exercise2': Exercise2};