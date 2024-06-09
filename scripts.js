document.addEventListener('DOMContentLoaded', (event) => {
    loadParticipants();
    document.getElementById('registrationForm').addEventListener('submit', submitForm);
});

const scriptUrl = "https://script.google.com/macros/s/AKfycbxNlbrnzj5bLpq-DJN49mWEsRDyKsg56vM7Vkvtbt6T93gk4s8m97e097vA6SWQJ6_uwg/exec"; // Remplacez par l'URL de votre script Google Apps

function submitForm(e) {
    e.preventDefault();

    let pseudo = document.getElementById('pseudo').value;
    let stage = document.getElementById('stage').value;

    fetch(scriptUrl, {
        method: 'POST',
        body: JSON.stringify({pseudo: pseudo, stage: stage}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.result === 'success') {
            loadParticipants();
        } else {
            console.error('Erreur lors de l\'inscription:', data);
        }
    })
    .catch(error => console.error('Erreur:', error));
}

function loadParticipants() {
    fetch(scriptUrl)
    .then(response => response.json())
    .then(data => {
        let participantsDiv = document.getElementById('participants');
        participantsDiv.innerHTML = '';
        data.forEach(participant => {
            participantsDiv.innerHTML += `<div class="participant">${participant.timestamp} - ${participant.pseudo} va à la scène ${participant.stage}</div>`;
        });
    })
    .catch(error => console.error('Erreur:', error));
}
