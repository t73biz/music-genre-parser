const { spawn } = require('child_process');
const axios = require('axios');

const getHTML = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const runPythonScript = (html) => {
    const python = spawn('python', ['./parser.py']);

    // Send HTML data to Python process through stdin
    python.stdin.write(JSON.stringify(html));
    python.stdin.end();

    python.stdout.on('data', (data) => {
        console.log(`Python response: ${data}`);
    });

    python.stderr.on('data', (data) => {
        console.error(`Python error: ${data}`);
    });

    python.on('close', (code) => {
        console.log(`Python process closed with code ${code}`);
    });
};

const url = 'https://en.wikipedia.org/wiki/Another_Brick_in_the_Wall';
getHTML(url)
    .then(runPythonScript)
    .catch(console.error);
