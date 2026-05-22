import React, { useState } from 'react';
import { api } from '../api/client';
import { useUIStore } from '../store/useUIStore';

export const FileTransferCard: React.FC = () => {
    const { uploadStatus, setUploadStatus } = useUIStore();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleDownload = async () => {
        const blob = await api.downloadFile();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'api-file.txt';
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        setUploadStatus('Uploading...');
        try {
            const data = await api.uploadFile(selectedFile);
            setUploadStatus(`Success! Saved as: ${data.file.filename}`);
        } catch {
            setUploadStatus('Upload failed.');
        }
    };

    // Helper to compute a cleaner status style tint dynamically
    const getStatusStyle = () => {
        if (uploadStatus?.includes('Success')) return 'bg-emerald-50 text-emerald-700 border-emerald-100';
        if (uploadStatus?.includes('failed')) return 'bg-rose-50 text-rose-700 border-rose-100';
        if (uploadStatus?.includes('Uploading')) return 'bg-blue-50 text-blue-700 border-blue-100 animate-pulse';
        return 'bg-slate-50 text-slate-600 border-slate-100';
    };

    return (
        <section className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm transition-all hover:shadow-md">
            <h2 className="text-sm font-bold text-slate-400 tracking-wider uppercase mb-5">
                2 & 3. File Actions (Download & Upload)
            </h2>

            {/* Download Action Section */}
            <div className="mb-5">
                <button 
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 px-4 rounded-xl transition-all active:scale-95 text-sm shadow-sm"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Execute API Download
                </button>
            </div>

            <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-100"></div>
                <span className="flex-shrink mx-4 text-xs text-slate-300 font-medium uppercase">or</span>
                <div className="flex-grow border-t border-slate-100"></div>
            </div>

            {/* Upload Section Input Area */}
            <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl">
                    <input 
                        type="file" 
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                        className="block w-full text-xs text-slate-500
                            file:mr-3 file:py-1.5 file:px-3
                            file:rounded-lg file:border-0
                            file:text-xs file:font-semibold
                            file:bg-white file:text-slate-700
                            file:shadow-sm file:cursor-pointer
                            hover:file:bg-slate-100 transition-all"
                    />
                    <button 
                        onClick={handleUpload}
                        disabled={!selectedFile}
                        className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-semibold text-xs py-2 px-4 rounded-lg transition-all active:scale-95 shadow-sm"
                    >
                        Upload
                    </button>
                </div>

                {uploadStatus && (
                    <div className={`text-xs p-3 rounded-xl border font-medium ${getStatusStyle()}`}>
                        Status: {uploadStatus}
                    </div>
                )}
            </div>
        </section>
    );
};