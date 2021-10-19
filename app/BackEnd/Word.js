class Word {
    constructor(wordDK, wordEng, audioDK) {
        this.wordDK = wordDK; //string
        this.wordEng = wordEng; //string
        this.audioDK = audioDK; //lydclip - hvordan end det skal sættes ind - URL?
    }
}

module.exports = {'Word': Word};