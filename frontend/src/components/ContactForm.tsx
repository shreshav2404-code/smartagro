import React, { useState } from 'react';

const WEB3FORMS_KEY = 'a2662afb-f8c3-4bb7-b27f-b8c532568e00';

export const ContactForm: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          ...form,
          from_name: 'SmartAgro Contact Form',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="my-5 py-5" id="contact">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-lg" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <div className="row g-0">
                {/* Left Info Panel */}
                <div
                  className="col-md-5 d-flex flex-column justify-content-center text-white p-4 p-md-5"
                  style={{ background: 'linear-gradient(135deg, #1b5e20, #4caf50)' }}
                >
                  <h2 className="fw-bold mb-3">📬 Get In Touch</h2>
                  <p style={{ opacity: 0.9 }}>
                    Have questions about farming, need help with the platform, or want to collaborate? We'd love to hear from you!
                  </p>
                  <hr style={{ borderColor: 'rgba(255,255,255,0.3)' }} />
                  <div className="mt-3">
                    <div className="mb-3">
                      <span style={{ fontSize: '20px' }}>📧</span>
                      <span className="ms-2">support@smartagro.com</span>
                    </div>
                    <div className="mb-3">
                      <span style={{ fontSize: '20px' }}>📍</span>
                      <span className="ms-2">India</span>
                    </div>
                    <div className="mb-3">
                      <span style={{ fontSize: '20px' }}>⏰</span>
                      <span className="ms-2">Mon-Sat, 9AM-6PM IST</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span style={{ fontSize: '24px', marginRight: '15px', cursor: 'pointer' }}>🌐</span>
                    <span style={{ fontSize: '24px', marginRight: '15px', cursor: 'pointer' }}>📘</span>
                    <span style={{ fontSize: '24px', marginRight: '15px', cursor: 'pointer' }}>🐦</span>
                    <span style={{ fontSize: '24px', cursor: 'pointer' }}>📸</span>
                  </div>
                </div>

                {/* Right Form */}
                <div className="col-md-7 p-4 p-md-5">
                  <h3 className="fw-bold mb-1">Send us a Message</h3>
                  <p className="text-muted mb-4">We'll get back to you within 24 hours.</p>

                  {status === 'success' && (
                    <div className="alert alert-success" style={{ borderRadius: '10px' }}>
                      ✅ Message sent successfully! We'll get back to you soon.
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="alert alert-danger" style={{ borderRadius: '10px' }}>
                      ❌ Something went wrong. Please try again.
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Your Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="John Doe"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          required
                          style={{ borderRadius: '10px', padding: '12px' }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="john@example.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          required
                          style={{ borderRadius: '10px', padding: '12px' }}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">Subject</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="How can we help?"
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          required
                          style={{ borderRadius: '10px', padding: '12px' }}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">Message</label>
                        <textarea
                          className="form-control"
                          rows={5}
                          placeholder="Tell us more about your query..."
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          required
                          style={{ borderRadius: '10px', padding: '12px' }}
                        />
                      </div>
                      <div className="col-12">
                        <button
                          type="submit"
                          className="btn btn-success btn-lg w-100"
                          disabled={status === 'sending'}
                          style={{
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #2e7d32, #4caf50)',
                            border: 'none',
                            padding: '14px',
                            fontWeight: 'bold',
                          }}
                        >
                          {status === 'sending' ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              Sending...
                            </>
                          ) : (
                            '🚀 Send Message'
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
