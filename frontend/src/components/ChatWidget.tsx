import React, { useState, useRef, useEffect } from 'react';
import { dataAPI } from '../services/api';
import { useLanguage } from '../contexts/LanguageContext';
import { BsChatDotsFill, BsXLg, BsRobot, BsSend } from 'react-icons/bs';

interface Message { role: 'user' | 'bot'; text: string; }

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Hello! I am your GreenIQ farming assistant. Ask me anything about agriculture!' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);
    try {
      const res = await dataAPI.getChat(userMsg);
      setMessages((prev) => [...prev, { role: 'bot', text: res.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'bot', text: 'Sorry, I could not process your request. Please try again.' }]);
    } finally { setLoading(false); }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} title={t('chat') || 'Chat'}
        className={isOpen ? '' : 'pulse'}
        style={{
          position: 'fixed', bottom: '20px', right: '20px', width: '56px', height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #5a9e6f, #7bb88a)',
          color: '#fff', border: 'none', cursor: 'pointer',
          boxShadow: '0 3px 15px rgba(90, 158, 111, 0.35)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease', fontSize: '22px',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      >
        {isOpen ? <BsXLg /> : <BsChatDotsFill />}
      </button>

      {isOpen && (
        <div className="chat-window-animated" style={{
          position: 'fixed', bottom: '88px', right: '20px', width: '370px',
          maxWidth: 'calc(100vw - 40px)', height: '480px', maxHeight: 'calc(100vh - 120px)',
          borderRadius: '18px', overflow: 'hidden', display: 'flex', flexDirection: 'column',
          boxShadow: '0 8px 40px rgba(0,0,0,0.12)', zIndex: 999,
          background: 'var(--bg-color, #faf9f7)',
          border: '1px solid rgba(0,0,0,0.06)',
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #5a9e6f, #7bb88a, #a8d5b8)',
            color: '#fff', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '12px',
              background: 'rgba(255,255,255,0.2)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: '18px',
            }}>
              <BsRobot />
            </div>
            <div>
              <div style={{ fontWeight: '600', fontSize: '15px' }}>GreenIQ Assistant</div>
              <div style={{ fontSize: '12px', opacity: 0.85 }}>
                {loading ? 'Typing...' : 'Online'}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '16px',
            display: 'flex', flexDirection: 'column', gap: '10px',
          }}>
            {messages.map((msg, idx) => (
              <div key={idx}
                className={msg.role === 'user' ? 'chat-msg-user' : 'chat-msg-bot'}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #5a9e6f, #7bb88a)'
                    : 'var(--card-bg, #fff)',
                  color: msg.role === 'user' ? '#fff' : 'var(--text-color, #3a3a3a)',
                  padding: '11px 15px', maxWidth: '82%', fontSize: '14px',
                  lineHeight: '1.5', wordBreak: 'break-word',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  boxShadow: msg.role === 'user'
                    ? '0 2px 8px rgba(90, 158, 111, 0.2)'
                    : '0 1px 4px rgba(0,0,0,0.04)',
                }}>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="chat-msg-bot" style={{
                alignSelf: 'flex-start', background: 'var(--card-bg, #fff)',
                padding: '14px 20px', borderRadius: '16px 16px 16px 4px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                display: 'flex', alignItems: 'center', gap: '2px',
              }}>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '12px 16px', borderTop: '1px solid rgba(0,0,0,0.05)',
            display: 'flex', gap: '10px', alignItems: 'center',
          }}>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
              placeholder="Ask about farming..."
              className="form-control"
              style={{ fontSize: '14px', borderRadius: '20px', padding: '10px 16px', border: '1.5px solid #ddd', transition: 'border-color 0.3s ease' }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#7bb88a'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = '#ddd'; }}
              disabled={loading} />
            <button onClick={handleSend} disabled={loading || !input.trim()}
              style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: input.trim() ? 'linear-gradient(135deg, #5a9e6f, #7bb88a)' : '#ddd',
                border: 'none', color: '#fff', display: 'flex',
                alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                transition: 'background 0.3s ease, transform 0.2s ease', flexShrink: 0,
              }}>
              <BsSend />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
