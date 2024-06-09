<?php
$file = 'participants.json';
if (file_exists($file)) {
    $current_data = file_get_contents($file);
    $array_data = json_decode($current_data, true);
    foreach ($array_data as $participant) {
        echo '<div class="participant">';
        echo htmlspecialchars($participant['timestamp']) . ' - ' . htmlspecialchars($participant['pseudo']) . ' va à la scène ' . htmlspecialchars($participant['stage']);
        echo '</div>';
    }
} else {
    echo 'Aucun participant inscrit pour le moment.';
}
?>
