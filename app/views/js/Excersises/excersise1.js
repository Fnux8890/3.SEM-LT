import anime from "animejs";
import interact from "interactjs";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import {
	faQuestionCircle,
	faVolumeUp,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "../../css/excersise1.scss";

let position = { x: 0, y: 0 };
let draggable = false;

library.add(faQuestionCircle);
library.add(faVolumeUp);
library.add(faTimes);

$.ajax({
	url: `http://localhost:3000/Build/Exercise?id=${n}`,
	type: 'GET',

})

$(() => {
	SetupHtmlDivs();

	draggable = CardDraggable(draggable);

	DropzoneCardInteract(".vokalE");
	DropzoneCardInteract(".vokalÆ");

	//Indsætning af ikon (krydset)
	$(".close").append(icon({ prefix: "fas", iconName: "times" }).html);

	$(".close svg").on("click", function () {
		alert("Closing...");
		//Afslut opgaven og gem fremskridt for at kunne fortsætte hvor man slap
	});

	ShowTutorialAgain();
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
			anime(
				{
					targets: card,
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
		})
		.catch((err) => {
			console.log(err);
		});

	return t1.finished;
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

	position = { x: 0, y: 0 };

	return t1.finished;
}

function DropzoneCardInteract(div) {
	interact(div).dropzone({
		accept: ".card",
		ondrop: function (event) {
			alert("Hello");
		},
	});
}

/**
 * The basic setup for the html document.
 */
function SetupHtmlDivs() {
	MakeCardStack();

	MakeHelpIcon();
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
 * Viser tutorial igen ved klik på hjælp ikon
 */
function ShowTutorialAgain() {
	$(".helpIcon").on("click", function () {
		$(".tutorial").css("visibility", "visible");
		$("#tutorialbutton").css("visibility", "visible");
		$("#drawcardContainer").css("visibility", "visible");
		let curtain = `<div class="curtain"></div>`;
		$("body").append(curtain);
		$(".speaker").remove();
	});
}
/**
 *
 * @param {Boolean} draggable Is the card draggable or not
 * @returns Boolean depedendt if the card is draggable
 */
function CardDraggable(draggable) {
	$("#tutorialbutton").on("click", async () => {
		RemoveTutorial();
		const delay = (ms) =>
			new Promise((resolve) => {
				setTimeout(resolve, ms);
			});
		await delay(200);
		animationFromStack(`.card5`)
			.then(() => {
				draggable = true;
				if (draggable === true) {
					interact(".card5")
						.draggable({
							listeners: {
								start(event) {
									$(".vokalE, .vokalÆ").css({
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
							animationToCenter(".card5");
							$(".vokalE, .vokalÆ").css({
								opacity: 1,
								"border-style": "none",
							});
						});
				}
			})
			.catch((error) => {
				console.log(error.message);
			});
	});
	return draggable;
}

function RemoveTutorial() {
	$(".tutorial").remove();
	$("#tutorialbutton").remove();
	$("#drawcardContainer").css("visibility", "visible");
	$(".curtain").remove();
	$(".speaker").append(icon({ prefix: "fas", iconName: "volume-up" }).html);
}

const ord = ["ord1", "ord2", "ord3", "ord4", "ord5", "ord6"];
/**
 * Setsup the cardstack dependend on how many cards there is
 */
function MakeCardStack() {
	let offset = 5;
	ord.forEach((element, index) => {
		let card = `
        <div class='cardcontainer cardcontainer${index}' id='cardcontainer${index}'>
            <div class="card card${index}" id='card${index}'>
                <div class="front">Bagside af kort</div>
                <div class="back">${element}</div>
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
}
