// JavaScript for handling farming techniques and soil information modals

document.addEventListener('DOMContentLoaded', function() {
    // Bootstrap modal instances
    let techniqueModal;
    let soilModal;
    
    // Initialize Bootstrap modals if they exist
    if (document.getElementById('techniqueModal')) {
        techniqueModal = new bootstrap.Modal(document.getElementById('techniqueModal'));
    }
    
    if (document.getElementById('soilModal')) {
        soilModal = new bootstrap.Modal(document.getElementById('soilModal'));
    }
    
    // Handle farming technique buttons
    const farmingTechniqueButtons = document.querySelectorAll('.farming-technique-btn');
    farmingTechniqueButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const technique = this.getAttribute('data-technique');
            showTechniqueInfo(technique);
        });
    });

    // Handle soil type buttons
    const soilTypeButtons = document.querySelectorAll('.soil-type-btn');
    soilTypeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const soilType = this.getAttribute('data-soil');
            showSoilInfo(soilType);
        });
    });

    // Function to show farming technique information in a modal
    function showTechniqueInfo(technique) {
        if (!techniqueModal) return;
        
        let title = '';
        let content = '';
        let imageSrc = '';
        
        switch(technique) {
            case 'organic':
                title = 'Organic Farming';
                imageSrc = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
                content = `<div class="row">
                            <div class="col-md-5">
                                <img src="${imageSrc}" class="img-fluid rounded mb-3" alt="Organic Farming">
                            </div>
                            <div class="col-md-7">
                                <p>Organic farming is a method that relies on natural processes and substances rather than synthetic chemicals.</p>
                                <h5>Key Principles:</h5>
                                <ul>
                                    <li>Avoid synthetic fertilizers and pesticides</li>
                                    <li>Promote biodiversity</li>
                                    <li>Use crop rotation and companion planting</li>
                                    <li>Maintain soil health through composting</li>
                                    <li>Implement natural pest management</li>
                                </ul>
                                <h5>Benefits:</h5>
                                <ul>
                                    <li>Healthier produce with fewer chemical residues</li>
                                    <li>Improved soil quality and reduced erosion</li>
                                    <li>Better water conservation</li>
                                    <li>Reduced pollution</li>
                                    <li>Support for local wildlife and pollinators</li>
                                </ul>
                            </div>
                           </div>`;
                break;
            case 'precision':
                title = 'Precision Agriculture';
                imageSrc = 'https://images.unsplash.com/photo-1586771107445-d3ca888129ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
                content = `<div class="row">
                            <div class="col-md-5">
                                <img src="${imageSrc}" class="img-fluid rounded mb-3" alt="Precision Agriculture">
                            </div>
                            <div class="col-md-7">
                                <p>Precision agriculture uses technology to optimize inputs and maximize yields while reducing environmental impact.</p>
                                <h5>Key Technologies:</h5>
                                <ul>
                                    <li>GPS guidance systems for tractors and equipment</li>
                                    <li>Variable rate technology for applying inputs</li>
                                    <li>Sensors for soil moisture, nutrients, and crop health</li>
                                    <li>Drones and satellite imagery for field monitoring</li>
                                    <li>Data analytics for decision-making</li>
                                </ul>
                                <h5>Benefits:</h5>
                                <ul>
                                    <li>Reduced input costs (fertilizer, water, pesticides)</li>
                                    <li>Increased crop yields</li>
                                    <li>Minimized environmental impact</li>
                                    <li>Better resource management</li>
                                    <li>Data-driven decision making</li>
                                </ul>
                            </div>
                           </div>`;
                break;
            case 'sustainable':
                title = 'Sustainable Harvesting';
                imageSrc = 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
                content = `<div class="row">
                            <div class="col-md-5">
                                <img src="${imageSrc}" class="img-fluid rounded mb-3" alt="Sustainable Harvesting">
                            </div>
                            <div class="col-md-7">
                                <p>Sustainable harvesting methods maintain long-term productivity while minimizing environmental impact.</p>
                                <h5>Key Practices:</h5>
                                <ul>
                                    <li>Timing harvests for optimal crop maturity</li>
                                    <li>Using appropriate equipment to minimize damage</li>
                                    <li>Implementing selective harvesting techniques</li>
                                    <li>Proper post-harvest handling and storage</li>
                                    <li>Minimizing waste and utilizing crop residues</li>
                                </ul>
                                <h5>Benefits:</h5>
                                <ul>
                                    <li>Improved crop quality and shelf life</li>
                                    <li>Reduced post-harvest losses</li>
                                    <li>Better resource efficiency</li>
                                    <li>Sustained soil health</li>
                                    <li>Consistent yields over time</li>
                                </ul>
                            </div>
                           </div>`;
                break;
            default:
                title = 'Farming Techniques';
                content = '<p>Information not available. Please try again later.</p>';
        }
        
        document.getElementById('techniqueModalLabel').textContent = title;
        document.getElementById('techniqueModalContent').innerHTML = content;
        techniqueModal.show();
    }

    // Function to show soil type information in a modal
    function showSoilInfo(soilType) {
        if (!soilModal) return;
        
        let title = '';
        let content = '';
        let imageSrc = '';
        
        switch(soilType) {
            case 'sandy':
                title = 'Sandy Soil';
                imageSrc = 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
                content = `<div class="row">
                            <div class="col-md-5">
                                <img src="${imageSrc}" class="img-fluid rounded mb-3" alt="Sandy Soil">
                            </div>
                            <div class="col-md-7">
                                <p>Sandy soil is light, warm, and dry with good drainage but poor nutrient content.</p>
                                <h5>Characteristics:</h5>
                                <ul>
                                    <li>Large particles with visible grains</li>
                                    <li>Drains quickly and warms up fast in spring</li>
                                    <li>Low in nutrients and organic matter</li>
                                    <li>Prone to drought and nutrient leaching</li>
                                    <li>Easy to work with and doesn't compact easily</li>
                                </ul>
                                <h5>Best Crops:</h5>
                                <ul>
                                    <li>Root vegetables (carrots, radishes, potatoes)</li>
                                    <li>Lettuce and other leafy greens</li>
                                    <li>Strawberries</li>
                                    <li>Melons</li>
                                    <li>Drought-tolerant herbs like rosemary and thyme</li>
                                </ul>
                                <h5>Management Tips:</h5>
                                <ul>
                                    <li>Add organic matter regularly to improve water retention</li>
                                    <li>Use mulch to reduce evaporation</li>
                                    <li>Consider drip irrigation for efficient water use</li>
                                    <li>Apply fertilizers in small, frequent doses</li>
                                </ul>
                            </div>
                           </div>`;
                break;
            case 'clay':
                title = 'Clay Soil';
                imageSrc = 'https://images.unsplash.com/photo-1621113767561-5638711a598f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
                content = `<div class="row">
                            <div class="col-md-5">
                                <img src="${imageSrc}" class="img-fluid rounded mb-3" alt="Clay Soil">
                            </div>
                            <div class="col-md-7">
                                <p>Clay soil is heavy, nutrient-rich, and retains water well but drains poorly.</p>
                                <h5>Characteristics:</h5>
                                <ul>
                                    <li>Small, dense particles that stick together when wet</li>
                                    <li>Slow to drain and warm up in spring</li>
                                    <li>High in nutrients and holds water well</li>
                                    <li>Can become compacted and hard when dry</li>
                                    <li>Difficult to work with when too wet or too dry</li>
                                </ul>
                                <h5>Best Crops:</h5>
                                <ul>
                                    <li>Late-season vegetables</li>
                                    <li>Cabbage and broccoli</li>
                                    <li>Beans and peas</li>
                                    <li>Perennial flowers</li>
                                    <li>Many shrubs and trees</li>
                                </ul>
                                <h5>Management Tips:</h5>
                                <ul>
                                    <li>Add organic matter to improve structure and drainage</li>
                                    <li>Avoid working soil when wet</li>
                                    <li>Consider raised beds for better drainage</li>
                                    <li>Add gypsum to help break up heavy clay</li>
                                </ul>
                            </div>
                           </div>`;
                break;
            case 'loam':
                title = 'Loam Soil';
                imageSrc = 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
                content = `<div class="row">
                            <div class="col-md-5">
                                <img src="${imageSrc}" class="img-fluid rounded mb-3" alt="Loam Soil">
                            </div>
                            <div class="col-md-7">
                                <p>Loam soil is the ideal growing medium, combining sand, silt, and clay for optimal conditions.</p>
                                <h5>Characteristics:</h5>
                                <ul>
                                    <li>Balanced mixture of sand, silt, and clay particles</li>
                                    <li>Excellent drainage and water retention</li>
                                    <li>Good nutrient content and fertility</li>
                                    <li>Crumbly texture that's easy to work with</li>
                                    <li>Warms up quickly in spring</li>
                                </ul>
                                <h5>Best Crops:</h5>
                                <ul>
                                    <li>Virtually all vegetables and fruits</li>
                                    <li>Annual and perennial flowers</li>
                                    <li>Herbs and spices</li>
                                    <li>Ornamental trees and shrubs</li>
                                    <li>Lawns and ground covers</li>
                                </ul>
                                <h5>Management Tips:</h5>
                                <ul>
                                    <li>Maintain organic matter with regular compost additions</li>
                                    <li>Use crop rotation to prevent nutrient depletion</li>
                                    <li>Apply mulch to conserve moisture and suppress weeds</li>
                                    <li>Consider cover crops during fallow periods</li>
                                </ul>
                            </div>
                           </div>`;
                break;
            default:
                title = 'Soil Information';
                content = '<p>Information not available. Please try again later.</p>';
        }
        
        document.getElementById('soilModalLabel').textContent = title;
        document.getElementById('soilModalContent').innerHTML = content;
        soilModal.show();
    }
});