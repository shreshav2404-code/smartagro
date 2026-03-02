import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const techniques = [
  {
    id: 'crop-rotation',
    icon: '🔄',
    title: 'Crop Rotation',
    subtitle: 'Alternate crops seasonally for healthier soil',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600',
    description: 'Crop rotation is the practice of growing different types of crops in the same area across seasons. It helps break pest and disease cycles, improves soil structure, and balances nutrient demands.',
    benefits: ['Reduces soil erosion by up to 50%', 'Breaks pest & disease cycles naturally', 'Improves soil fertility & organic matter', 'Reduces need for chemical fertilizers by 25-30%'],
    steps: ['Plan a 3-4 year rotation cycle', 'Alternate between legumes (nitrogen-fixing) and cereals', 'Include a cover crop season', 'Keep records of what was planted where'],
    crops: 'Rice → Wheat → Pulses → Mustard',
  },
  {
    id: 'drip-irrigation',
    icon: '💧',
    title: 'Drip Irrigation',
    subtitle: 'Save up to 60% water with precision watering',
    image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=600',
    description: 'Drip irrigation delivers water directly to plant roots through a network of pipes, valves, and emitters. It minimizes water wastage through evaporation and runoff, making it ideal for water-scarce regions.',
    benefits: ['Saves 30-60% water compared to flood irrigation', 'Increases crop yield by 20-90%', 'Reduces weed growth significantly', 'Allows fertigation (fertilizer through water)'],
    steps: ['Assess water source and pressure', 'Design layout based on crop spacing', 'Install mainline, sub-main, and lateral pipes', 'Place emitters at each plant base', 'Install filter and pressure regulator'],
    crops: 'Tomatoes, Grapes, Sugarcane, Vegetables, Orchards',
  },
  {
    id: 'organic-farming',
    icon: '🌿',
    title: 'Organic Farming',
    subtitle: 'Chemical-free farming for premium produce',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600',
    description: 'Organic farming avoids synthetic pesticides, fertilizers, and GMOs. It relies on natural processes, biodiversity, and cycles adapted to local conditions. India is the world\'s largest organic producer by number of farmers.',
    benefits: ['Premium prices — 20-40% higher than conventional', 'Healthier soil microbiome', 'No chemical residues in food', 'Government subsidies under PKVY & MOVCDNER schemes'],
    steps: ['Get soil tested for baseline health', 'Prepare compost and vermicompost', 'Use bio-fertilizers (Rhizobium, Azotobacter)', 'Implement IPM for pest control', 'Apply for organic certification (3-year transition)'],
    crops: 'Basmati Rice, Spices, Tea, Coffee, Pulses, Millets',
  },
  {
    id: 'precision-farming',
    icon: '📡',
    title: 'Precision Agriculture',
    subtitle: 'Use technology to farm smarter',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600',
    description: 'Precision agriculture uses GPS, sensors, drones, and data analytics to optimize field-level management. It helps apply the right input, at the right place, at the right time — maximizing efficiency and minimizing waste.',
    benefits: ['Reduces input costs by 15-20%', 'Increases yields through targeted intervention', 'Real-time crop health monitoring via NDVI', 'Data-driven decision making'],
    steps: ['Map your field with GPS boundaries', 'Install soil moisture & nutrient sensors', 'Use drone/satellite imagery for crop monitoring', 'Apply variable-rate fertilization', 'Track everything with farm management software'],
    crops: 'Wheat, Cotton, Soybean, Corn — large-scale farms',
  },
  {
    id: 'intercropping',
    icon: '🌾',
    title: 'Intercropping',
    subtitle: 'Grow multiple crops together for better yields',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600',
    description: 'Intercropping involves growing two or more crops simultaneously on the same field. Different crops complement each other by utilizing different soil layers, light levels, and nutrients — mimicking natural ecosystems.',
    benefits: ['25-30% higher land-use efficiency', 'Natural pest suppression', 'Risk diversification — if one crop fails, others survive', 'Better use of sunlight, water, and nutrients'],
    steps: ['Choose compatible crop combinations', 'Plan row arrangements (1:1, 1:2, or strip)', 'Ensure crops have different maturity periods', 'Manage spacing to avoid competition', 'Harvest shorter crop first'],
    crops: 'Maize + Soybean, Sugarcane + Wheat, Cotton + Groundnut',
  },
  {
    id: 'vermicomposting',
    icon: '🪱',
    title: 'Vermicomposting',
    subtitle: 'Turn waste into black gold fertilizer',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600',
    description: 'Vermicomposting uses earthworms (typically Eisenia fetida) to convert organic waste into nutrient-rich compost. The resulting vermicompost contains 5x more nitrogen, 7x more phosphorus, and 11x more potassium than regular soil.',
    benefits: ['Rich in NPK and beneficial microorganisms', 'Improves soil water-holding capacity by 40%', 'Costs ₹2-5/kg to produce, sells for ₹10-15/kg', 'Reduces farm waste to zero'],
    steps: ['Build a shaded vermicompost bed (10x4x2 ft)', 'Layer with cow dung and crop residue', 'Add 1-2 kg earthworms per bed', 'Maintain moisture at 60-70%', 'Harvest after 45-60 days'],
    crops: 'All crops — especially vegetables, fruits, and flowers',
  },
  {
    id: 'zero-tillage',
    icon: '🚜',
    title: 'Zero Tillage / No-Till Farming',
    subtitle: 'Plant directly without plowing the field',
    image: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c10?w=600',
    description: 'Zero tillage involves sowing seeds directly into unplowed soil from the previous harvest. It preserves soil structure, reduces erosion, saves fuel and labor, and is widely promoted in the Indo-Gangetic plains for wheat after rice.',
    benefits: ['Saves ₹2,000-3,000/acre in tillage costs', 'Reduces diesel use by 60-70 liters/hectare', 'Preserves soil organic carbon', 'Enables earlier sowing — 7-10 days saved'],
    steps: ['Harvest previous crop leaving stubble', 'Use zero-till seed drill for sowing', 'Apply pre-emergence herbicide', 'Manage residue with Happy Seeder if needed', 'Monitor for initial weed pressure'],
    crops: 'Wheat (after rice), Mustard, Chickpea, Lentil',
  },
  {
    id: 'hydroponics',
    icon: '🧪',
    title: 'Hydroponics',
    subtitle: 'Grow without soil using nutrient-rich water',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600',
    description: 'Hydroponics grows plants in nutrient-rich water solutions without soil. It allows year-round production in controlled environments, uses 90% less water than traditional farming, and is ideal for urban and peri-urban areas.',
    benefits: ['90% less water usage', 'Grows 2-3x faster than soil farming', 'No soil-borne diseases', 'Year-round production regardless of season'],
    steps: ['Choose a system (NFT, DWC, or Drip)', 'Set up grow trays with net pots', 'Prepare nutrient solution (EC 1.5-2.5)', 'Maintain pH between 5.5-6.5', 'Ensure 14-16 hours of light daily'],
    crops: 'Lettuce, Spinach, Herbs, Tomatoes, Strawberries',
  },
];

