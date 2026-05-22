import { create } from 'zustand';

interface CalculatorState {
  display: string;
  equation: string;
  isFinished: boolean;
  appendDigit: (digit: string) => void;
  appendOperator: (operator: string) => void;
  clear: () => void;
  calculate: () => void;
}

interface CalendarState {
  currentDate: Date;
  nextMonth: () => void;
  prevMonth: () => void;
  setMonth: (date: Date) => void;
}

interface AppStore {
  calc: CalculatorState;
  calendar: CalendarState;
}

export const useAppStore = create<AppStore>((set) => ({
  calc: {
  display: '0',
  equation: '',
  isFinished: false,
  
  appendDigit: (digit) => set((state) => {
    // If an evaluation just completed, start completely fresh on a new digit
    const currentDisplay = state.calc.isFinished ? '' : state.calc.display;
    const currentEquation = state.calc.isFinished ? '' : state.calc.equation;

    // Prevent adding multiple decimal points inside a single active number segment
    if (digit === '.' && currentDisplay.includes('.')) return {};

    // Standard digit appending rule
    const newDisplay = currentDisplay === '0' && digit !== '.' ? digit : currentDisplay + digit;
    const newEquation = currentEquation === '0' && digit !== '.' ? digit : currentEquation + digit;

    return {
      calc: {
        ...state.calc,
        display: newDisplay,
        equation: newEquation,
        isFinished: false
      }
    };
  }),

  appendOperator: (operator) => set((state) => {
    let currentEquation = state.calc.equation;

    // If a calculation just finished, carry the calculated answer forward into the new operation
    if (state.calc.isFinished) {
      // If the display threw an error previously, prevent operation chain
      if (state.calc.display === 'Error') return {};
      // Strip out commas from localized display values to parse as clean raw evaluation string
      currentEquation = state.calc.display.replace(/,/g, '');
    }

    // Default to '0' if an operator is clicked before entering any numbers
    if (!currentEquation) {
      currentEquation = '0';
    }

    // If the user changes their mind and clicks a different operator consecutively,
    // swap the old trailing operator for the new one instead of breaking the math parser
    if (['+', '-', '*', '/'].includes(currentEquation.slice(-1))) {
      currentEquation = currentEquation.slice(0, -1);
    }

    return {
      calc: {
        ...state.calc,
        equation: currentEquation + operator,
        display: '0',
        isFinished: false
      }
    };
  }),

  clear: () => set((state) => ({
    calc: {
      ...state.calc,
      display: '0',
      equation: '',
      isFinished: false
    }
  })),

  calculate: () => set((state) => {
    let currentEquation = state.calc.equation;
    if (!currentEquation) return {};

    // Clean up trailing operators if the user clicked '=' immediately after an operator
    if (['+', '-', '*', '/'].includes(currentEquation.slice(-1))) {
      currentEquation = currentEquation.slice(0, -1);
    }

    try {
      // Use Function constructor instead of raw eval for a safer execution context
      // eslint-disable-next-line no-new-func
      const result = new Function(`return (${currentEquation})`)();
      
      if (result === undefined || isNaN(result) || !isFinite(result)) {
        throw new Error("Invalid Math Operation");
      }

      // Format clean floats without long rounding string decimals
      const rawResultString = String(Number(result.toFixed(8)));

      return {
        calc: {
          ...state.calc,
          display: Number(rawResultString).toLocaleString('en-US', { maximumFractionDigits: 4 }),
          equation: rawResultString,
          isFinished: true
        }
      };
    } catch (error) {
      return {
        calc: {
          ...state.calc,
          display: 'Error',
          equation: '',
          isFinished: true
        }
      };
    }
  })
},
  calendar: {
    currentDate: new Date(),
    nextMonth: () => set((state) => {
      const next = new Date(state.calendar.currentDate.getFullYear(), state.calendar.currentDate.getMonth() + 1, 1);
      return { calendar: { ...state.calendar, currentDate: next } };
    }),
    prevMonth: () => set((state) => {
      const prev = new Date(state.calendar.currentDate.getFullYear(), state.calendar.currentDate.getMonth() - 1, 1);
      return { calendar: { ...state.calendar, currentDate: prev } };
    }),
    setMonth: (date) => set((state) => ({
      calendar: { ...state.calendar, currentDate: date }
    }))
  }
}));