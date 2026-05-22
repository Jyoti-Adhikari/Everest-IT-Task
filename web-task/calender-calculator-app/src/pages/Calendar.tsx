import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppStore } from '../store/appStore';
import { eventService, type CalendarEvent } from '../services/eventService';

export const Calendar: React.FC = () => {
  const queryClient = useQueryClient();
  const { currentDate, nextMonth, prevMonth } = useAppStore((state) => state.calendar);
  
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);
  const [newEventTitle, setNewEventTitle] = useState('');

  // TanStack Query substitutes boilerplate useEffect operations
  const { data: events = [], isLoading } = useQuery({
    queryKey: ['calendar_events'],
    queryFn: eventService.getEvents,
  });

  const addEventMutation = useMutation({
    mutationFn: eventService.addEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar_events'] });
      setNewEventTitle('');
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: eventService.deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar_events'] });
    },
  });

  // Calendar Math Engine
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const firstDayOfMonthIndex = new Date(year, month, 1).getDay();
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  
  const calendarCells: (number | null)[] = [
    ...Array(firstDayOfMonthIndex).fill(null),
    ...Array.from({ length: totalDaysInMonth }, (_, i) => i + 1)
  ];

  const handleDayClick = (day: number) => {
    // Zero-pad parameters safely
    const pad = (num: number) => String(num).padStart(2, '0');
    setSelectedDateStr(`${year}-${pad(month + 1)}-${pad(day)}`);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim() || !selectedDateStr) return;
    
    const targetEvent: CalendarEvent = {
      id: crypto.randomUUID(),
      dateStr: selectedDateStr,
      title: newEventTitle.trim()
    };
    addEventMutation.mutate(targetEvent);
  };

  const activeDayEvents = events.filter(e => e.dateStr === selectedDateStr);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-4">
      {/* Calendar Grid Box */}
      <div className="lg:col-span-2 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">{monthNames[month]} {year}</h2>
          <div className="inline-flex gap-1 bg-slate-100 p-1 rounded-xl">
            <button onClick={prevMonth} className="p-2 hover:bg-white rounded-lg transition-all text-slate-600">
              ←
            </button>
            <button onClick={nextMonth} className="p-2 hover:bg-white rounded-lg transition-all text-slate-600">
              →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center font-semibold text-xs tracking-wider text-slate-400 mb-2 uppercase">
          {daysOfWeek.map(d => <div key={d} className="py-1">{d}</div>)}
        </div>

        {isLoading ? (
          <div className="h-64 flex items-center justify-center text-slate-400 text-sm">Syncing system schedule...</div>
        ) : (
          <div className="grid grid-cols-7 gap-2">
            {calendarCells.map((day, idx) => {
              if (day === null) return <div key={`empty-${idx}`} className="bg-slate-50/50 rounded-xl min-h-[4.5rem]"></div>;

              // Match current parsing key format
              const pad = (num: number) => String(num).padStart(2, '0');
              const currentCellStr = `${year}-${pad(month + 1)}-${pad(day)}`;
              const dayHasEvents = events.some(e => e.dateStr === currentCellStr);
              const isSelected = selectedDateStr === currentCellStr;

              return (
                <button
                  key={`day-${day}`}
                  onClick={() => handleDayClick(day)}
                  className={`p-2 rounded-xl text-left font-medium min-h-[4.5rem] flex flex-col justify-between border transition-all ${
                    isSelected 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                      : 'bg-white border-slate-100 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span>{day}</span>
                  {dayHasEvents && (
                    <span className={`w-2 h-2 rounded-full self-end ${isSelected ? 'bg-white' : 'bg-blue-500'}`}></span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Side Context Agenda Panel */}
      <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col justify-between min-h-[24rem]">
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4">Agenda View</h3>
          {!selectedDateStr ? (
            <p className="text-sm text-slate-400 italic">Select any calendar cell view grid to parse scheduled events.</p>
          ) : (
            <div>
              <p className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-3">Tasks for {selectedDateStr}</p>
              {activeDayEvents.length === 0 ? (
                <p className="text-sm text-slate-400 italic mb-4">No events assigned to this date.</p>
              ) : (
                <div className="space-y-2 mb-6">
                  {activeDayEvents.map(event => (
                    <div key={event.id} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                      <span className="text-sm text-slate-700 font-medium">{event.title}</span>
                      <button 
                        onClick={() => deleteEventMutation.mutate(event.id)}
                        className="text-xs text-rose-500 hover:bg-rose-50 p-1.5 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <form onSubmit={handleCreateEvent} className="space-y-2">
                <input
                  type="text"
                  placeholder="New Event Title"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  className="w-full text-sm px-3 py-2 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={!newEventTitle.trim() || addEventMutation.isPending}
                  className="w-full text-sm bg-slate-900 text-white font-semibold py-2 rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50"
                >
                  {addEventMutation.isPending ? 'Saving...' : 'Add Event'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};