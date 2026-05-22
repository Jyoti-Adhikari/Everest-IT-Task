import { create } from 'zustand';

interface UIState {
    lastTimeRefreshed: string;
    uploadStatus: string;
    setLastTimeRefreshed: (time: string) => void;
    setUploadStatus: (status: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
    lastTimeRefreshed: 'Never',
    uploadStatus: 'Idle',
    setLastTimeRefreshed: (time) => set({ lastTimeRefreshed: time }),
    setUploadStatus: (status) => set({ uploadStatus: status }),
}));