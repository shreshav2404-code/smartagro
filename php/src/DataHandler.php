<?php
declare(strict_types=1);

namespace SmartAgro\Php\Src;

use DOMDocument;
use DOMXPath;
use Exception;

class DataHandler
{
    private string $xmlPath;
    private string $xsdPath;

    public function __construct(string $xmlPath, string $xsdPath)
    {
        $this->xmlPath = $xmlPath;
        $this->xsdPath = $xsdPath;
        if (!is_file($this->xmlPath)) {
            throw new Exception('XML storage file not found');
        }
        if (!is_file($this->xsdPath)) {
            throw new Exception('XML schema file not found');
        }
    }

    public function getAll(): array
    {
        $doc = $this->loadValidated();
        $xp = new DOMXPath($doc);
        $records = [];
        foreach ($xp->query('/records/record') as $node) {
            if ($node instanceof \DOMElement) {
                $records[] = [
                    'id' => $node->getAttribute('id'),
                    'name' => $this->textContent($xp, 'name', $node),
                    'description' => $this->textContent($xp, 'description', $node),
                    'created_at' => $this->textContent($xp, 'created_at', $node),
                ];
            }
        }
        return $records;
    }

    public function getById(string $id): ?array
    {
        $id = $this->sanitizeId($id);
        $doc = $this->loadValidated();
        $xp = new DOMXPath($doc);
        $node = $xp->query('/records/record[@id="' . $id . '"]')->item(0);
        if (!$node || !($node instanceof \DOMElement)) {
            return null;
        }
        return [
            'id' => $node->getAttribute('id'),
            'name' => $this->textContent($xp, 'name', $node),
            'description' => $this->textContent($xp, 'description', $node),
            'created_at' => $this->textContent($xp, 'created_at', $node),
        ];
    }

    public function upsert(array $input): array
    {
        $record = $this->validateRecord($input);
        $doc = $this->loadValidated();
        $xp = new DOMXPath($doc);
        $node = $xp->query('/records/record[@id="' . $record['id'] . '"]')->item(0);
        if (!$node) {
            $node = $doc->createElement('record');
            $node->setAttribute('id', $record['id']);
            $doc->documentElement->appendChild($node);
        }
        $this->setNode($doc, $node, 'name', $record['name']);
        $this->setNode($doc, $node, 'description', $record['description']);
        $this->setNode($doc, $node, 'created_at', $record['created_at']);
        $this->save($doc);
        return $record;
    }

    private function validateRecord(array $input): array
    {
        $id = isset($input['id']) ? $this->sanitizeId((string)$input['id']) : '';
        $name = isset($input['name']) ? $this->sanitizeText((string)$input['name'], 100) : '';
        $desc = isset($input['description']) ? $this->sanitizeText((string)$input['description'], 1000) : '';
        $created = isset($input['created_at']) ? (string)$input['created_at'] : '';
        if ($id === '' || $name === '' || $desc === '') {
            throw new Exception('Missing required fields');
        }
        if (!$this->isIso8601($created)) {
            $created = gmdate('c');
        }
        return [
            'id' => $id,
            'name' => $name,
            'description' => $desc,
            'created_at' => $created,
        ];
    }

    private function loadValidated(): DOMDocument
    {
        $doc = new DOMDocument();
        $xml = file_get_contents($this->xmlPath);
        $doc->loadXML($xml, LIBXML_NONET | LIBXML_NOERROR | LIBXML_NOWARNING);
        if (!$doc->schemaValidate($this->xsdPath)) {
            throw new Exception('XML failed schema validation');
        }
        return $doc;
    }

    private function save(DOMDocument $doc): void
    {
        $tmp = $doc->saveXML();
        $fh = fopen($this->xmlPath, 'c+');
        if (!$fh) {
            throw new Exception('Unable to open storage for writing');
        }
        if (!flock($fh, LOCK_EX)) {
            fclose($fh);
            throw new Exception('Unable to acquire lock');
        }
        ftruncate($fh, 0);
        fwrite($fh, $tmp);
        fflush($fh);
        flock($fh, LOCK_UN);
        fclose($fh);
    }

    private function textContent(DOMXPath $xp, string $name, \DOMElement $ctx): string
    {
        $n = $xp->query($name, $ctx)->item(0);
        return $n ? $n->textContent : '';
    }

    private function setNode(DOMDocument $doc, \DOMElement $parent, string $name, string $value): void
    {
        $node = null;
        foreach ($parent->childNodes as $child) {
            if ($child->nodeType === XML_ELEMENT_NODE && $child->nodeName === $name) {
                $node = $child;
                break;
            }
        }
        if (!$node) {
            $node = $doc->createElement($name);
            $parent->appendChild($node);
        }
        while ($node->firstChild) {
            $node->removeChild($node->firstChild);
        }
        $node->appendChild($doc->createTextNode($value));
    }

    private function sanitizeText(string $value, int $maxLen): string
    {
        // Trim and remove control characters while preserving UTF-8 content
        $value = trim($value);
        $value = preg_replace('/[\x00-\x1F\x7F]/u', '', $value) ?? '';
        if (strlen($value) > $maxLen) {
            $value = substr($value, 0, $maxLen);
        }
        return $value;
    }

    private function sanitizeId(string $id): string
    {
        $id = preg_replace('/[^a-zA-Z0-9_-]/', '', $id) ?? '';
        return substr($id, 0, 64);
    }

    private function isIso8601(string $value): bool
    {
        // Strict ISO 8601: YYYY-MM-DDThh:mm:ss(.fraction)?(Z|±hh:mm)
        return (bool)preg_match('/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/', $value);
    }
}