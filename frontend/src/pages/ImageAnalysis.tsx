import React, { useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const ImageAnalysis: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('image', image);
      if (message.trim()) {
        formData.append('message', message.trim());
      }

      const res = await fetch(`${API_BASE}/api/ai_assistant_image/`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.reply) {
        setResult(data.reply);
      } else if (data.error) {
        setError(data.error);
      } else {
        setError('Unexpected response from server');
      }
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
      console.error('Image analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setMessage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg" style={{ borderRadius: '16px', overflow: 'hidden' }}>
            {/* Header */}
            <div
              style={{
                background: 'linear-gradient(135deg, #2e7d32, #4caf50)',
                color: '#fff',
                padding: '30px',
                textAlign: 'center',
              }}
            >
              <h2 className="mb-2">🔬 {t('image_analysis') || 'Crop Image Analysis'}</h2>
              <p className="mb-0" style={{ opacity: 0.9 }}>
                Upload a photo of your crop or plant for AI-powered health analysis
              </p>
            </div>

            <div className="card-body p-4">
              {/* Upload Area */}
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: '3px dashed var(--border-color, #ccc)',
                  borderRadius: '12px',
                  padding: '40px 20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: preview ? 'transparent' : 'var(--card-bg, #fafafa)',
                  transition: 'border-color 0.3s',
                  position: 'relative',
                  minHeight: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '300px',
                      borderRadius: '8px',
                      objectFit: 'contain',
                    }}
                  />
                ) : (
                  <>
                    <div style={{ fontSize: '48px', marginBottom: '10px' }}>📷</div>
                    <h5>Drag & drop your crop image here</h5>
                    <p className="text-muted">or click to browse files</p>
                    <p className="text-muted small">Supports: JPG, PNG, WEBP</p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </div>

              {/* Optional message */}
              {image && (
                <div className="mt-3">
                  <label className="form-label fw-bold">
                    💬 Describe your concern (optional)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Yellow spots on leaves, wilting stems..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              )}

              {/* Action Buttons */}
              {image && (
                <div className="d-flex gap-3 mt-4">
                  <button
                    className="btn btn-success btn-lg flex-grow-1"
                    onClick={handleAnalyze}
                    disabled={loading}
                    style={{
                      background: 'linear-gradient(135deg, #2e7d32, #4caf50)',
                      border: 'none',
                      borderRadius: '10px',
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Analyzing...
                      </>
                    ) : (
                      '🔍 Analyze Crop'
                    )}
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-lg"
                    onClick={handleClear}
                    style={{ borderRadius: '10px' }}
                  >
                    🗑️ Clear
                  </button>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="alert alert-danger mt-4" style={{ borderRadius: '10px' }}>
                  ⚠️ {error}
                </div>
              )}

              {/* Results */}
              {result && (
                <div className="mt-4">
                  <h4 className="mb-3">📋 Analysis Results</h4>
                  <div
                    className="card"
                    style={{
                      borderRadius: '12px',
                      borderLeft: '5px solid #4caf50',
                      background: 'var(--card-bg, #f8f9fa)',
                    }}
                  >
                    <div className="card-body">
                      <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7' }}>
                        {result}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Info Cards */}
              <div className="row mt-5 g-3">
                <div className="col-md-4">
                  <div className="card h-100 text-center p-3" style={{ borderRadius: '12px' }}>
                    <div style={{ fontSize: '32px' }}>🌿</div>
                    <h6 className="mt-2">Disease Detection</h6>
                    <p className="small text-muted mb-0">Identify plant diseases from leaf patterns</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100 text-center p-3" style={{ borderRadius: '12px' }}>
                    <div style={{ fontSize: '32px' }}>🐛</div>
                    <h6 className="mt-2">Pest Identification</h6>
                    <p className="small text-muted mb-0">Detect pest damage and suggest treatments</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100 text-center p-3" style={{ borderRadius: '12px' }}>
                    <div style={{ fontSize: '32px' }}>🧪</div>
                    <h6 className="mt-2">Nutrient Analysis</h6>
                    <p className="small text-muted mb-0">Assess nutrient deficiencies visually</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
