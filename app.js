document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Floating chat sidebar logic
    const openChatBtn = document.getElementById('open-chat-btn');
    const chatSidebar = document.getElementById('chat-sidebar');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    if (openChatBtn && chatSidebar && closeChatBtn) {
        openChatBtn.addEventListener('click', () => {
            chatSidebar.classList.add('open');
            chatInput.focus();
        });
        closeChatBtn.addEventListener('click', () => {
            chatSidebar.classList.remove('open');
        });
    }

    if (chatForm) {
        chatForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const userMsg = chatInput.value.trim();
            if (!userMsg) return;
            appendMessage(userMsg, 'user');
            chatInput.value = '';
            chatInput.disabled = true;
            const loadingBubble = appendMessage('Thinking...', 'ai', true);
            try {
                const response = await fetch('/api/ai_assistant/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: userMsg })
                });
                const data = await response.json();
                loadingBubble.remove();
                if (data.reply) {
                    appendMessage(data.reply, 'ai');
                } else {
                    appendMessage('Sorry, I could not get a response.', 'ai');
                }
            } catch (err) {
                loadingBubble.remove();
                appendMessage('Error connecting to AI assistant.', 'ai');
            } finally {
                chatInput.disabled = false;
                chatInput.focus();
            }
        });
    }

    function appendMessage(text, sender, isLoading) {
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble ' + sender;
        if (isLoading) bubble.style.opacity = 0.6;
        bubble.textContent = text;
        const timestamp = document.createElement('span');
        timestamp.className = 'timestamp';
        const now = new Date();
        timestamp.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        bubble.appendChild(timestamp);
        chatMessages.appendChild(bubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return bubble;
    }

    // Fetch and display crops in both crop-list and crop-info-list
    fetch('http://127.0.0.1:8000/api/crops/')
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
});
