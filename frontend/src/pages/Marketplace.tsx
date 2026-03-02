import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  unit: string;
  seller: string;
  location: string;
  image: string;
  description: string;
  available: boolean;
  rating: number;
  reviews: number;
}

const categories = [
  { id: 'all', name: '🏪 All', color: '#2e7d32' },
  { id: 'grains', name: '🌾 Grains & Cereals', color: '#F57F17' },
  { id: 'vegetables', name: '🥬 Vegetables', color: '#388E3C' },
  { id: 'fruits', name: '🍎 Fruits', color: '#D32F2F' },
  { id: 'spices', name: '🌶️ Spices', color: '#E65100' },
  { id: 'seeds', name: '🌱 Seeds & Saplings', color: '#1B5E20' },
  { id: 'fertilizers', name: '🧪 Fertilizers', color: '#4527A0' },
  { id: 'equipment', name: '🚜 Equipment', color: '#37474F' },
];

const products: Product[] = [
  { id: 1, name: 'Organic Basmati Rice', category: 'grains', price: '₹85', unit: '/kg', seller: 'Raj Kumar Farms', location: 'Dehradun, Uttarakhand', image: '🍚', description: 'Premium aged Basmati, organically grown in the Doon Valley. 2-year aged, extra-long grain. Certified organic under NPOP.', available: true, rating: 4.8, reviews: 124 },
  { id: 2, name: 'Fresh Alphonso Mangoes', category: 'fruits', price: '₹450', unit: '/dozen', seller: 'Konkan Orchards', location: 'Ratnagiri, Maharashtra', image: '🥭', description: 'Hapus mangoes directly from Ratnagiri. Chemical-free, carbide-free ripening. GI-tagged Ratnagiri Alphonso. Pre-order for April delivery.', available: true, rating: 4.9, reviews: 89 },
  { id: 3, name: 'Vermicompost (Premium)', category: 'fertilizers', price: '₹12', unit: '/kg', seller: 'Green Earth Bio', location: 'Pune, Maharashtra', image: '🪱', description: 'Eisenia fetida earthworm compost. NPK rich, pH balanced. Ideal for all crops, especially vegetables and flowers. 50kg bags available.', available: true, rating: 4.6, reviews: 203 },
  { id: 4, name: 'Hybrid Tomato Seeds (F1)', category: 'seeds', price: '₹350', unit: '/packet (10g)', seller: 'Indo Seeds Corp', location: 'Jalna, Maharashtra', image: '🍅', description: 'High-yield F1 hybrid. Disease resistant (ToLCV, bacterial wilt). 80-90 days maturity. Avg yield: 40-50 tonnes/hectare.', available: true, rating: 4.5, reviews: 67 },
  { id: 5, name: 'Fresh Turmeric (Lakadong)', category: 'spices', price: '₹220', unit: '/kg', seller: 'Meghalaya Spice Co-op', location: 'Jaintia Hills, Meghalaya', image: '🟡', description: 'Lakadong turmeric — world\'s highest curcumin content (7-12%). GI-tagged from Jaintia Hills. Available in raw, dried, and powder forms.', available: true, rating: 4.9, reviews: 156 },
  { id: 6, name: 'DAP Fertilizer (50kg)', category: 'fertilizers', price: '₹1,350', unit: '/bag', seller: 'IFFCO Dealer', location: 'Delhi NCR', image: '🧪', description: 'Di-Ammonium Phosphate (18-46-0). Essential for root development. Government subsidized price. Ideal for wheat, rice, and vegetables.', available: true, rating: 4.3, reviews: 312 },
  { id: 7, name: 'Organic Potatoes', category: 'vegetables', price: '₹35', unit: '/kg', seller: 'Shimla Valley Farms', location: 'Shimla, HP', image: '🥔', description: 'Kufri Jyoti variety, grown at 2500m altitude. No pesticides, no chemical fertilizers. Cool climate potatoes with excellent taste.', available: true, rating: 4.7, reviews: 45 },
  { id: 8, name: 'Mini Rotavator', category: 'equipment', price: '₹45,000', unit: '', seller: 'AgriMech Solutions', location: 'Ludhiana, Punjab', image: '🚜', description: '42-blade mini rotavator, 5ft working width. Compatible with 35-50 HP tractors. Ideal for seedbed preparation. 1-year warranty.', available: true, rating: 4.4, reviews: 28 },
  { id: 9, name: 'Fresh Green Cardamom', category: 'spices', price: '₹2,800', unit: '/kg', seller: 'Idukki Spice Gardens', location: 'Idukki, Kerala', image: '🫛', description: 'Premium bold green cardamom (8mm+). Freshly harvested from Idukki hills. Strong aroma, high oil content. Sorted and graded.', available: true, rating: 4.8, reviews: 93 },
  { id: 10, name: 'Wheat (Sharbati)', category: 'grains', price: '₹32', unit: '/kg', seller: 'MP Grain Traders', location: 'Sehore, MP', image: '🌾', description: 'Sehore Sharbati wheat — GI-tagged, known for golden color and sweet taste. Perfect for chapati and bread. Organically grown.', available: true, rating: 4.7, reviews: 178 },
  { id: 11, name: 'Neem Oil (Cold Pressed)', category: 'fertilizers', price: '₹380', unit: '/litre', seller: 'BioNeem India', location: 'Jodhpur, Rajasthan', image: '🌿', description: 'Pure cold-pressed neem oil for organic pest control. Controls 200+ pest species. Mix 5ml/litre for foliar spray. OMRI listed.', available: true, rating: 4.6, reviews: 145 },
  { id: 12, name: 'Grafted Mango Saplings', category: 'seeds', price: '₹150', unit: '/sapling', seller: 'Malihabad Nursery', location: 'Lucknow, UP', image: '🌳', description: 'Grafted Dasheri mango saplings, 2-year old. Fruiting starts in 3-4 years. Varieties: Dasheri, Langra, Chausa. Min order: 10 saplings.', available: true, rating: 4.5, reviews: 34 },
  { id: 13, name: 'Kashmir Saffron (1g)', category: 'spices', price: '₹650', unit: '/gram', seller: 'Pampore Saffron Guild', location: 'Pampore, J&K', image: '🌸', description: 'Genuine Kashmiri Mogra saffron — GI-tagged from Pampore. ISO 3632 Category I. Lab tested for purity. Each gram = ~450 threads.', available: true, rating: 5.0, reviews: 67 },
  { id: 14, name: 'Drip Irrigation Kit (1 acre)', category: 'equipment', price: '₹18,500', unit: '/kit', seller: 'Jain Irrigation', location: 'Jalgaon, Maharashtra', image: '💧', description: 'Complete inline drip kit for 1 acre. Includes lateral pipes, emitters, filter, connectors. Subsidy available under PMKSY (up to 55%).', available: true, rating: 4.7, reviews: 89 },
  { id: 15, name: 'Organic Darjeeling Tea', category: 'spices', price: '₹1,200', unit: '/kg', seller: 'Makaibari Tea Estate', location: 'Darjeeling, WB', image: '🍵', description: 'First flush organic Darjeeling tea. GI-tagged. Biodynamic farming since 1859. Light, muscatel flavor. Whole leaf grade FTGFOP1.', available: true, rating: 4.9, reviews: 201 },
  { id: 16, name: 'Solar Water Pump (2HP)', category: 'equipment', price: '₹1,25,000', unit: '', seller: 'Tata Power Solar', location: 'Pan India', image: '☀️', description: '2HP submersible solar pump with 8 panels. 60m head, 50,000 LPD capacity. PM-KUSUM subsidy up to 60%. 5-year warranty.', available: true, rating: 4.6, reviews: 56 },
];

