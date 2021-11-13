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
import "../../css/exercise3.scss";

$(() => {
	//const words = ["ord1", "ord2", "ord3", "ord4", "ord5", "ord6"];
	//const answerOptions = ["ord1", "ord2", "ord3", "ord4", "ord5", "ord6"];
	const words = [{
			word: "ord1",
			translation: "word1",
			soundfile: ["s1", "s2", "s3"],
		},
		{
			word: "ord2",
			translation: "word2",
			soundfile: ["s1", "s2", "s3"],
		},
		{
			word: "ord3",
			translation: "word3",
			soundfile: ["s1", "s2", "s3"],
		},
		{
			word: "ord4",
			translation: "word4",
			soundfile: ["s1", "s2", "s3"],
		},
		{
			word: "ord5",
			translation: "word5",
			soundfile: ["s1", "s2", "s3"],
		},
		{
			word: "ord6",
			translation: "word6",
			soundfile: ["s1", "s2", "s3"],
		},
	];
	let currentWord;

	console.log("start 2");
	SetUpHtmlDivs();

	// const answerOpts = {
	//     answer1: "word1"
	// };
	// ajax.request({
	//     post: function
	// })

	// fetch("/page/ex3")
	// 	.then((response) => response.json())
	// 	.then((data) => {
	// 		//console.log("client: " + JSON.stringify(data, null, 4));
	// 	});

	$(document).on("click", ".mainContent .cardcontainer", function () {
		console.log(`card was clicked`);

		let word = GetWord($(this).attr("id"));
		let soundfile =
			word.soundfile[Math.floor(Math.random() * word.soundfile.length)];

		console.log("Play: " + soundfile);
	});

	$(document).on("click", ".answerOption", function (e) {
		let mainId = $(".mainContent .cardcontainer").attr("id");
		let mainWord = GetWord(mainId);

		console.log("answeop clicked main word is: " + JSON.stringify(mainWord));
		let aoText = $(this).text().trim();
		console.log("aoText: " + aoText);

		var colorChange = anime.timeline({
			easing: "linear",
			direction: "normal",
		});

		if (mainWord.translation == aoText) {
			console.log(
				`CORRECT - word: ${mainWord.translation} == answerOption: ${aoText}`
			);
			colorChange.add({
					targets: this,
					background: ["rgb(41, 171, 89)", "rgb(48, 151, 115)"],
					complete: function (anim) {
						//console.log("anim ending" + JSON.stringify(e, null, 2));
						$(e.target).removeAttr("style");
					},
				},
				0
			);
			animateOutOfFrame(`#card${GetIndex(mainId)}`);
			newCard();
		} else {
			console.log("FALSE - play false-sound");
			colorChange.add({
					targets: this,
					background: ["rgb(199, 54, 44)", "rgb(48, 151, 115)"],
					complete: function (anim) {
						//console.log("anim ending" + JSON.stringify(e, null, 2));
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

	$("#tutorialButton").on("click", () => {
		RemoveTutorial();
		newCard();
	});

	library.add(faQuestionCircle);
	library.add(faVolumeUp);
	library.add(faTimes);

	function endExercise() {
		//$.get("/page/")
	}

	let cardIndex = words.length;

	function newCard() {
		if (cardIndex == 0) {
			$(".answerOption").remove();
			console.log("GOOD JOB!");
			endExercise();
			return;
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
		animationFromStack(`#card${cardIndex}`);
	}

	/**
	 * Creates the answerOption divs, from the words given
	 * @param {Array<words>} words - Array of the answer-option's word-objects
	 */
	function MakeAnswerOptions(answerArray) {
		let offset = 200;
		$(".answerOption").remove();
		shuffleArray(answerArray);
		answerArray.forEach((element, index) => {
			let answerOption = `
                <div class="answerOption ansOpt${index}">
                    <p>${element.translation}</p>
                </div>`;
			$(".answerZone").append(answerOption);
			$(`.ansOpt${index}`).css({
				// transform: `translateY(${offset}px)`,
			});
		});
		console.log("made cardstack");
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
	 * Get the word object that matches the card-div
	 * @param {String} id - id of the card
	 * @returns the word object that matches the index of the id
	 */
	function GetWord(id) {
		return words[GetIndex(id)];
	}

	function GetIndex(id) {
		let regex = /[0-9]+$/;
		let cardIndex = id.match(regex);

		console.log("GI - id: " + id);
		console.log("GI - cardIndex: " + cardIndex);

		return cardIndex;
	}

	//-----Animation-----

	function antimateColor(color) {}

	const timeline = anime.timeline;
	/**
	 * Used to animate the card out of view
	 * @param {String} card The target card div/class
	 * @returns Returns a pormis for when animation is done
	 */
	function animateOutOfFrame(card) {
		var t1 = timeline({
			targets: card,
		});
		let x = -($("body").width() / 2);
		x -= $(card).width();
		t1.add({
			translateX: x,
			easing: "easeOutQuint",
			duration: 1000,
		});
		t1.finished.then(function () {
			$(card).parent().remove();
		});
		return t1.finished;
	}

	/**
	 * Animates from cardStack
	 * @param {String} card The target card div/class
	 * @returns Returns a pormis for when animation is done
	 */
	function animationFromStack(card) {
		console.log("animationFromStack");
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

	function RemoveTutorial() {
		$(".tutorial").css({
			visibility: "hidden",
			display: "none",
		});
		$(".curtain").css({
			visibility: "hidden",
			display: "none",
		});
	}

	/**
	 * The basic setup for the html document.
	 */
	function SetUpHtmlDivs() {
		MakeCardStack();
		MakeHelpIcon();
	}

	/**
	 * Makes and inserts the help icon
	 */
	function MakeHelpIcon() {
		let helpIcon = `<div class='helpIcon'>${icon(faQuestionCircle).html}</div>`;

		//let helpIcon = `<div class='helpIcon'>i</div>`;
		$(".cardStack-Container").append(helpIcon);

		console.log("made help icon");
	}

	/**
	 * Setsup the cardstack dependend on how many cards there is
	 */
	function MakeCardStack() {
		let offset = 5;
		words.forEach((element, index) => {
			let card = `
            <div class='cardcontainer cardcontainer${index}' id='cardcontainer${index}'>
                <div class="card card${index}" id='card${index}'>
                    <div class="front">${icon(faVolumeUp).html}</div>
                    <div class="back">${element.word}</div>
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
});