import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { BsShop, BsSearch, BsGrid, BsBasket, BsFlower2, BsApple, BsFire, BsFlower1, BsDroplet, BsTools, BsCheckCircle, BsPerson, BsGeoAlt, BsCartPlus, BsTelephone, BsEnvelope, BsLink45Deg, BsGraphUp, BsGlobe, BsBoxSeam, BsCart3, BsLayers, BsPeople, BsTruck, BsRecycle, BsTree, BsGem, BsCupHot, BsSun, BsShieldCheck, BsMoisture } from 'react-icons/bs';

const iconMap: Record<string, React.ComponentType<any>> = {
  'bi-basket': BsBasket, 'bi-flower2': BsFlower2, 'bi-apple': BsApple, 'bi-fire': BsFire,
  'bi-flower1': BsFlower1, 'bi-droplet': BsDroplet, 'bi-tools': BsTools, 'bi-recycle': BsRecycle,
  'bi-tree': BsTree, 'bi-gem': BsGem, 'bi-cup-hot': BsCupHot, 'bi-sun': BsSun,
  'bi-shield-check': BsShieldCheck, 'bi-moisture': BsMoisture,
};

interface Product {
  id: number; name: string; category: string; price: string; unit: string;
  seller: string; location: string; icon: string; description: string;
  available: boolean; rating: number; reviews: number;
}

const categories = [
  { id: 'all', name: 'All', Icon: BsGrid },
  { id: 'grains', name: 'Grains & Cereals', Icon: BsBasket },
  { id: 'vegetables', name: 'Vegetables', Icon: BsFlower2 },
  { id: 'fruits', name: 'Fruits', Icon: BsApple },
  { id: 'spices', name: 'Spices', Icon: BsFire },
  { id: 'seeds', name: 'Seeds & Saplings', Icon: BsFlower1 },
  { id: 'fertilizers', name: 'Fertilizers', Icon: BsDroplet },
  { id: 'equipment', name: 'Equipment', Icon: BsTools },
];

