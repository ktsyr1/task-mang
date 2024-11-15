import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Clock, ListTodo, Plus, Trash2 } from 'lucide-react';
import { Task, TaskPriority } from './types';
import TaskInput from './components/TaskInput';
import TaskTable from './components/TaskTable';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { urgent: 0, normal: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority] || 
           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة المهام</h1>
          <p className="text-gray-600">نظّم مهامك بكفاءة وفعالية</p>
        </header>

        <div className="space-y-6">
          <TaskInput onAdd={addTask} />
          <TaskTable tasks={sortedTasks} setTasks={setTasks} />
        </div>
      </div>
    </div>
  );
}

export default App;