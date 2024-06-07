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
            addParticipantToDOM(participant);

            document.getElementById('registrationForm').reset();
        }
    });
});

function saveParticipant(participant) {
    let participants = JSON.parse(localStorage.getItem('participants')) || [];
    participants.push(participant);
    localStorage.setItem('participants', JSON.stringify(participants));
}

function loadParticipants() {
    let participants = JSON.parse(localStorage.getItem('participants')) || [];
    participants.forEach(participant => {
        addParticipantToDOM(participant);
    });
}

function addParticipantToDOM(participant) {
    const participantDiv = document.createElement('div');
    participantDiv.className = 'participant';
    participantDiv.textContent = `${participant.timestamp} - ${participant.pseudo} va à la scène ${participant.stage}`;
    document.getElementById('participants').appendChild(participantDiv);
}
