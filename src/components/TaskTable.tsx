import React from 'react';
import { AlertCircle, CheckCircle2, Clock, Trash2 } from 'lucide-react';
import { Task } from '../types';

interface TaskTableProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function TaskTable({ tasks, setTasks }: TaskTableProps) {
  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <p className="text-gray-500">لا توجد مهام حالياً</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">الأولوية</th>
            <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">المهمة</th>
            <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">الحالة</th>
            <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id} className="border-b border-gray-100 last:border-0">
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                  task.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                  task.priority === 'normal' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {task.priority === 'urgent' ? 'عاجل' :
                   task.priority === 'normal' ? 'عادي' : 'منخفض'}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={`${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                  {task.title}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                  task.status === 'completed' ? 'bg-green-100 text-green-700' :
                  task.status === 'postponed' ? 'bg-blue-100 text-blue-700' :
                  task.status === 'problematic' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {task.status === 'completed' ? 'مكتمل' :
                   task.status === 'postponed' ? 'مؤجل' :
                   task.status === 'problematic' ? 'مشكلة' : 'قيد التنفيذ'}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateTaskStatus(task.id, 'postponed')}
                    className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="تأجيل"
                  >
                    <Clock className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => updateTaskStatus(task.id, 'completed')}
                    className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="إتمام"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => updateTaskStatus(task.id, 'problematic')}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="مشكلة"
                  >
                    <AlertCircle className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="حذف"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}