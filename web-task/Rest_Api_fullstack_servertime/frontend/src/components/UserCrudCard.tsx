import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/client';

interface UserRecord {
    id: number;
    name: string;
    role: string;
}

export const UserCrudCard: React.FC = () => {
    const queryClient = useQueryClient();
    const [nameInput, setNameInput] = useState('');
    const [roleInput, setRoleInput] = useState('');
    const [updateId, setUpdateId] = useState('');
    const [updateName, setUpdateName] = useState('');

    const { data: users, isLoading } = useQuery<UserRecord[]>({
        queryKey: ['users'],
        queryFn: api.getUsers,
    });

    const insertMutation = useMutation({
        mutationFn: api.createUser,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] })
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: { name: string } }) => api.updateUser(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] })
    });

    const inputClass = "w-full text-sm px-3 py-2 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all";
    const actionBtnClass = "whitespace-nowrap bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all active:scale-95 shadow-sm";

    return (
        <section className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm transition-all hover:shadow-md lg:col-span-2">
            <h2 className="text-sm font-bold text-slate-400 tracking-wider uppercase mb-5">
                4. Database CRUD Actions
            </h2>
            
            {/* Action Group Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Create Section */}
                <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs font-bold text-slate-500 block mb-1">Create User Entry</span>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input placeholder="Name" value={nameInput} onChange={e => setNameInput(e.target.value)} className={inputClass} />
                        <input placeholder="Role" value={roleInput} onChange={e => setRoleInput(e.target.value)} className={inputClass} />
                    </div>
                    <button 
                        onClick={() => {
                            if (!nameInput.trim()) return;
                            insertMutation.mutate({ name: nameInput, role: roleInput });
                            setNameInput(''); setRoleInput('');
                        }} 
                        className={`${actionBtnClass} w-full`}
                    >
                        Insert Record
                    </button>
                </div>

                {/* Update Section */}
                <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs font-bold text-slate-500 block mb-1">Modify Existing Record</span>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input type="number" placeholder="User ID" value={updateId} onChange={e => setUpdateId(e.target.value)} className={inputClass} />
                        <input placeholder="New Name" value={updateName} onChange={e => setUpdateName(e.target.value)} className={inputClass} />
                    </div>
                    <button 
                        onClick={() => {
                            if (!updateId || !updateName.trim()) return;
                            updateMutation.mutate({ id: Number(updateId), data: { name: updateName } });
                            setUpdateId(''); setUpdateName('');
                        }} 
                        className={`${actionBtnClass} w-full bg-blue-600 hover:bg-blue-500`}
                    >
                        Update Name
                    </button>
                </div>
            </div>

            {/* Records List Section */}
            <div>
                <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                    Current Records Table
                    {users && <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-xs font-mono">{Array.isArray(users) ? users.length : 0}</span>}
                </h3>
                
                {isLoading ? (
                    <div className="h-32 flex items-center justify-center text-slate-400 text-sm font-medium italic bg-slate-50 rounded-xl border border-dashed">
                        Loading application parameters...
                    </div>
                ) : (
                    <div className="overflow-hidden border border-slate-100 rounded-xl shadow-sm">
                        <table className="w-full text-left border-collapse bg-white">
                            <thead>
                                <tr className="bg-slate-50 text-slate-400 text-xs font-bold tracking-wider border-b border-slate-100 uppercase">
                                    <th className="py-3 px-4 w-16">ID</th>
                                    <th className="py-3 px-4">Name</th>
                                    <th className="py-3 px-4">Role</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 text-sm text-slate-600 font-medium">
                                {Array.isArray(users) && users.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-3 px-4 font-mono text-xs text-slate-400">#{user.id}</td>
                                        <td className="py-3 px-4 text-slate-800 font-semibold">{user.name}</td>
                                        <td className="py-3 px-4">
                                            <span className="bg-slate-100 text-slate-600 text-xs px-2.5 py-0.5 rounded-full font-medium">
                                                {user.role || 'User'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {(!users || (Array.isArray(users) && users.length === 0)) && (
                                    <tr>
                                        <td colSpan={3} className="py-8 text-center text-slate-400 text-xs italic">
                                            No active client records in index database.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
};