export const FarmingTechniques: React.FC = () => {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="container my-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">🌾 {t('farming_techniques') || 'Farming Techniques'}</h1>
        <p className="lead text-muted" style={{ maxWidth: '700px', margin: '0 auto' }}>
          Modern and traditional farming methods to maximize yield, conserve resources, and build sustainable agriculture.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="row g-3 mb-5">
        {[
          { icon: '📊', label: 'Techniques Covered', value: '8+' },
          { icon: '💰', label: 'Avg. Cost Savings', value: '20-40%' },
          { icon: '🌍', label: 'Water Savings', value: 'Up to 90%' },
          { icon: '📈', label: 'Yield Increase', value: '20-90%' },
        ].map((s, i) => (
          <div key={i} className="col-6 col-md-3">
            <div className="card text-center p-3 h-100" style={{ borderRadius: '12px' }}>
              <div style={{ fontSize: '28px' }}>{s.icon}</div>
              <h4 className="fw-bold mb-0" style={{ color: '#2e7d32' }}>{s.value}</h4>
              <small className="text-muted">{s.label}</small>
            </div>
          </div>
        ))}
      </div>

      {/* Technique Cards */}
      <div className="row g-4">
        {techniques.map((tech) => (
          <div key={tech.id} className="col-md-6">
            <div
              className="card h-100 shadow-sm"
              style={{ borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s' }}
              onClick={() => setExpanded(expanded === tech.id ? null : tech.id)}
            >
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img
                  src={tech.image}
                  alt={tech.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  background: 'linear-gradient(transparent 40%, rgba(0,0,0,0.7))',
                  display: 'flex', alignItems: 'flex-end', padding: '20px',
                }}>
                  <div>
                    <span style={{ fontSize: '32px' }}>{tech.icon}</span>
                    <h3 className="text-white mb-0 ms-2 d-inline">{tech.title}</h3>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <p className="text-muted fw-semibold mb-2">{tech.subtitle}</p>
                <p>{tech.description}</p>

                {expanded === tech.id && (
                  <div className="mt-3">
                    <h6 className="fw-bold text-success">✅ Benefits</h6>
                    <ul className="mb-3">
                      {tech.benefits.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>

                    <h6 className="fw-bold" style={{ color: '#1565c0' }}>📋 How to Implement</h6>
                    <ol className="mb-3">
                      {tech.steps.map((s, i) => <li key={i}>{s}</li>)}
                    </ol>

                    <div className="alert alert-success py-2" style={{ borderRadius: '10px' }}>
                      <strong>🌱 Best For:</strong> {tech.crops}
                    </div>
                  </div>
                )}

                <div className="text-end">
                  <small className="text-primary">{expanded === tech.id ? '▲ Show less' : '▼ Read more'}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Government Schemes */}
      <div className="card mt-5 shadow-sm" style={{ borderRadius: '16px', borderLeft: '5px solid #2e7d32' }}>
        <div className="card-body">
          <h3>🏛️ Government Schemes for Farmers</h3>
          <div className="row g-3 mt-2">
            {[
              { name: 'PM-KISAN', desc: '₹6,000/year direct income support to all landholding farmers', link: 'https://pmkisan.gov.in' },
              { name: 'PKVY', desc: 'Paramparagat Krishi Vikas Yojana — ₹50,000/ha for organic farming clusters', link: 'https://pgsindia-ncof.gov.in' },
              { name: 'PMFBY', desc: 'Pradhan Mantri Fasal Bima Yojana — crop insurance at 1.5-5% premium', link: 'https://pmfby.gov.in' },
              { name: 'Soil Health Card', desc: 'Free soil testing and nutrient recommendations for every farm', link: 'https://soilhealth.dac.gov.in' },
              { name: 'eNAM', desc: 'Electronic National Agriculture Market — sell produce online across India', link: 'https://enam.gov.in' },
              { name: 'KCC', desc: 'Kisan Credit Card — crop loans at 4% interest with prompt repayment', link: 'https://www.pmkisan.gov.in' },
            ].map((s, i) => (
              <div key={i} className="col-md-4">
                <div className="card h-100 p-3" style={{ borderRadius: '12px' }}>
                  <h6 className="fw-bold text-success">{s.name}</h6>
                  <p className="small mb-1">{s.desc}</p>
                  <a href={s.link} target="_blank" rel="noreferrer" className="small">Learn more →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
