import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from '@/types';

const AIchatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Namaste! 🙏 I\'m your AYUSH herbal guide. Ask me about medicinal plants, their uses, and traditional remedies. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateResponse = (question: string): string => {
    const lowerQ = question.toLowerCase();
    
    if (lowerQ.includes('tulsi') || lowerQ.includes('holy basil')) {
      return 'Tulsi (Holy Basil) is revered as the "Queen of Herbs" in Ayurveda. It\'s known for:\n\n• Boosting immunity\n• Treating respiratory infections\n• Reducing stress and anxiety\n• Anti-inflammatory properties\n\nYou can consume it as tea, add fresh leaves to warm water, or take it as a supplement.';
    }
    
    if (lowerQ.includes('immunity') || lowerQ.includes('immune')) {
      return 'For immunity, Ayurveda recommends:\n\n• **Tulsi** - Boosts overall immunity\n• **Amla** - Rich in Vitamin C\n• **Ashwagandha** - Adaptogenic herb\n• **Giloy** - Known as "Amrita" (nectar of immortality)\n• **Turmeric** - Powerful antioxidant\n\nThese herbs can be taken as teas, powders, or supplements.';
    }
    
    if (lowerQ.includes('stress') || lowerQ.includes('anxiety')) {
      return 'For stress and anxiety, consider these calming herbs:\n\n• **Ashwagandha** - Adaptogen that reduces cortisol\n• **Brahmi** - Calms the mind, improves focus\n• **Jatamansi** - Natural tranquilizer\n• **Shankhpushpi** - Promotes mental clarity\n\nPractice yoga and pranayama alongside for best results.';
    }
    
    if (lowerQ.includes('skin') || lowerQ.includes('acne')) {
      return 'For skin health, Ayurveda suggests:\n\n• **Neem** - Antibacterial, clears acne\n• **Turmeric** - Brightens skin, reduces inflammation\n• **Aloe Vera** - Soothes and hydrates\n• **Manjistha** - Blood purifier, improves complexion\n\nCreate face packs with neem powder, turmeric, and rose water.';
    }
    
    if (lowerQ.includes('digestion') || lowerQ.includes('stomach')) {
      return 'For digestive health:\n\n• **Ginger** - Stimulates digestion, reduces nausea\n• **Fennel** - Relieves bloating\n• **Triphala** - Gentle cleansing\n• **Peppermint** - Soothes stomach\n• **Ajwain** - Relieves gas and acidity\n\nDrink warm water with ginger and lemon in the morning.';
    }
    
    return 'That\'s an interesting question about herbal medicine! While I can provide general educational information about AYUSH systems and medicinal plants, I recommend:\n\n• Browsing our plant database for detailed information\n• Consulting a qualified Ayurvedic practitioner for personalized advice\n• Using the search feature to find specific plants\n\nWhat specific herb or health concern would you like to know more about?';
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateResponse(inputValue);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-20 md:bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center elevated-shadow z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 md:bottom-24 right-6 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] bg-card rounded-2xl elevated-shadow border border-border overflow-hidden z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">AYUSH Assistant</h3>
                  <p className="text-xs opacity-80">Herbal Guide</p>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Disclaimer */}
            <div className="bg-accent/20 px-4 py-2 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <p className="text-xs text-accent-foreground/80">
                Educational purposes only. Not a substitute for professional medical advice.
              </p>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-tr-md'
                          : 'bg-muted text-foreground rounded-tl-md'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about medicinal plants..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1"
                />
                <Button size="icon" onClick={handleSend} disabled={!inputValue.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIchatbot;
