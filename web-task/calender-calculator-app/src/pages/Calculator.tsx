import React from 'react';
import { useAppStore } from '../store/appStore';

export const Calculator: React.FC = () => {
  const { display, equation, appendDigit, appendOperator, clear, calculate } = useAppStore((state) => state.calc);

  const btnClass = "h-14 font-semibold text-lg rounded-xl transition-all active:scale-95 shadow-sm";

  return (
    <div className="max-w-xs mx-auto my-8 bg-slate-900 text-white p-6 rounded-3xl shadow-xl border border-slate-800">
      <div className="text-right mb-6 px-2 min-h-[4.5rem] flex flex-col justify-end overflow-hidden break-all">
        <span className="text-sm text-slate-400 tracking-wide block min-h-[1.25rem]">{equation || ' '}</span>
        <span className="text-3xl font-bold tracking-tight mt-1">{display}</span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <button onClick={clear} className={`${btnClass} col-span-3 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20`}>AC</button>
        <button onClick={() => appendOperator('/')} className={`${btnClass} bg-amber-500/20 text-amber-400 hover:bg-amber-500/30`}>÷</button>

        <button onClick={() => appendDigit('7')} className={`${btnClass} bg-slate-800 hover:bg-slate-700`}>7</button>
        <button onClick={() => appendDigit('8')} className={`${btnClass} bg-slate-800 hover:bg-slate-700`}>8</button>
        <button onClick={() => appendDigit('9')} className={`${btnClass} bg-slate-800 hover:bg-slate-700`}>9</button>
        <button onClick={() => appendOperator('*')} className={`${btnClass} bg-amber-500/20 text-amber-400 hover:bg-amber-500/30`}>×</button>

        <button onClick={() => appendDigit('4')} className={`${btnClass} bg-slate-800 hover:bg-slate-700`}>4</button>
        <button onClick={() => appendDigit('5')} className={`${btnClass} bg-slate-800 hover:bg-slate-700`}>5</button>
        <button onClick={() => appendDigit('6')} className={`${btnClass} bg-slate-800 hover:bg-slate-700`}>6</button>
        <button onClick={() => appendOperator('-')} className={`${btnClass} bg-amber-500/20 text-amber-400 hover:bg-amber-500/30`}>-</button>

        <button onClick={() => appendDigit('1')} className={`${btnClass} bg-slate-800 hover:bg-slate-700`}>1</button>
        <button onClick={() => appendDigit('2')} className={`${btnClass} bg-slate-800 hover:bg-slate-700`}>2</button>
        <button onClick={() => appendDigit('3')} className={`${btnClass} bg-slate-800 hover:bg-slate-700`}>3</button>
        <button onClick={() => appendOperator('+')} className={`${btnClass} bg-amber-500/20 text-amber-400 hover:bg-amber-500/30`}>+</button>

        <button onClick={() => appendDigit('0')} className={`${btnClass} col-span-2 bg-slate-800 hover:bg-slate-700`}>0</button>
        <button onClick={() => appendDigit('.')} className={`${btnClass} bg-slate-800 hover:bg-slate-700`}>.</button>
        <button onClick={calculate} className={`${btnClass} bg-emerald-500 text-slate-900 hover:bg-emerald-400 font-bold`}>=</button>
      </div>
    </div>
  );
};