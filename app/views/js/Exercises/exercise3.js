import anime from "animejs";
import {
	library,
	findIconDefinition,
	icon,
} from "@fortawesome/fontawesome-svg-core";
import {
	faQuestionCircle,
	faVolumeUp,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "../../assets/scss/layouts/exercises/exercise3.scss";
import {
	default as audioPlayer
} from "../CustomModules/audioPlayer";
import {
	endScreen
} from "../CustomModules/endDiv";

library.add(faQuestionCircle);
library.add(faVolumeUp);
library.add(faTimes);

$(() => {
	const words = [];
	let cardIndex;

	$.ajax({
		url: `http://localhost:3000/Build/ExerciseWords?id=1`,
		type: "GET",
		success: function (data) {
			data.cards.forEach((object) => {
				words.push(object);
			});
			words.sort(() => {
				Math.random() > 0.5 ? 1 : -1;
			});
			console.log(data);
		},
	});
	$.ajax({
		url: `http://localhost:3000/Build/ExerciseWords?id=3`,
		type: "GET",
		success: function (data) {
			data.cards.forEach((object) => {
				words.push(object);
			});
			words.sort(() => {
				Math.random() > 0.5 ? 1 : -1;
			});
			console.log(words);
			console.log(data);
			cardIndex = words.length;
			SetUpHtmlDivs(data);
		},
	});

	$(document).on("click", ".mainContent .cardcontainer", function () {
		console.log(`card was clicked`);
		audioPlayer.playWord(GetWord());
	});

	$(document).on("click", ".answerOption", function (e) {
		let mainWord = GetWord();

		let clickedWord = $(this).text().trim();

		var colorChange = anime.timeline({
			easing: "linear",
			direction: "normal",
		});

		if (mainWord.translation_word == clickedWord) {
			console.log(
				`CORRECT - word: ${mainWord.translation_word} == answerOption: ${clickedWord}`
			);
			animationTurnCard(`#card${GetIndex()}`);
			colorChange
				.add({
						targets: this,
						background: ["rgb(41, 171, 89)", "rgb(48, 151, 115)"],
						complete: function (anim) {
							$(e.target).removeAttr("style");
						},
					},
					20
				)
				.finished.then(() => {
					//GØR KORT BORDER GRØN?
				});
		} else {
			console.log("FALSE - play false-sound");
			colorChange.add({
					targets: this,
					background: ["rgb(199, 54, 44)", "rgb(48, 151, 115)"],
					complete: function (anim) {
						$(e.target).removeAttr("style");
					},
				},
				0
			);
		}
		colorChange.finished.then(() => {
			$(e.target).removeAttr("style"); //så css på stylesheet gælder for den igen
		});
	});

	$("#tutorialbutton").on("click", () => {
		RemoveTutorial();
		newCard();
	});

	$(document).on("click", ".helpIcon", function () {
		ShowTutorial();
	});

	$(document).on("click", ".close", function () {
		window.location.href = "http://localhost:3000/page/index";
	});

	function newCard() {
		if ($(".mainContent .cardcontainer").length != 0) {
			console.log(
				"Error - card not gone yet: " + $(".mainContent .cardcontainer").length
			);
			return;
		}
		if (cardIndex == 0) {
			console.log("GOOD JOB!");
			endScreen("module-overview", "Set1Test");
		}
		cardIndex--;

		let answerOptions = [words[cardIndex]];

		let wordIndex;
		for (let i = 0; i < 3; i++) {
			do {
				wordIndex = Math.floor(Math.random() * words.length);
			} while (
				wordIndex == cardIndex ||
				answerOptions.includes(words[wordIndex])
			);
			answerOptions.push(words[wordIndex]);
		}

		MakeAnswerOptions(answerOptions);
		animateAnswerOptionsIn();
		animationFromStack(`#card${cardIndex}`);
	}

	/**
	 * Creates the answerOption divs, from the words given
	 * @param {Array<words>} words - Array of the answer-option's word-objects
	 */
	function MakeAnswerOptions(answerArray) {
		$(".answerOption").remove();
		shuffleArray(answerArray);
		answerArray.forEach((element, index) => {
			let answerOption = `
                <div class="answerOption ansOpt${index}">
                    <p>${element.translation_word}</p>
                </div>`;
			$(".answerZone").append(answerOption);
		});
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
	 *
	 * @returns the word object that matches the main card index
	 */
	function GetWord() {
		return words[GetIndex()];
	}

	/**
	 *
	 * @returns index of the main card
	 */
	function GetIndex() {
		let mainId = $(".mainContent .cardcontainer").attr("id");
		let regex = /[0-9]+$/;
		let cardIndex = mainId.match(regex);

		return cardIndex;
	}

	//-----Animation-----

	const timeline = anime.timeline;
	/**
	 * Animates the answerOptions in sync with the animationFromStack function
	 * @returns Returns a promis for when animation is done
	 */
	function animateAnswerOptionsIn() {
		let target = ".answerOption";
		var t1 = timeline({
			targets: target,
			direction: "normal",
		});
		t1.add({
				delay: 500,
				easing: "easeInOutSine",
				duration: 1200,
				scale: [{
						value: 1,
					},
					{
						value: 1.2,
						duration: 400,
					},
					{
						value: 1,
						duration: 400,
					},
				],
			},
			500
		);
		t1.finished.then(function () {}, 0);

		return t1.finished;
	}
	/**
	 * Used to animate the card out of view - then calls newCard()
	 * @param {String} card The target .card div/class
	 * @returns Returns a promis for when animation is done
	 */
	function animateOutOfFrame(card) {
		var t1 = timeline({
			targets: card,
			direction: "normal",
		});
		let x = -($("body").width() / 2);
		x -= $(card).width();
		t1.add({
				delay: 500,
				translateX: x,
				easing: "easeOutQuint",
				duration: 1000,
			},
			500
		);
		t1.finished.then(function () {
			$(card).parent().remove();
			console.log("card removed");
			newCard();
		}, 1000);

		return t1.finished;
	}
	/**
	 * Animates card turn, then call animateOutOfFrame
	 * @param {String} card The target .card div/class
	 * @returns Returns a promis for when animation is done
	 */
	function animationTurnCard(card) {
		RemoveCardBack();
		console.log("animateTurnCard: " + card);
		var t1 = anime
			.timeline({
				targets: card,
				easing: "linear",
				direction: "normal",
			})
			.finished.then(function () {
				anime({
						targets: card,
						scale: [{
								value: 1,
							},
							{
								value: 1.2,
								duration: 400,
							},
							{
								value: 1,
								duration: 400,
							},
						],
						rotateX: {
							delay: 20,
							value: "-=180",
							duration: 500,
						},
						easing: "easeInOutSine",
						duration: 1200,
					},
					"-=200"
				).finished.then(() => {
					$(card).css({
						transform: "none",
					});
					animateOutOfFrame(card);
				});
			}, 200);

		return t1.finished;
	}
	/**
	 * Animates from cardStack
	 * @param {String} card The target .card div/class
	 * @returns Returns a promis for when animation is done
	 */
	function animationFromStack(card) {
		let maincontentCenter = findMaincontentCenter(card);

		var t1 = anime.timeline({
			targets: card,
		});

		t1.add({
				translateX: maincontentCenter.x,
				translateY: maincontentCenter.y,
				easing: "easeOutQuint",
				duration: 1000,
			})
			.finished.then(() => {
				$(card)
					.css({
						transform: "none",
					})
					.parent()
					.appendTo(".mainContent")
					.css({
						"grid-area": "Main",
					});
				anime({
						targets: card,
						scale: [{
								value: 1,
							},
							{
								value: 1.2,
								duration: 400,
							},
							{
								value: 1,
								duration: 400,
							},
						],
						rotateX: {
							delay: 20,
							value: "+=180",
							duration: 500,
						},
						easing: "easeInOutSine",
						duration: 1200,
					},
					"-=200"
				);
				audioPlayer.playWord(GetWord());
			})
			.catch((err) => {
				console.log(err);
			});

		return t1.finished;
	}
	/**
	 * Finds the center of the mainContent class baseed of the cardstack position
	 * @param {String} card The target card div/class
	 * @returns returns x and y of maincontents div center is in gloabal space
	 */
	function findMaincontentCenter(card) {
		let y = $(".mainContent").offset().top - convertRemToPixels(1);
		let x = $(".mainContent").offset().left - convertRemToPixels(1);
		x += $(".mainContent").width() / 2;
		x -= $(card).width() / 2;
		y += $(".mainContent").height() / 2;
		y -= $(card).height() / 2;
		return {
			x,
			y,
		};
	}
	/**
	 * Convertes from int to rem
	 * @param {Int} rem how many rem units
	 * @returns pixeles based of rem units
	 */
	function convertRemToPixels(rem) {
		return (
			rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
		);
	}

	//----SetUp----

	/**
	 * The basic setup for the html document.
	 */
	function SetUpHtmlDivs(data) {
		SetUpTutorial(data);
		MakeCardStack();
		MakeHelpIcon();
		MakeCloseIcon();
	}
	/**
	 * Makes and inserts the help icon
	 */
	function MakeHelpIcon() {
		let helpIcon = `<div class='helpIcon'>${icon(faQuestionCircle).html}</div>`;
		$(".mainContent").before(helpIcon);
	}
	/**
	 * Makes and inserts the close icon
	 */
	function MakeCloseIcon() {
		let closeIcon = `<div class='close'>${icon(faTimes).html}</div>`;
		$(".answerZone").after(closeIcon);
	}
	/**
	 * Setsup the cardstack dependend on how many cards there is
	 */
	function MakeCardStack() {
		shuffleArray(words);
		let offset = 5;
		words.forEach((element, index) => {
			let card = `
            <div class='cardcontainer cardcontainer${index}' id='cardcontainer${index}'>
                <div class="card card${index}" id='card${index}'>
                    <div class="back">${icon(faVolumeUp).html}</div>
					<div class="front cardBack">${element.word}</div>
                </div>
            </div>`;
			$(".cardStack-Container").append(card);
			let zlayer = $(".front").css("z-index");
			$(`#card${index}`).css({
				transform: `translateX(${offset}px)`,
				"z-index": zlayer + index,
			});
			offset += 5;
		});
		console.log("made cardstack");
	}

	/**
	 * Fjerner .cardBack class fra det nuværende kort, så bagsiden igen viser ordet
	 */
	function RemoveCardBack() {
		let id = `${$(".mainContent .cardcontainer").attr("id")} .front`;
		$(`#${id}`).removeClass("front cardBack").addClass("front");
	}

	function SetUpTutorial(data) {
		let dkTutorial = data.instructions.instructionsDK;
		let engTutorial = data.instructions.instructionsENG;
		$(".tutorial").prepend(`<p>${dkTutorial}</p><p>${engTutorial}</p>`);
	}

	function ShowTutorial() {
		$(".tutorial").css({
			visibility: "visible",
			display: "grid",
		});
		$(".mainContent").append(`<div class="curtain"></div>`);
		$(".speaker").css({
			visibility: "visible",
		});
	}

	function RemoveTutorial() {
		$(".tutorial").css({
			visibility: "hidden",
			display: "none",
		});
		$(".curtain").remove();
		$(".speaker").css({
			visibility: "hidden",
		});
	}
});