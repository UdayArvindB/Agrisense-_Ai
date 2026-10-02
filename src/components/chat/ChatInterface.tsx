import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Send,
  Mic,
  MicOff,
  Image as ImageIcon,
  Sparkles,
  Database,
  FileText,
  User,
  Bot,
  RefreshCw,
  Quote,
  ShieldCheck,
  Languages,
} from 'lucide-react';
import { ChatMessage, LanguageCode } from '../../types/chat';
import { INITIAL_CHAT_MESSAGES, SUGGESTED_PROMPTS } from '../../data/mockChat';
import { sendChatMessage } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import { VoiceVisualizer } from './VoiceVisualizer';
import { SourceDetailModal } from '../disease/SourceDetailModal';
import { RetrievedSource } from '../../types/disease';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedSource, setSelectedSource] = useState<RetrievedSource | null>(null);
  const { language, setLanguage } = useLanguage();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  // Handle incoming query from disease detection or other pages
  useEffect(() => {
    if (location.state && (location.state as any).prefilledQuery) {
      const query = (location.state as any).prefilledQuery;
      setInputText(query);
    }
  }, [location.state]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage(textToSend, language);
      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: response.text || 'Recommendation synthesized.',
        sources: response.sources as RetrievedSource[],
        language: response.language,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMicToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    // Simulate voice dictation: in Telugu or English based on active language
    setTimeout(() => {
      setIsRecording(false);
      if (language === 'te') {
        setInputText('మీ టమాటా మొక్క ఆకులపై మచ్చలు ఎందుకు వస్తున్నాయి?');
      } else {
        setInputText('Why are my tomato leaves turning yellow with dark brown spots?');
      }
    }, 2800);
  };

  const handleImageAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const userMsg: ChatMessage = {
          id: `msg-${Date.now()}`,
          sender: 'user',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `[Attached Crop Foliage Image: ${file.name}] Please diagnose this disease.`,
          imageUrl: reader.result as string,
        };
        setMessages((prev) => [...prev, userMsg]);
        handleSend(`Please analyze this attached crop specimen and retrieve the applicable university extension advisory.`);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl border border-stone-200/90 shadow-xl shadow-stone-900/5 flex flex-col h-[750px] overflow-hidden">
      {/* Top Chat Bar */}
      <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white flex items-center justify-center shadow-md shadow-emerald-950/20">
            <Bot className="w-5 h-5 text-emerald-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base tracking-tight text-white">
                AgriSense AI Assistant
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-700/60 text-[10px] font-bold">
                RAG Grounded
              </span>
            </div>
            <p className="text-xs text-stone-400">
              Interactive Agronomic Decision Support & Extension Retrieval
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <VoiceVisualizer isListening={isRecording} />

          {/* Quick Language Toggle Pill */}
          <div className="flex items-center bg-stone-800 p-1 rounded-xl border border-stone-700 text-xs">
            <Languages className="w-3.5 h-3.5 text-stone-400 ml-1.5 mr-1" />
            {(['en', 'te', 'hi'] as LanguageCode[]).map((code) => (
              <button
                key={code}
                onClick={() => setLanguage(code)}
                className={`px-2.5 py-1 rounded-lg font-bold text-xs uppercase transition-all ${
                  language === code
                    ? 'bg-emerald-600 text-white'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-stone-50/60">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-9 h-9 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                </div>
              )}

              <div className={`max-w-[85%] sm:max-w-[75%] space-y-3`}>
                <div
                  className={`p-4 sm:p-5 rounded-3xl text-sm leading-relaxed ${
                    isUser
                      ? 'bg-emerald-700 text-white rounded-br-xs shadow-md shadow-emerald-950/10'
                      : 'bg-white text-stone-800 rounded-bl-xs border border-stone-200/90 shadow-sm'
                  }`}
                >
                  {/* Image Attachment Preview if present */}
                  {msg.imageUrl && (
                    <div className="mb-3 rounded-2xl overflow-hidden border border-emerald-500/30 max-h-48">
                      <img
                        src={msg.imageUrl}
                        alt="User uploaded crop foliage"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="whitespace-pre-wrap font-sans text-xs sm:text-sm">
                    {msg.text}
                  </div>

                  <div
                    className={`mt-2 text-[10px] text-right font-medium ${
                      isUser ? 'text-emerald-200' : 'text-stone-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {/* RAG Sources Grounding Panel below AI Message */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="bg-white/90 rounded-2xl p-4 border border-emerald-900/10 shadow-xs space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                      <Database className="w-3.5 h-3.5 text-emerald-600" />
                      <span>RAG Sources Used ({msg.sources.length} Documents):</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {msg.sources.map((src) => (
                        <div
                          key={src.id}
                          onClick={() => setSelectedSource(src)}
                          className="p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50/80 border border-stone-200 hover:border-emerald-300 cursor-pointer transition-colors text-left flex items-start justify-between gap-2 group"
                        >
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold text-emerald-700 uppercase block truncate">
                              {src.category}
                            </span>
                            <span className="text-xs font-bold text-stone-800 block truncate group-hover:text-emerald-900">
                              {src.title}
                            </span>
                            <span className="text-[10px] text-stone-500 block truncate">
                              {src.sourceOrg}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded shrink-0">
                            {src.relevanceScore}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-9 h-9 rounded-2xl bg-stone-800 text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <User className="w-4 h-4 text-stone-300" />
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3 items-center text-stone-500 text-xs italic">
            <div className="w-9 h-9 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shrink-0">
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-300" />
            </div>
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" />
              <span>Querying Agricultural Vector Store & Synthesizing Recommendations...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Pills */}
      <div className="px-4 py-2 bg-stone-100 border-t border-stone-200/80 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="font-bold text-stone-500 text-[10px] uppercase whitespace-nowrap">
          Suggested:
        </span>
        {SUGGESTED_PROMPTS.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSend(item.prompt)}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 border border-stone-200/90 whitespace-nowrap text-xs font-medium transition-colors shrink-0 shadow-2xs"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-stone-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          {/* Image Upload Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageAttach}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-3 rounded-2xl text-stone-500 hover:text-stone-800 hover:bg-stone-100 border border-stone-200 transition-colors"
            title="Attach Leaf Image"
            aria-label="Upload crop image"
          >
            <ImageIcon className="w-5 h-5" />
          </button>

          {/* Voice Microphone Button */}
          <button
            type="button"
            onClick={handleMicToggle}
            className={`p-3 rounded-2xl transition-all border ${
              isRecording
                ? 'bg-rose-600 text-white border-rose-700 shadow-md shadow-rose-900/20'
                : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100 border-stone-200'
            }`}
            title="Voice Input (Speech-to-Text)"
            aria-label="Voice input"
          >
            {isRecording ? <MicOff className="w-5 h-5 animate-pulse" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              language === 'te'
                ? 'మీ వ్యవసాయ ప్రశ్నను ఇక్కడ అడగండి (ఉదా: ఆకుమచ్చల నివారణ)...'
                : 'Ask AgriSense AI a farming question (e.g. Early Blight treatments, fertilizer dosages)...'
            }
            className="flex-1 px-4 py-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm text-stone-900 placeholder:text-stone-400"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="px-5 py-3 rounded-2xl font-bold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-950/15"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>

      {/* Source Modal */}
      <SourceDetailModal
        source={selectedSource}
        onClose={() => setSelectedSource(null)}
      />
    </div>
  );
};
