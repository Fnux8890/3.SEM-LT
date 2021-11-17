import anime from "animejs";
import "@lottiefiles/lottie-player";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import {
  faQuestionCircle,
  faVolumeUp,
  faTimes,
  faMicrophone,
  faPlay,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import "../../assets/scss/layouts/exercises/exercise2.scss";

library.add(faQuestionCircle);
library.add(faVolumeUp);
library.add(faTimes);
library.add(faMicrophone);
library.add(faPlay);
library.add(faStar);

const cards = [];
let currentCard = "";
let tutorial = '';

$(() => {
  $.getJSON("http://localhost:3000/Build/ExerciseWordAndSentences", (data)=>{
        data.cards.forEach(function (card) {
          cards.push(card);
        });
        cards.sort(() => {
          Math.random() > 0.5 ? 1 : -1;
        });
        SetupHtmlDivs(data);
  });
  
  //Indsætning af ikon (krydset)
  $(".close").append(icon({ prefix: "fas", iconName: "times" }).html);

  $(".close svg").on("click", function () {
    alert("Closing...");
    //Afslut opgaven og gem fremskridt for at kunne fortsætte hvor man slap
  });


  //Lav seperat knap til afspil lydfil her eller nede i funktionen?
  $("body").on("click", ".recordIcon", () => {
    StartRecording();
  });

  startRating();
});

function startRating() {
  $(".stars0").on({
    mouseenter: function () {
      $(".stars0").css("color", "yellow");
    },
    mouseleave: function () {
      $(".stars0").css("color", "black");
    },
  });
  $(".stars1").on({
    mouseenter: function () {
      $(".stars0, .stars1").css("color", "yellow");
    },
    mouseleave: function () {
      $(".stars0, .stars1").css("color", "black");
    },
  });
  $(".stars2").on({
    mouseenter: function () {
      $(".stars0, .stars1, .stars2").css("color", "yellow");
    },
    mouseleave: function () {
      $(".stars0, .stars1, .stars2").css("color", "black");
    },
  });
  $(".stars3").on({
    mouseenter: function () {
      $(".stars0, .stars1, .stars2, .stars3").css("color", "yellow");
    },
    mouseleave: function () {
      $(".stars0, .stars1, .stars2, .stars3").css("color", "black");
    },
  });
  $(".stars4").on({
    mouseenter: function () {
      $(".stars0, .stars1, .stars2, .stars3, .stars4").css("color", "yellow");
    },
    mouseleave: function () {
      $(".stars0, .stars1, .stars2, .stars3, .stars4").css("color", "black");
    },
  });
}

function tutorialButtonOnClick() {
  $("#tutorialbutton").on("click", async () => {
    let card = `.card${currentCard}`;
    tutorial = await RemoveTutorial();
    const delay = (ms) => new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
    await delay(200);
    animationFromStack(card);
    $(".translation").css("visibility", "visible");
    $(".sentence").css("visibility", "visible");
  });
}

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
function SetupHtmlDivs(data) {
  MakeCardStack();

  populateTutorial(data);

  MakeHelpIcon();

  MakeCardStackEng();

  SetupSentence();

  setupRating();

  appendMicrophone();

  tutorialButtonOnClick();
  ShowTutorialAgain();
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
    $(".mainContent")
			.append(`<div class='curtain'></div>`)
			.append(`<div class='tutorial'></div>`);
		$(".tutorial").append(tutorial);
		$(".speaker").remove();
		$(".curtain").on("click", () => {
			RemoveTutorial();
		});
    $(".speaker").remove();
    $("#tutorialbutton").on("click", async () => {
      tutorial = await RemoveTutorial();
    });
  });
}

function RemoveTutorial() {
  return new Promise((resolve, reject) => {
    let html = $(".tutorial").html();
    $(".tutorial").remove();
		$("#tutorialbutton").remove();
		$(".curtain").remove();
		$(".speaker").append(icon({ prefix: "fas", iconName: "volume-up" }).html);
    resolve(html)
  })
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
                <div class="front">Bagside af kort</div>
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
  currentCard = cards.length - 1;
}

function MakeCardStackEng() {
  let engSentence = cards[currentCard].translation_sentence;
  let focusWord = cards[currentCard].translation_word;
  const wordIndex = engSentence.indexOf(focusWord);
  const firstPart = engSentence.slice(0, wordIndex);
  const secondPart = engSentence.slice(wordIndex + focusWord.length + 1);
  let sentenceTranslated = `<p class="sentenceTranslated">${firstPart} <span class="focusWord" style="font-weight: bold;">${focusWord}</span> ${secondPart}</p>`;
  $(".translation").append(sentenceTranslated);
  $(".translation").prepend();
} 

function SetupSentence() {
  let sentence = cards[currentCard].sentence;
  let word = cards[currentCard].word;
  const wordIndex = sentence.indexOf(word);
  const firstPart = sentence.slice(0, wordIndex);
  const secondPart = sentence.slice(wordIndex + word.length + 1);
  let firstDiv = `<div class="firstPart">${firstPart}</div>`;
  let secondDiv = `<div class="secondPart">${secondPart}</div>`;
  let wordDiv = `<div class="word"></div>`;
  $(".sentence").append([firstDiv, wordDiv, secondDiv]);
}

function StartRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();

    const audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", (event) => {
      audioChunks.push(event.data);
    });

    mediaRecorder.addEventListener("stop", () => {
      const audioBlob = new Blob(audioChunks);
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      console.log(audio);
      $(".playRec").on("click", () => {
        audio.play();
      });
    });

    setTimeout(() => {
      mediaRecorder.stop();
      $(".recordIcon").remove();
      appendPlaybutton();
      console.log("i setTimeout");
      $(".stars0, .stars1, .stars2, .stars3, .stars4").one("click", () => {
        alert("test");
        $(".playRec").remove();
        appendMicrophone();
        console.log("clicked stars");
        mediaRecorder = null;
      });
    }, 3000);
  });
}

function setupRating() {
  var i;
  for (i = 0; i < 5; i++) {
    let ratingStars = `<span class="star stars${i}"></span>`;
    $(".rating").append(ratingStars);
    $(`.stars${i}`).append(icon({ prefix: "fas", iconName: "star" }).html);
  }
}

function appendMicrophone() {
  let recordDiv = "<div class='recordIcon'></div>"
  $(".microphone").append(recordDiv);
  $(".recordIcon").append(icon({ prefix: "fas", iconName: "microphone" }).html);
}

function appendPlaybutton() {
  let playrecording = `<div class="playRec"></div>`;
  $(".play").append(playrecording);
  $(".playRec").append(icon({ prefix: "fas", iconName: "play" }).html);
}

function populateTutorial(data) {
  let eng = `<h3>English instructions</h3> <br>${data.instructions.instructionsENG}`;
	let dan = `<h3>Danish instructions</h3> <br>${data.instructions.instructionsDK}`;
	$("#eng").html(eng);
	$("#dan").html(dan);
}
