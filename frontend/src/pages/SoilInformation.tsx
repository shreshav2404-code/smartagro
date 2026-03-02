import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { BsGlobeAmericas, BsClipboard2Pulse, BsThermometerHalf, BsCircleFill, BsLightbulb, BsMap, BsGeoAlt, BsListCheck, BsFlower1, BsWrench, BsChevronDown, BsChevronUp, BsTree, BsSquareFill, BsSun, BsTriangle, BsWater, BsMoisture } from 'react-icons/bs';

const soilIconMap: Record<string, React.ComponentType<any>> = {
  alluvial: BsWater, black: BsSquareFill, red: BsCircleFill,
  laterite: BsMoisture, arid: BsSun, mountain: BsTriangle,
};

const soilTypes = [
  { id: 'alluvial', name: 'Alluvial Soil', color: '#8B7355', coverage: '43% of India\'s land area',
    regions: 'Indo-Gangetic Plains, Punjab, Haryana, UP, Bihar, West Bengal, Assam',
    description: 'Alluvial soil is the most widespread and fertile soil in India, deposited by rivers over millennia. Rich in potash but deficient in nitrogen and phosphorus.',
    characteristics: ['pH: 6.5-8.4 (neutral to slightly alkaline)', 'Texture: Sandy loam to clay loam', 'Rich in potash & lime', 'Deficient in nitrogen, phosphorus & humus', 'Good water retention capacity'],
    crops: ['Rice', 'Wheat', 'Sugarcane', 'Maize', 'Pulses', 'Oilseeds', 'Jute', 'Vegetables'],
    management: ['Add nitrogen fertilizers (Urea, DAP)', 'Green manuring with Dhaincha/Sunhemp', 'Regular organic matter addition', 'Crop rotation with legumes'] },
  { id: 'black', name: 'Black Soil (Regur)', color: '#2C2C2C', coverage: '16.6% of India\'s land area',
    regions: 'Maharashtra, Gujarat, MP, Karnataka, AP, Tamil Nadu (Deccan Plateau)',
    description: 'Formed from volcanic basalt rock (Deccan Trap). Self-ploughing — swells when wet, cracks when dry. Extremely moisture-retentive, ideal for dry farming.',
    characteristics: ['pH: 7.2-8.5 (slightly alkaline)', 'Texture: Clayey and heavy', 'Rich in calcium, magnesium, iron & alumina', 'Deficient in nitrogen, phosphorus & organic matter', 'High moisture retention', 'Self-ploughing due to deep cracks in summer'],
    crops: ['Cotton (primary)', 'Soybean', 'Sorghum (Jowar)', 'Wheat', 'Sugarcane', 'Groundnut', 'Sunflower', 'Citrus fruits'],
    management: ['Add nitrogen and phosphorus fertilizers', 'Avoid waterlogging — improve drainage', 'Gypsum application to improve structure', 'Early sowing to utilize residual moisture'] },
  { id: 'red', name: 'Red & Yellow Soil', color: '#CD5C5C', coverage: '18.5% of India\'s land area',
    regions: 'Odisha, Chhattisgarh, Jharkhand, Southern Karnataka, Tamil Nadu, NE India',
    description: 'Gets its color from iron oxide (hematite). Forms from weathering of crystalline and metamorphic rocks. Generally less fertile but responds well to fertilizers.',
    characteristics: ['pH: 6.0-8.0 (acidic to neutral)', 'Texture: Sandy to clayey', 'Rich in iron and potash', 'Deficient in nitrogen, phosphorus, humus & lime', 'Porous with low water retention'],
    crops: ['Millets (Ragi, Bajra)', 'Groundnut', 'Potato', 'Rice', 'Wheat', 'Pulses', 'Tobacco', 'Fruits (Mango, Orange)'],
    management: ['Heavy fertilization (NPK)', 'Lime application to correct acidity', 'Irrigation essential', 'Soil conservation on slopes', 'Organic matter addition crucial'] },
  { id: 'laterite', name: 'Laterite Soil', color: '#B22222', coverage: '3.7% of India\'s land area',
    regions: 'Kerala, Karnataka coast, Meghalaya, Western Ghats, Eastern Ghats',
    description: 'Forms in tropical regions with high temperature and heavy rainfall. Nutrients leach away due to rain, leaving iron and aluminium oxides.',
    characteristics: ['pH: 5.0-6.0 (acidic)', 'Texture: Gravelly, coarse', 'Rich in iron & aluminium oxides', 'Poor in nitrogen, phosphorus, potassium', 'Hardens like brick when exposed to air'],
    crops: ['Cashew', 'Tea', 'Coffee', 'Rubber', 'Coconut', 'Rice', 'Tapioca', 'Arecanut'],
    management: ['Heavy liming to correct acidity', 'Massive organic matter addition', 'Green manuring essential', 'Phosphorus and potassium fertilizers', 'Mulching to prevent moisture loss'] },
  { id: 'arid', name: 'Desert / Arid Soil', color: '#DEB887', coverage: '6.7% of India\'s land area',
    regions: 'Rajasthan, Gujarat (Kutch), Southern Punjab, Southern Haryana',
    description: 'Sandy, dry, and very low organic content due to minimal rainfall. Rich in soluble salts and can become highly productive with proper irrigation.',
    characteristics: ['pH: 8.0-8.8 (alkaline)', 'Texture: Sandy, coarse', 'Rich in phosphate & calcium', 'Very low humus and nitrogen', 'Poor water retention — high evaporation'],
    crops: ['Bajra (Pearl Millet)', 'Guar (Cluster Bean)', 'Moth Bean', 'Date Palm', 'Barley', 'Cotton', 'Mustard', 'Cumin & Coriander'],
    management: ['Irrigation is essential (drip preferred)', 'Windbreaks to prevent soil erosion', 'Organic matter to improve water holding', 'Nitrogen fertilizers', 'Mulching and micro-irrigation'] },
  { id: 'mountain', name: 'Mountain / Forest Soil', color: '#556B2F', coverage: '7.9% of India\'s land area',
    regions: 'Himalayas, Western & Eastern Ghats, NE hill states',
    description: 'Varies with altitude and climate. Thin, acidic, and humus-rich at higher elevations. Fertile and loamy in valleys. Prone to erosion on steep slopes.',
    characteristics: ['pH: 5.0-6.5 (acidic)', 'Texture: Varies — loamy in valleys, thin on slopes', 'Rich in humus at higher altitudes', 'Deficient in potash, phosphorus & lime', 'Highly prone to erosion'],
    crops: ['Tea & Coffee (slopes)', 'Apples & Walnuts (high altitude)', 'Rice (terraced valleys)', 'Maize', 'Spices (Cardamom, Pepper)', 'Saffron (Kashmir)'],
    management: ['Terrace farming on slopes', 'Contour ploughing to prevent erosion', 'Afforestation to hold soil', 'Liming for acidic soils', 'Organic farming practices preferred'] },
];

