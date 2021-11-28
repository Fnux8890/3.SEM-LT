import { Schema, model } from 'mongoose';

const sentences = new Schema(
  {
    sentence: {
      type: String,
    },
    translation: {
      type: String,
    },
    soundfile: {
      type: Array,
    },
  },
  { collection: 'sentences' },
);

const sentenceModel = model('sentence', sentences);

export default sentenceModel;
