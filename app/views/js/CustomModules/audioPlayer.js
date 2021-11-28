function b64toBlob(b64Data, contentType = "", sliceSize = 512) {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {
    type: contentType
  });
  return blob;
}
//cards[currentCard].soundfile_sentence
export function playSentence(card) {
  let rand = Math.floor(Math.random() * card.soundfile_sentence.length);
  const audioBlob = b64toBlob(card.soundfile_sentence[rand], "audio/mp3");
  const audioUrl = URL.createObjectURL(audioBlob);
  const audio = new Audio(audioUrl);
  audio.play();
}
//cards[currentCard].soundfile_word
export function playWord(card) {
  let rand = Math.floor(Math.random() * card.soundfile_word.length);
  const audioBlob = b64toBlob(card.soundfile_word[rand], "audio/mp3");
  const audioUrl = URL.createObjectURL(audioBlob);
  const audio = new Audio(audioUrl);
  audio.play();
}

export function playVowel(data, vowel) {
  let soundfile;
  if (vowel == "E") {
    soundfile = data.soundfile_E;
  } else if (vowel == "Æ") {
    soundfile = data.soundfile_Æ;
  }
  const audioBlob = b64toBlob(soundfile, "audio/mp3");
  const audioUrl = URL.createObjectURL(audioBlob);
  const audio = new Audio(audioUrl);
  audio.play();
}

export default {
  playWord,
  playSentence,
  playVowel,
};