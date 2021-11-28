import anime from 'animejs';

export default function cardFlip(card) {
  const cardFlipAnimation = anime.timeline({
    targets: card,
  });
  cardFlipAnimation.add(
    {
      scale: [
        { value: 1 },
        { value: 1.2, duration: 400 },
        { value: 1, duration: 400 },
      ],
      rotateX: { delay: 20, value: '+=180', duration: 500 },
      easing: 'easeInOutSine',
      duration: 1200,
    },
    '-=200',
  );
  return cardFlipAnimation.finished;
}
