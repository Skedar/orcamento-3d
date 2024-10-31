<?php
header('Content-Type: application/json');

$uploadDir = '../uploads/';
$uploadFile = $uploadDir . basename($_FILES['file']['name']);

if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadFile)) {
    echo json_encode([
        'success' => true,
        'url' => '/uploads/' . basename($_FILES['file']['name'])
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Falha no upload'
    ]);
}
?> 