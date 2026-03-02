import React, { useState } from 'react';
import { BsEnvelopePaper, BsEnvelope, BsGeoAlt, BsClock, BsCheckCircle, BsExclamationTriangle, BsSend } from 'react-icons/bs';

const WEB3FORMS_KEY = 'a2662afb-f8c3-4bb7-b27f-b8c532568e00';

export const ContactForm: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...form, from_name: 'SmartAgro Contact Form' }),
      });
      const data = await res.json();
      if (data.success) { setStatus('success'); setForm({ name: '', email: '', subject: '', message: '' }); setTimeout(() => setStatus('idle'), 5000); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <section className="my-5 py-5" id="contact">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow" style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <div className="row g-0">
                <div className="col-md-5 d-flex flex-column justify-content-center text-white p-4 p-md-5"
                  style={{ background: 'linear-gradient(135deg, #5a9e6f, #7bb88a, #a8d5b8)' }}>
                  <h2 className="fw-bold mb-3"><BsEnvelopePaper className="me-2" />Get In Touch</h2>
                  <p style={{ opacity: 0.9, fontSize: '15px' }}>Have questions about farming, need help with the platform, or want to collaborate?</p>
                  <hr style={{ borderColor: 'rgba(255,255,255,0.25)' }} />
                  <div className="mt-3" style={{ fontSize: '14px' }}>
                    <div className="mb-3"><BsGeoAlt className="me-2" />India</div>
                    <div className="mb-3"><BsClock className="me-2" />Mon-Sat, 9AM-6PM IST</div>
                  </div>
                </div>
                <div className="col-md-7 p-4 p-md-5">
                  <h3 className="fw-bold mb-1" style={{ color: '#3a3a3a' }}>Send us a Message</h3>
                  <p style={{ color: '#7a8a95' }} className="mb-4">We'll get back to you within 24 hours.</p>
                  {status === 'success' && (
                    <div className="alert" style={{ borderRadius: '10px', background: '#e8f5ec', color: '#5a9e6f', border: '1px solid #a8d5b8' }}>
                      <BsCheckCircle className="me-2" />Message sent successfully!
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="alert" style={{ borderRadius: '10px', background: '#fde8e8', color: '#c47a7a', border: '1px solid #e8b4b4' }}>
                      <BsExclamationTriangle className="me-2" />Something went wrong. Please try again.
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold" style={{ color: '#5a6a7a', fontSize: '14px' }}>Your Name</label>
                        <input type="text" className="form-control" placeholder="John Doe" value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })} required
                          style={{ borderRadius: '10px', padding: '11px', border: '1.5px solid #e0e0e0' }} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold" style={{ color: '#5a6a7a', fontSize: '14px' }}>Email Address</label>
                        <input type="email" className="form-control" placeholder="john@example.com" value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })} required
                          style={{ borderRadius: '10px', padding: '11px', border: '1.5px solid #e0e0e0' }} />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold" style={{ color: '#5a6a7a', fontSize: '14px' }}>Subject</label>
                        <input type="text" className="form-control" placeholder="How can we help?" value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })} required
                          style={{ borderRadius: '10px', padding: '11px', border: '1.5px solid #e0e0e0' }} />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold" style={{ color: '#5a6a7a', fontSize: '14px' }}>Message</label>
                        <textarea className="form-control" rows={5} placeholder="Tell us more..." value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })} required
                          style={{ borderRadius: '10px', padding: '11px', border: '1.5px solid #e0e0e0' }} />
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-lg w-100 btn-animate" disabled={status === 'sending'}
                          style={{
                            borderRadius: '12px', background: 'linear-gradient(135deg, #5a9e6f, #7bb88a)',
                            border: 'none', padding: '13px', fontWeight: '600', color: '#fff',
                            boxShadow: '0 3px 12px rgba(90, 158, 111, 0.25)',
                          }}>
                          {status === 'sending' ? (<><span className="spinner-border spinner-border-sm me-2"></span>Sending...</>)
                            : (<><BsSend className="me-2" />Send Message</>)}
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
