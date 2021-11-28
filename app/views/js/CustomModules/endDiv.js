/* eslint-disable no-undef */
export function endScreen(Module, Next) {
  const curtainexists = $('.curtain');
  if (curtainexists.length < 1) {
    $(
      '.speaker, .sentence, .translation, .close, .RecordAndRate, .cardStack, .helpIcon, .answerZone, .tutorial, iframe',
    ).remove();
    $('.mainContent')
      .append("<div class='curtain'></div>")
      .append('<div class="endNote"></div>');
    $('.endNote').append('<p class="endText">You did great!</p>');
    $('.endNote').append(
      '<div class="BackToOverview">Back to Module Overview</div>',
    );
    $('.endNote').append('<div class="NextExercise">Next Exercise</div>');

    $('.BackToOverview').on('click', () => {
      // Tilbage til overview
      window.location.href = `/page/${Module}`;
    });

    $('.NextExercise').on('click', () => {
      // Videre til næste exercise
      window.location.href = `/page/${Next}`;
    });
  }
}

export default {
  endScreen,
};
