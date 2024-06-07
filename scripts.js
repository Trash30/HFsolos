document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const pseudo = document.getElementById('pseudo').value;
    const stage = document.getElementById('stage').value;

    if (pseudo && stage) {
        const participant = document.createElement('div');
        participant.className = 'participant';

        const timestamp = new Date().toLocaleString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        participant.textContent = `${timestamp} - ${pseudo} va à la scène ${stage}`;

        document.getElementById('participants').appendChild(participant);

        document.getElementById('registrationForm').reset();
    }
});
