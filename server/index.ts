// Server Code (API)


import express from 'express'; // Framework for webserver
import cors from 'cors';    // mid
import { assignRandom, generateCode } from './logic'; // Importing game logics

const app = express();  // Express App Creation
const port = 3000;      // port setting (3000)

// Setting mid
app.use(cors());    // All domains
app.use(express.json()); // JSON Interpreter

const gameData: Record<string, string[]> = {}; // Memory, EX) {"A1B2C": ["ABC", "DEF", "GHI"]}

// Game Creation API
app.post('/create', (req, res) => {
    const { names } = req.body;

    // Check if name is empty
    if (!Array.isArray(names) || names.length === 0) {
        return res.status(400).json({ error: 'Name array needed' });
    }

    // Shuffle the names
    const shuffled = assignRandom(names);

    // Code Creation
    const code = generateCode();
    gameData[code] = shuffled; // Insert shuffled names into code

    // Result
    res.json({ code, results: shuffled });
});

// Getting API
app.get('/join/:code', (req, res) => {
    const { code } = req.params;
    const result = gameData[code];

    if (!result) {
        return res.status(404).json({ error: 'No game existed' });
    }

    // return the result
    res.json({ names: result });
});

// 서버 시작
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});
