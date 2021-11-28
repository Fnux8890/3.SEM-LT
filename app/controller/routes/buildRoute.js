/* eslint-disable no-use-before-define */
import { Router } from 'express';
import exercisesModel from '../../models/exercisesModel';
import wordModel from '../../models/wordsModel';
import sentenceModel from '../../models/sentenceModel';

const router = Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const mongodb = require('mongodb');

const binary = mongodb.Binary;
const mongoClient = mongodb.MongoClient;

router.post('/postRecording', (req, res) => {
  const recording = {
    name: req.body.name,
    file: binary(req.files.uploadedFile.data),
  };
  insertRecording(recording, res);
  res.end();
});
// ? Not surtain what this does
router.post('/postSentence', (req, res) => {
  const sentence = {
    name: req.body.name,
    file: binary(req.files.uploadedFile.data),
  };
  insertSentence(sentence, res);
  res.end();
});
// TODO rewrite to use mongodb instead of having to connections to mongodb
function insertRecording(recording) {
  const url =
    'mongodb+srv://Sebastian:warrcraft1@cluster0.op3ym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

  // eslint-disable-next-line consistent-return
  mongoClient.connect(url, (err) => {
    if (err) {
      return err;
    }
    try {
      wordModel
        .findOneAndUpdate(
          {
            word: recording.name,
          },
          {
            $push: {
              soundfile: recording.file,
            },
          },
        )
        .exec();
    } catch (modelerr) {
      // eslint-disable-next-line no-console
      console.log(modelerr.message);
    }
  });
}

function insertSentence(sentence) {
  const url =
    'mongodb+srv://Sebastian:warrcraft1@cluster0.op3ym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

  // eslint-disable-next-line consistent-return
  mongoClient.connect(url, (err) => {
    if (err) {
      return err;
    }
    try {
      sentenceModel
        .findOneAndUpdate(
          {
            sentence: sentence.name,
          },
          {
            $push: {
              soundfile: sentence.file,
            },
          },
        )
        .exec();
    } catch (modelerr) {
      // eslint-disable-next-line no-console
      console.log(modelerr.message);
    }
  });
}

async function getExerciseWithWords(id) {
  let result = await exercisesModel.aggregate([{
    '$match': {
      'name': `Exercise ${id}`
    }
  }, {
    '$unwind': {
      'path': '$cards'
    }
  }, {
    '$addFields': {
      'cards': {
        'wordId': {
          '$toObjectId': '$cards.wordId'
        },
        'sentenceId': {
          '$toObjectId': '$cards.sentenceId'
        }
      }
    }
  }, {
    '$lookup': {
      'from': 'words',
      'localField': 'cards.wordId',
      'foreignField': '_id',
      'as': 'cards.word'
    }
  }, {
    '$unwind': {
      'path': '$cards.word'
    }
  }, {
    '$project': {
      '_id': 0,
      'name': '$name',
      'description': '$description',
      'subject': '$subject',
      'instructions': '$instructions',
      'answerOptions': '$answerOptions',
      'soundfile_E': '$soundfile_E',
      'soundfile_Æ': '$soundfile_Æ',
      'cards': {
        'word': '$cards.word.word',
        'translation_word': '$cards.word.translation',
        'soundfile_word': '$cards.word.soundfile',
        'answer': '$cards.answer',
        'sentence': '$cards.sentence.sentence',
        'translation_sentence': '$cards.sentence.translation',
        'soundfile_sentence': '$cards.sentence.soundfile'
      }
    }
  }, {
    '$group': {
      '_id': {
        'name': '$name',
        'description': '$description',
        'instructions': '$instructions',
        'subject': '$subject',
        'answerOptions': '$answerOptions',
        'soundfile_E': '$soundfile_E',
        'soundfile_Æ': '$soundfile_Æ'
      },
      'cards': {
        '$addToSet': '$cards'
      }
    }
  }, {
    '$project': {
      '_id': 0,
      'name': '$_id.name',
      'description': '$_id.description',
      'subject': '$_id.subject',
      'instructions': '$_id.instructions',
      'answerOptions': '$_id.answerOptions',
      'soundfile_E': '$_id.soundfile_E',
      'soundfile_Æ': '$_id.soundfile_Æ',
      'cards': '$cards'
    }
  }]);
  return result[0];
}

async function ExerciseSentences() {
  const result = await exercisesModel.aggregate([
    {
      $match: {
        name: 'Exercise 2',
      },
    },
    {
      $unwind: {
        path: '$cards',
      },
    },
    {
      $addFields: {
        cards: {
          wordId: {
            $toObjectId: '$cards.wordId',
          },
          sentenceId: {
            $toObjectId: '$cards.sentenceId',
          },
        },
      },
    },
    {
      $lookup: {
        from: 'words',
        localField: 'cards.wordId',
        foreignField: '_id',
        as: 'cards.word',
      },
    },
    {
      $lookup: {
        from: 'sentences',
        localField: 'cards.sentenceId',
        foreignField: '_id',
        as: 'cards.sentence',
      },
    },
    {
      $unwind: {
        path: '$cards.word',
      },
    },
    {
      $unwind: {
        path: '$cards.sentence',
      },
    },
    {
      $project: {
        _id: 0,
        name: '$name',
        description: '$description',
        subject: '$subject',
        instructions: '$instructions',
        cards: {
          word: '$cards.word.word',
          translation_word: '$cards.word.translation',
          soundfile_word: '$cards.word.soundfile',
          sentence: '$cards.sentence.sentence',
          translation_sentence: '$cards.sentence.translation',
          soundfile_sentence: '$cards.sentence.soundfile',
        },
      },
    },
    {
      $group: {
        _id: {
          name: '$name',
          description: '$description',
          instructions: '$instructions',
          subject: '$subject',
          answerOptions: '$answerOptions',
        },
        cards: {
          $addToSet: '$cards',
        },
      },
    },
    {
      $project: {
        _id: 0,
        name: '$_id.name',
        description: '$_id.description',
        subject: '$_id.subject',
        instructions: '$_id.instructions',
        answerOptions: '$_id.answerOptions',
        cards: '$cards',
      },
    },
  ]);
  return result[0];
}

router.route('/ExerciseWords').get(async (req, res) => {
  if (req.query.id === undefined) {
    res.json({
      error: 'No id given',
    });
    return;
  }
  const exerciseObj = await getExerciseWithWords(req.query.id);
  res.json(exerciseObj);
});

router.route('/ExerciseWordsAndSentences').get(async (req, res) => {
  const sentenceQuery = await ExerciseSentences();
  res.json(sentenceQuery);
});

router.route('/GetQuestions').get(async (req, res) => {
  const testData = await exercisesModel
    .find({
      name: 'TestName',
    })
    .exec();
  res.json(testData);
});

export default router;
