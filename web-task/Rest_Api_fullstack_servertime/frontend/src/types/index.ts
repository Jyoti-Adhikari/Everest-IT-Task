export interface User {
    id: number;
    name: string;
    role: string;
}

export interface TimeResponse {
    serverTime: string;
}

export interface UploadResponse {
    message: string;
    file: {
        filename: string;
    };
}