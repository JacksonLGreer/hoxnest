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


// PLAYER ENDPOINTS
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

// Endpoint to retreive player IDs
app.get('/players/id', (req,res) => {
    db.all('SELECT id FROM Players', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    })
})

// Endpoint to update player stats
app.post('/player/update_stats', (req,res) => {
    const {id, ppg, apg, rpg, spg, bpg} = req.body;

    // Insert the stats into the DB
    const sql = 'UPDATE Players SET ppg = ?, apg = ?, rpg = ?, spg = ?, bpg = ? WHERE id = ?';
    db.run(sql, [ppg, apg, rpg, spg, bpg, id], (err) => {
        if (err) {
            console.error('Error inserting stats', err.message);
        } else {
            res.status(201).send('Stats Uploaded');
        }
    });
});

app.post('/playerstats/insert_stats', (req, res) => {
    const {playerID, gameID, points, assists, rebounds, steals, blocks} = req.body;

    const sql = 'INSERT INTO PlayerStats (playerID, gameID, points, assists, rebounds, steals, blocks) VALUES (?, ?, ?, ?, ?, ?, ?)'
    db.run(sql, [playerID, gameID, points, assists, rebounds, steals, blocks], (err) => {
        if (err) {
            console.error(err);
        } else {
            res.status(201).send('Player Stats Uploaded')
        }
    });
});



// GAME ENDPOINTS
// Endpoint to retrieve games
app.get('/games', (req,res) => {
    db.all('SELECT * FROM Games', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Endpoint to insert Hawks games
app.post('/games/insert_games', (req,res) => {
    const {opponent, location, hawksScore, oppScore, date, gameId} = req.body;

    // Insert the games into the DB
    const sql = 'INSERT INTO Games (opponent, location, hawksScore, oppScore, date, gameId) VALUES (?, ?, ?, ?, ?, ?)';
    db.run(sql, [opponent, location, hawksScore, oppScore, date, gameId], (err) => {
        if (err) {
            console.error('Error inserting games', err.message);
        } else {
            res.status(201).send('Games Uploaded');
        }
    });
});

// STANDINGS ENDPOINTS
// Endpoint to retrieve standings
app.get('/standings', (req,res) => {
    db.all('SELECT * FROM Standings', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Endpoint to insert eastern conference standings
app.post('/standings/insert_standings', (req,res) => {
    const {team, wins, losses, logo} = req.body;

    // Insert the standings into the DB
    const sql = 'INSERT INTO Standings (team, wins, losses, logo) VALUES (?, ?, ?, ?)';
    db.run(sql, [team, wins, losses, logo], (err) => {
        if (err) {
            console.error('Error inserting standings', err.message);
        } else {
            res.status(201).send('Standings Uploaded');
        }
    });
});

// 
