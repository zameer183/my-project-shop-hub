import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGlobal } from "@/contexts/GlobalContext";
import {
  MessageCircle,
  X,
  Send,
  Minimize2,
  Maximize2,
  Phone,
  Mail,
  Clock,
  Bot,
  User,
  Paperclip,
  Smile,
} from "lucide-react";

interface Message {
  id: number;
  sender: "user" | "agent" | "bot";
  content: string;
  timestamp: string;
  type?: "text" | "image" | "file";
}

const ChatWidget = () => {
  const { t, language } = useGlobal();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      content: `Hello! 👋 Welcome to GlobalMart support. How can I help you today?`,
      timestamp: new Date().toLocaleTimeString(),
      type: "text",
    },
  ]);

  const supportAgents = [
    {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
      status: "online",
      language: "English",
      specialization: "General Support",
    },
    {
      name: "Ahmed Al-Rashid",
      avatar: "/placeholder.svg",
      status: "online",
      language: "Arabic",
      specialization: "Payment Issues",
    },
    {
      name: "Maria García",
      avatar: "/placeholder.svg",
      status: "busy",
      language: "Spanish",
      specialization: "Shipping Support",
    },
  ];

  const quickReplies = [
    "Track my order",
    "Return/Refund",
    "Payment issue",
    "Product question",
    "Shipping info",
    "Account help",
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: "user",
        content: message,
        timestamp: new Date().toLocaleTimeString(),
        type: "text",
      };

      setMessages([...messages, newMessage]);
      setMessage("");
      setIsTyping(true);

      // Simulate agent response
      setTimeout(() => {
        const agentResponse: Message = {
          id: messages.length + 2,
          sender: "agent",
          content:
            "Thank you for your message. I'm looking into this for you. Please give me a moment.",
          timestamp: new Date().toLocaleTimeString(),
          type: "text",
        };
        setMessages((prev) => [...prev, agentResponse]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const handleQuickReply = (reply: string) => {
    setMessage(reply);
    handleSendMessage();
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 group"
        >
          <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
        </Button>
        <div className="absolute -top-2 -right-2">
          <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card
        className={`w-80 md:w-96 shadow-xl transition-all duration-300 ${isMinimized ? "h-14" : "h-96"}`}
      >
        {/* Header */}
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>CS</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
              </div>
              <div>
                <CardTitle className="text-sm">Customer Support</CardTitle>
                <p className="text-xs text-blue-100">
                  Online • Responds in ~2 min
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-white/20"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? (
                  <Maximize2 className="h-3 w-3" />
                ) : (
                  <Minimize2 className="h-3 w-3" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex items-end space-x-2 max-w-xs ${msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                    >
                      {msg.sender !== "user" && (
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>
                            {msg.sender === "bot" ? (
                              <Bot className="h-3 w-3" />
                            ) : (
                              <User className="h-3 w-3" />
                            )}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`rounded-lg p-3 text-sm ${
                          msg.sender === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        {msg.content}
                        <div
                          className={`text-xs mt-1 ${msg.sender === "user" ? "text-blue-100" : "text-gray-500"}`}
                        >
                          {msg.timestamp}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-end space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>
                          <User className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Quick Replies */}
            <div className="p-3 border-t bg-gray-50">
              <div className="flex flex-wrap gap-1 mb-3">
                {quickReplies.map((reply) => (
                  <Button
                    key={reply}
                    variant="outline"
                    size="sm"
                    className="text-xs h-6"
                    onClick={() => handleQuickReply(reply)}
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 h-8"
                />
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="h-8 w-8"
                  disabled={!message.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Alternative Contact Methods */}
      {!isMinimized && (
        <Card className="mt-2 w-80 md:w-96 shadow-lg">
          <CardContent className="p-4">
            <div className="text-sm text-center">
              <p className="text-muted-foreground mb-3">Need immediate help?</p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </Button>
              </div>
              <div className="flex items-center justify-center space-x-1 mt-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>24/7 Support Available</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChatWidget;
