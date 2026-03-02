import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ImageAnalysis.css';

interface AnalysisResult {
  analysis: string;
  confidence?: number;
  timestamp: Date;
}

function ImageAnalysis({ user }: { user: any }) {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError('');
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL || 'https://smartagro-gyuc.onrender.com'}/api/ai_assistant_image/`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      setResult({
        analysis: data.analysis || data.reply || 'Analysis complete',
        confidence: data.confidence,
        timestamp: new Date(),
      });
    } catch (err: any) {
      setError(err.message || 'Failed to analyze image');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreview('');
    setResult(null);
    setError('');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="image-analysis-page">
      <header className="page-header">
        <h1>🌱 Image Analysis</h1>
        <p>Upload crop/soil images for AI-powered analysis</p>
      </header>

      <main className="analysis-content">
        <div className="upload-section">
          <h2>Upload Image</h2>
          
          <div className="file-input-wrapper">
            <input
              type="file"
              id="image-input"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={loading}
            />
            <label htmlFor="image-input" className="file-label">
              📸 Click to select image or drag & drop
            </label>
          </div>

          {preview && (
            <div className="preview-section">
              <h3>Preview</h3>
              <img src={preview} alt="Selected" className="preview-image" />
              <p className="file-name">{selectedFile?.name}</p>
            </div>
          )}

          {error && (
            <div className="error-message">
              ❌ {error}
            </div>
          )}

          <div className="button-group">
            <button
              onClick={handleAnalyze}
              disabled={!selectedFile || loading}
              className="analyze-btn"
            >
              {loading ? '⏳ Analyzing...' : '🔍 Analyze Image'}
            </button>
            {preview && (
              <button
                onClick={handleClear}
                disabled={loading}
                className="clear-btn"
              >
                ✕ Clear
              </button>
            )}
          </div>
        </div>

        {result && (
          <div className="results-section">
            <h2>Analysis Result</h2>
            <div className="result-card">
              <div className="result-text">
                <p>{result.analysis}</p>
              </div>
              {result.confidence && (
                <div className="confidence">
                  <span className="label">Confidence:</span>
                  <span className="value">
                    {(result.confidence * 100).toFixed(1)}%
                  </span>
                </div>
              )}
              <div className="timestamp">
                {result.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        )}

        <div className="info-section">
          <h3>What can be analyzed?</h3>
          <ul>
            <li>🌾 Crop health and diseases</li>
            <li>🦗 Pest detection</li>
            <li>🌱 Soil quality assessment</li>
            <li>🍃 Plant growth stage identification</li>
            <li>💧 Irrigation needs prediction</li>
            <li>⚠️ Nutrient deficiency detection</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default ImageAnalysis;
