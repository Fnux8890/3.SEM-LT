import anime from 'animejs';
import {
	library,
	findIconDefinition,
	icon,
} from '@fortawesome/fontawesome-svg-core';
import {
	faQuestionCircle,
	faVolumeUp,
	faTimes,
} from '@fortawesome/free-solid-svg-icons';
import '../../assets/scss/layouts/exercises/Set1Test.scss';
import { default as audioPlayer } from '../CustomModules/audioPlayer';
import { endScreen } from '../CustomModules/endDiv';
import { populateTutorial } from '../CustomModules/tutorial';

library.add(faQuestionCircle);
library.add(faVolumeUp);
library.add(faTimes);

$(() => {
	const questions = [];
	let questionIndex = -1;

	$.ajax({
		url: `http://localhost:3000/Build/GetQuestions`,
		type: 'GET',
		success: function (data) {
			console.table(data);
			data[0].questions.forEach(object => {
				questions.push(object);
			});
			questions.sort(() => {
				Math.random() > 0.5 ? 1 : -1;
			});
			console.log('questions: ' + questions);
			console.log(data);
			SetUpHtmlDivs(data[0]);
		},
	});

	$('#tutorialbutton').on('click', () => {
		if (questionIndex === -1) {
			WatchVid();
		} else {
			RemoveTutorial();
		}
	});

	$(document).on('click', '.helpIcon', function () {
		ShowTutorial();
	});

	$(document).on('click', '.close', function () {
		window.location.href = '/page/module-overview';
	});

	$(document).on('click', '.answerOption', function (e) {
		let currentQuestion = questions[questionIndex];

		let clickedAnswer = $(this).text().trim();

		var colorChange = anime.timeline({
			easing: 'linear',
			direction: 'normal',
		});

		if (questionIndex == 4) {
			if ($(this).hasClass('chosenAnswer')) {
				$(this).removeClass('chosenAnswer');
			} else {
				$(this).addClass('chosenAnswer');
			}
		} else {
			if (currentQuestion.a == clickedAnswer) {
				console.log(
					`CORRECT - question: ${currentQuestion.a} == answerOption: ${clickedAnswer}`
				);
				colorChange
					.add(
						{
							targets: this,
							background: [
								'rgb(41, 171, 89)',
								'rgb(48, 151, 115)',
							],
							complete: function (anim) {
								$(e.target).removeAttr('style');
							},
						},
						20
					)
					.finished.then(() => {
						newQuestion();
					});
			} else {
				console.log('FALSE - play false-sound');
				colorChange.add(
					{
						targets: this,
						background: ['rgb(199, 54, 44)', 'rgb(48, 151, 115)'],
						complete: function (anim) {
							$(e.target).removeAttr('style');
						},
					},
					0
				);
			}
			colorChange.finished.then(() => {
				$(e.target).removeAttr('style'); //så css på stylesheet gælder for den igen
			});
		}
	});

	$(document).on('click', '.checkBtn', function (e) {
		console.log('Check');
		let currentQuestion = questions[questionIndex];

		let correctAnswers = 0;

		const delay = ms => new Promise(res => setTimeout(res, ms));

		$('.chosenAnswer').each(async function (i, answer) {
			if (currentQuestion.a.includes($(answer).text().trim())) {
				correctAnswers++;
				$(answer).addClass('correct');
				if (correctAnswers === currentQuestion.a.length) {
					console.log('Everything is correct');
					//Display final div and move on to next exercise or go back to overview
					endScreen('module-overview', 'module-overview');
				}
			} else {
				$(answer).addClass('false');
				await delay(3000);
				$(answer).removeClass('chosenAnswer');
				$(answer).removeClass('false');
			}
		});

		// if (currentQuestion.a.includes($(".chosenAnswer").text)) {
		//     console.log("yay" + $(".chosenAnswer").text());
		// } else {
		//     console.log("no" + $(".chosenAnswer").text());
		//     console.log(currentQuestion.a);
		// }
	});

	function newQuestion() {
		if ($('.mainContent .cardcontainer').length != 0) {
			console.log(
				'Error - card not gone yet: ' +
					$('.mainContent .cardcontainer').length
			);
			return;
		}
		if (questionIndex >= questions.length) {
			$('.answerOption').remove();
			console.log('GOOD JOB!');
			endExercise();
			return;
		}
		questionIndex++;

		let currentQuestion = questions[questionIndex];
		let answerOptions = [];
		//TO-DO: gør a til array på mongodb?
		if (questionIndex == 4) {
			currentQuestion.a.forEach(answer => {
				answerOptions.push(answer);
			});
		} else {
			answerOptions = [currentQuestion.a];
		}
		//Lav answerOptions array:
		for (let i = 0; i < currentQuestion.answerOptions.length; i++) {
			answerOptions.push(currentQuestion.answerOptions[i]);
		}
		console.log(JSON.stringify(answerOptions, null, 2));

		MakeAnswerOptions(answerOptions);
		MakeQuestion(currentQuestion.q);
		if (questionIndex == 4) {
			MakeCheckAnswerBtn();
		}
		//animateAnswerOptionsIn();
		//animationFromStack(`#card${questionIndex}`);
	}
	/**
	 * Creates the answerOption divs, from the given array
	 * @param {Array<string>} answerArray - Array of the answer-options for the current question
	 */
	function MakeAnswerOptions(answerArray) {
		$('.answerOption').remove();
		shuffleArray(answerArray);
		answerArray.forEach((element, index) => {
			let answerOption = `
                <div class="answerOption ansOpt${index}">
                    <p>${element}</p>
                </div>`;
			$('.answerZone').append(answerOption);
		});
	}
	/**
	 * Creates the question div
	 * @param {string} questionTxt - the question, as a string
	 */
	function MakeQuestion(questionTxt) {
		$('.question').remove();
		let question = `
        <div class="question q${questionIndex}">
            <p>${questionTxt}</p>
        </div>`;
		$('.answerZone').prepend(question);
	}

	function MakeCheckAnswerBtn() {
		let btn = `
                <div class="checkBtn">
                    <p>Check answer</p>
                </div>`;
		$('.answerZone').append(btn);
	}

	/**
	 * OBS: Does not make new array - Shuffles the existing array
	 * @param {Array} array - the array to shuffle
	 */
	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	/**
	 * The basic setup for the html document.
	 */
	function SetUpHtmlDivs(data) {
		populateTutorial(data);
		MakeHelpIcon();
		MakeCloseIcon();
	}
	/**
	 * Makes and inserts the help icon
	 */
	function MakeHelpIcon() {
		let helpIcon = `<div class='helpIcon'>${
			icon(faQuestionCircle).html
		}</div>`;
		$('.mainContent').before(helpIcon);
	}
	/**
	 * Makes and inserts the close icon
	 */
	function MakeCloseIcon() {
		let closeIcon = `<div class='close'>${icon(faTimes).html}</div>`;
		$('.container').append(closeIcon);
	}

	function ShowTutorial() {
		$('.tutorial').css({
			visibility: 'visible',
			display: 'grid',
		});
		$('.mainContent').append(`<div class="curtain"></div>`);
		$('.VidInTask').css({
			visibility: 'hidden',
		});
	}

	function RemoveTutorial() {
		$('.tutorial').css({
			visibility: 'hidden',
			display: 'none',
		});
		$('.curtain').remove();
		$('.VidInTask').css({
			visibility: 'visible',
		});
	}

	function WatchVid() {
		console.log('inside');
		$('.tutorial').css({
			visibility: 'hidden',
		});

		let vid = `<iframe class="VidAfterTutorial" src='https://www.youtube.com/embed/45kiQoQuGD4' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen=''></iframe>`;
		let button = `<div class="removeVid">Take me to the questions</div>`;

		$('.video').append(vid);
		$('.video').append(button);
		$('.removeVid').on('click', function () {
			$('.video').remove();
			RemoveTutorial();
			newQuestion();
		});
	}
});
