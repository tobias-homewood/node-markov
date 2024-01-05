const { MarkovMachine } = require('./markov');

describe('MarkovMachine', () => {
    test('constructor splits input text into words', () => {
        let mm = new MarkovMachine("the cat in the hat is in the hat");
        expect(mm.words).toEqual(["the", "cat", "in", "the", "hat", "is", "in", "the", "hat"]);
    });

    test('makeChains generates correct chains', () => {
        let mm = new MarkovMachine("the cat in the hat is in the hat");
        expect(mm.chains).toEqual({
            "the": ["cat", "hat", "hat"],
            "cat": ["in"],
            "in": ["the", "the"],
            "hat": ["is", null],
            "is": ["in"]
        });
    });

    test('makeText generates text of specified length', () => {
        let mm = new MarkovMachine("the cat in the hat is in the hat");
        let text = mm.makeText(1);
        expect(text.split(' ').length).toBe(1);
    });

    test('makeText generates text with words from the input', () => {
        let mm = new MarkovMachine("the cat in the hat is in the hat");
        let text = mm.makeText();
        expect(text.split(' ').every(word => ["the", "cat", "in", "hat", "is", "in"].includes(word))).toBe(true);
    });

    test('makeText generates text that ends with a word that has no following words', () => {
        let mm = new MarkovMachine("the cat in the hat is in the hat");
        let text = mm.makeText();
        expect(["the", "cat", "in"].includes(text.split(' ').pop())).toBe(false);
    });

    test('makeText generates text that has words in the correct order that is in the chain', () => {
        let mm = new MarkovMachine("the cat in the hat is in the hat");
        let text = mm.makeText();
        let words = text.split(' ');
        let chains = mm.chains;
        for (let i = 0; i < words.length - 1; i++) {
            expect(chains[words[i]].includes(words[i + 1])).toBe(true);
        }
    });
});