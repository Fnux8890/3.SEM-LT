import $ from "jquery";
import anime from "animejs";
import interact from "interactjs";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import {
	faQuestionCircle,
	faVolumeUp,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";

library.add(faQuestionCircle);
library.add(faVolumeUp);
library.add(faTimes);

function convertRemToPixels(rem) {
	return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
//TODO calculate position in context to where it is reletive to center x and y
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

function animationToCenter(card) {
	let maincontentCenter = findMaincontentCenter(card);
	position = maincontentCenter;
	var t1 = timeline({
		targets: card,
	});
	//TODO: Ændre slutning til at kortet ender centralt i "maincontent" div.
	t1.add({
		translateX: maincontentCenter.x,
		translateY: maincontentCenter.x,
		easing: "easeOutQuint",
		duration: 1000,
	});
	position = {
		x: maincontentCenter.x,
		y: maincontentCenter.y,
	};

	return t1.finished;
}

const ord = ["ord1", "ord2", "ord3", "ord4", "ord5", "ord6"];
let position = { x: 0, y: 0 };

$(() => {
	let draggable = false;
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

	let helpIcon = `<div class='helpIcon'>${
		icon({ prefix: "fas", iconName: "question-circle" }).html
	}</div>`;
	$(".cardStack-Container").append(helpIcon);

	$("#tutorialbutton").on("click", () => {
		$(".tutorial").remove();
		$("#tutorialbutton").remove();
		$("#drawcardContainer").css("visibility", "visible");
		$(".curtain").remove();
		$(".speaker").append(icon({ prefix: "fas", iconName: "volume-up" }).html);
	});
	//TODO find a method to place the card in a container when the animation is done
	$("#drawCard").on("click", async () => {
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
							animationToCenter(".card5").then(() => {
								position = {
									x: findMaincontentCenter(".card5").x,
									y: findMaincontentCenter(".card5").y,
								};
								console.log(JSON.stringify(position));
							});
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

	interact(".vokalE").dropzone({
		accept: ".card",
		ondrop: function (event) {
			alert("Hello");
			//Rigtigt eller fokert svar
		},
	});

	interact(".vokalÆ").dropzone({
		accept: ".card",
		ondrop: function (event) {
			alert("Hello");
			//Rigtigt eller fokert svar
		},
	});

	//Indsætning af ikon (krydset)
	$(".close").append(icon({ prefix: "fas", iconName: "times" }).html);

	$(".close svg").on("click", function () {
		alert("Closing...");
		//Afslut opgaven og gem fremskridt for at kunne fortsætte hvor man slap
	});

	//Viser tutorial igen ved klik på hjælp ikon
	$(".helpIcon").on("click", function () {
		$(".tutorial").css("visibility", "visible");
		$("#tutorialbutton").css("visibility", "visible");
		$("#drawcardContainer").css("visibility", "visible");
		let curtain = `<div class="curtain"></div>`;
		$("body").append(curtain);
		$(".speaker").remove();
	});
});
