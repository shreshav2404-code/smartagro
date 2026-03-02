import React from 'react';
import { BsInstagram, BsTwitterX, BsGithub, BsLinkedin, BsHeartFill, BsHouseDoor, BsGearFill, BsGlobe, BsShop, BsSearch, BsStar, BsEnvelope, BsTree } from 'react-icons/bs';

export const Footer: React.FC = () => {
  const socialStyle = (bg: string) => ({
    width: '42px', height: '42px', borderRadius: '50%', background: bg,
    display: 'flex' as const, alignItems: 'center' as const, justifyContent: 'center' as const,
    color: '#fff', fontSize: '16px', textDecoration: 'none',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  });

  return (
    <footer style={{ background: 'linear-gradient(135deg, #2d3748, #4a5568)', color: '#e2e8f0', padding: '48px 0 20px', marginTop: '60px' }}>
      <div className="container">
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <h4 className="fw-bold mb-3" style={{ color: '#fff' }}><BsTree className="me-2" style={{ color: '#7bb88a' }} />GreenIQ</h4>
            <p style={{ opacity: 0.75, lineHeight: '1.7', fontSize: '14px' }}>
              Empowering farmers with AI-driven insights, crop management tools, and a vibrant marketplace.
              Built by a farmer's son who understands the soil and the struggle.
            </p>
          </div>
          <div className="col-md-4">
            <h5 className="fw-bold mb-3" style={{ color: '#fff' }}>Quick Links</h5>
            <ul className="list-unstyled" style={{ lineHeight: '2.2' }}>
              {[
                { name: 'Home', href: '/', Icon: BsHouseDoor },
                { name: 'Farming Techniques', href: '/farming-techniques', Icon: BsGearFill },
                { name: 'Soil Information', href: '/soil-information', Icon: BsGlobe },
                { name: 'Marketplace', href: '/marketplace', Icon: BsShop },
                { name: 'Image Analysis', href: '/image-analysis', Icon: BsSearch },
                { name: 'Features', href: '/features', Icon: BsStar },
              ].map((link, i) => (
                <li key={i}>
                  <a href={link.href} style={{ color: '#a8d5b8', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#a8d5b8'; }}>
                    <link.Icon className="me-2" />{link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="fw-bold mb-3" style={{ color: '#fff' }}>Connect With Us</h5>
            <div className="d-flex gap-3 mb-4">
              <a href="https://www.instagram.com/the_jha_keshav2404" target="_blank" rel="noreferrer"
                style={socialStyle('#c47a7a')} title="Instagram"><BsInstagram /></a>
              <a href="https://x.com/jha_ji24" target="_blank" rel="noreferrer"
                style={socialStyle('#5a6a7a')} title="X (Twitter)"><BsTwitterX /></a>
              <a href="https://github.com/shreshav2404-code" target="_blank" rel="noreferrer"
                style={socialStyle('#6b7c8d')} title="GitHub"><BsGithub /></a>
              <a href="https://www.linkedin.com/in/keshav-kumar-16060337b/" target="_blank" rel="noreferrer"
                style={socialStyle('#6b9ec2')} title="LinkedIn"><BsLinkedin /></a>
            </div>
            <p style={{ opacity: 0.6, fontSize: '13px' }}>
              <BsGlobe className="me-2" />greeniqkeshav.vercel.app
            </p>
          </div>
        </div>
        <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        <div className="text-center pt-3">
          <p className="mb-2" style={{ fontSize: '16px', color: '#e2e8f0' }}>
            Made with <BsHeartFill style={{ color: '#c47a7a' }} /> by <strong>Keshav Jha</strong>, a farmer's son to other farmers
          </p>
          <p className="mb-0" style={{ opacity: 0.4, fontSize: '13px' }}>
            &copy; {new Date().getFullYear()} GreenIQ. Empowering Farmers with AI.
          </p>
        </div>
      </div>
    </footer>
  );
};
