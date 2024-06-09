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
