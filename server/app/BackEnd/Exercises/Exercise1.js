const {Exercise} = require('../Exercise');

class Exercise1 extends Exercise {
    constructor(){
        this.choice1 = words[0].answerOptions[0]; //string
        this.choice2 = words[0].answerOptions[1]; //string
    }
}

module.exports = {'Exercise1': Exercise1};