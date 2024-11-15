import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Task, TaskPriority } from '../types';

interface TaskInputProps {
  onAdd: (task: Task) => void;
}

export default function TaskInput({ onAdd }: TaskInputProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('normal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      id: Date.now().toString(),
      title,
      priority,
      status: 'pending',
      createdAt: new Date().toISOString(),
      children: [],
    });
    setTitle('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="أدخل عنوان المهمة الجديدة..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div className="flex gap-2">
            {['urgent', 'normal', 'low'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p as TaskPriority)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  priority === p
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {p === 'urgent' ? 'عاجل' : p === 'normal' ? 'عادي' : 'منخفض'}
              </button>
            ))}
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            إضافة
          </button>
        </div>
      </form>
    </div>
  );
}