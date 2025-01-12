"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';

import { createQuery } from "@/lib/templates";

import { useState } from "react";

import { User, Bot } from "lucide-react";
import { Input } from "@/components/ui/input";
import { executeQuery } from "@/actions/execute-query";
import { Loading } from "@/components/loading";
import { ScrollArea } from "@/components/ui/scroll-area";
import OpenAI from "openai";

const openai = new OpenAI({
  organization: "org-Lcy33KyySQWqA4XvtsvZNdwu",
  project: "proj_iPWx43rSKBRf0yDz7mKuTEaj",
  apiKey: "Pon tu API key aquí",
  dangerouslyAllowBrowser: true,
});

type Message = {
  content: string;
  isUser: boolean;
};

export default function ChatPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async () => {
    setIsLoading(true);
    if (!input.trim()) return;

    const question = input.trim();
    setMessages((prev) => [...prev, { content: question, isUser: true }]);
    setInput("");

    const prompt = await createQuery(question);

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      console.log(completion.choices[0].message);

      const generatedQuery = completion.choices[0].message.content;
      const queryResult = await executeQuery(generatedQuery);

      const stream = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user",
          content: `
                ### Contexto General:
                El usuario final es un entrenador de natación profesional que necesita recomendaciones claras, específicas y orientadas a la acción. La información proporcionada debe ser precisa, relevante y fácil de interpretar, sin ningún detalle técnico innecesario.

                ### Información para Procesar:
                1. **Pregunta del Usuario:**
                  ${question}

                2. **Datos Relevantes Extraídos de la Base de Datos:**
                  ${queryResult}

                ### Instrucciones Específicas:
                - Tu objetivo es actuar como un **sistema recomendador** especializado en natación.
                - Genera respuestas claras, concisas y directamente aplicables.
                - Elimina cualquier dato técnico como IDs, nombres de tablas o referencias a estructuras de datos.
                - Si es necesario, organiza la información en puntos clave o listas para facilitar su interpretación.
                - Prioriza información que permita al entrenador tomar decisiones rápidas y efectivas.
                - Si no se han encontrado datos relevantes, di que no hay suficiente información para proporcionar una recomendación.

                ### Ejemplo de Salida Esperada:
                - Si el usuario pregunta sobre el rendimiento de un nadador, proporciona métricas como tiempos promedio, distancias recorridas o áreas a mejorar.
                - Si los datos sugieren patrones, ofrécelos como recomendaciones concretas. Por ejemplo: "El nadador ha mejorado su tiempo en un 10% en los últimos 3 meses. Recomiendo enfocarse en técnica de salida para seguir progresando."

                ### Genera tu Respuesta:
                A partir de los datos proporcionados y la pregunta del usuario, elabora una respuesta siguiendo las instrucciones anteriores:
              `,
        }],
        stream: true,
      });
      let botResponse = "";

      for await (const chunk of stream) {
        const content = chunk.choices?.[0]?.delta?.content || "";

        // Agrega contenido al mensaje en tiempo real
        if (content) {
          botResponse += content;
          setMessages((prev) => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage?.isUser === false) {
              // Si ya existe un mensaje del bot, actualízalo
              return [
                ...prev.slice(0, -1),
                { content: botResponse, isUser: false },
              ];
            } else {
              // Si no, añade un nuevo mensaje del bot
              return [...prev, { content: botResponse, isUser: false }];
            }
          });
        }
      }
    } catch (error) {
      console.error("Error en el streaming:", error);
      setMessages((prev) => [
        ...prev,
        { content: "Error al obtener respuesta del servicio de IA", isUser: false },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full m-4 bg-sidebar rounded-xl">
      <div className="inline-flex items-center border-b w-full">
        <Input
          disabled={isLoading}
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
      <ScrollArea className="h-full flex-1 px-10 py-6" >
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="flex text-sm gap-3 items-start">
              {message.isUser ? (
                <User className="h-4 w-4 mt-1.5" />
              ) : (
                <Bot className="h-4 w-4 mt-1.5" />
              )}
              <div className="flex-1 space-y-2 bg-background px-4 py-2 rounded-xl">
                <div className="prose text-foreground max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex text-sm gap-3 items-center">
              <Bot className="h-4 w-4" />
              <Loading />
            </div>
          )}
        </div>
      </ScrollArea>
    </div >
  );
}
