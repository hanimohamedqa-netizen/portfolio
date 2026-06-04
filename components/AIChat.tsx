'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Hani's AI assistant. Ask me anything about his experience, skills, or projects!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (questionText?: string) => {
    const messageText = (typeof questionText === 'string' ? questionText : input).trim();
    if (!messageText || isLoading) return;

    if (typeof questionText !== 'string') {
      setInput('');
    }

    setMessages((prev) => [...prev, { role: 'user', content: messageText }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.response || 'Sorry, I encountered an error. Please try again.' },
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    "What's his experience?",
    "Tell me about projects",
    "What skills does he have?",
    "Any certifications?",
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-coral text-white p-4 rounded-full shadow-2xl z-50 hover:bg-coral/90 hover:shadow-[0_0_20px_rgba(250,91,96,0.6)] transition-all flex items-center justify-center"
        aria-label="Open AI Assistant"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
 
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-20 sm:bottom-24 right-4 sm:right-8 w-[calc(100vw-2rem)] sm:w-[400px] h-[500px] sm:h-[600px] bg-[#1a1c23] border border-[#333333] rounded overflow-hidden shadow-2xl z-50 flex flex-col"
          >
            {/* IDE Header Bar */}
            <div className="w-full h-12 bg-[#1a1c23] border-b border-[#333333] flex items-center justify-between px-5 z-20 relative select-none">
              <div className="flex items-center gap-2">
                {/* Mock Window Dots */}
                <div className="w-3 h-3 rounded-full bg-coral/80" />
                <div className="w-3 h-3 rounded-full bg-gray-600" />
                <div className="w-3 h-3 rounded-full bg-gray-600" />
                <span className="ml-2.5 text-gray-400 text-xs font-mono tracking-widest">hani_assistant.sh</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-[#23262f] rounded text-gray-400 hover:text-white transition-colors"
                title="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Welcome Agent Banner */}
            <div className="bg-[#23262f] px-6 py-4 border-b border-[#333333] flex items-center gap-3 select-none">
              <div className="p-2 bg-coral/10 rounded text-coral">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">Hani&apos;s AI Agent</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Ask about testing &amp; QA experience</p>
              </div>
            </div>
 
            {/* Messages Log area */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-[#1a1c23] scrollbar-thin">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} w-full`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded border text-sm leading-relaxed shadow-md ${
                      msg.role === 'user'
                        ? 'bg-[#23262f] border-[#333333] border-l-4 border-l-coral text-white'
                        : 'bg-[#23262f]/60 border-[#333333] border-l-4 border-l-gray-500 text-gray-300'
                    }`}
                  >
                    {/* Log details top indicator */}
                    <div className="flex items-center justify-between gap-4 mb-2 select-none opacity-40 text-[9px] font-mono tracking-widest uppercase">
                      <span>{msg.role === 'user' ? 'USER_INPUT' : 'AGENT_RESPONSE'}</span>
                      <span>{msg.role === 'user' ? 'HANI_PORTFOLIO' : 'QA_BOT'}</span>
                    </div>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
 
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#23262f]/60 p-4 rounded border border-[#333333] border-l-4 border-l-gray-500 text-gray-300 max-w-[85%] shadow-md">
                    <div className="flex items-center justify-between gap-4 mb-2 select-none opacity-40 text-[9px] font-mono tracking-widest uppercase">
                      <span>AGENT_RESPONSE</span>
                      <span>QA_BOT</span>
                    </div>
                    <div className="flex gap-1.5 py-1 px-2">
                      <motion.div
                        className="w-1.5 h-1.5 bg-coral rounded-full"
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-1.5 h-1.5 bg-coral rounded-full"
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-1.5 h-1.5 bg-coral rounded-full"
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
 
              <div ref={messagesEndRef} />
            </div>
 
            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="px-6 py-3.5 bg-[#23262f] border-t border-[#333333] select-none">
                <p className="text-[10px] text-gray-500 mb-2 font-bold uppercase tracking-widest">Quick Actions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSend(question)}
                      className="text-[11px] font-bold uppercase tracking-wider bg-[#1a1c23] hover:bg-coral text-gray-400 hover:text-white px-3 py-2 rounded border border-[#333333] hover:border-coral transition-all cursor-pointer"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
 
            {/* Input Form area */}
            <div className="p-4 bg-[#23262f] border-t border-[#333333]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 bg-[#1a1c23] border border-[#333333] rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-coral transition-colors text-sm font-sans"
                  disabled={isLoading}
                />
                <motion.button
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-coral text-white px-4 rounded hover:bg-coral/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md flex items-center justify-center"
                  title="Send message"
                >
                  <Send size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