const products: Product[] = [
  { id: 1, name: 'Organic Basmati Rice', category: 'grains', price: '₹85', unit: '/kg', seller: 'Raj Kumar Farms', location: 'Dehradun, Uttarakhand', icon: 'bi-basket', description: 'Premium aged Basmati, organically grown in the Doon Valley. 2-year aged, extra-long grain. Certified organic under NPOP.', available: true, rating: 4.8, reviews: 124 },
  { id: 2, name: 'Fresh Alphonso Mangoes', category: 'fruits', price: '₹450', unit: '/dozen', seller: 'Konkan Orchards', location: 'Ratnagiri, Maharashtra', icon: 'bi-apple', description: 'Hapus mangoes directly from Ratnagiri. Chemical-free, carbide-free ripening. GI-tagged Ratnagiri Alphonso.', available: true, rating: 4.9, reviews: 89 },
  { id: 3, name: 'Vermicompost (Premium)', category: 'fertilizers', price: '₹12', unit: '/kg', seller: 'Green Earth Bio', location: 'Pune, Maharashtra', icon: 'bi-recycle', description: 'Eisenia fetida earthworm compost. NPK rich, pH balanced. Ideal for all crops. 50kg bags available.', available: true, rating: 4.6, reviews: 203 },
  { id: 4, name: 'Hybrid Tomato Seeds (F1)', category: 'seeds', price: '₹350', unit: '/packet (10g)', seller: 'Indo Seeds Corp', location: 'Jalna, Maharashtra', icon: 'bi-flower1', description: 'High-yield F1 hybrid. Disease resistant (ToLCV, bacterial wilt). 80-90 days maturity.', available: true, rating: 4.5, reviews: 67 },
  { id: 5, name: 'Fresh Turmeric (Lakadong)', category: 'spices', price: '₹220', unit: '/kg', seller: 'Meghalaya Spice Co-op', location: 'Jaintia Hills, Meghalaya', icon: 'bi-fire', description: 'Lakadong turmeric — world\'s highest curcumin content (7-12%). GI-tagged.', available: true, rating: 4.9, reviews: 156 },
  { id: 6, name: 'DAP Fertilizer (50kg)', category: 'fertilizers', price: '₹1,350', unit: '/bag', seller: 'IFFCO Dealer', location: 'Delhi NCR', icon: 'bi-droplet', description: 'Di-Ammonium Phosphate (18-46-0). Essential for root development. Government subsidized price.', available: true, rating: 4.3, reviews: 312 },
  { id: 7, name: 'Organic Potatoes', category: 'vegetables', price: '₹35', unit: '/kg', seller: 'Shimla Valley Farms', location: 'Shimla, HP', icon: 'bi-flower2', description: 'Kufri Jyoti variety, grown at 2500m altitude. No pesticides, no chemical fertilizers.', available: true, rating: 4.7, reviews: 45 },
  { id: 8, name: 'Mini Rotavator', category: 'equipment', price: '₹45,000', unit: '', seller: 'AgriMech Solutions', location: 'Ludhiana, Punjab', icon: 'bi-tools', description: '42-blade mini rotavator, 5ft working width. Compatible with 35-50 HP tractors. 1-year warranty.', available: true, rating: 4.4, reviews: 28 },
  { id: 9, name: 'Fresh Green Cardamom', category: 'spices', price: '₹2,800', unit: '/kg', seller: 'Idukki Spice Gardens', location: 'Idukki, Kerala', icon: 'bi-fire', description: 'Premium bold green cardamom (8mm+). Freshly harvested. Strong aroma, high oil content.', available: true, rating: 4.8, reviews: 93 },
  { id: 10, name: 'Wheat (Sharbati)', category: 'grains', price: '₹32', unit: '/kg', seller: 'MP Grain Traders', location: 'Sehore, MP', icon: 'bi-basket', description: 'Sehore Sharbati wheat — GI-tagged, golden color and sweet taste. Perfect for chapati.', available: true, rating: 4.7, reviews: 178 },
  { id: 11, name: 'Neem Oil (Cold Pressed)', category: 'fertilizers', price: '₹380', unit: '/litre', seller: 'BioNeem India', location: 'Jodhpur, Rajasthan', icon: 'bi-shield-check', description: 'Pure cold-pressed neem oil for organic pest control. Controls 200+ pest species. OMRI listed.', available: true, rating: 4.6, reviews: 145 },
  { id: 12, name: 'Grafted Mango Saplings', category: 'seeds', price: '₹150', unit: '/sapling', seller: 'Malihabad Nursery', location: 'Lucknow, UP', icon: 'bi-tree', description: 'Grafted Dasheri mango saplings, 2-year old. Fruiting starts in 3-4 years.', available: true, rating: 4.5, reviews: 34 },
  { id: 13, name: 'Kashmir Saffron (1g)', category: 'spices', price: '₹650', unit: '/gram', seller: 'Pampore Saffron Guild', location: 'Pampore, J&K', icon: 'bi-gem', description: 'Genuine Kashmiri Mogra saffron — GI-tagged. ISO 3632 Category I. Lab tested for purity.', available: true, rating: 5.0, reviews: 67 },
  { id: 14, name: 'Drip Irrigation Kit (1 acre)', category: 'equipment', price: '₹18,500', unit: '/kit', seller: 'Jain Irrigation', location: 'Jalgaon, Maharashtra', icon: 'bi-moisture', description: 'Complete inline drip kit for 1 acre. Subsidy available under PMKSY (up to 55%).', available: true, rating: 4.7, reviews: 89 },
  { id: 15, name: 'Organic Darjeeling Tea', category: 'spices', price: '₹1,200', unit: '/kg', seller: 'Makaibari Tea Estate', location: 'Darjeeling, WB', icon: 'bi-cup-hot', description: 'First flush organic Darjeeling tea. GI-tagged. Biodynamic farming since 1859.', available: true, rating: 4.9, reviews: 201 },
  { id: 16, name: 'Solar Water Pump (2HP)', category: 'equipment', price: '₹1,25,000', unit: '', seller: 'Tata Power Solar', location: 'Pan India', icon: 'bi-sun', description: '2HP submersible solar pump with 8 panels. PM-KUSUM subsidy up to 60%. 5-year warranty.', available: true, rating: 4.6, reviews: 56 },
];

