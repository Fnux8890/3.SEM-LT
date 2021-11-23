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

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}
//cards[currentCard].soundfile_sentence
export function playSentence(card) {
  const audioBlob = b64toBlob(card.soundfile_sentence[0], "audio/mp3");
  const audioUrl = URL.createObjectURL(audioBlob);
  const audio = new Audio(audioUrl);
  audio.play();
}
//cards[currentCard].soundfile_word
export function playWord(card) {
  console.table(card.soundfile_word);
  console.log("test");
  const audioBlob = b64toBlob(card.soundfile_word[0], "audio/mp3");
  const audioUrl = URL.createObjectURL(audioBlob);
  const audio = new Audio(audioUrl);
  audio.play();
}

export default {
  playWord,
  playSentence,
};
