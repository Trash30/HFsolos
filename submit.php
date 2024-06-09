<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $pseudo = $_POST['pseudo'];
    $stage = $_POST['stage'];
    $timestamp = date('Y-m-d H:i:s');

    $participant = array(
        'pseudo' => $pseudo,
        'stage' => $stage,
        'timestamp' => $timestamp
    );

    $file = 'participants.json';
    if (file_exists($file)) {
        $current_data = file_get_contents($file);
        $array_data = json_decode($current_data, true);
        $array_data[] = $participant;
        $final_data = json_encode($array_data, JSON_PRETTY_PRINT);
    } else {
        $array_data[] = $participant;
        $final_data = json_encode($array_data, JSON_PRETTY_PRINT);
    }

    if (file_put_contents($file, $final_data)) {
        echo 'Inscription réussie';
    } else {
        echo 'Erreur lors de l\'inscription';
    }
}
?>
