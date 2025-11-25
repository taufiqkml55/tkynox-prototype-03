
import React from 'react';

interface ChatInputProps {
    inputValue: string;
    setInputValue: (v: string) => void;
    onSend: () => void;
    isThinking: boolean;
    userExists: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ inputValue, setInputValue, onSend, isThinking, userExists }) => {
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          onSend();
        }
    };

    return (
        <div className="p-3 bg-[#080808] border-t border-[#222]">
            <div className="flex items-center gap-2 bg-[#050505] border border-[#333] px-3 rounded-sm focus-within:border-[var(--tk-neon)] transition-colors">
              <span className="text-[var(--tk-neon)] text-xs font-mono select-none animate-pulse">&gt;_</span>
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={userExists ? "ENTER_COMMAND..." : "INIT_CHAT..."}
                aria-label="Command Input"
                className="flex-1 bg-transparent border-none text-white px-0 py-3 text-xs outline-none placeholder-[#444] font-mono caret-[var(--tk-neon)]"
                autoFocus
                disabled={isThinking}
                autoComplete="off"
              />
              <button 
                onClick={onSend}
                disabled={!inputValue.trim() || isThinking}
                className="text-[#444] hover:text-[var(--tk-neon)] disabled:opacity-20 transition-colors"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                  </svg>
              </button>
            </div>
        </div>
    );
};
