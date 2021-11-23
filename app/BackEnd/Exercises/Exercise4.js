const {Exercise, Word} = require('../ExerciseModule');

class Exercise4 extends Exercise {
    constructor(sentences){
        //audioRecording variable ting?
        this.words = sentences; //Word[]
    }
}

module.exports = {'Exercise4': Exercise4};