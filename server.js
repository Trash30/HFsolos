const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;
const DATA_FILE = 'participants.json';

app.use(bodyParser.json());
app.use(cors());

// Endpoint pour obtenir les participants
app.get('/participants', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) {
            return res.status(500).send('Erreur de lecture du fichier des participants');
        }
        res.send(JSON.parse(data));
    });
});

// Endpoint pour ajouter un participant
app.post('/participants', (req, res) => {
    const newParticipant = req.body;
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) {
            return res.status(500).send('Erreur de lecture du fichier des participants');
        }
        const participants = JSON.parse(data);
        participants.push(newParticipant);
        fs.writeFile(DATA_FILE, JSON.stringify(participants), (err) => {
            if (err) {
                return res.status(500).send('Erreur d\'écriture dans le fichier des participants');
            }
            res.send(newParticipant);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Initialisation du fichier JSON s'il n'existe pas
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}
