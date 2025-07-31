import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Mic, MicOff, Send, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface User {
  isLoggedIn: boolean;
  name?: string;
  sessionQueries: number;
}

export const LCAAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Mock user state - in real app, this would come from auth context
  const [user] = useState<User>({
    isLoggedIn: false, // Set to false to show guest mode
    sessionQueries: 0
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting based on user context
      const greeting = user.isLoggedIn 
        ? "Hi! I'm LCA, your personal shopping assistant. How can I help you find the perfect device or plan today?"
        : "Welcome! I'm LCA, your shopping assistant. I'm in demo mode - you can ask me 3 questions to try me out, then log in for the full experience!";
      
      setTimeout(() => {
        setMessages([{
          id: '1',
          type: 'assistant',
          content: greeting,
          timestamp: new Date()
        }]);
      }, 500);
    }
  }, [isOpen, user.isLoggedIn]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Check guest mode limits
    if (!user.isLoggedIn && user.sessionQueries >= 3) {
      const limitMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: "You've reached the demo limit of 3 questions. Please log in to continue chatting and unlock full automation features!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, limitMessage]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response with context awareness
    setTimeout(() => {
      setIsTyping(false);
      const responses = getContextualResponse(inputValue, user);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responses,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    }, 1500);
  };

  const getContextualResponse = (input: string, user: User): string => {
    const lowerInput = input.toLowerCase();
    
    // Context-aware responses based on Telekom product catalog
    if (lowerInput.includes('iphone') || lowerInput.includes('phone')) {
      return user.isLoggedIn 
        ? "I can help you find the perfect iPhone! We have iPhone 15 Pro (from €999) and iPhone 15 (from €899) with our MagentaMobil plans. Would you like to compare models or see current offers? I can add one to your cart when you're ready!"
        : "Great choice! iPhone 15 Pro starts at €999 with our MagentaMobil plans. To get personalized offers and one-click cart features, please log in!";
    }
    
    if (lowerInput.includes('samsung') || lowerInput.includes('galaxy')) {
      return "Samsung Galaxy S24 Ultra (from €1,199) and S24+ (from €899) are popular! Both include amazing cameras and work perfectly with our 5G network. Want to compare specifications or bundle with a plan?";
    }
    
    if (lowerInput.includes('plan') || lowerInput.includes('tariff') || lowerInput.includes('magenta')) {
      return "Our MagentaMobil plans offer great value! MagentaMobil M (€39.95/month) includes 20GB, and MagentaMobil L (€54.95/month) has unlimited data. Which suits your usage better?";
    }
    
    if (lowerInput.includes('compare')) {
      return "I love helping with comparisons! What devices would you like me to compare? I can show you detailed feature-by-feature breakdowns with current pricing and bundle options.";
    }
    
    if (lowerInput.includes('cart') || lowerInput.includes('buy')) {
      return user.isLoggedIn 
        ? "I can help you add items to cart! What would you like to purchase? I'll guide you through model selection, colors, storage options, and suggest the best plans."
        : "I'd love to help with purchases! Please log in first so I can add items to your cart and provide personalized recommendations.";
    }
    
    // Default contextual response
    return user.isLoggedIn 
      ? "I'm here to help with all your Telekom needs! Ask me about devices, plans, comparisons, or let me help you shop. What interests you most?"
      : `That's interesting! I'm designed to help with shopping, recommendations, and more. This is question ${user.sessionQueries + 1} of 3 in demo mode. Log in for unlimited chat and automation!`;
  };

  const handleVoiceToggle = () => {
    setIsVoiceMode(!isVoiceMode);
    if (!isVoiceMode) {
      // Start voice input
      setIsListening(true);
      // In real implementation, start speech recognition here
      setTimeout(() => setIsListening(false), 3000);
    }
  };

  const FloatingButton = () => (
    <Button
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        "fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-primary shadow-chat hover:shadow-glow",
        "transition-all duration-300 hover:scale-110 z-50",
        !isOpen && "animate-pulse-glow"
      )}
      size="icon"
    >
      {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
    </Button>
  );

  if (!isOpen) {
    return <FloatingButton />;
  }

  return (
    <>
      <FloatingButton />
      
      {/* Chat Window */}
      <Card className={cn(
        "fixed bottom-24 right-6 w-96 h-[600px] bg-gradient-subtle shadow-chat border-0 z-40",
        "animate-slide-up flex flex-col overflow-hidden"
      )}>
        {/* Header */}
        <div className="bg-gradient-primary p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold">LCA Assistant</h3>
                <p className="text-xs opacity-90">Life Contextual Advisor</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!user.isLoggedIn && (
                <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                  Demo Mode
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6 text-white hover:bg-white/20"
                onClick={handleVoiceToggle}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.type === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl p-3 text-sm",
                  message.type === 'user'
                    ? 'bg-chat-bubble-user text-chat-bubble-user-foreground'
                    : 'bg-chat-bubble-assistant text-chat-bubble-assistant-foreground shadow-soft'
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-chat-bubble-assistant text-chat-bubble-assistant-foreground rounded-2xl p-3 text-sm shadow-soft">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-background">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isVoiceMode ? "Listening..." : "Type your message..."}
                className="pr-12"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isListening}
              />
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8",
                  isListening && "text-primary animate-pulse"
                )}
                onClick={handleVoiceToggle}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isListening}
              className="bg-gradient-primary hover:shadow-glow"
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          {!user.isLoggedIn && (
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Demo: {3 - user.sessionQueries} questions remaining • 
              <Button variant="link" className="p-0 h-auto text-xs text-primary ml-1">
                Log in for full features
              </Button>
            </p>
          )}
        </div>
      </Card>
    </>
  );
};