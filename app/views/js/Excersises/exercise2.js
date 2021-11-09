import anime from "animejs";
import "@lottiefiles/lottie-player";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import {
	faQuestionCircle,
	faVolumeUp,
	faTimes,
    faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import "../../css/exercise2.scss"; 

library.add(faQuestionCircle);
library.add(faVolumeUp);
library.add(faTimes);
library.add(faMicrophone);


$(() => {
	SetupHtmlDivs();

	//Indsætning af ikon (krydset)
	$(".close").append(icon({ prefix: "fas", iconName: "times" }).html);

	$(".record").append(icon({prefix: "fas", iconName: "microphone"}).html)

	$(".close svg").on("click", function () {
		alert("Closing...");
		//Afslut opgaven og gem fremskridt for at kunne fortsætte hvor man slap
	});

	ShowTutorialAgain();

    $("#tutorialbutton").on("click",() => {
        RemoveTutorial();
        animationFromStack(`.card5`);
		$(".translation").css("visibility", "visible");
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
				.appendTo(".word")
				.css({
					"grid-area": "wordDiv",
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
 * The basic setup for the html document.
 */
function SetupHtmlDivs() {
	MakeCardStack();

	MakeHelpIcon();

    MakeCardStackEng();

	SetupSentence();
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

function RemoveTutorial() {
	$(".tutorial").css("visibility", "hidden");
	$("#tutorialbutton").css("visibility", "hidden");
	$("#drawcardContainer").css("visibility", "visible");
	$(".curtain").remove();
	$(".speaker").append(icon({ prefix: "fas", iconName: "volume-up" }).html);
}

const ord = ["ord1", "ord2", "ord3", "ord4", "ord5", "spiser"];
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

const ordENG = ["ord1", "ord2", "ord3", "ord4", "ord5", "ord6"]; 

function MakeCardStackEng() {
	let sentenceTranslated = `<p class="sentenceTranslated">Translated <span class="focusWord" style="font-weight: bold;">${ordENG[0]}</span> Sentence</p>`
    $('.translation').append(sentenceTranslated);
	$('.translation').prepend()
}

function SetupSentence() {
	let sentence = `Jeg spiser et æble`
	let word = "spiser";
	const wordIndex = sentence.indexOf(word);
	const firstPart = sentence.slice(0, wordIndex);
	const secondPart = sentence.slice(wordIndex + word.length + 1);
	console.log(firstPart);
	console.log(secondPart);
	let firstDiv = `<div class="firstPart">${firstPart}</div>`
	let secondDiv = `<div class="secondPart">${secondPart}</div>`
	let wordDiv = `<div class="word"></div>`
	$(".sentence").append([firstDiv, wordDiv, secondDiv]);
}
