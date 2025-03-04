"use client";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, CartesianGrid, Legend
} from "recharts";

const CRYPTOS = [
  { id: "bitcoin", name: "Bitcoin" },
  { id: "ethereum", name: "Ethereum" },
  { id: "dogecoin", name: "Dogecoin" },
  { id: "cardano", name: "Cardano" },
  { id: "solana", name: "Solana" },
];

// Fetching historical price data
const fetchCryptoHistory = async (cryptoId) => {
  const response = await axios.get(
    `https://api.coincap.io/v2/assets/${cryptoId}/history?interval=m5`
  );

  const data = response.data.data.map((entry) => ({
    time: new Date(entry.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    price: parseFloat(entry.priceUsd).toFixed(2),
  }));

  const latestPrice = data[data.length - 1]?.price || 0;
  const prevPrice = data[data.length - 2]?.price || latestPrice;
  const priceChange = (latestPrice - prevPrice).toFixed(2);
  const priceChangePercent = ((priceChange / prevPrice) * 100).toFixed(2);

  return { data, latestPrice, priceChange, priceChangePercent };
};

export default function CryptoDashboard() {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const cryptoQueries = CRYPTOS.map((crypto) =>
    useQuery({
      queryKey: ["cryptoHistory", crypto.id],
      queryFn: () => fetchCryptoHistory(crypto.id),
      staleTime: 300000,
      refetchInterval: 10000,
      refetchOnWindowFocus: true,
    })
  );

  const handleRefresh = () => {
    CRYPTOS.forEach((crypto) => {
      queryClient.invalidateQueries(["cryptoHistory", crypto.id]);
    });
  };

  // 🔎 **Filtering the Cryptos based on Search Input**
  const filteredCryptos = CRYPTOS.filter((crypto) =>
    crypto.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", minHeight: "100vh", background: "#000", color: "white", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ textAlign: "center", fontSize: "32px", marginBottom: "20px" }}> BitPulse</h1>

      {/* Search & Refresh */}
      <div style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: "20px", gap: "20px" }}>
        <input
          type="text"
          placeholder="Search Cryptocurrency"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "10px", width: "40%", borderRadius: "5px", border: "1px solid #ccc", background: "#222", color: "white" }}
        />
        <button
          onClick={handleRefresh}
          style={{ padding: "10px 15px", backgroundColor: "#007BFF", color: "white", borderRadius: "5px", border: "none", cursor: "pointer" }}
        >
          🔄 Refresh
        </button>
      </div>

      {/* Grid Layout for Filtered Cryptos */}
      {filteredCryptos.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "20px", width: "90%", justifyContent: "center" }}>
          {filteredCryptos.map((crypto, index) => {
            const { data, latestPrice, priceChange, priceChangePercent } = cryptoQueries[index].data || {};
            return (
              <div key={crypto.id} style={{ background: "#1E1E1E", padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 6px rgba(255,255,255,0.1)", minWidth: "350px" }}>
                <h2 style={{ fontSize: "22px", marginBottom: "10px", textAlign: "center" }}>{crypto.name}</h2>
                <p style={{ fontSize: "28px", fontWeight: "bold", textAlign: "center" }}>${latestPrice}</p>
                <p style={{ textAlign: "center", color: priceChange >= 0 ? "#4CAF50" : "#FF4500", fontWeight: "bold" }}>
                  {priceChange >= 0 ? "▲" : "▼"} {priceChange} ({priceChangePercent}%)
                </p>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={data}>
                    <XAxis dataKey="time" stroke="#8884d8" />
                    <YAxis tickFormatter={(value) => `$${value}`} stroke="#8884d8" />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#FF4500" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            );
          })}
        </div>
      ) : (
        <p style={{ textAlign: "center", fontSize: "20px", marginTop: "20px", color: "#FF4500" }}>❌ No matching cryptocurrencies found.</p>
      )}

      {/* Market Volatility Bar Chart */}
      <div style={{ background: "#1E1E1E", padding: "20px", borderRadius: "10px", marginTop: "30px", width: "90%" }}>
        <h2 style={{ textAlign: "center" }}>Crypto Market Volatility</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredCryptos.map((crypto, index) => ({
            name: crypto.name,
            price: cryptoQueries[index].data?.latestPrice || 0
          }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 14, fill: "white" }} />
            <YAxis tickFormatter={(value) => `$${value}`} tick={{ fill: "white" }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: "14px", color: "white" }} />
            <Bar dataKey="price" fill="#6a5acd" barSize={50} radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
