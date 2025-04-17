"use client";

import { useEffect, useRef, useState } from 'react';
import './chatbot.css';

const chatbot = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Xin chào! Tôi có thể giúp gì cho bạn về các sản phẩm giày?'
    }
  ]);
  const [input, setInput] = useState('');
  const messagesRef = useRef<HTMLDivElement>(null);

  const chatbotApiUrl = process.env.NEXT_PUBLIC_CHATBOT_API_URL || 'http://localhost:8000';

  useEffect(() => {
    checkApiConnection();
  }, []);

  const checkApiConnection = async () => {
    try {
      const response = await fetch(`${chatbotApiUrl}/api/health`);
      if (!response.ok) {
        throw new Error('API không phản hồi đúng');
      }
    } catch (error) {
      console.error('Không thể kết nối đến API:', error);
      addMessage('bot', 'Xin lỗi, hiện tại tôi không thể kết nối đến hệ thống. Vui lòng thử lại sau.');
    }
  };

  const addMessage = (sender: 'user' | 'bot', text: string) => {
    setMessages(prev => [...prev, { sender, text }]);
    setTimeout(() => {
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    }, 100);
  };

  const sendMessage = async () => {
    const message = input.trim();
    if (!message) return;
    addMessage('user', message);
    setInput('');

    addMessage('bot', '<div class="loading-dots"><span></span><span></span><span></span></div>');

    try {
      const res = await fetch(`${chatbotApiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });
      const data = await res.json();
      setMessages(prev => prev.slice(0, -1)); // remove loading
      if (data.status === 'success') {
        addMessage('bot', data.response);
      } else {
        addMessage('bot', 'Xin lỗi, tôi không thể xử lý yêu cầu của bạn lúc này.');
      }
    } catch (error: any) {
      setMessages(prev => prev.slice(0, -1));
      console.error('Error:', error);
      addMessage('bot', `Xin lỗi, đã xảy ra lỗi: ${error.message}. Vui lòng thử lại sau.`);
    }
  };

  const formatMessage = (text: string) => {
    let processed = text.replace(/(Tên|Giá|Mô tả|Thông số kỹ thuật):/g, '<b>$1:</b>');
  
    processed = processed.replace(/Hình ảnh:\s*(https?:\/\/[^\s]+)/gi, (match, url) => {
      return `<img src="${url}" alt="Hình ảnh sản phẩm" loading="lazy" style="max-width: 100%; height: auto; display: block; margin-top: 10px; border-radius: 8px;">`;
    });
  
    return processed;
  };
  
  

  if (collapsed) {
    return (
      <div id="chatbot-icon" onClick={() => setCollapsed(false)}>
        <img
          src="/icon-chatbot.png"
          alt="Chatbot Icon"  
          style={{ width: '40px', height: '40px' }}
        />
      </div>
    );
  }
  
  return (
    <div id="chatbot-container">
      <div id="chatbot-header" onClick={() => setCollapsed(true)}>
        <div>👟trợ lí giày</div>
        <div id="chatbot-toggle">⨉</div>
      </div>

      <div id="chatbot-messages" ref={messagesRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}-message`}>
            <div
              className="formatted-message"
              dangerouslySetInnerHTML={{ __html: msg.sender === 'bot' ? formatMessage(msg.text) : msg.text }}
            />
          </div>
        ))}
      </div>
      <div id="chatbot-input-container">
        <input
          type="text"
          id="chatbot-input"
          placeholder="Nhập tin nhắn..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && sendMessage()}
        />
        <button id="chatbot-send" onClick={sendMessage}>Gửi</button>
      </div>
    </div>
  );
};

export default chatbot;
