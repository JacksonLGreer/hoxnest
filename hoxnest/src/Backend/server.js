const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
const PORT = process.env.PORT || 3001;
let db = new sqlite3.Database('./hoxDB.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log('Connected to the HOX Database');
});

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
