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
      {/* Floating Action Button with pulse */}
      <button onClick={() => setIsOpen(!isOpen)} title={t('chat') || 'Chat'}
        className={isOpen ? '' : 'pulse'}
        style={{
          position: 'fixed', bottom: '20px', right: '20px', width: '60px', height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1b5e20, #2e7d32, #4caf50)',
          color: '#fff', border: 'none', cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(46, 125, 50, 0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease', fontSize: '24px',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      >
        {isOpen ? <BsXLg /> : <BsChatDotsFill />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window-animated" style={{
          position: 'fixed', bottom: '90px', right: '20px', width: '380px',
          maxWidth: 'calc(100vw - 40px)', height: '500px', maxHeight: 'calc(100vh - 120px)',
          borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column',
          boxShadow: '0 12px 50px rgba(0,0,0,0.25)', zIndex: 999,
          background: 'var(--bg-color, #fff)',
          border: '1px solid rgba(0,0,0,0.08)',
        }}>
          {/* Gradient Header */}
          <div style={{
            background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 40%, #43a047 70%, #66bb6a 100%)',
            color: '#fff', padding: '18px 22px', display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: '20px',
              backdropFilter: 'blur(10px)',
            }}>
              <BsRobot />
            </div>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>GreenIQ Assistant</div>
              <div style={{ fontSize: '12px', opacity: 0.85 }}>
                {loading ? 'Typing...' : 'Online — Ask anything'}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '16px',
            display: 'flex', flexDirection: 'column', gap: '10px',
            background: 'var(--bg-color, #f8faf8)',
          }}>
            {messages.map((msg, idx) => (
              <div key={idx}
                className={msg.role === 'user' ? 'chat-msg-user' : 'chat-msg-bot'}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #1b5e20, #2e7d32, #43a047)'
                    : 'var(--card-bg, #fff)',
                  color: msg.role === 'user' ? '#fff' : 'var(--text-color, #333)',
                  padding: '12px 16px', maxWidth: '82%', fontSize: '14px',
                  lineHeight: '1.5', wordBreak: 'break-word',
                  borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  boxShadow: msg.role === 'user'
                    ? '0 3px 12px rgba(46, 125, 50, 0.3)'
                    : '0 2px 8px rgba(0,0,0,0.06)',
                }}>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="chat-msg-bot" style={{
                alignSelf: 'flex-start', background: 'var(--card-bg, #fff)',
                padding: '14px 20px', borderRadius: '18px 18px 18px 4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                display: 'flex', alignItems: 'center', gap: '2px',
              }}>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{
            padding: '12px 16px', borderTop: '1px solid rgba(0,0,0,0.06)',
            display: 'flex', gap: '10px', alignItems: 'center',
            background: 'var(--bg-color, #fff)',
          }}>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
              placeholder="Ask about farming..."
              className="form-control"
              style={{ fontSize: '14px', borderRadius: '25px', padding: '10px 18px', border: '2px solid #e0e0e0', transition: 'border-color 0.3s ease' }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#4caf50'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = '#e0e0e0'; }}
              disabled={loading} />
            <button onClick={handleSend} disabled={loading || !input.trim()}
              className="btn-animate"
              style={{
                width: '42px', height: '42px', borderRadius: '50%',
                background: input.trim() ? 'linear-gradient(135deg, #1b5e20, #4caf50)' : '#ccc',
                border: 'none', color: '#fff', display: 'flex',
                alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                transition: 'background 0.3s ease, transform 0.2s ease',
                flexShrink: 0,
              }}>
              <BsSend />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
