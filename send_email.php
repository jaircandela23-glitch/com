<?php
// **********************************************
// CONFIGURACIÓN (¡Verificada!)
// **********************************************
$to_email = "jair.candela23@hotmail.com"; 
$domain_name = "servicio-creativo.net";  

// Verificar que se haya enviado el formulario por POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 1. Recoger los datos usando los nombres de campo de tu HTML
    $service_interest = filter_input(INPUT_POST, 'Servicio_Interes', FILTER_SANITIZE_STRING);
    $email_replyto    = filter_input(INPUT_POST, '_replyto', FILTER_SANITIZE_EMAIL);
    $phone            = filter_input(INPUT_POST, 'Telefono', FILTER_SANITIZE_STRING);
    $description      = filter_input(INPUT_POST, 'Descripcion_Problema', FILTER_SANITIZE_STRING);

    // 2. Validaciones básicas
    if (empty($email_replyto) || empty($description)) {
        header("Location: index.html?status=error&code=missing_fields");
        exit;
    }

    // 3. Configurar el Email (Cabeceras)
    $subject = "Nueva Solicitud: " . htmlspecialchars($service_interest);
    // El email de 'From' debe ser de tu dominio (aunque sea no-reply) para que no falle.
    $headers = "From: Webmaster <no-reply@" . $domain_name . ">\r\n";
    // Al responder, el correo va directo al cliente.
    $headers .= "Reply-To: " . $email_replyto . "\r\n"; 
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // 4. Construir el cuerpo del mensaje HTML
    $email_body = "<html><body>";
    $email_body .= "<h2>Detalles de la Nueva Solicitud:</h2>";
    $email_body .= "<p><strong>Servicio de Interés:</strong> " . htmlspecialchars($service_interest) . "</p>";
    $email_body .= "<p><strong>Email de Contacto:</strong> <a href=\"mailto:" . htmlspecialchars($email_replyto) . "\">" . htmlspecialchars($email_replyto) . "</a></p>";
    $email_body .= "<p><strong>Teléfono:</strong> " . htmlspecialchars($phone) . "</p>";
    $email_body .= "<hr>";
    $email_body .= "<p><strong>Descripción del Problema/Proyecto:</strong></p><p style='white-space: pre-wrap;'>" . nl2br(htmlspecialchars($description)) . "</p>";
    $email_body .= "</body></html>";

    // 5. Enviar el email y redirigir
    if (mail($to_email, $subject, $email_body, $headers)) {
        header("Location: index.html?status=success");
        exit;
    } else {
        header("Location: index.html?status=error&code=mail_fail");
        exit;
    }
} else {
    header("Location: index.html");
    exit;
}
?>
