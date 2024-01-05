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

      const chain = new Set();
      this.words.forEach((word, index) => {
        if (target === word) {
          chain.add(this.words[index + 1] || null);
        }
      });
      this.chains[target] = [...chain];
    });
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
  }
}
