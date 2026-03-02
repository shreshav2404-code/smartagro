import React from 'react';
import { BsInstagram, BsTwitterX, BsGithub, BsLinkedin, BsHeartFill, BsHouseDoor, BsGearFill, BsGlobe, BsShop, BsSearch, BsStar, BsEnvelope, BsTree } from 'react-icons/bs';

export const Footer: React.FC = () => {
  const socialStyle = (bg: string) => ({
    width: '45px', height: '45px', borderRadius: '50%', background: bg,
    display: 'flex' as const, alignItems: 'center' as const, justifyContent: 'center' as const,
    color: '#fff', fontSize: '18px', textDecoration: 'none',
  });

  return (
    <footer style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)', color: '#fff', padding: '50px 0 20px', marginTop: '60px' }}>
      <div className="container">
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <h4 className="fw-bold mb-3"><BsTree className="text-success me-2" />GreenIQ</h4>
            <p style={{ opacity: 0.8, lineHeight: '1.7' }}>
              Empowering farmers with AI-driven insights, crop management tools, and a vibrant marketplace.
              Built by a farmer's son who understands the soil and the struggle.
            </p>
          </div>
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>
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
                  <a href={link.href} style={{ color: '#a8e6cf', textDecoration: 'none' }}>
                    <link.Icon className="me-2" />{link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">Connect With Us</h5>
            <div className="d-flex gap-3 mb-4">
              <a href="https://www.instagram.com/the_jha_keshav2404" target="_blank" rel="noreferrer"
                style={socialStyle('linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)')} title="Instagram">
                <BsInstagram />
              </a>
              <a href="https://x.com/jha_ji24" target="_blank" rel="noreferrer" style={socialStyle('#000')} title="X (Twitter)">
                <BsTwitterX />
              </a>
              <a href="https://github.com/shreshav2404-code" target="_blank" rel="noreferrer" style={socialStyle('#333')} title="GitHub">
                <BsGithub />
              </a>
              <a href="https://www.linkedin.com/in/keshav-kumar-16060337b/" target="_blank" rel="noreferrer" style={socialStyle('#0A66C2')} title="LinkedIn">
                <BsLinkedin />
              </a>
            </div>
            <p style={{ opacity: 0.7, fontSize: '14px' }}>
              <BsEnvelope className="me-2" />support@smartagro.com<br />
              <BsGlobe className="me-2" />greeniqkeshav.vercel.app
            </p>
          </div>
        </div>
        <hr style={{ borderColor: 'rgba(255,255,255,0.15)' }} />
        <div className="text-center pt-3">
          <p className="mb-2" style={{ fontSize: '18px' }}>
            Made with <BsHeartFill className="text-danger" /> by <strong>Keshav Jha</strong>, a farmer's son to other farmers
          </p>
          <p className="mb-0" style={{ opacity: 0.5, fontSize: '14px' }}>
            &copy; {new Date().getFullYear()} GreenIQ. Empowering Farmers with AI.
          </p>
        </div>
      </div>
    </footer>
  );
};
