document.addEventListener('DOMContentLoaded', (event) => {
    loadParticipants();

    document.getElementById('registrationForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const pseudo = document.getElementById('pseudo').value;
        const stage = document.getElementById('stage').value;

        if (pseudo && stage) {
            const timestamp = new Date().toLocaleString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

            const participant = {
                pseudo: pseudo,
                stage: stage,
                timestamp: timestamp
            };

            saveParticipant(participant);
        }
    });
});

function saveParticipant(participant) {
    fetch('http://localhost:3000/participants', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(participant)
    })
    .then(response => response.json())
    .then(data => {
        addParticipantToDOM(data);
    })
    .catch(error => console.error('Erreur:', error));
}

function loadParticipants() {
    fetch('http://localhost:3000/participants')
    .then(response => response.json())
    .then(data => {
        data.forEach(participant => {
            addParticipantToDOM(participant);
        });
    })
    .catch(error => console.error('Erreur:', error));
}

function addParticipantToDOM(participant) {
    const participantDiv = document.createElement('div');
    participantDiv.className = 'participant';
    participantDiv.textContent = `${participant.timestamp} - ${participant.pseudo} va à la scène ${participant.stage}`;
    document.getElementById('participants').appendChild(participantDiv);
}
document.addEventListener('DOMContentLoaded', (event) => {
    loadParticipants();
});

function loadParticipants() {
    fetch('participants.php')
    .then(response => response.text())
    .then(data => {
        document.getElementById('participants').innerHTML = data;
    })
    .catch(error => console.error('Erreur:', error));
}
