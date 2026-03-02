import React, { useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { BsCloudArrowUp, BsChatLeftText, BsSearch, BsTrash, BsExclamationTriangle, BsClipboardData, BsVirus, BsBug, BsDropletHalf } from 'react-icons/bs';
import { FaMicroscope } from 'react-icons/fa';

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
    if (file) { setImage(file); setPreview(URL.createObjectURL(file)); setResult(null); setError(null); }
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) { setImage(file); setPreview(URL.createObjectURL(file)); setResult(null); setError(null); }
  };
  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const formData = new FormData();
      formData.append('image', image);
      if (message.trim()) formData.append('message', message.trim());
      const res = await fetch(`${API_BASE}/api/ai_assistant_image/`, { method: 'POST', body: formData });
      const data = await res.json();
      if (data.reply) setResult(data.reply);
      else if (data.error) setError(data.error);
      else setError('Unexpected response from server');
    } catch { setError('Failed to analyze image. Please try again.'); }
    finally { setLoading(false); }
  };
  const handleClear = () => {
    setImage(null); setPreview(null); setResult(null); setError(null); setMessage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg" style={{ borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{ background: 'linear-gradient(135deg, #5a9e6f, #7bb88a)', color: '#fff', padding: '30px', textAlign: 'center' }}>
              <h2 className="mb-2"><FaMicroscope className="me-2" />{t('image_analysis') || 'Crop Image Analysis'}</h2>
              <p className="mb-0" style={{ opacity: 0.9 }}>Upload a photo of your crop or plant for AI-powered health analysis</p>
            </div>
            <div className="card-body p-4">
              <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} onClick={() => fileInputRef.current?.click()}
                style={{
                  border: '3px dashed var(--border-color, #ccc)', borderRadius: '12px', padding: '40px 20px',
                  textAlign: 'center', cursor: 'pointer', background: preview ? 'transparent' : 'var(--card-bg, #fafafa)',
                  position: 'relative', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                }}>
                {preview ? (
                  <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px', objectFit: 'contain' }} />
                ) : (
                  <>
                    <BsCloudArrowUp style={{ fontSize: '48px', color: '#7bb88a' }} />
                    <h5 className="mt-3">Drag & drop your crop image here</h5>
                    <p className="text-muted">or click to browse files</p>
                    <p className="text-muted small">Supports: JPG, PNG, WEBP</p>
                  </>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
              </div>
              {image && (
                <div className="mt-3">
                  <label className="form-label fw-bold"><BsChatLeftText className="me-2" />Describe your concern (optional)</label>
                  <input type="text" className="form-control" placeholder="e.g., Yellow spots on leaves, wilting stems..."
                    value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>
              )}
              {image && (
                <div className="d-flex gap-3 mt-4">
                  <button className="btn btn-success btn-lg flex-grow-1" onClick={handleAnalyze} disabled={loading}
                    style={{ background: 'linear-gradient(135deg, #5a9e6f, #7bb88a)', border: 'none', borderRadius: '10px' }}>
                    {loading ? (<><span className="spinner-border spinner-border-sm me-2"></span>Analyzing...</>)
                      : (<><BsSearch className="me-2" />Analyze Crop</>)}
                  </button>
                  <button className="btn btn-outline-secondary btn-lg" onClick={handleClear} style={{ borderRadius: '10px' }}>
                    <BsTrash className="me-1" />Clear
                  </button>
                </div>
              )}
              {error && (
                <div className="alert alert-danger mt-4" style={{ borderRadius: '10px' }}>
                  <BsExclamationTriangle className="me-2" />{error}
                </div>
              )}
              {result && (
                <div className="mt-4">
                  <h4 className="mb-3"><BsClipboardData className="me-2" />Analysis Results</h4>
                  <div className="card" style={{ borderRadius: '12px', borderLeft: '5px solid #7bb88a', background: 'var(--card-bg, #f8f9fa)' }}>
                    <div className="card-body">
                      <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7' }}>{result}</div>
                    </div>
                  </div>
                </div>
              )}
              <div className="row mt-5 g-3">
                {[
                  { Icon: BsVirus, title: 'Disease Detection', desc: 'Identify plant diseases from leaf patterns' },
                  { Icon: BsBug, title: 'Pest Identification', desc: 'Detect pest damage and suggest treatments' },
                  { Icon: BsDropletHalf, title: 'Nutrient Analysis', desc: 'Assess nutrient deficiencies visually' },
                ].map((item, i) => (
                  <div key={i} className="col-md-4">
                    <div className="card h-100 text-center p-3" style={{ borderRadius: '12px' }}>
                      <item.Icon style={{ fontSize: '32px', color: '#5a9e6f', margin: '0 auto' }} />
                      <h6 className="mt-2">{item.title}</h6>
                      <p className="small text-muted mb-0">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
