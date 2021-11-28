import { Schema, model } from 'mongoose';

const words = new Schema(
  {
    word: {
      type: String,
    },
    translation: {
      type: String,
    },
    soundfile: {
      type: Array,
    },
  },
  { collection: 'words' },
);

const wordModel = model('word', words);

export default wordModel;
