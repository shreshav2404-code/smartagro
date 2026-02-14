<?php
declare(strict_types=1);

class Config
{
    public static function storagePath(): string
    {
        return __DIR__ . '/storage/data.xml';
    }

    public static function schemaPath(): string
    {
        return __DIR__ . '/schema/data.xsd';
    }

    public static function apiKey(): string
    {
        $envKey = getenv('SMARTAGRO_PHP_API_KEY');
        if ($envKey && is_string($envKey) && $envKey !== '') {
            return $envKey;
        }
        $envFile = dirname(__DIR__) . '/backend/.env';
        if (is_file($envFile)) {
            $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                if (str_starts_with($line, 'SMARTAGRO_PHP_API_KEY=')) {
                    return trim(substr($line, strlen('SMARTAGRO_PHP_API_KEY=')));
                }
            }
        }
        return 'change-me';
    }

    public static function allowedOrigins(): array
    {
        return [
            'http://127.0.0.1:8000',
            'http://localhost:8000',
        ];
    }
}