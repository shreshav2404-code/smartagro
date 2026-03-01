// JavaScript for handling farming techniques and soil information sections

document.addEventListener('DOMContentLoaded', function() {
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
        let title = '';
        let content = '';
        
        switch(technique) {
            case 'organic':
                title = 'Organic Farming';
                content = `<p>Organic farming is a method that relies on natural processes and substances rather than synthetic chemicals.</p>
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
                           </ul>`;
                break;
            case 'precision':
                title = 'Precision Agriculture';
                content = `<p>Precision agriculture uses technology to optimize inputs and maximize yields while reducing environmental impact.</p>
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
                           </ul>`;
                break;
            case 'sustainable':
                title = 'Sustainable Harvesting';
                content = `<p>Sustainable harvesting methods maintain long-term productivity while minimizing environmental impact.</p>
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
                           </ul>`;
                break;
            default:
                title = 'Farming Techniques';
                content = '<p>Information not available. Please try again later.</p>';
        }
        
        showInfoModal(title, content);
    }

    // Function to show soil type information in a modal
    function showSoilInfo(soilType) {
        let title = '';
        let content = '';
        
        switch(soilType) {
            case 'sandy':
                title = 'Sandy Soil';
                content = `<p>Sandy soil is light, warm, and dry with good drainage but poor nutrient content.</p>
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
                           </ul>`;
                break;
            case 'clay':
                title = 'Clay Soil';
                content = `<p>Clay soil is heavy, cold, and nutrient-rich with poor drainage but good water retention.</p>
                           <h5>Characteristics:</h5>
                           <ul>
                               <li>Small, dense particles that stick together when wet</li>
                               <li>Slow to drain and warm up in spring</li>
                               <li>High in nutrients and minerals</li>
                               <li>Prone to compaction and waterlogging</li>
                               <li>Can be difficult to work with when too wet or too dry</li>
                           </ul>
                           <h5>Best Crops:</h5>
                           <ul>
                               <li>Brassicas (cabbage, broccoli, Brussels sprouts)</li>
                               <li>Beans and peas</li>
                               <li>Summer vegetables like tomatoes and peppers</li>
                               <li>Perennial flowers</li>
                               <li>Fruit trees and berry bushes</li>
                           </ul>
                           <h5>Management Tips:</h5>
                           <ul>
                               <li>Add organic matter to improve drainage and structure</li>
                               <li>Avoid working soil when wet to prevent compaction</li>
                               <li>Consider raised beds for better drainage</li>
                               <li>Add gypsum to help break up heavy clay</li>
                           </ul>`;
                break;
            case 'silt':
                title = 'Silt Soil';
                content = `<p>Silt soil is fertile and well-draining with good water retention and nutrient content.</p>
                           <h5>Characteristics:</h5>
                           <ul>
                               <li>Medium-sized particles between sand and clay</li>
                               <li>Smooth and slippery when wet</li>
                               <li>Good water retention and drainage</li>
                               <li>Naturally fertile with good nutrient content</li>
                               <li>Can form a crust when dry</li>
                           </ul>
                           <h5>Best Crops:</h5>
                           <ul>
                               <li>Most vegetables and annual flowers</li>
                               <li>Ornamental trees and shrubs</li>
                               <li>Fruit trees and berry bushes</li>
                               <li>Climbing plants and vines</li>
                               <li>Perennial flowers</li>
                           </ul>
                           <h5>Management Tips:</h5>
                           <ul>
                               <li>Add organic matter to improve structure</li>
                               <li>Use mulch to prevent crusting</li>
                               <li>Avoid overworking to prevent compaction</li>
                               <li>Consider cover crops to prevent erosion</li>
                           </ul>`;
                break;
            case 'loam':
                title = 'Loam Soil';
                content = `<p>Loam soil is the ideal growing medium, combining sand, silt, and clay for optimal conditions.</p>
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
                           </ul>`;
                break;
            default:
                title = 'Soil Information';
                content = '<p>Information not available. Please try again later.</p>';
        }
        
        showInfoModal(title, content);
    }

    // Function to display information in a modal
    function showInfoModal(title, content) {
        // Check if modal already exists, if not create it
        let infoModal = document.getElementById('infoModal');
        if (!infoModal) {
            const modalHTML = `
                <div class="modal fade" id="infoModal" tabindex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="infoModalLabel"></h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            const modalContainer = document.createElement('div');
            modalContainer.innerHTML = modalHTML;
            document.body.appendChild(modalContainer.firstElementChild);
            infoModal = document.getElementById('infoModal');
        }

        // Set modal content
        document.getElementById('infoModalLabel').textContent = title;
        infoModal.querySelector('.modal-body').innerHTML = content;

        // Show the modal
        const modal = new bootstrap.Modal(infoModal);
        modal.show();
    }
});