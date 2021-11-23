const {Question, Word} = require('../ExerciseModule');

class Exercise {
    constructor(ID, name, description, words, instructions){
        this.ID = ID; //int
        this.name = name; //string
        this.description = description; //string 
        this.words = words; //Questions()
        this.instruction = instructions; //Word()
    }

    SetUpExercise(){
        
    }

    RegisterChoice(userAnswer){
        let currentQuestion;
        
        currentQuestion.Evaluate(userAnswer);
    }

    Finish(){
        let wordsStats; //JSON object

        return wordsStats;
    }


}

module.exports = {'Exercise': Exercise};