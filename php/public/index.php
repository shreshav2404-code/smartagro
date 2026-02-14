<?php
declare(strict_types=1);

use SmartAgro\Php\Src\DataHandler;

require_once dirname(__DIR__) . '/config.php';
require_once dirname(__DIR__) . '/src/DataHandler.php';

header('Content-Type: application/json; charset=utf-8');
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin && in_array($origin, Config::allowedOrigins(), true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type, X-API-Key');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$apiKey = $_SERVER['HTTP_X_API_KEY'] ?? ($_GET['api_key'] ?? '');
if (!hash_equals(Config::apiKey(), $apiKey)) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

try {
    $handler = new DataHandler(Config::storagePath(), Config::schemaPath());
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $id = isset($_GET['id']) ? (string)$_GET['id'] : '';
        if ($id !== '') {
            $result = $handler->getById($id);
            if ($result === null) {
                http_response_code(404);
                echo json_encode(['error' => 'Not found']);
            } else {
                echo json_encode(['success' => true, 'record' => $result]);
            }
            exit;
        }
        echo json_encode(['success' => true, 'records' => $handler->getAll()]);
        exit;
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $body = file_get_contents('php://input') ?: '';
        $data = json_decode($body, true);
        if (!is_array($data)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON']);
            exit;
        }
        $record = $handler->upsert($data);
        echo json_encode(['success' => true, 'record' => $record]);
        exit;
    }

    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error']);
}