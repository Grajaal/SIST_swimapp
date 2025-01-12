"use client";

import { Bot, MessageSquare, User } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../../ui/input";
import { ScrollArea } from "../../ui/scroll-area";
import { useState } from "react";

type Message = {
  content: string;
  isUser: boolean;
};

export function Chat() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { content: input, isUser: true }]);
      setInput("");

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { content: "¿Qué puedo hacer para ayudarte?", isUser: false },
        ]);
      }, 1000);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="cursor-text w-64 justify-start text-muted-foreground text-sm"
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Chatear con asistente
          <kbd className="inline-flex ml-auto bg-muted h-5 px-1.5 rounded items-center font-mono text-[12px] font-medium opacity-100">
            <span className="text-sm">ctrl </span>K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 gap-0 w-[2000px]">
        <DialogTitle />
        <div className="inline-flex items-center border-b mt-0">
          <Input
            placeholder="Pregunta a tu asistente"
            className="border-none focus-visible:ring-0 !text-lg h-12 w-[90%]"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            type="text"
          />
        </div>
        <ScrollArea>
          <div className="h-[300px] p-6 space-y-6">
            {messages.map((message, index) => (
              <div key={index} className="flex text-sm gap-3 items-center">
                {message.isUser ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
                <div className="flex-1 space-y-2">
                  <div className="prose prose-invert max-w-none">
                    <p className="leading-relaxed">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