const platforms = [
  { name: 'eNAM', desc: 'Electronic National Agriculture Market — sell to buyers across 1000+ mandis', url: 'https://enam.gov.in', icon: '🏛️' },
  { name: 'AgriBazaar', desc: 'B2B marketplace for bulk agricultural commodities', url: 'https://agribazaar.com', icon: '📦' },
  { name: 'BigHaat', desc: 'Buy seeds, fertilizers, pesticides online with expert advice', url: 'https://bighaat.com', icon: '🛒' },
  { name: 'DeHaat', desc: 'Full-stack agri platform — inputs, advisory, market linkage', url: 'https://dehaat.com', icon: '🌾' },
  { name: 'Kisan Network', desc: 'Direct farmer-to-buyer platform, eliminates middlemen', url: 'https://kisannetwork.com', icon: '🤝' },
  { name: 'Ninjacart', desc: 'Fresh produce supply chain — farmers to retailers/restaurants', url: 'https://ninjacart.com', icon: '🥬' },
];

export const Marketplace: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showContact, setShowContact] = useState<number | null>(null);

  const filtered = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container my-5">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="display-4 fw-bold">🛒 {t('marketplace') || 'AgriMarketplace'}</h1>
        <p className="lead text-muted" style={{ maxWidth: '700px', margin: '0 auto' }}>
          Buy farm inputs and sell your produce directly. No middlemen, fair prices, verified sellers.
        </p>
      </div>

      {/* Search */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-8">
          <div className="input-group input-group-lg">
            <span className="input-group-text">🔍</span>
            <input
              type="text"
              className="form-control"
              placeholder="Search products, locations, or sellers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ borderRadius: '0 12px 12px 0' }}
            />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`btn ${selectedCategory === cat.id ? 'btn-success' : 'btn-outline-secondary'} rounded-pill`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-muted mb-3">{filtered.length} products found</p>

      {/* Product Grid */}
      <div className="row g-4">
        {filtered.map((product) => (
          <div key={product.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm" style={{ borderRadius: '16px', overflow: 'hidden' }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span style={{ fontSize: '40px' }}>{product.image}</span>
                  <span className="badge bg-success rounded-pill">{product.available ? '✅ In Stock' : '❌ Sold Out'}</span>
                </div>

                <h5 className="fw-bold">{product.name}</h5>

                <div className="d-flex align-items-center mb-2">
                  <span className="fs-4 fw-bold" style={{ color: '#2e7d32' }}>{product.price}</span>
                  <span className="text-muted ms-1">{product.unit}</span>
                </div>

                <p className="small text-muted mb-2">{product.description.slice(0, 100)}...</p>

                <div className="mb-2">
                  <small className="text-muted">👤 {product.seller}</small><br />
                  <small className="text-muted">📍 {product.location}</small>
                </div>

                <div className="d-flex align-items-center mb-3">
                  <span style={{ color: '#FFB300' }}>{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
                  <small className="text-muted ms-2">{product.rating} ({product.reviews} reviews)</small>
                </div>

                <div className="d-grid gap-2">
                  <button
                    className="btn btn-success"
                    style={{ borderRadius: '10px' }}
                    onClick={() => setShowContact(showContact === product.id ? null : product.id)}
                  >
                    {showContact === product.id ? '📞 Contact Seller' : '🛒 Buy Now'}
                  </button>
                  {showContact === product.id && (
                    <div className="alert alert-info py-2 mb-0" style={{ borderRadius: '10px' }}>
                      <small>
                        📧 Contact <strong>{product.seller}</strong> at {product.location}<br />
                        🔗 Listed on SmartAgro Marketplace<br />
                        💡 <em>Direct farmer-to-buyer, no commission!</em>
                      </small>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-5">
          <div style={{ fontSize: '48px' }}>🔍</div>
          <h4>No products found</h4>
          <p className="text-muted">Try a different search or category</p>
        </div>
      )}

      {/* Real Platforms Section */}
      <div className="card mt-5 shadow-sm" style={{ borderRadius: '16px', borderLeft: '5px solid #2e7d32' }}>
        <div className="card-body">
          <h3>🌐 Real Agricultural Marketplaces in India</h3>
          <p className="text-muted">Verified platforms where farmers can buy inputs and sell produce:</p>
          <div className="row g-3 mt-2">
            {platforms.map((p, i) => (
              <div key={i} className="col-md-4">
                <div className="card h-100 p-3" style={{ borderRadius: '12px' }}>
                  <h6 className="fw-bold">{p.icon} {p.name}</h6>
                  <p className="small mb-2">{p.desc}</p>
                  <a href={p.url} target="_blank" rel="noreferrer" className="small text-success">Visit platform →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Prices */}
      <div className="card mt-4 shadow-sm" style={{ borderRadius: '16px' }}>
        <div className="card-body">
          <h3>📊 Today's Indicative Mandi Prices</h3>
          <p className="text-muted small">Reference prices from major APMCs. Actual prices vary by mandi and grade.</p>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Commodity</th>
                  <th>Mandi</th>
                  <th>Min (₹/qtl)</th>
                  <th>Max (₹/qtl)</th>
                  <th>MSP 2024-25</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { crop: '🌾 Wheat', mandi: 'Indore', min: '2,350', max: '2,600', msp: '₹2,275' },
                  { crop: '🍚 Rice (Paddy)', mandi: 'Karnal', min: '2,100', max: '2,450', msp: '₹2,300' },
                  { crop: '🌽 Maize', mandi: 'Davangere', min: '1,900', max: '2,200', msp: '₹2,090' },
                  { crop: '🫘 Chana (Gram)', mandi: 'Latur', min: '5,200', max: '5,800', msp: '₹5,650' },
                  { crop: '🥜 Groundnut', mandi: 'Rajkot', min: '5,500', max: '6,200', msp: '₹6,377' },
                  { crop: '🌻 Soybean', mandi: 'Indore', min: '4,200', max: '4,800', msp: '₹4,892' },
                  { crop: '🧅 Onion', mandi: 'Nashik', min: '800', max: '1,500', msp: 'N/A' },
                  { crop: '🍅 Tomato', mandi: 'Kolar', min: '600', max: '1,800', msp: 'N/A' },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="fw-semibold">{row.crop}</td>
                    <td>{row.mandi}</td>
                    <td>{row.min}</td>
                    <td>{row.max}</td>
                    <td><span className="badge bg-warning text-dark">{row.msp}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <small className="text-muted">Source: Agmarknet.gov.in | MSP rates from CACP recommendations 2024-25</small>
        </div>
      </div>
    </div>
  );
};
