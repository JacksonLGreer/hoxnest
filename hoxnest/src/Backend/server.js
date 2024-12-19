const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();
app.use(cors());
app.use(express.json());

// Database Declaration
const PORT = process.env.PORT || 3001;
let db = new sqlite3.Database('./hoxDB.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log('Connected to the HOX Database');
});

// Server start
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

// Endpoint to retrieve players
app.get('/players', (req,res) => {
    db.all('SELECT * FROM Players', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

const url = 'https://api-nba-v1.p.rapidapi.com/players/statistics?team=1&season=2024';
const fetchStats = async () => {
    try {
        const response = await(url, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '9e140c858bmsh3a85aced8c64059p1e3242jsn5a6f2a6de09d',
		        'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
            }
        });
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
