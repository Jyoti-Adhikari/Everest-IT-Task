import React from 'react';

interface HomeProps {
  setView: (view: 'home' | 'calendar' | 'calculator') => void;
}

export const Home: React.FC<HomeProps> = ({ setView }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-3">
            Utility Application
      </h1>
      <p className="text-slate-500 mb-8 max-w-md">
        Switch fluidly between your daily event calendar planner and utility execution calculator.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl">
        <button
          onClick={() => setView('calendar')}
          className="group flex flex-col items-start p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all text-left hover:border-blue-500"
        >
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-6 h-6"
                >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
        </div>
          <h2 className="text-xl font-bold text-slate-800 mb-1">Calendar Utility</h2>
          <p className="text-sm text-slate-500">Schedule custom events, parse native dates, and visualize tasks.</p>
        </button>

        <button
          onClick={() => setView('calculator')}
          className="group flex flex-col items-start p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all text-left hover:border-emerald-500"
        >
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-1">Calculator Module</h2>
          <p className="text-sm text-slate-500">Perform standard arithmetic transformations inside a compact interface.</p>
        </button>
      </div>
    </div>
  );
};