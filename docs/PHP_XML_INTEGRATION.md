# PHP & XML Integration for SmartAgro

## Overview
- Purpose: Provide a secure, maintainable PHP module to process and store data in XML with schema validation.
- Fit: Lives alongside the existing Django backend as a separate module, useful for batch processing, interoperability, or external systems integration.

## Directory Structure
- `smartagro/php/`
  - `config.php`: Configuration (paths, API key, allowed origins).
  - `src/DataHandler.php`: Core library for XML load/validate/update.
  - `public/index.php`: HTTP endpoint for GET/POST requests.
  - `storage/data.xml`: XML data storage file.
  - `schema/data.xsd`: XSD schema for data validation.

## Data Model
- Root element: `records`.
- Child element: `record` with attributes and elements:
  - Attribute `id` (string, required).
  - Element `name` (string).
  - Element `description` (string).
  - Element `created_at` (`xs:dateTime`, ISO 8601).

## Data Flow
- Client sends JSON to `public/index.php` with `X-API-Key` header.
- `index.php` validates API key and CORS, decodes JSON, and calls `DataHandler::upsert()`.
- `DataHandler` loads `storage/data.xml`, validates with `schema/data.xsd`, updates or inserts the record, and writes back with file locking.
- Reads: `GET /?id=...` returns a single record; `GET /` lists all records.

## Configuration
- API key resolution order: environment `SMARTAGRO_PHP_API_KEY`, then `smartagro/backend/.env`.
- Allowed origins: `http://127.0.0.1:8000`, `http://localhost:8000`.
- Paths: derived from `config.php` for consistency.

## Security Measures
- API key required for all requests; validated using constant-time comparison.
- Input validation and sanitization for `id`, `name`, `description`; length limits applied.
- XML schema validation via XSD; external entities disabled via `LIBXML_NONET`.
- File locking on write to prevent concurrent corruption.
- JSON-only POST body to reduce parsing ambiguity.

## Error Handling
- Consistent JSON responses with HTTP codes: `401` unauthorized, `404` not found, `400` bad request, `500` server error, `405` method not allowed.
- Detailed error messages suppressed to clients; only minimal detail returned.

## Running Locally (PHP Built-in Server)
- Prerequisite: PHP 8.x installed.
- Command: `php -S 127.0.0.1:8081 -t smartagro/php/public`.
- Request examples:
  - Create/update: `POST http://127.0.0.1:8081` with header `X-API-Key: <key>` and JSON body `{ "id": "sample-2", "name": "Maize", "description": "Updated record" }`.
  - Read one: `GET http://127.0.0.1:8081?id=sample-2` with header `X-API-Key: <key>`.
  - Read all: `GET http://127.0.0.1:8081` with header `X-API-Key: <key>`.

## Integration Notes
- Django can interoperate by reading/writing `smartagro/php/storage/data.xml` if needed.
- Keep PHP module decoupled; avoid coupling it to Django runtime to maintain separation of concerns.
- Store secrets in environment or `.env`; do not commit real keys.

## Maintenance & Extension
- Add fields: update `data.xsd`, `DataHandler::validateRecord()`, and clients.
- Add endpoints: extend `public/index.php` with new routes (e.g., DELETE or PUT).
- Testing: create mocked JSON inputs and verify schema validation and responses.
- Backups: version `storage/data.xml` or export periodically.