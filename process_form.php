<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Validation côté serveur
    if (!empty($name) && !empty($email) && !empty($message) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Envoyer l'email
        $to = "npuissesseau@gmail.com";
        $subject = "Nouveau message de contact de $name";
        $body = "Nom: $name\nEmail: $email\n\nMessage:\n$message";
        $headers = "From: webmaster@example.com";

        if (mail($to, $subject, $body, $headers)) {
            echo "Votre message a été envoyé avec succès.";
        } else {
            echo "Échec de l'envoi du message.";
        }
    } else {
        echo "Veuillez remplir correctement tous les champs.";
    }
} else {
    echo "Méthode de requête non supportée.";
}
?>
