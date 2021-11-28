// eslint-disable-next-line no-unused-vars
const { Exercise, Test } = require('./ExerciseModule');

class Set {
  constructor(ID, name, description, exercises, test) {
    this.ID = ID; // int
    this.name = name; // string
    this.description = description; // string
    this.exercises = exercises; // Exercise[]
    this.test = test; // Test()
  }
}

module.exports = { Set };

// bygger exercises som henter ordene fra collection - hver exercise har sin egen collection
