/** Command-line tool to generate Markov text. */
const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

async function main(argv=process.argv) {
    if (argv[2] !== 'file' && argv[2] !== 'url') {
        console.error('Error: invalid method. Must be "file" or "url".');
        process.exit(1);
    }

    if (argv[2] === 'file') {
        try {
            const data = fs.readFileSync(argv[3], 'utf8');
            const mm = new MarkovMachine(data);
            console.log(mm.makeText());
            return;
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    }

    try {
        const res = await axios.get(argv[3]);
        const mm = new MarkovMachine(res.data);
        console.log(mm.makeText());
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main();