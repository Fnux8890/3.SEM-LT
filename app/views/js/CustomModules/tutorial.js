export function populateTutorial(data) {
	let eng = `<h3>English instructions</h3>`;
	let dan = `<h3>Danish instructions</h3>`;
	$('#eng .text').html(`${data.instructions.instructionsENG}`);
	$('#dan .text').html(`${data.instructions.instructionsDK}`);
	$('#eng .title').html(eng);
	$('#dan .title').html(dan);
}
