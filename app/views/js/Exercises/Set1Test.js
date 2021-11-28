/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import anime from 'animejs';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import {
  faQuestionCircle,
  faVolumeUp,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import '../../assets/scss/layouts/exercises/Set1Test.scss';
import { endScreen } from '../CustomModules/endDiv';
import populateTutorial from '../CustomModules/tutorial';

library.add(faQuestionCircle);
library.add(faVolumeUp);
library.add(faTimes);

$(() => {
  const questions = [];
  let questionIndex = -1;

  $.ajax({
    url: 'http://localhost:3000/Build/GetQuestions',
    type: 'GET',
    success(data) {
      data[0].questions.forEach((object) => {
        questions.push(object);
      });
      questions.sort(() => (Math.random() > 0.5 ? 1 : -1));
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

  $(document).on('click', '.helpIcon', () => {
    ShowTutorial();
  });

	$(document).on('click', '.close', function () {
		window.location.href = '/page/module-overview';
	});

  $(document).on('click', '.answerOption', (e) => {
    const currentQuestion = questions[questionIndex];

    const clickedAnswer = $(this).text().trim();

    const colorChange = anime.timeline({
      easing: 'linear',
      direction: 'normal',
    });

    if (questionIndex === 4) {
      if ($(this).hasClass('chosenAnswer')) {
        $(this).removeClass('chosenAnswer');
      } else {
        $(this).addClass('chosenAnswer');
      }
    } else {
      if (currentQuestion.a === clickedAnswer) {
        colorChange
          .add(
            {
              targets: this,
              background: ['rgb(41, 171, 89)', 'rgb(48, 151, 115)'],
              complete() {
                $(e.target).removeAttr('style');
              },
            },
            20,
          )
          .finished.then(() => {
            newQuestion();
          });
      } else {
        colorChange.add(
          {
            targets: this,
            background: ['rgb(199, 54, 44)', 'rgb(48, 151, 115)'],
            complete() {
              $(e.target).removeAttr('style');
            },
          },
          0,
        );
      }
      colorChange.finished.then(() => {
        $(e.target).removeAttr('style'); // så css på stylesheet gælder for den igen
      });
    }
  });

  $(document).on('click', '.checkBtn', () => {
    const currentQuestion = questions[questionIndex];

    let correctAnswers = 0;

    const delay = (ms) =>
      new Promise((res) => {
        setTimeout(res, ms);
      });

      if (currentQuestion.a.includes($(answer).text().trim())) {
        correctAnswers += 1;
        $(answer).addClass('correct');
        if (correctAnswers === currentQuestion.a.length) {
          // Display final div and move on to next exercise or go back to overview
          endScreen('module-overview', 'module-overview');
        }
      } else {
        $(answer).addClass('false');
        await delay(3000);
        $(answer).removeClass('chosenAnswer');
        $(answer).removeClass('false');
      }
    });
  });

  function newQuestion() {
    if ($('.mainContent .cardcontainer').length !== 0) {
      return;
    }
    if (questionIndex >= questions.length) {
      $('.answerOption').remove();
      endExercise();
      return;
    }
    questionIndex += 1;
    $('.chosenAnswer').each(async (i, answer) => {

    const currentQuestion = questions[questionIndex];
    let answerOptions = [];
    // TO-DO: gør a til array på mongodb?
    if (questionIndex === 4) {
      currentQuestion.a.forEach((answer) => {
        answerOptions.push(answer);
      });
    } else {
      answerOptions = [currentQuestion.a];
    }
    // Lav answerOptions array:
    for (let i = 0; i < currentQuestion.answerOptions.length; i += 1) {
      answerOptions.push(currentQuestion.answerOptions[i]);
    }

    MakeAnswerOptions(answerOptions);
    MakeQuestion(currentQuestion.q);
    if (questionIndex === 4) {
      MakeCheckAnswerBtn();
    }
  }
  /**
   * Creates the answerOption divs, from the given array
   * @param {Array<string>} answerArray - Array of the answer-options for the current question
   */
  function MakeAnswerOptions(answerArray) {
    $('.answerOption').remove();
    shuffleArray(answerArray);
    answerArray.forEach((element, index) => {
      const answerOption = `
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
    const question = `
        <div class="question q${questionIndex}">
            <p>${questionTxt}</p>
        </div>`;
    $('.answerZone').prepend(question);
  }

  function MakeCheckAnswerBtn() {
    const btn = `
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
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      // eslint-disable-next-line no-param-reassign
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
    const helpIcon = `<div class='helpIcon'>${
      icon(faQuestionCircle).html
    }</div>`;
    $('.mainContent').before(helpIcon);
  }
  /**
   * Makes and inserts the close icon
   */
  function MakeCloseIcon() {
    const closeIcon = `<div class='close'>${icon(faTimes).html}</div>`;
    $('.container').append(closeIcon);
  }

  function ShowTutorial() {
    $('.tutorial').css({
      visibility: 'visible',
      display: 'grid',
    });
    $('.mainContent').append('<div class="curtain"></div>');
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
    $('.tutorial').css({
      visibility: 'hidden',
    });

    const vid =
      "<iframe class=\"VidAfterTutorial\" src='https://www.youtube.com/embed/45kiQoQuGD4' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen=''></iframe>";
    const button = '<div class="removeVid">Take me to the questions</div>';

    $('.video').append(vid);
    $('.video').append(button);
    $('.removeVid').on('click', () => {
      $('.video').remove();
      RemoveTutorial();
      newQuestion();
    });
  }
});