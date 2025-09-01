import { useRef, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useChat }  from '../../hooks/useChat';
import { fetchChat } from './api';
import Icon from '../../components/Icon/Icon'
import './Chat.css';

const Chat = ({ chatHistory, onCloseChat, setActiveProjectData }) => {
  const chatMessagesRef = useRef(null);
  const fileInputRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    fetchChat(chatHistory);
  });

  const { chatInput, setChatInput, handleChatSubmit, handleFileUpload } = 
    useChat(setActiveProjectData);

  // Efek untuk auto-scroll ketika ada pesan baru
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleChatSubmit();
    }
  };
  // Logika untuk menampilkan atau menyembunyikan tombol scroll
  const handleScroll = () => {
    if (chatMessagesRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatMessagesRef.current;
      const isScrolledToBottom = scrollHeight - scrollTop <= clientHeight + 50; // Tambahkan toleransi 50px
      setShowScrollButton(!isScrolledToBottom);
    }
  };

  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3 className="chat-title">Chat AI</h3>
        <button className="close-chat-button" onClick={onCloseChat}>
          <X size={15} />
        </button>
      </div>
      <div
        className="chat-messages"
        ref={chatMessagesRef}
        onScroll={handleScroll} // Tambahkan event onScroll
      >
        {chatHistory.map(chat => (
          <div key={chat.id} className={`message ${chat.user}-message`}>
            {chat.text}
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => handleFileUpload(e.target.files)}
        />
        <button className="file-upload-button" onClick={() => fileInputRef.current.click()}>
          <Icon name='folderUp'/>
        </button>
        <input
          type="text"
          className="chat-input-field"
          placeholder="Ketik pesan Anda..."
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="send-button" onClick={handleChatSubmit}>
          Kirim
        </button>
      </div>
      {showScrollButton && (
        <button className="scroll-to-bottom-button" onClick={scrollToBottom}>
          ↓
        </button>
      )}
    </div>
  );
};

export default Chat;