const soilTests = [
  { param: 'pH Level', ideal: '6.0-7.5', desc: 'Measures acidity/alkalinity. Most crops prefer slightly acidic to neutral.' },
  { param: 'Nitrogen (N)', ideal: '280-560 kg/ha', desc: 'Essential for leaf growth. Deficiency shows as yellowing of older leaves.' },
  { param: 'Phosphorus (P)', ideal: '22-56 kg/ha', desc: 'Critical for root development and flowering. Deficiency causes purple leaves.' },
  { param: 'Potassium (K)', ideal: '140-280 kg/ha', desc: 'Strengthens stems, disease resistance. Deficiency shows burnt leaf edges.' },
  { param: 'Organic Carbon', ideal: '> 0.75%', desc: 'Indicates soil health. Higher = better water retention and microbial activity.' },
  { param: 'EC (Salinity)', ideal: '< 1 dS/m', desc: 'Measures salt content. High EC stunts plant growth and reduces water uptake.' },
];

export const SoilInformation: React.FC = () => {
  const { t } = useLanguage();
  const [selectedSoil, setSelectedSoil] = useState<string | null>(null);

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold"><BsGlobeAmericas className="me-3 text-success" />{t('soil_info') || 'Soil Information'}</h1>
        <p className="lead text-muted" style={{ maxWidth: '700px', margin: '0 auto' }}>
          Understanding your soil is the foundation of successful farming. Explore India's major soil types, testing parameters, and management practices.
        </p>
      </div>

      <div className="card shadow-sm mb-5" style={{ borderRadius: '16px', overflow: 'hidden' }}>
        <div style={{ background: 'linear-gradient(135deg, #8a7a6a, #a09080)', padding: '25px', color: '#fff' }}>
          <h3 className="mb-0"><BsClipboard2Pulse className="me-2" />Soil Testing Parameters — Know Your Numbers</h3>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {soilTests.map((test, i) => (
              <div key={i} className="col-md-4">
                <div className="card h-100 p-3" style={{ borderRadius: '12px', borderLeft: '4px solid #a09080' }}>
                  <h6 className="fw-bold"><BsThermometerHalf className="me-2" />{test.param}</h6>
                  <p className="small mb-1">{test.desc}</p>
                  <span className="badge bg-success">Ideal: {test.ideal}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="alert alert-info mt-3 mb-0" style={{ borderRadius: '10px' }}>
            <BsLightbulb className="me-2" /><strong>Free Soil Testing:</strong> Visit your nearest Soil Testing Laboratory or Krishi Vigyan Kendra (KVK).
            Get your Soil Health Card at <a href="https://soilhealth.dac.gov.in" target="_blank" rel="noreferrer">soilhealth.dac.gov.in</a>
          </div>
        </div>
      </div>

      <h2 className="mb-4 text-center"><BsMap className="me-2" />Major Soil Types of India</h2>
      <div className="row g-4">
        {soilTypes.map((soil) => {
          const Icon = soilIconMap[soil.id] || BsCircleFill;
          return (
            <div key={soil.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm card-hover" style={{ borderRadius: '16px', cursor: 'pointer', borderTop: `5px solid ${soil.color}` }}
                onClick={() => setSelectedSoil(selectedSoil === soil.id ? null : soil.id)}>
                <div className="card-body">
                  <div className="d-flex align-items-center mb-2">
                    <Icon style={{ fontSize: '32px', color: soil.color }} />
                    <div className="ms-3">
                      <h5 className="mb-0 fw-bold">{soil.name}</h5>
                      <small className="text-muted">{soil.coverage}</small>
                    </div>
                  </div>
                  <p className="small text-muted mb-2"><strong><BsGeoAlt className="me-1" />Regions:</strong> {soil.regions}</p>
                  <p className="small">{soil.description}</p>
                  {selectedSoil === soil.id && (
                    <div className="mt-3">
                      <h6 className="fw-bold"><BsListCheck className="me-2" />Characteristics</h6>
                      <ul className="small mb-3">{soil.characteristics.map((c, i) => <li key={i}>{c}</li>)}</ul>
                      <h6 className="fw-bold text-success"><BsFlower1 className="me-2" />Suitable Crops</h6>
                      <div className="mb-3">{soil.crops.map((c, i) => <span key={i} className="badge bg-success me-1 mb-1">{c}</span>)}</div>
                      <h6 className="fw-bold" style={{ color: '#6b9ec2' }}><BsWrench className="me-2" />Management Tips</h6>
                      <ul className="small mb-0">{soil.management.map((m, i) => <li key={i}>{m}</li>)}</ul>
                    </div>
                  )}
                  <div className="text-end mt-2">
                    <small className="text-primary">
                      {selectedSoil === soil.id ? <BsChevronUp className="me-1" /> : <BsChevronDown className="me-1" />}
                      {selectedSoil === soil.id ? 'Less' : 'More'}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card mt-5 shadow-sm" style={{ borderRadius: '16px', borderLeft: '5px solid #5a9e6f' }}>
        <div className="card-body">
          <h3><BsTree className="me-2" />5 Golden Rules of Soil Health</h3>
          <div className="row g-3 mt-2">
            {[
              { num: '1', title: 'Minimize Disturbance', desc: 'Reduce tillage to preserve soil structure and microbial communities.' },
              { num: '2', title: 'Keep Soil Covered', desc: 'Use mulch or cover crops — bare soil loses moisture and erodes.' },
              { num: '3', title: 'Maintain Living Roots', desc: 'Keep something growing year-round to feed soil microorganisms.' },
              { num: '4', title: 'Diversify Crops', desc: 'Different roots feed different microbes — diversity = resilience.' },
              { num: '5', title: 'Add Organic Matter', desc: 'Compost, vermicompost, and green manure are soil superfoods.' },
            ].map((r) => (
              <div key={r.num} className="col-md-4 col-lg">
                <div className="card h-100 text-center p-3" style={{ borderRadius: '12px' }}>
                  <div className="fw-bold fs-3" style={{ color: '#5a9e6f' }}>{r.num}</div>
                  <h6 className="fw-bold">{r.title}</h6>
                  <p className="small text-muted mb-0">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
