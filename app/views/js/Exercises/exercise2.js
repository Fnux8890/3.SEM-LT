/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import anime from 'animejs';
import '@lottiefiles/lottie-player';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import {
  faQuestionCircle,
  faVolumeUp,
  faTimes,
  faMicrophone,
  faPlay,
  faStar,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import * as audioPlayer from '../CustomModules/audioPlayer';
import '../../assets/scss/layouts/exercises/exercise2.scss';
import cardFlip from '../CustomModules/cardFlip';
import populateTutorial from '../CustomModules/tutorial';
import { endScreen } from '../CustomModules/endDiv';

library.add(faQuestionCircle);
library.add(faVolumeUp);
library.add(faTimes);
library.add(faMicrophone);
library.add(faPlay);
library.add(faStar);
library.add(faThumbsUp);

const cards = [];
let currentCardnum = '';
let currentCard = '';
let tutorial = '';

$(() => {
  $.getJSON('http://localhost:3000/Build/ExerciseWordsAndSentences', (data) => {
    data.cards.forEach((card) => {
      cards.push(card);
    });
    cards.sort(() => (Math.random() > 0.5 ? 1 : -1));
    SetupHtmlDivs(data);
    startRating();
  });

  // Indsætning af ikon (krydset)
  $('.close').append(
    icon({
      prefix: 'fas',
      iconName: 'times',
    }).html,
  );

  $('#tutorialbutton').append(
    icon({
      prefix: 'fas',
      iconName: 'thumbs-up',
    }).html,
  );

  $('.close svg').on('click', () => {
    // alert('Closing...');
    window.location.href = '/page/module-overview';
    // Afslut opgaven og gem fremskridt for at kunne fortsætte hvor man slap
  });

  // Lav seperat knap til afspil lydfil her eller nede i funktionen?
  $('body').on('click', '.recordIcon', () => {
    StartRecording();
  });

  $('.speaker').on('click', () => {
    audioPlayer.default.playWord(cards[currentCardnum]);
  });
});

function startRating() {
  $('.stars0').on({
    mouseenter() {
      $('.stars0').css('color', 'yellow');
    },
    mouseleave() {
      $('.stars0').css('color', 'black');
    },
  });
  $('.stars1').on({
    mouseenter() {
      $('.stars0, .stars1').css('color', 'yellow');
    },
    mouseleave() {
      $('.stars0, .stars1').css('color', 'black');
    },
  });
  $('.stars2').on({
    mouseenter() {
      $('.stars0, .stars1, .stars2').css('color', 'yellow');
    },
    mouseleave() {
      $('.stars0, .stars1, .stars2').css('color', 'black');
    },
  });
  $('.stars3').on({
    mouseenter() {
      $('.stars0, .stars1, .stars2, .stars3').css('color', 'yellow');
    },
    mouseleave() {
      $('.stars0, .stars1, .stars2, .stars3').css('color', 'black');
    },
  });
  $('.stars4').on({
    mouseenter() {
      $('.stars0, .stars1, .stars2, .stars3, .stars4').css('color', 'yellow');
    },
    mouseleave() {
      $('.stars0, .stars1, .stars2, .stars3, .stars4').css('color', 'black');
    },
  });
}

function tutorialButtonOnClick() {
  $('#tutorialbutton').on('click', async (event) => {
    const card = `.card${currentCardnum}`;
    tutorial = await RemoveTutorial();
    const delay = (ms) =>
      new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    await delay(200);
    animationFromStack(card, event);
    $('.translation').css('visibility', 'visible');
    $('.sentence').css('visibility', 'visible');
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
  let y = $('.mainContent').offset().top - convertRemToPixels(1);
  let x = $('.mainContent').offset().left - convertRemToPixels(1);
  x += $('.mainContent').width() / 2;
  x -= $(card).width() / 2;
  y += $('.mainContent').height() / 2;
  y -= $(card).height() / 2;
  return {
    x,
    y,
  };
}

/**
 * Animates from cardStack
 * @param {String} card The target card div/class
 * @returns Returns a pormis for when animation is done
 */
function animationFromStack(card) {
  const maincontentCenter = findMaincontentCenter(card);

  const t1 = anime.timeline({
    targets: card,
  });

  t1.add({
    translateX: maincontentCenter.x,
    translateY: maincontentCenter.y,
    easing: 'easeOutQuint',
    duration: 1000,
  })
    .finished.then(() => {
      $(card)
        .css({
          transform: 'none',
        })
        .parent()
        .appendTo('.word')
        .css({
          'grid-area': 'wordDiv',
        });
      cardFlip(card, currentCard);
      audioPlayer.default.playSentence(currentCard);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
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
  const helpIcon = `<div class='helpIcon'>${
    icon({ prefix: 'fas', iconName: 'question-circle' }).html
  }</div>`;
  $('.cardStack-Container').append(helpIcon);
}

/**
 * Viser tutorial igen ved klik på hjælp ikon
 */
function ShowTutorialAgain() {
  $('.helpIcon').on('click', () => {
    $('.mainContent')
      .append("<div class='curtain'></div>")
      .append("<div class='tutorial'></div>");
    $('.tutorial').append(tutorial);
    $('.speaker').remove();
    $('.curtain').on('click', () => {
      RemoveTutorial();
    });
    $('.speaker').remove();
    $('#tutorialbutton').on('click', async () => {
      tutorial = await RemoveTutorial();
    });
  });
}

function RemoveTutorial() {
  return new Promise((resolve) => {
    const html = $('.tutorial').html();
    $('.tutorial').remove();
    $('#tutorialbutton').remove();
    $('.curtain').remove();
    $('.speaker').append(
      icon({
        prefix: 'fas',
        iconName: 'volume-up',
      }).html,
    );
    resolve(html);
  });
}

/**
 * Setsup the cardstack dependend on how many cards there is
 */
function MakeCardStack() {
  let offset = 5;
  cards.forEach((element, index) => {
    const card = `
        <div class='cardcontainer cardcontainer${index}' id='cardcontainer${index}'>
            <div class="card card${index}" id='card${index}'>
                <div class="front"></div>
                <div class="back">${element.word}</div>
            </div>
        </div>`;
    $('.cardStack-Container').append(card);
    const zlayer = $('.front').css('z-index');
    $(`#card${index}`).css({
      transform: `translateX(${offset}px)`,
      'z-index': zlayer + index,
    });
    offset += 5;
  });
  currentCardnum = cards.length - 1;
  currentCard = cards[currentCardnum];
}

function MakeCardStackEng() {
  const engSentence = cards[currentCardnum].translation_sentence;
  const focusWord = cards[currentCardnum].translation_word;
  const wordIndex = engSentence.indexOf(focusWord);
  if (wordIndex > -1) {
    const firstPart = engSentence.slice(0, wordIndex);
    const secondPart = engSentence.slice(wordIndex + focusWord.length + 1);
    const sentenceTranslated = `<p class="sentenceTranslated">${firstPart} <span class="focusWord" style="font-weight: bold;">${focusWord}</span> ${secondPart}</p>`;
    $('.translation').append(sentenceTranslated);
  } else {
    const sentenceTranslated = `<p class="sentenceTranslated">${engSentence}<br/><span class="focusWord" style="font-weight: bold;">${focusWord}</span></p>`;
    $('.translation').append(sentenceTranslated);
  }
}

function changeTranslation() {
  const engSentence = cards[currentCardnum].translation_sentence;
  const focusWord = cards[currentCardnum].translation_word;
  const wordIndex = engSentence.indexOf(focusWord);
  if (wordIndex > -1) {
    const firstPart = engSentence.slice(0, wordIndex);
    const secondPart = engSentence.slice(wordIndex + focusWord.length + 1);
    const sentenceTranslated = `<p class="sentenceTranslated">${firstPart} <span class="focusWord" style="font-weight: bold;">${focusWord}</span> ${secondPart}</p>`;
    $('.sentenceTranslated').html(sentenceTranslated);
  } else {
    const sentenceTranslated = `<p class="sentenceTranslated">${engSentence}<br/><span class="focusWord" style="font-weight: bold;">${focusWord}</span></p>`;
    $('.sentenceTranslated').html(sentenceTranslated);
  }
}

function SetupSentence() {
  const { sentence } = cards[currentCardnum];
  const { word } = cards[currentCardnum];
  const wordIndex = sentence.indexOf(word);
  const firstPart = sentence.slice(0, wordIndex);
  const secondPart = sentence.slice(wordIndex + word.length + 1);
  const firstDiv = `<div class="firstPart">${firstPart}</div>`;
  const secondDiv = `<div class="secondPart">${secondPart}</div>`;
  const wordDiv = '<div class="word"></div>';
  $('.sentence').append([firstDiv, wordDiv, secondDiv]);
}

function changeSentence() {
  const { sentence } = cards[currentCardnum];
  const { word } = cards[currentCardnum];
  const wordIndex = sentence.indexOf(word);
  const firstPart = sentence.slice(0, wordIndex);
  const secondPart = sentence.slice(wordIndex + word.length + 1);
  const firstDiv = `<div class="firstPart">${firstPart}</div>`;
  const secondDiv = `<div class="secondPart">${secondPart}</div>`;
  const wordDiv = '<div class="word"></div>';
  $('.sentence').html([firstDiv, wordDiv, secondDiv]);
}

function StartRecording() {
  $('.recordIcon').remove();
  const recordingNow = '<div class="recordingNow"></div>';
  $('.microphone').append(recordingNow);
  $('.recordingNow').append(
    icon({
      prefix: 'fas',
      iconName: 'microphone',
    }).html,
  );
  navigator.mediaDevices
    .getUserMedia({
      audio: true,
    })
    .then((stream) => {
      let mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      const audioChunks = [];

      mediaRecorder.ondataavailable = (e) => {
        audioChunks.push(e.data);
      };

      mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks, 'audio/mp3');
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        $('.playRec').on('click', () => {
          audio.play();
        });
      });

      setTimeout(() => {
        mediaRecorder.stop();
        $('.recordingNow').remove();
        appendPlaybutton();
        $('.stars0, .stars1, .stars2, .stars3, .stars4').one('click', () => {
          $('.playRec').remove();
          mediaRecorder = null;
          // Gem stjernerne og træk næste kort.
          const divexists = $('.recordIcon');
          if (divexists.length < 1) {
            appendMicrophone();
            animateCardOut(`.cardcontainer${currentCardnum}`);
          }
          if (currentCardnum === 0) {
            endScreen('module-overview', 'exercise3');
          }
        });
      }, 3000);
    });
}

function setupRating() {
  let i;
  for (i = 0; i < 5; i += 1) {
    const ratingStars = `<span class="star stars${i}"></span>`;
    $('.rating').append(ratingStars);
    $(`.stars${i}`).append(
      icon({
        prefix: 'fas',
        iconName: 'star',
      }).html,
    );
  }
}

function appendMicrophone() {
  const recordDiv = "<div class='recordIcon'></div>";
  $('.microphone').append(recordDiv);
  $('.recordIcon').append(
    icon({
      prefix: 'fas',
      iconName: 'microphone',
    }).html,
  );
}

function appendPlaybutton() {
  const playrecording = '<div class="playRec"></div>';
  $('.play').append(playrecording);
  $('.playRec').append(
    icon({
      prefix: 'fas',
      iconName: 'play',
    }).html,
  );
}

function animateCardOut() {
  let card = `.card${currentCardnum}`;
  const t1 = anime.timeline({
    targets: card,
  });
  t1.add({
    translateX: -1000,
    easing: 'easeOutQuint',
    duration: 1000,
  });
  t1.finished.then(() => {
    // TODO post answer to mongodb
    $(card).remove();
    currentCardnum -= 1;
    currentCard = cards[currentCardnum];
    card = `.card${currentCardnum}`;
    animationFromStack(card);
    changeSentence();
    changeTranslation();
  });
}
