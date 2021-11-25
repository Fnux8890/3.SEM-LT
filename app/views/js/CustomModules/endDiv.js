export function endScreen(Module, Next) {
	console.log("Finished exercise");
	let curtainexists = $(".curtain");
	if (curtainexists.length < 1) {
		$(
			".speaker, .sentence, .translation, .close, .RecordAndRate, .cardStack"
		).remove();
		$(".mainContent")
			.append(`<div class='curtain'></div>`)
			.append(`<div class="endNote">You win</div>`);
		$(".endNote").append(`<p class="endText">You did great!</p>`);
        $(".endNote").append(`<div class="BackToOverview">Back to Module Overview</div>`);
        $(".endNote").append(`<div class="NextExercise">Next Exercise</div>`);

        $(".BackToOverview").on("click", function() {
            //Tilbage til overview
            window.location.href = `/page/${Module}`;
        })

        $(".NextExercise").on("click", function() {
            //Videre til næste exercise 
            window.location.href = `/page/${Next}`;
        })
	}
}

export default {
    endScreen,
}