/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/\s+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chains = {};

    this.words.forEach(target => {
      if (this.chains[target]) return;

      const chain = [];
      this.words.forEach((word, index) => {
        if (target === word) {
          chain.push(this.words[index + 1] || null);
        }
      });
      this.chains[target] = chain;
    });
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    const text = [];
    const words = Object.keys(this.chains);

    // starting word
    let word = words[Math.floor(Math.random() * words.length)];

    while (text.length < numWords && word !== null) {
      text.push(word);

      const suggestions = this.chains[word];
      word = suggestions[Math.floor(Math.random() * suggestions.length)];
    }

    return text.join(" ");
  }
}
exports.MarkovMachine = MarkovMachine;