"use client";

import { ArrowCircleUp } from "phosphor-react";
import React, { useState, FunctionComponent } from "react";

interface Message {
  sender: string;
  content: string;
}

export const Messages: FunctionComponent = () => {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  const prompt = "Iawn cont! Sut allai helpu ti?";

  const initialMessage = {
    sender: "AI",
    content: prompt,
  };

  // Add the initial AI message to the conversation
  if (conversation.length === 0) {
    setConversation([initialMessage]);
  }

  const addToConversation = (userInput: string, aiResponse: string) => {
    setConversation((prevConversation) => [
      ...prevConversation,
      { sender: "User", content: userInput },
      { sender: "AI", content: aiResponse },
    ]);
  };

  const generateResponse = async (userInput: string): Promise<string> => {
    setUserMessage("");
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput, prompt }),
    });

    const data = await response.json();
    // scroll to bottom of page
    return data.responseContent.content;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setSendingMessage(true);
    e.preventDefault();
    if (!userMessage.trim()) return;

    addToConversation(userMessage, "...");
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);

    const aiResponse = await generateResponse(userMessage);
    // addToConversation(userMessage, aiResponse);
    if (aiResponse) {
      // Set conversation, replace ... with AI response
      setConversation((prevConversation) => {
        const newConversation = [...prevConversation];
        newConversation[newConversation.length - 1] = {
          sender: "AI",
          content: aiResponse,
        };
        return newConversation;
      });

      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
        setSendingMessage(false);
      }, 100);
    }
  };

  return (
    <div className="App">
      <div className="flex flex-col mb-14">
        {conversation.map((message, index) => (
          <div
            key={index}
            className={`
              p-4
              rounded-xl
              text-white
              w-fit
              max-w-3xl
              m-4
            ${
              message.sender === "User"
                ? "text-right bg-blue-400 self-end"
                : "text-left bg-neutral-700 self-start"
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <form
        // Add the form to the bottom of the page and is sticky. Looks like messenger chat input and send button
        className="fixed bottom-0 w-full bg-white flex p-4 gap-2"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full 
          border-2 border-gray-300
          bg-white
          h-10
          px-5
          pr-16
          rounded-lg
          text-sm
          focus:outline-none
          focus:border-blue-500
          placeholder-gray-400
          focus:placeholder-gray-600
          "
          autoFocus
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Dy neges..."
        />
        <button type="submit" disabled={sendingMessage}>
          <ArrowCircleUp
            size={32}
            weight="fill"
            color={sendingMessage ? "gray" : "rgb(96 165 250)"}
          />
        </button>
      </form>
    </div>
  );
};
