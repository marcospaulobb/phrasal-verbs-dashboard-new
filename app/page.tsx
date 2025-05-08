'use client';

import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './globals.css'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSendEmail = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Email enviado com sucesso! 📧');
        router.refresh();
      } else {
        setMessage(`Erro ao enviar email: ${data.error}`);
      }
    } catch {
      setMessage('Erro ao enviar email. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f6fb] font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="text-2xl text-blue-600">🌐</span>
          <span className="font-bold text-lg text-[#1e3a8a]">English Lesson Blast</span>
        </div>
        <nav className="space-x-8 text-gray-700 font-normal text-base">
          <a href="#" className="hover:text-blue-700 transition">Home</a>
          <a href="#" className="hover:text-blue-700 transition">Lessons</a>
          <a href="#" className="hover:text-blue-700 transition">Resources</a>
          <a href="#" className="hover:text-blue-700 transition">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center pt-20 pb-10 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2 text-[#1e3a8a] leading-tight">
          Enhance Your English With
        </h1>
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-[#2563eb] leading-tight">
          Practical Phrasal Verbs
        </h2>
        <p className="text-lg text-gray-700 text-center max-w-2xl mb-8 font-normal">
          Boost your English proficiency with our specialized lessons focused on practical phrasal verbs used in everyday conversations.
        </p>
        <button
          onClick={handleSendEmail}
          disabled={isLoading}
          className="flex items-center justify-center bg-[#fbbf24] hover:bg-[#f59e0b] text-white font-semibold px-7 py-3 rounded-md shadow transition mb-10 text-base disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v4m0-4V8" /></svg>
          {isLoading ? 'Enviando...' : 'Send Lesson to Marcos Paulo'}
        </button>

        {/* Benefits Card */}
        <div className="bg-white rounded-xl shadow-md p-7 w-full max-w-md mt-2">
          <div className="text-[#2563eb] font-semibold mb-3 text-base">This lesson includes:</div>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-900 text-base">
              <span className="text-green-500 mr-2 text-xl">✔</span>
              5 essential business phrasal verbs
            </li>
            <li className="flex items-center text-gray-900 text-base">
              <span className="text-green-500 mr-2 text-xl">✔</span>
              Clear explanations of meanings
            </li>
            <li className="flex items-center text-gray-900 text-base">
              <span className="text-green-500 mr-2 text-xl">✔</span>
              Real-world example sentences
            </li>
          </ul>
        </div>

        {message && (
          <div className={`mt-4 p-4 rounded-lg ${
            message.includes('sucesso') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}
      </main>
    </div>
  );
}
