import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Home } from './pages/Home';
import { Calendar } from './pages/Calendar';
import { Calculator } from './pages/Calculator';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes cache lifespan
    },
  },
});

const AppContent: React.FC = () => {
  const [view, setView] = useState<'home' | 'calendar' | 'calculator'>('home');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Top Standard Navigation Header Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={() => setView('home')} 
            className="font-bold text-lg text-slate-800 flex items-center gap-2 hover:opacity-80"
          >
            <span className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-sm">UTA</span>
            Utility Application
          </button>
          
          {view !== 'home' && (
            <nav className="flex gap-2">
              <button 
                onClick={() => setView('calendar')}
                className={`px-4 py-1.5 text-sm font-semibold rounded-xl transition-all ${view === 'calendar' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Calendar
              </button>
              <button 
                onClick={() => setView('calculator')}
                className={`px-4 py-1.5 text-sm font-semibold rounded-xl transition-all ${view === 'calculator' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Calculator
              </button>
              <button 
                onClick={() => setView('home')}
                className="px-4 py-1.5 text-sm font-semibold text-slate-400 hover:bg-slate-100 rounded-xl transition-all"
              >
                Exit
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Main Dynamic View Area */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {view === 'home' && <Home setView={setView} />}
        {view === 'calendar' && <Calendar />}
        {view === 'calculator' && <Calculator />}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}