const platformIcons: Record<string, React.ComponentType<any>> = {
  'eNAM': BsShop, 'AgriBazaar': BsBoxSeam, 'BigHaat': BsCart3,
  'DeHaat': BsLayers, 'Kisan Network': BsPeople, 'Ninjacart': BsTruck,
};

const platforms = [
  { name: 'eNAM', desc: 'Electronic National Agriculture Market — sell to buyers across 1000+ mandis', url: 'https://enam.gov.in' },
  { name: 'AgriBazaar', desc: 'B2B marketplace for bulk agricultural commodities', url: 'https://agribazaar.com' },
  { name: 'BigHaat', desc: 'Buy seeds, fertilizers, pesticides online with expert advice', url: 'https://bighaat.com' },
  { name: 'DeHaat', desc: 'Full-stack agri platform — inputs, advisory, market linkage', url: 'https://dehaat.com' },
  { name: 'Kisan Network', desc: 'Direct farmer-to-buyer platform, eliminates middlemen', url: 'https://kisannetwork.com' },
  { name: 'Ninjacart', desc: 'Fresh produce supply chain — farmers to retailers/restaurants', url: 'https://ninjacart.com' },
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
      <div className="text-center mb-4">
        <h1 className="display-4 fw-bold"><BsShop className="me-3 text-success" />{t('marketplace') || 'AgriMarketplace'}</h1>
        <p className="lead text-muted" style={{ maxWidth: '700px', margin: '0 auto' }}>
          Buy farm inputs and sell your produce directly. No middlemen, fair prices, verified sellers.
        </p>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-md-8">
          <div className="input-group input-group-lg">
            <span className="input-group-text"><BsSearch /></span>
            <input type="text" className="form-control" placeholder="Search products, locations, or sellers..."
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ borderRadius: '0 12px 12px 0' }} />
          </div>
        </div>
      </div>

      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
        {categories.map((cat) => (
          <button key={cat.id}
            className={`btn ${selectedCategory === cat.id ? 'btn-success' : 'btn-outline-secondary'} rounded-pill`}
            onClick={() => setSelectedCategory(cat.id)}>
            <cat.Icon className="me-1" />{cat.name}
          </button>
        ))}
      </div>

      <p className="text-muted mb-3">{filtered.length} products found</p>

      <div className="row g-4">
        {filtered.map((product) => {
          const ProductIcon = iconMap[product.icon] || BsBasket;
          return (
            <div key={product.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm card-hover" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <ProductIcon style={{ fontSize: '36px', color: '#2e7d32' }} />
                    <span className="badge bg-success rounded-pill">
                      {product.available ? <><BsCheckCircle className="me-1" />In Stock</> : 'Sold Out'}
                    </span>
                  </div>
                  <h5 className="fw-bold">{product.name}</h5>
                  <div className="d-flex align-items-center mb-2">
                    <span className="fs-4 fw-bold" style={{ color: '#2e7d32' }}>{product.price}</span>
                    <span className="text-muted ms-1">{product.unit}</span>
                  </div>
                  <p className="small text-muted mb-2">{product.description.slice(0, 100)}...</p>
                  <div className="mb-2">
                    <small className="text-muted"><BsPerson className="me-1" />{product.seller}</small><br />
                    <small className="text-muted"><BsGeoAlt className="me-1" />{product.location}</small>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <span style={{ color: '#FFB300' }}>{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
                    <small className="text-muted ms-2">{product.rating} ({product.reviews} reviews)</small>
                  </div>
                  <div className="d-grid gap-2">
                    <button className="btn btn-success" style={{ borderRadius: '10px' }}
                      onClick={() => setShowContact(showContact === product.id ? null : product.id)}>
                      {showContact === product.id ? <><BsTelephone className="me-1" />Contact Seller</> : <><BsCartPlus className="me-1" />Buy Now</>}
                    </button>
                    {showContact === product.id && (
                      <div className="alert alert-info py-2 mb-0" style={{ borderRadius: '10px' }}>
                        <small>
                          <BsEnvelope className="me-1" />Contact <strong>{product.seller}</strong> at {product.location}<br />
                          <BsLink45Deg className="me-1" />Listed on SmartAgro Marketplace<br />
                          <em>Direct farmer-to-buyer, no commission!</em>
                        </small>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-5">
          <BsSearch style={{ fontSize: '48px', color: '#ccc' }} />
          <h4 className="mt-3">No products found</h4>
          <p className="text-muted">Try a different search or category</p>
        </div>
      )}

      <div className="card mt-5 shadow-sm" style={{ borderRadius: '16px', borderLeft: '5px solid #2e7d32' }}>
        <div className="card-body">
          <h3><BsGlobe className="me-2" />Real Agricultural Marketplaces in India</h3>
          <p className="text-muted">Verified platforms where farmers can buy inputs and sell produce:</p>
          <div className="row g-3 mt-2">
            {platforms.map((p, i) => {
              const PIcon = platformIcons[p.name] || BsGlobe;
              return (
                <div key={i} className="col-md-4">
                  <div className="card h-100 p-3" style={{ borderRadius: '12px' }}>
                    <h6 className="fw-bold"><PIcon className="me-2 text-success" />{p.name}</h6>
                    <p className="small mb-2">{p.desc}</p>
                    <a href={p.url} target="_blank" rel="noreferrer" className="small text-success">Visit platform →</a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="card mt-4 shadow-sm" style={{ borderRadius: '16px' }}>
        <div className="card-body">
          <h3><BsGraphUp className="me-2" />Today's Indicative Mandi Prices</h3>
          <p className="text-muted small">Reference prices from major APMCs. Actual prices vary by mandi and grade.</p>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead><tr><th>Commodity</th><th>Mandi</th><th>Min (₹/qtl)</th><th>Max (₹/qtl)</th><th>MSP 2024-25</th></tr></thead>
              <tbody>
                {[
                  { crop: 'Wheat', mandi: 'Indore', min: '2,350', max: '2,600', msp: '₹2,275' },
                  { crop: 'Rice (Paddy)', mandi: 'Karnal', min: '2,100', max: '2,450', msp: '₹2,300' },
                  { crop: 'Maize', mandi: 'Davangere', min: '1,900', max: '2,200', msp: '₹2,090' },
                  { crop: 'Chana (Gram)', mandi: 'Latur', min: '5,200', max: '5,800', msp: '₹5,650' },
                  { crop: 'Groundnut', mandi: 'Rajkot', min: '5,500', max: '6,200', msp: '₹6,377' },
                  { crop: 'Soybean', mandi: 'Indore', min: '4,200', max: '4,800', msp: '₹4,892' },
                  { crop: 'Onion', mandi: 'Nashik', min: '800', max: '1,500', msp: 'N/A' },
                  { crop: 'Tomato', mandi: 'Kolar', min: '600', max: '1,800', msp: 'N/A' },
                ].map((row, i) => (
                  <tr key={i}><td className="fw-semibold">{row.crop}</td><td>{row.mandi}</td><td>{row.min}</td><td>{row.max}</td><td><span className="badge bg-warning text-dark">{row.msp}</span></td></tr>
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
