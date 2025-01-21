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

// Endpoint to update player averages
app.post('/player/update_averages', (req,res) => {
    const {id, ppg, apg, rpg, spg, bpg, offrpg, defrpg, mpg, fgmA, fgaA, fgp, ftmA, ftaA, ftp, tpmA, tpaA, tpp, foulspg, topg} = req.body;

    // Insert the stats into the DB
    const sql = 'UPDATE Players SET ppg = ?, apg = ?, rpg = ?, spg = ?, bpg = ?, offrpg = ?, defrpg = ?, mpg = ?, fgmA = ?, fgaA = ?, fgp = ?, ftmA = ?, ftaA = ?, ftp = ?, tpmA = ?, tpaA = ?, tpp = ?, foulspg = ?, topg = ? WHERE id = ?';
    db.run(sql, [ppg, apg, rpg, spg, bpg, offrpg, defrpg, mpg, fgmA, fgaA, fgp, ftmA, ftaA, ftp, tpmA, tpaA, tpp, foulspg, topg, id], (err) => {
        if (err) {
            console.error('Error inserting stats', err.message);
        } else {
            res.status(201).send('Stats Uploaded');
        }
    });
});

// Endpoint to update player stat totals
app.post('/player/update_totals', (req,res) => {
    const {id, totPoints, totAssists, totRebounds, totSteals, totBlocks, gamesPlayed, totMins, totOffReb, totDefReb, fgm, fga, ftm, fta, tpm, tpa, totFouls, totTOs, plusminus} = req.body;

    // Insert the stats into the DB
    const sql = 'UPDATE Players SET totPoints = ?, totAssists = ?, totRebounds = ?, totSteals = ?, totBlocks = ?, gamesPlayed = ?, totMins = ?, totOffReb = ?, totDefReb = ?, fgm = ?, fga = ?, ftm = ?, fta = ?, tpm = ?, tpa = ?, totFouls = ?, totTOs = ?, plusminus = ? WHERE id = ?';
    db.run(sql, [totPoints, totAssists, totRebounds, totSteals, totBlocks, gamesPlayed, totMins, totOffReb, totDefReb, fgm, fga, ftm, fta, tpm, tpa, totFouls, totTOs, plusminus, id], (err) => {
        if (err) {
            console.error('Error inserting stats', err.message);
        } else {
            res.status(201).send('Stats Uploaded');
        }
    });
});

//Endpoint to insert player stats from each game into the PLayerGameStats table
app.post('/player/insert_stats', (req, res) => {
    const {playerID, gameID, mins, points, assists, offReb, defReb, rebounds, steals, blocks, fgm, fga, fgp, ftm, fta, ftp, tpm, tpa, tpp, fouls, turnovers, plusMinus} = req.body;

    const sql = 'INSERT INTO PlayerGameStats (playerID, gameID, mins, points, assists, offReb, defReb, rebounds, steals, blocks, fgm, fga, fgp, ftm, fta, ftp, tpm, tpa, tpp, fouls, turnovers, plusMinus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    db.run(sql, [playerID, gameID, mins, points, assists, offReb, defReb, rebounds, steals, blocks, fgm, fga, fgp, ftm, fta, ftp, tpm, tpa, tpp, fouls, turnovers, plusMinus], (err) => {
        if (err) {
            console.error(err.message);
        } else {
            res.status(201).send('Player Stats Uploaded')
        }
    });
});

app.get('/player/gamestats', (req, res) => {
    const {id} = req.query;
    if (!id) {
        return res.status(400).json({ error: "id is required"});
    }
    db.all('SELECT * FROM PlayerGameStats WHERE playerID = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).json({"error in ID": err.message })
        } else {
            res.json(rows);
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
    const {opponent, location, hawksScore, oppScore, date, time, gameId} = req.body;

    // Insert the games into the DB
    const sql = 'INSERT INTO Games (opponent, location, hawksScore, oppScore, date, time, gameId) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.run(sql, [opponent, location, hawksScore, oppScore, date, time, gameId], (err) => {
        if (err) {
            console.error('Error inserting games', err.message);
        } else {
            res.status(201).send('Games Uploaded');
        }
    });
});

// Endpoint to update games
app.post('/games/update_games', (req,res) => {
    const {hawksScore, oppScore, gameId} = req.body;
    console.log(req.body)
    // Insert the stats into the DB
    const sql = 'UPDATE Games SET hawksScore = ?, oppScore = ? WHERE gameId = ?';
    db.run(sql, [hawksScore, oppScore, gameId], (err) => {
        if (err) {
            console.error('Error inserting stats', err.message);
        } else {
            res.status(201).send('Stats Uploaded');
            console.log("shoulda worked")
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

// Endpoint to insert eastern conference standings
app.post('/standings/update_standings', (req,res) => {
    const {wins, losses, team} = req.body;

    // Insert the standings into the DB
    const sql = 'UPDATE Standings SET wins = ?, losses = ? WHERE team = ?';
    db.run(sql, [wins, losses, team], (err) => {
        if (err) {
            console.error('Error updating standings', err.message);
        } else {
            res.status(201).send('Standings Uploaded');
        }
    });
});

// 
