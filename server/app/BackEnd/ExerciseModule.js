let Set = require('./Set.js')['Set'];
let Exercise = require('./Exercise.js')['Exercise'];
let Exercise1 = require('./Exercises/Exercise1.js')['Exercise1'];
let Exercise2 = require('./Exercises/Exercise2.js')['Exercise2'];
let Exercise4 = require('./Exercises/Exercise4.js')['Exercise4'];
let Test = require('./Exercises/Test.js')['Test'];
let Question = require('./Question.js')['Question'];
let Word = require('./Word.js')['Word'];
let FocuseWordSentence = require('./FocusWordSentence.js')['FocusWordSentence'];

class ExerciseModule {
    constructor(ID, name, description, sets){
        this.ID = ID; //int
        this.name = name; //string
        this.description = description; //string 
        this.sets = sets; //Set[]
    }
}

module.exports = {
    'ExerciseModule': ExerciseModule,
    'Set': Set,
    'Exercise': Exercise,
    'Exercise1': Exercise1,
    'Exercise2': Exercise2,
    'Exercise4': Exercise4,
    'Test': Test,
    'Question': Question,
    'Word': Word,
    'FocuseWordSentence': FocuseWordSentence
};