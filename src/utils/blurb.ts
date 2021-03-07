export function blurbGenerator(
  asArray = false,
  min = 2,
  max = 5,
  fillchar = "▇"
) {
  const paragraphCount = Math.random() * (max - min) + min;
  const paragraphs = [];

  for (let i = 0; i < paragraphCount; i++) {
    const sentenceCount = Math.random() * 5 + 2;
    const sentences = [];
    for (let j = 0; j < sentenceCount; j++) {
      const wordCount = Math.random() * 10 + 4;
      const words = [];
      for (let k = 0; k < wordCount; k++) {
        const wordLen = Math.floor(Math.random() * 5 + 1);
        words.push(new Array(wordLen).fill(fillchar).join(""));
      }
      sentences.push(words.join(" ") + ".");
    }
    paragraphs.push(sentences.join(" "));
  }

  if (asArray) {
    return paragraphs;
  } else {
    return paragraphs.join("\n\n");
  }
}
