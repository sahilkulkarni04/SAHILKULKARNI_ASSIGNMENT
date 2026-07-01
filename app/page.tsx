"use client";

import { useEffect, useState } from "react";

type Customer = {
  id: number;
  name: string;
  email: string;
  orderId: string;
  product: string;
  purchaseDate: string;
  status: string;
  price: number;
  refunded: boolean;
};

type ChatMessage = {
  user: string;
  ai: string;
};

export default function Home() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const selectedCustomerData = customers.find(
  (customer) => customer.name === selectedCustomer
);

  useEffect(() => {
    async function fetchCustomers() {
      const response = await fetch("/api/customers");
      const data = await response.json();

      setCustomers(data);

      if (data.length > 0) {
        setSelectedCustomer(data[0].name);
      }
    }

    fetchCustomers();
  }, []);

  async function handleSend() {
    if (!message.trim() || loading) return;

    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: selectedCustomer,
          message,
        }),
      });

      const data = await response.json();

      setChatMessages((prev) => [
        ...prev,
        {
          user: message,
          ai: data.reply,
        },
      ]);

      setLogs(data.logs);
      setMessage("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          🤖 AI Customer Support Agent
        </h1>

        <p className="text-center text-gray-500 mt-2">
          AI-powered refund assistant using Next.js & Google Gemini
        </p>

        <div className="mt-8 grid grid-cols-2 gap-6">
          {/* Customer Chat */}
          <div className="border rounded-lg p-4 h-[550px] flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Customer Chat</h2>

            <select
              className="w-full border rounded-md p-2 mb-4"
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
            >
              {customers.map((customer) => (
                <option key={customer.id} value={customer.name}>
                  {customer.name}
                </option>
              ))}

            </select>
            {selectedCustomerData && (
  <div className="mb-4 rounded-lg border bg-blue-50 p-3 text-sm">
    <h3 className="font-semibold text-blue-700 mb-2">
      Customer Details
    </h3>

    <p>
      <strong>📦 Product:</strong> {selectedCustomerData.product}
    </p>

    <p>
      <strong>🆔 Order ID:</strong> {selectedCustomerData.orderId}
    </p>

    <p>
      <strong>📅 Purchase Date:</strong>{" "}
      {selectedCustomerData.purchaseDate}
    </p>

    <p>
      <strong>💲 Price:</strong> ${selectedCustomerData.price}
    </p>

    <p>
      <strong>🚚 Status:</strong> {selectedCustomerData.status}
    </p>

    <p>
      <strong>💰 Already Refunded:</strong>{" "}
      {selectedCustomerData.refunded ? "Yes" : "No"}
    </p>
  </div>
)}

            <div className="flex-1 border rounded-md p-3 overflow-y-auto bg-gray-50">
              {chatMessages.length === 0 ? (
                <p className="text-gray-400 text-center mt-10">
                  Start a conversation with the AI...
                </p>
              ) : (
                chatMessages.map((chat, index) => (
                  <div key={index} className="space-y-3 mb-5">
                    {/* User Message */}
                    <div className="flex justify-end">
                      <div className="bg-blue-600 text-white rounded-xl px-4 py-2 max-w-[80%] shadow">
                        {chat.user}
                      </div>
                    </div>

                    {/* AI Message */}
                    <div className="flex justify-start">
                      <div className="bg-gray-200 text-gray-800 rounded-xl px-4 py-2 max-w-[80%] shadow">
                        🤖 {chat.ai}
                      </div>
                    </div>
                  </div>
                ))
              )}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-700 rounded-xl px-4 py-2 shadow animate-pulse">
                    🤖 AI is thinking...
                  </div>
                </div>
              )}
            </div>

            <input
              type="text"
              placeholder="Ask for a refund..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              className="w-full mt-4 border rounded-md p-2"
            />

            <button
              onClick={handleSend}
              disabled={loading}
              className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              {loading ? "Thinking..." : "Send"}
            </button>
          </div>

          {/* Admin Dashboard */}
          <div className="border rounded-lg p-4 h-[550px] flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>

            <div className="flex-1 border rounded-md p-3 bg-gray-50 overflow-y-auto">
              {logs.length === 0 ? (
                <p className="text-gray-400 text-center mt-10">
                  Agent reasoning logs will appear here...
                </p>
              ) : (
                logs.map((log, index) => (
                  <p key={index} className="mb-2">
                    ✅ {log}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
