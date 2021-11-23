import anime from "animejs";
import { default as audioPlayer } from "./audioPlayer";
export function cardFlip(card, currentCard) {
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
}
