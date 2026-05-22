export interface CalendarEvent {
  id: string;
  dateStr: string; // Format: YYYY-MM-DD
  title: string;
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const eventService = {
  getEvents: async (): Promise<CalendarEvent[]> => {
    await delay(300); // Simulate network latency
    const localData = localStorage.getItem('app_calendar_events');
    return localData ? JSON.parse(localData) : [];
  },

  addEvent: async (event: CalendarEvent): Promise<CalendarEvent> => {
    await delay(200);
    const events = await eventService.getEvents();
    events.push(event);
    localStorage.setItem('app_calendar_events', JSON.stringify(events));
    return event;
  },

  deleteEvent: async (id: string): Promise<string> => {
    await delay(200);
    const events = await eventService.getEvents();
    const filtered = events.filter(e => e.id !== id);
    localStorage.setItem('app_calendar_events', JSON.stringify(filtered));
    return id;
  }
};