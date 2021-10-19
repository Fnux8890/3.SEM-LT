const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide a name"],
  },
  set1: [
    {
      exercise1: {
        type: Boolean,
        default: false,
      },
      exercise2: {
        type: Boolean,
        default: false,
      },
      exercise3: {
        type: Boolean,
        default: false,
      },
      test: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
