import anime from "animejs";
import interact from "interactjs";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import {
	faQuestionCircle,
	faVolumeUp,
	faTimes,
	faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import "../../assets/scss/layouts/exercises/exercise1.scss";
import { default as audioPlayer } from "../CustomModules/audioPlayer";
import lottie from "lottie-web/build/player/lottie";
import { cardFlip } from "../CustomModules/cardFlip";

let position = { x: 0, y: 0 };
const cards = [];
let currentCardnum = "";
let currentCard = "";
let tutorial = "";
let dropped = false;
let incorrectAnswers = 0;
const timeline = anime.timeline;

library.add(faQuestionCircle);
library.add(faVolumeUp);
library.add(faTimes);
library.add(faThumbsUp);

$(() => {
	$.ajax({
		url: `http://localhost:3000/Build/ExerciseWords?id=1`,
		type: "GET",
		success: function (data) {
			data.cards.forEach((object) => {
				cards.push(object);
			});
			cards.sort(() => {
				Math.random() > 0.5 ? 1 : -1;
			});
			SetupHtmlDivs(data);
			CardDraggable();
		},
	});

	DropzoneCardInteract(".vokalA");
	DropzoneCardInteract(".vokalB");

	//Indsætning af ikon (krydset)
	$(".close").append(icon({ prefix: "fas", iconName: "times" }).html);
	$("#tutorialbutton").append(
		icon({ prefix: "fas", iconName: "thumbs-up" }).html
	);

	$(".close svg").on("click", function () {
		alert("Closing...");
		//Afslut opgaven og gem fremskridt for at kunne fortsætte hvor man slap
	});

	$(".speaker").on("click", () => {
		audioPlayer.playWord(cards[currentCardnum]);
	});
});

/**
 * Convertes from int to rem
 * @param {Int} rem how many rem units
 * @returns pixeles based of rem units
 */
function convertRemToPixels(rem) {
	return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
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
	return { x, y };
}

/**
 * Animates from cardStack
 * @param {String} card The target card div/class
 * @returns Returns a pormis for when animation is done
 */
async function animationFromStack(card) {
	let maincontentCenter = findMaincontentCenter(card);

	let t1 = anime.timeline({
		targets: card,
	});
	await t1
		.add({
			translateX: maincontentCenter.x,
			translateY: maincontentCenter.y,
			easing: "easeOutQuint",
			duration: 1000,
		})
		.finished.then(() => {
			$(card)
				.css({
					transform: "none",
					"box-shadow": "none",
				})
				.parent()
				.appendTo(".mainContent")
				.css({
					"grid-area": "Main",
					"border-radius": "10px",
				})
				.children(card)
				.css({
					"box-shadow":
						"6px -6px 6px rgba(0, 0, 0, 0.23), 0 -10px 20px rgba(0, 0, 0, 0.19)",
				});
			return cardFlip(card, currentCard);
		})
		.catch((err) => {
			console.log(err);
		});
}

/**
 * Used to animate back to where the card was draged from.
 * @param {String} card The target card div/class
 * @returns Returns a pormis for when animation is done
 */
function animationToCenter(card) {
	let { x, y } = position;
	x = -x;
	let animateTo = { x: x, y: y };
	var t1 = timeline({
		targets: card,
	});

	t1.add({
		translateX: animateTo.x,
		translateY: animateTo.y,
		easing: "easeOutQuint",
		duration: 1000,
	}).finished.then(() => {
		$(`${card}`).css({
			transform: "none",
			transform: "rotateX(180deg)",
		});
		position = { x: 0, y: 0 };

		return t1.finished;
	});
}

function animateToDropzone(card, div) {
	let { left, top } = $(card).offset();
	let cardPos = { x: left, y: top };
	left = $(div).offset().left;
	top = $(div).offset().top;
	let dropPos = { x: left, y: top };
	let result = {
		x: cardPos.x - dropPos.x - 20,
		y: cardPos.y - dropPos.y - $(div).height() / 2 + 16,
	};
	position = result;
	let { x, y } = position;
	x = -x;
	let animateTo = { x: x, y: y };
	let t1 = timeline({
		targets: card,
	});

	t1.add({
		translateX: animateTo.x,
		translateY: animateTo.y,
		easing: "easeOutQuint",
		duration: 700,
	}).finished.then(() => {
		$(`${card}`).css({
			transform: "none",
			transform: "rotateX(180deg)",
		});
		position = { x: 0, y: 0 };
		$(div).css({
			position: "relative",
		});
		$(card).appendTo(div).css({
			position: "absolute",
			top: "50px",
			right: "0px",
		});
	});
}

function DropzoneCardInteract(div) {
	interact(div).dropzone({
		accept: ".card",
		ondrop: function (event) {
			dropped = true;
			changePostitionToDrop(div);
			(async () => {
				return new Promise((resolve) => {
					setTimeout(resolve, 1000);
				});
			})().then(async () => {
				if (
					$(`${div} p`).text().trim(" ") ===
					cards[currentCardnum].answer.trim(" ")
				) {
					AnimateCorrectAnswer();
				} else {
					AnimateIncorrectAnswer();
				}
				const delay = (ms) =>
					new Promise((resolve) => {
						setTimeout(resolve, ms);
					});
				await delay(2200);
				animateCardOut(div);
			});
		},
	});
}

function changePostitionToDrop(div) {
	let card = `.card${currentCardnum}`;
	animateToDropzone(card, div);
}

function animateCardOut(div) {
	let card = `.card${currentCardnum}`;
	let answerClass = $(div).attr("class");
	let t1 = anime.timeline({ targets: card });
	if (answerClass === "vokalA") {
		t1.add({
			translateX: -800,
			easing: "easeOutQuint",
			duration: 1000,
		});
	}
	if (answerClass === "vokalB") {
		t1.add({
			translateX: 800,
			easing: "easeOutQuint",
			duration: 1000,
		});
	}
	t1.finished.then(function () {
		$.ajax({
			url: "",
			type: "POST",
			data: {},
		});
		$(card).remove();
		dropped = false;
		currentCardnum--;
		currentCard = cards[currentCardnum];
		cards.pop();
		card = `.card${currentCardnum}`;
		FromStackAnimation(card);
	});
}

function AnimateCorrectAnswer() {
	let card = `.card${currentCardnum}`;
	$(`${card} .front`).css({
		"background-color": "green",
	});
	$(`${card}`).css({
		transform: "none",
		transform: "rotateX(180deg)",
	});
	$(`${card} .front`).html(`
	<span id='correct'></span>
	`);
	$("#correct").css({
		width: "100px",
	});
	let correctAnimation = lottie.loadAnimation({
		container: document.getElementById("correct"),
		renderer: "svg",
		loop: false,
		autoPlay: false,
		path: "https://assets3.lottiefiles.com/packages/lf20_6LimOm.json",
	});
	correctAnimation.autoplay = false;
	anime({
		targets: card,
		scale: [
			{ value: 1 },
			{ value: 1.2, duration: 400 },
			{ value: 1, duration: 400 },
		],
		rotateX: { delay: 20, value: "+=180", duration: 500 },
		easing: "easeInOutSine",
		duration: 500,
	}).finished.then(() => {
		$(card).css({
			"box-shadow":
				"0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
		});
		correctAnimation.play();
	});
}
function AnimateIncorrectAnswer() {
	incorrectAnswers++;
	let card = `.card${currentCardnum}`;
	$(`${card} .front`).css({
		"background-color": "red",
	});
	$(`${card}`).css({
		transform: "none",
		transform: "rotateX(180deg)",
	});
	$(`${card} .front`).html(`
	<span id='incorrect'></span>
	`);
	$("#incorrect").css({
		width: "100px",
	});
	let incorrectAnimation = lottie.loadAnimation({
		container: document.getElementById("incorrect"),
		renderer: "svg",
		loop: false,
		autoPlay: false,
		path: "https://assets5.lottiefiles.com/temp/lf20_yYJhpG.json",
	});
	incorrectAnimation.autoplay = false;
	anime({
		targets: card,
		scale: [
			{ value: 1 },
			{ value: 1.2, duration: 400 },
			{ value: 1, duration: 400 },
		],
		rotateX: { delay: 20, value: "+=180", duration: 500 },
		easing: "easeInOutSine",
		duration: 500,
	}).finished.then(() => {
		$(card).css({
			"box-shadow":
				"0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
		});
		incorrectAnimation.play();
	});
}

/**
 * The basic setup for the html document.
 */
function SetupHtmlDivs(data) {
	MakeCardStack();
	populateTutorial(data);
	populateAnswers(data);
	MakeHelpIcon();
	ShowTutorialAgain();
}

function populateAnswers(data) {
	let answerA = `<p> ${data.answerOptions[0]} </p>`;
	let answerB = `<p> ${data.answerOptions[1]} </p>`;
	$(".vokal").find(".vokalA").html(answerA);
	$(".vokal").find(".vokalB").html(answerB);
}

function populateTutorial(data) {
	let eng = `<h3>English instructions</h3> <br>${data.instructions.instructionsENG}`;
	let dan = `<h3>Danish instructions</h3> <br>${data.instructions.instructionsDK}`;
	$("#eng").html(eng);
	$("#dan").html(dan);
}
/**
 * Makes and inserts the help icon
 */
function MakeHelpIcon() {
	let helpIcon = `<div class='helpIcon'>${
		icon({ prefix: "fas", iconName: "question-circle" }).html
	}</div>`;
	$(".cardStack-Container").append(helpIcon);
}

/**
 *
 */
function CardDraggable() {
	let card = `.card${currentCardnum}`;
	$("#tutorialbutton").on("click", async () => {
		tutorial = await RemoveTutorial();
		const delay = (ms) =>
			new Promise((resolve) => {
				setTimeout(resolve, ms);
			});
		await delay(200);
		if ($(".mainContent .cardcontainer").length === 0) {
			FromStackAnimation(card);
		}
	});
}

function FromStackAnimation(card) {
	if (cards.length === 0) ExerciseComplete();
	animationFromStack(card)
		.then(() => {
			audioPlayer.playWord(currentCard);
			interact(card)
				.draggable({
					listeners: {
						start(event) {
							console.log(cards[currentCardnum].answer);
							$(".vokalA, .vokalB").css({
								opacity: 0.5,
								"border-style": "dashed",
							});
						},
						move(event) {
							position.x += event.dx;
							position.y += event.dy;

							event.target.style.transform = `translate(${position.x}px, ${position.y}px) rotateX(180deg)`;
						},
					},
				})
				.on("dragend", (event) => {
					if (dropped === false) {
						animationToCenter(card);
					}
					$(".vokalA, .vokalB").css({
						opacity: 1,
						"border-style": "none",
					});
				});
		})
		.catch((error) => {
			console.log(error.message);
		});
}

function ExerciseComplete() {
	alert("you'r fucking done mate");
	window.location.href = "/page/login";
}

/**
 * Viser tutorial igen ved klik på hjælp ikon
 */
function ShowTutorialAgain() {
	$(".helpIcon").on("click", function () {
		$(".mainContent")
			.append(`<div class='curtain'></div>`)
			.append(`<div class='tutorial'></div>`);
		$(".tutorial").append(tutorial);
		$(".speaker").remove();
		$(".curtain").on("click", () => {
			RemoveTutorial();
		});
		CardDraggable();
	});
}

function RemoveTutorial() {
	return new Promise((resolve) => {
		let html = $(".tutorial").html();
		$(".tutorial").remove();
		$("#tutorialbutton").remove();
		$(".curtain").remove();
		$(".speaker").append(icon({ prefix: "fas", iconName: "volume-up" }).html);
		resolve(html);
	});
}

/**
 * Setsup the cardstack dependend on how many cards there is
 */
function MakeCardStack() {
	let offset = 5;
	cards.forEach((element, index) => {
		let card = `
        <div class='cardcontainer cardcontainer${index}' id='cardcontainer${index}'>
            <div class="card card${index}" id='card${index}'>
                <div class="front">E or Æ vokal word</div>
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
	currentCardnum = cards.length - 1;
	currentCard = cards[currentCardnum];
}
