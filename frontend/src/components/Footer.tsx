import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
        color: '#fff',
        padding: '50px 0 20px',
        marginTop: '60px',
      }}
    >
      <div className="container">
        <div className="row g-4 mb-4">
          {/* Brand */}
          <div className="col-md-4">
            <h4 className="fw-bold mb-3">🌿 GreenIQ</h4>
            <p style={{ opacity: 0.8, lineHeight: '1.7' }}>
              Empowering farmers with AI-driven insights, crop management tools, and a vibrant marketplace. 
              Built by a farmer's son who understands the soil and the struggle.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled" style={{ lineHeight: '2.2' }}>
              {[
                { name: '🏠 Home', href: '/' },
                { name: '🌾 Farming Techniques', href: '/farming-techniques' },
                { name: '🌍 Soil Information', href: '/soil-information' },
                { name: '🛒 Marketplace', href: '/marketplace' },
                { name: '🔬 Image Analysis', href: '/image-analysis' },
                { name: '⭐ Features', href: '/features' },
              ].map((link, i) => (
                <li key={i}>
                  <a href={link.href} style={{ color: '#a8e6cf', textDecoration: 'none' }}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">Connect With Us</h5>
            <div className="d-flex gap-3 mb-4">
              <a
                href="https://www.instagram.com/the_jha_keshav2404"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '45px', height: '45px', borderRadius: '50%',
                  background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: '20px', textDecoration: 'none',
                  transition: 'transform 0.2s',
                }}
                title="Instagram"
              >
                📸
              </a>
              <a
                href="https://x.com/jha_ji24"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '45px', height: '45px', borderRadius: '50%',
                  background: '#000',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: '20px', textDecoration: 'none',
                  transition: 'transform 0.2s',
                }}
                title="X (Twitter)"
              >
                𝕏
              </a>
              <a
                href="https://github.com/shreshav2404-code"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '45px', height: '45px', borderRadius: '50%',
                  background: '#333',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: '20px', textDecoration: 'none',
                  transition: 'transform 0.2s',
                }}
                title="GitHub"
              >
                💻
              </a>
              <a
                href="https://www.linkedin.com/in/keshav-kumar-16060337b/"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '45px', height: '45px', borderRadius: '50%',
                  background: '#0A66C2',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: '20px', textDecoration: 'none',
                  transition: 'transform 0.2s',
                }}
                title="LinkedIn"
              >
                in
              </a>
            </div>
            <p style={{ opacity: 0.7, fontSize: '14px' }}>
              📧 support@smartagro.com<br />
              🌐 greeniqkeshav.vercel.app
            </p>
          </div>
        </div>

        <hr style={{ borderColor: 'rgba(255,255,255,0.15)' }} />

        {/* Bottom */}
        <div className="text-center pt-3">
          <p className="mb-2" style={{ fontSize: '18px' }}>
            Made with ❤️ by <strong>Keshav Jha</strong>, a farmer's son to other farmers
          </p>
          <p className="mb-0" style={{ opacity: 0.5, fontSize: '14px' }}>
            © {new Date().getFullYear()} GreenIQ. Empowering Farmers with AI.
          </p>
        </div>
      </div>
    </footer>
  );
};
