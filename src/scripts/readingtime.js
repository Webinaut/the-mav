const WORDS_PER_MINUTE = 220;

export function getReadingTime(content) {
  if (!content) return;
  const clean = content.replace(/<\/?[^>]+(>|$)/g, "");
  const numberOfWords = clean.split(/\W+/g).length;
  return Math.ceil(numberOfWords / WORDS_PER_MINUTE);
}
