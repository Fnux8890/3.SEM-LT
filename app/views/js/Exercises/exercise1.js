import anime from "animejs";
import interact from "interactjs";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import {
	faQuestionCircle,
	faVolumeUp,
	faTimes,
	faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import "../../css/exercise1.scss";
import lottie from "lottie-web/build/player/lottie";

let position = { x: 0, y: 0 };
const ord = [];
let currentCard = "";
let tutorial = "";
let anim = "";

library.add(faQuestionCircle);
library.add(faVolumeUp);
library.add(faTimes);
library.add(faThumbsUp);

$(() => {
	$.ajax({
		url: `http://localhost:3000/Build/ExerciseInformation?id=1`,
		type: "GET",
		success: function (data) {
			data.cards.forEach((object) => {
				ord.push(object);
			});
			ord.sort(() => {
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

const timeline = anime.timeline;
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
					"box-shadow":
						"0 6px 6px rgba(0, 0, 0, 0.23), 0 10px 20px rgba(0, 0, 0, 0.19)",
				});
			let cardFlip = anime.timeline({
				targets: card,
			});
			cardFlip.add(
				{
					scale: [
						{ value: 1 },
						{ value: 1.2, duration: 400 },
						{ value: 1, duration: 400 },
					],
					rotateX: { delay: 20, value: "+=180", duration: 500 },
					easing: "easeInOutSine",
					duration: 1200,
				},
				"-=200"
			);
			return cardFlip.finished;
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
	});

	t1.finished.then(() => {
		$(`${card}`).css({
			transform: "none",
			transform: "rotateX(180deg)",
		});
	});

	position = { x: 0, y: 0 };

	return t1.finished;
}

function DropzoneCardInteract(div) {
	interact(div).dropzone({
		accept: ".card",
		ondrop: function (event) {
			console.log(
				`your choice: ${$(div).text()} \ncorrectChoice: ${
					ord[currentCard].answer
				}\nProccesing`
			);
			(async () => {
				return new Promise((resolve) => {
					setTimeout(resolve, 1000);
				});
			})().then(() => {
				if ($(div).text().trim(" ") === ord[currentCard].answer.trim(" ")) {
					animateCorrectAnswer();
				} else {
					AnimateIncorrectAnswer();
				}
			});
		},
	});
}

function animateCorrectAnswer() {
	anim = lottie.loadAnimation({
		container: document.getElementById("animation"), // the dom element that will contain the animation
		renderer: "svg",
		loop: false,
		autoplay: false,
		path: "https://assets2.lottiefiles.com/packages/lf20_rovf9gzu.json", // the path to the animation json
	});
	$("#animation").css({ "z-index": "11" });
	$(".mainContent")
		.append(`<div class='curtain'></div>`)
		.append(`<div class='tutorial'></div>`);
	$(".tutorial").addClass("correct").html(`
			<p>Congratulations your answer was correct!</p>
			<button id="nextCard">Continue</button>
	`);
	$(".speaker").remove();
	anim.play();
	$(".correct > button").on("click", () => {
		RemoveTutorial();
	});
}
function AnimateIncorrectAnswer() {}

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
	let card = `.card${currentCard}`;
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
	animationFromStack(card)
		.then(() => {
			interact(card)
				.draggable({
					listeners: {
						start(event) {
							console.log(ord[currentCard].answer);
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
					animationToCenter(card);
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
	ord.forEach((element, index) => {
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
	currentCard = ord.length - 1;
}
