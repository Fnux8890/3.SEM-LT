const {Exercise} = require('../Exercise');

class Test extends Exercise {
    constructor(videoURL){
        this.videoURL = videoURL; //string
    }
}

module.exports = {'Test': Test};