import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';
import { useUIStore } from '../store/useUIStore';

export const TimeCard: React.FC = () => {
    const { lastTimeRefreshed, setLastTimeRefreshed } = useUIStore();

    const { data } = useQuery({
        queryKey: ['serverTime'],
        queryFn: async () => {
            const res = await api.fetchTime();
            setLastTimeRefreshed(new Date().toLocaleTimeString());
            return res.serverTime;
        },
        refetchInterval: 1000,
    });

    return (
        <section className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-slate-400 tracking-wider uppercase">
                    1. Dynamic Server Time
                </h2>
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Live Polling
                </div>
            </div>

            <div className="mb-4">
                <p className="text-3xl font-extrabold text-slate-800 tracking-tight font-mono">
                    {data || 'Connecting...'}
                </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Zustand State Sync:</span>
                <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md font-mono">
                    {lastTimeRefreshed || 'N/A'}
                </span>
            </div>
        </section>
    );
};