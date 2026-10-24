
import { useEffect, useRef, useState } from "react";
import "./Chatbot.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const initialMessage = {
  role: "assistant",
  content:
    "Hi! Welcome to InterviewAI. Ask me about technical interviews, HR questions, or career preparation.",
};

const quickQuestions = [
  "Tell me about yourself",
  "JavaScript interview questions",
  "HR interview tips",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, sending, isOpen]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  async function sendMessage(text = input) {
    const message = text.trim();

    if (!message || sending) return;

    const userMessage = {
      role: "user",
      content: message,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setError("");
    setSending(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          message,
          history: updatedMessages
            .filter((item) => item.role === "user" || item.role === "assistant")
            .slice(-10)
            .map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Message send nahi ho paya.");
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: data.reply || "Sorry, mujhe response nahi mila.",
        },
      ]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setError(
        err.message ||
          "Chatbot connect nahi ho raha. Backend check karein."
      );
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage();
  }

  function handleReset() {
    if (sending) return;
    setMessages([initialMessage]);
    setError("");
    setInput("");
  }

  return (
    <div className="ai-chatbot">
      {isOpen && (
        <section
          className="chatbot-window"
          aria-label="InterviewAI assistant"
        >
          <header className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">AI</div>
              <div>
                <h3>InterviewAI Assistant</h3>
                <p>
                  <span className="chatbot-online-dot" />
                  Interview preparation support
                </p>
              </div>
            </div>

            <div className="chatbot-header-actions">
              <button
                type="button"
                onClick={handleReset}
                disabled={sending}
                aria-label="Clear conversation"
                title="New conversation"
              >
                ↻
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chatbot"
                title="Close"
              >
                ×
              </button>
            </div>
          </header>

          <div className="chatbot-messages" aria-live="polite">
            {messages.map((item, index) => (
              <div
                key={`${index}-${item.role}`}
                className={`chatbot-message-row ${
                  item.role === "user" ? "user-row" : "assistant-row"
                }`}
              >
                {item.role === "assistant" && (
                  <div className="chatbot-small-avatar">AI</div>
                )}

                <div
                  className={`chatbot-message ${
                    item.role === "user"
                      ? "user-message"
                      : "assistant-message"
                  }`}
                >
                  {item.content}
                </div>
              </div>
            ))}

            {sending && (
              <div className="chatbot-message-row assistant-row">
                <div className="chatbot-small-avatar">AI</div>
                <div className="chatbot-message assistant-message chatbot-typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            {error && (
              <div className="chatbot-error" role="alert">
                <p>{error}</p>
                <button
                  type="button"
                  onClick={() => {
                    const lastUserMessage = [...messages]
                      .reverse()
                      .find((item) => item.role === "user");

                    if (lastUserMessage) {
                      setMessages((previous) => previous.slice(0, -1));
                      sendMessage(lastUserMessage.content);
                    }
                  }}
                  disabled={sending}
                >
                  Retry
                </button>
              </div>
            )}

            {messages.length === 1 && (
              <div className="chatbot-quick-questions">
                <p>Try asking:</p>
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => sendMessage(question)}
                    disabled={sending}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input-area" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask an interview question..."
              aria-label="Type your message"
              maxLength={2000}
              disabled={sending}
            />

            <button
              type="submit"
              disabled={!input.trim() || sending}
              aria-label="Send message"
            >
              ➤
            </button>
          </form>

          <p className="chatbot-disclaimer">
            AI can make mistakes. Review important answers.
          </p>
        </section>
      )}

      <button
        type="button"
        className={`chatbot-launcher ${isOpen ? "is-open" : ""}`}
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={isOpen ? "Close chat" : "Open AI chatbot"}
        aria-expanded={isOpen}
      >
        {isOpen ? "×" : "✦"}
        {!isOpen && <span className="chatbot-launcher-label">Ask AI</span>}
      </button>
    </div>
  );
}
