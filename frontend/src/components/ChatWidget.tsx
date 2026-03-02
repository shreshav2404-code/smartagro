import React, { useState, useRef, useEffect } from 'react';
import { dataAPI } from '../services/api';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Hello! I am your GreenIQ farming assistant. Ask me anything about agriculture! 🌱' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await dataAPI.getChat(userMsg);
      setMessages((prev) => [...prev, { role: 'bot', text: res.message }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'bot', text: 'Sorry, I could not process your request. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className="chat-fab"
        onClick={() => setIsOpen(!isOpen)}
        title={t('chat') || 'Chat'}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #2e7d32, #4caf50)',
          color: '#fff',
          border: 'none',
          fontSize: '28px',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(46, 125, 50, 0.4)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.3s',
        }}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="chat-window"
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '350px',
            maxWidth: 'calc(100vw - 40px)',
            height: '450px',
            maxHeight: 'calc(100vh - 120px)',
            borderRadius: '16px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
            zIndex: 999,
            background: 'var(--bg-color, #fff)',
            border: '1px solid var(--border-color, #e0e0e0)',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #2e7d32, #4caf50)',
              color: '#fff',
              padding: '15px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            🤖 GreenIQ AI Assistant
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '15px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #2e7d32, #4caf50)'
                    : 'var(--card-bg, #f5f5f5)',
                  color: msg.role === 'user' ? '#fff' : 'var(--text-color, #333)',
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  maxWidth: '80%',
                  fontSize: '14px',
                  lineHeight: '1.4',
                  wordBreak: 'break-word',
                }}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  background: 'var(--card-bg, #f5f5f5)',
                  color: 'var(--text-color, #999)',
                  padding: '10px 14px',
                  borderRadius: '16px 16px 16px 4px',
                  fontSize: '14px',
                }}
              >
                Thinking... 🌿
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: '10px 15px',
              borderTop: '1px solid var(--border-color, #e0e0e0)',
              display: 'flex',
              gap: '8px',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about farming..."
              className="form-control"
              style={{ fontSize: '14px' }}
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="btn btn-success"
              style={{ whiteSpace: 'nowrap' }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};
