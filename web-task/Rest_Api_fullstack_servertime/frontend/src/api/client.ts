import type { TimeResponse, UploadResponse, User } from "../types";


const API_BASE = 'http://localhost:5000/api';

export const api = {
    async fetchTime(): Promise<TimeResponse> {
        const res = await fetch(`${API_BASE}/time`);
        return res.json();
    },
    
    async downloadFile(): Promise<Blob> {
        const res = await fetch(`${API_BASE}/download`);
        return res.blob();
    },
    
    async uploadFile(file: File): Promise<UploadResponse> {
        const formData = new FormData();
        formData.append('fileArg', file);
        const res = await fetch(`${API_BASE}/upload`, {
            method: 'POST',
            body: formData,
        });
        return res.json();
    },
    
    async getUsers(): Promise<User[]> {
        const res = await fetch(`${API_BASE}/users`);
        return res.json();
    },
    
    async createUser(user: Partial<User>): Promise<User> {
        const res = await fetch(`${API_BASE}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
        return res.json();
    },
    
    async updateUser(id: number, data: Partial<User>): Promise<User> {
        const res = await fetch(`${API_BASE}/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return res.json();
    },
};