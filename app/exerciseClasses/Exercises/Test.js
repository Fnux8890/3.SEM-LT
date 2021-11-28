const { Exercise } = require('../Exercise');

class Test extends Exercise {
  // eslint-disable-next-line
  constructor(videoURL) {
    // eslint-disable-next-line
    this.videoURL = videoURL; // string
  }
}

module.exports = { Test };
