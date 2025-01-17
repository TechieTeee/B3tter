'use client'

import React, { useState, useEffect } from 'react';
import { useChat } from 'ai/react';


const imageUrl = 'https://clipartmag.com/images/blue-teddy-bear-clipart-23.png';
declare global {
  interface Window {
    ethereum: any; // Define ethereum as a global property
    web3: any; // Define web3 as a global property
  }
}

function WalletConnectButton() {
  const connect = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        window.web3 = new window.web3(window.ethereum);
        const accounts = await window.web3.eth.getAccounts();
        const walletAddress = accounts[0]; // Get the first account
        console.log(`Wallet: ${walletAddress}`);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      console.log("No wallet");
    }
  };

  return (
    <div>
      <input
        type="button"
        value="Connect Wallet"
        onClick={connect}
        className="connect-wallet-button" // Assign the connect-wallet-button class here
      />
    </div>
  );
}

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      {/* Navigation Bar */}
      <nav className="bg-gray-800 py-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
          </div>
          <div className="text-2xl font-bold text-fredoka">
            B3tter
          </div>
        </div>
      </nav>

      {/* WalletConnectButton */}
      <WalletConnectButton /> {/* Use the WalletConnectButton component here */}

      {/* Hero Image Container (Centered) */}
      <div className="flex items-center justify-center h-96">
        <img
          src={imageUrl}
          alt="Hero Image"
          className="max-w-full max-h-full"
        />
      </div>

      <div className="flex justify-center items-center">
        <h1 className="hero-title">B3tter</h1>
      </div>

      <div className="flex justify-center items-center">
        <h2 className="hero-subtitle">Doing Healthcare Better</h2>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="flex flex-col space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`p-4 rounded-lg ${
                  m.role === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-right w-40 lg:w-2/5'
                    : 'bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-200 via-violet-600 to-sky-900 text-left w-40 lg:w-2/5'
                }`}
              >
                <div className="rounded-lg">
                  <span className="font-medium">{m.role === 'user' ? 'You' : 'AI'}</span>: {m.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Input */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center px-4 py-3 bg-gray-800">
        {/* Add buttons right above the input area */}
        <div className="flex space-x-4 mb-2"> {/* Added margin-bottom (mb-2) */}
          <button className="rounded-full bg-blue-500 py-2 px-4 hover:bg-blue-600">
            Ask an Expert
          </button>
          <button className="rounded-full bg-blue-400 py-2 px-4 hover:bg-blue-500">
            Upload Docs
          </button>
          <button className="rounded-full bg-blue-300 py-2 px-4 hover:bg-blue-400">
            Earn and Save
          </button>
        </div>

        {/* User Input Field */}
        <input
          className="flex-1 px-4 py-2 text-white bg-gray-700 bg-opacity-60 border rounded-full placeholder-white::placeholder focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          type="text"
          placeholder="Hey there, I'm B3tter Bear, fire away with your medical question."
          value={input}
          onChange={handleInputChange}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-2 p-2 text-blue-400 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </form>

    </div>
  );
}
;