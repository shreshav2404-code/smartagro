document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Backend API base URL; set window.BACKEND_URL = 'https://your-backend.example.com' to override
    const API_BASE = (typeof window !== 'undefined' && window.BACKEND_URL ? String(window.BACKEND_URL) : '').replace(/\/$/, '');
    // Floating chat sidebar logic
    const openChatBtn = document.getElementById('open-chat-btn');
    const chatSidebar = document.getElementById('chat-sidebar');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const imageUpload = document.getElementById('image-upload');
    const imageUploadLabel = document.querySelector('label[for="image-upload"]');
    let selectedImage = null;

    if (openChatBtn && chatSidebar && closeChatBtn) {
        openChatBtn.addEventListener('click', () => {
            chatSidebar.classList.add('open');
            // Improved focus for in-app browsers (Instagram/Telegram)
            setTimeout(() => {
                chatInput.focus();
                // Ensure the input is visible even in restricted webviews
                chatInput.scrollIntoView({ behavior: 'auto', block: 'center' });
            }, 500);
        });
        closeChatBtn.addEventListener('click', () => {
            chatSidebar.classList.remove('open');
        });
    }

    // Comprehensive mobile experience fix for in-app browsers
    if (chatInput) {
        const handleVisualViewportResize = () => {
            if (window.visualViewport && chatSidebar.classList.contains('open')) {
                const viewportHeight = window.visualViewport.height;
                chatSidebar.style.height = `${viewportHeight}px`;
                chatInput.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        };

        chatInput.addEventListener('focus', () => {
            // Force scroll for browsers that don't auto-resize height
            setTimeout(() => {
                window.scrollTo(0, 0); 
                document.body.scrollTop = 0;
                chatInput.scrollIntoView({ behavior: 'smooth', block: 'end' });
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 300);
        });

        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', handleVisualViewportResize);
            window.visualViewport.addEventListener('scroll', handleVisualViewportResize);
        }
    }

    // Image upload handling - only add event listener if element exists
    if (imageUpload) {
        // Ensure reselecting the same file triggers change by clearing value before open
        if (imageUploadLabel) {
            imageUploadLabel.addEventListener('click', () => {
                imageUpload.value = '';
            });
        }

        imageUpload.addEventListener('change', function(e) {
            const file = e.target.files && e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                selectedImage = file;
                // Show image preview or notification
                appendImagePreview(file);
            }
        });
    } else {
        console.error('Image upload element not found');
    }

    if (chatForm) {
        
        chatForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const userMsg = chatInput.value.trim();
            if (!userMsg && !selectedImage) return;
            
            if (selectedImage) {
                // Show user's message with image
                appendMessage(userMsg || 'Image uploaded', 'user', false, selectedImage);
            } else {
                // Show just the text message
                appendMessage(userMsg, 'user');
            }
            
            chatInput.value = '';
            chatInput.disabled = true;
            const loadingBubble = appendMessage('Thinking...', 'ai', true);
            
            try {
                let requestData;
                let response;
                
                if (selectedImage) {
                    // Handle image upload with FormData
                    const formData = new FormData();
                    formData.append('message', userMsg || '');
                    formData.append('image', selectedImage);
                    
                    response = await fetch(`${API_BASE}/api/ai_assistant_image/`, {
                        method: 'POST',
                        body: formData
                    });
                } else {
                    // Regular text message
                    response = await fetch(`${API_BASE}/api/ai_assistant/`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ message: userMsg })
                    });
                }
                
                console.log('AI assistant response:', response);
                const data = await response.json();
                console.log('AI assistant data:', data);
                loadingBubble.remove();
                
                if (data.reply) {
                    appendMessage(data.reply, 'ai');
                } else {
                    appendMessage('Sorry, I could not get a response.', 'ai');
                }
                
                // Reset selected image and clear UI preview/input
                selectedImage = null;
                if (imageUpload) imageUpload.value = '';
                const existingNotification = document.querySelector('.image-notification');
                if (existingNotification) existingNotification.remove();
                
            } catch (err) {
                console.error('Error connecting to AI assistant:', err);
                loadingBubble.remove();
                appendMessage('Error connecting to AI assistant.', 'ai');
            } finally {
                chatInput.disabled = false;
                chatInput.focus();
            }
        });
    }

    function appendMessage(text, sender, isLoading, image = null) {
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble ' + sender;
        if (isLoading) bubble.style.opacity = 0.6;
        
        // Create text content
        const textElement = document.createElement('div');
        textElement.textContent = text;
        bubble.appendChild(textElement);
        
        // Add image if provided
        if (image) {
            const imgElement = document.createElement('img');
            imgElement.className = 'chat-image';
            imgElement.src = URL.createObjectURL(image);
            imgElement.alt = 'Uploaded image';
            imgElement.onclick = () => window.open(imgElement.src, '_blank');
            bubble.appendChild(imgElement);
        }
        
        // Add timestamp
        const timestamp = document.createElement('span');
        timestamp.className = 'timestamp';
        const now = new Date();
        timestamp.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        bubble.appendChild(timestamp);
        
        chatMessages.appendChild(bubble);
        // Ensure scroll to bottom happens after DOM update
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 0);
        return bubble;
    }
    
    function appendImagePreview(file) {
        // Create notification that image is selected
        const notification = document.createElement('div');
        notification.className = 'image-notification';
        notification.textContent = `Image selected: ${file.name}`;

        // Add a small preview
        const preview = document.createElement('img');
        preview.className = 'image-preview';
        preview.src = URL.createObjectURL(file);
        preview.alt = 'Image preview';

        // Add remove button
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'image-remove-btn';
        removeBtn.textContent = '✕';
        removeBtn.title = 'Remove image';
        removeBtn.style.marginLeft = '8px';
        removeBtn.addEventListener('click', () => {
            selectedImage = null;
            if (imageUpload) imageUpload.value = '';
            notification.remove();
        });

        notification.appendChild(preview);
        notification.appendChild(removeBtn);

        // Add to chat form as visual feedback
        const chatForm = document.getElementById('chat-form');
        const existingNotification = document.querySelector('.image-notification');

        if (existingNotification) {
            existingNotification.remove();
        }

        // Insert at the beginning of the form
        if (chatForm.firstChild) {
            chatForm.insertBefore(notification, chatForm.firstChild);
        } else {
            chatForm.appendChild(notification);
        }
    }

    // Fetch and display crops in both crop-list and crop-info-list
    fetch(`${API_BASE}/api/crops/`)
        .then(response => response.json())
        .then(data => {
            const cropList = document.getElementById('crop-list');
            const cropInfoList = document.getElementById('crop-info-list');
            cropList.innerHTML = '';
            cropInfoList.innerHTML = '';
            data.crops.forEach(crop => {
                const imgUrl = crop.image_url || 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80';
                const cropCard = `
                    <div class="col-md-4 mb-4">
                        <div class="card text-center h-100">
                            <img src="${imgUrl}" alt="${crop.name}" class="crop-img">
                            <div class="card-body">
                                <h5 class="card-title">${crop.name}</h5>
                                <p class="card-text">${crop.description}</p>
                            </div>
                        </div>
                    </div>
                `;
                cropList.innerHTML += cropCard;
                cropInfoList.innerHTML += cropCard;
            });
        })
        .catch(error => {
            const cropList = document.getElementById('crop-list');
            if (cropList) cropList.innerHTML = '<div class="col-12 text-danger">Error fetching crop data.</div>';
        });

    // Populate News Marquee
    (function populateNewsMarquee() {
        const marquee = document.getElementById('news-marquee-content');
        if (!marquee) return;

        const items = [
            { label: 'Govt', text: 'MSP updated for Kharif crops FY 2025-26', href: '#' },
            { label: 'Advisory', text: 'Monsoon advisory: prepare drainage for heavy rains', href: '#' },
            { label: 'Scheme', text: 'Subsidy on drip irrigation equipment announced', href: '#' },
            { label: 'Alert', text: 'Locust activity reported in western region', href: '#' },
            { label: 'Market', text: 'Wheat prices steady; check local mandi rates', href: '#' },
            { label: 'Training', text: 'Free soil health workshop next week', href: '#' }
        ];

        marquee.innerHTML = items.map(item => `
            <span class="news-item">
                <span class="badge rounded-pill">${item.label}</span>
                <a href="${item.href}" target="_blank" rel="noopener">${item.text}</a>
            </span>
        `).join('');
    })();

    // Hover pause fallback for browsers (e.g., Edge)
    (function marqueeHoverPauseFallback() {
        const bar = document.querySelector('.news-marquee');
        const content = document.querySelector('.news-marquee .marquee-content');
        if (!bar || !content) return;

        const pause = () => { content.style.animationPlayState = 'paused'; };
        const resume = () => { content.style.animationPlayState = 'running'; };

        bar.addEventListener('mouseenter', pause);
        bar.addEventListener('mouseleave', resume);
        bar.addEventListener('focusin', pause);
        bar.addEventListener('focusout', resume);
        bar.addEventListener('touchstart', pause, { passive: true });
        bar.addEventListener('touchend', resume);
    })();
});
