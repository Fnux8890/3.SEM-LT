const {Word} = require('../ExerciseModule');

class Question {
    constructor(question, answer, answerOptions) {
        this.question = question; //Word()
        this.answer = answer; //string
        this.answerOptions = answerOptions; //string[]
    }

    //evaluate weather they got the answer correct or not
    Evaluate(userAnswer){
        let bool;
        if (this.answerOptions[answer]==userAnswer) {
            bool = true
        }
        else
            bool = false;
        return bool;
    }
}

module.exports = {'Question': Question};