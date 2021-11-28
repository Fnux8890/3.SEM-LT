import { Router } from 'express';
import mongoose from 'mongoose';
import setModel from '../../models/setModel';
import exercisesModel from '../../models/exercisesModel';
import wordModel from '../../models/wordsModel';
import sentenceModel from '../../models/sentenceModel';
import moduleModel from '../../models/moduleModel';

const router = Router();
const mongodb = require('mongodb');

const binary = mongodb.Binary;
const mongoClient = mongodb.MongoClient;

router.get('/getModules', async (req, res) => {
	try {
		const modules = await moduleModel.find({});
		res.status(200).json({ modules });
	} catch (err) {
		res.status(500).json({ msg: err });
	}
});

router.post('/postRecording', (req, res) => {
	let recording = {
		name: req.body.name,
		file: binary(req.files.uploadedFile.data),
	};
	insertRecording(recording, res);
	console.log(recording);
	res.end();
});

router.post('/postSentence', (req, res) => {
	let sentence = {
		name: req.body.name,
		file: binary(req.files.uploadedFile.data),
	};
	insertSentence(sentence, res);
	console.log(sentence);
	res.end();
});
//TODO rewrite to use mongodb instead of having to connections to mongodb
function insertRecording(recording, res) {
	const url =
		'mongodb+srv://Sebastian:warrcraft1@cluster0.op3ym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

	mongoClient.connect(url, (err, client) => {
		if (err) {
			return err;
		} else {
			try {
				wordModel
					.findOneAndUpdate(
						{ word: recording.name },
						{ soundfile: recording }
					)
					.exec();
				console.log('inserted recording');
			} catch (err) {
				console.log(err.message);
				console.log('err while inserting');
			}
		}
	});
}

function insertSentence(sentence, res) {
	const url =
		'mongodb+srv://Sebastian:warrcraft1@cluster0.op3ym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

	mongoClient.connect(url, (err, client) => {
		if (err) {
			return err;
		} else {
			try {
				sentenceModel
					.findOneAndUpdate(
						{ sentence: sentence.name },
						{ soundfile: sentence }
					)
					.exec();
				console.log('inserted recording');
			} catch (err) {
				console.log(err.message);
				console.log('err while inserting');
			}
		}
	});
}

async function getExerciseWithWords(id) {
	let result = await exercisesModel.aggregate([
		{
			$match: {
				name: `Exercise ${id}`,
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
			$unwind: {
				path: '$cards.word',
			},
		},
		{
			$unwind: {
				path: '$cards.word.soundfile',
			},
		},
		{
			$project: {
				_id: 0,
				name: '$name',
				description: '$description',
				subject: '$subject',
				instructions: '$instructions',
				answerOptions: '$answerOptions',
				cards: {
					word: '$cards.word.word',
					translation_word: '$cards.word.translation',
					soundfile_word: '$cards.word.soundfile.file',
					answer: '$cards.answer',
					sentence: '$cards.sentence.sentence',
					translation_sentence: '$cards.sentence.translation',
					soundfile_sentence: '$cards.sentence.soundfile.file',
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

async function getExerciseSentences() {
	let result = await exercisesModel.aggregate([
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
			$unwind: {
				path: '$cards.word.soundfile',
			},
		},
		{
			$unwind: {
				path: '$cards.sentence.soundfile',
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
					soundfile_word: '$cards.word.soundfile.file',
					sentence: '$cards.sentence.sentence',
					translation_sentence: '$cards.sentence.translation',
					soundfile_sentence: '$cards.sentence.soundfile.file',
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
		res.json({ error: 'No id given' });
		return;
	}
	let exerciseObj = await getExerciseWithWords(req.query.id);
	res.json(exerciseObj);
});

router.route('/ExerciseWordsAndSentences').get(async (req, res) => {
	let sentenceQuery = await getExerciseSentences();
	res.json(sentenceQuery);
});

router.route("/GetQuestions").get(async (req, res) => {
  let testData = await exercisesModel.find({
    name: "TestName"
  }).exec();
  res.json(testData);
});

export default router;