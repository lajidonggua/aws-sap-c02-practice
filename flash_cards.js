/* Five-second mode uses the same source-traceable cues as the question page. */
const FLASH_CARDS = Object.fromEntries(
  Object.entries(QUICK_ANSWER_CARDS).map(([id, card]) => [id, { when: card.when, target: card.target }])
);

function flashAnswerWords(text) {
  return text
    .replace(/(?:题库|当前)\s*[A-F](?:\s*[\/、+]\s*[A-F])*(?:\s*选项)?\s*[：:]/g, '')
    .replace(/(^|[；;])\s*[A-F]\s*[：:]\s*/g, '$1')
    .trim();
}
