import React, { useState } from 'react';
import { Moon, Sun, Bell, Globe, Settings } from 'lucide-react';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('EN');
  const [notifications, setNotifications] = useState(true);
  const [saving, setSaving] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center py-16 px-4">
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2 mb-4"><Settings size={24} className="text-blue-400" /> Settings</h1>
        <form className="flex flex-col gap-6 w-full" onSubmit={e => { e.preventDefault(); setSaving(true); setTimeout(() => setSaving(false), 1000); }}>
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-white font-semibold"><Moon size={20} /> Dark Mode</span>
            <button type="button" className={`w-12 h-6 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-gray-400'} flex items-center transition-all`} onClick={() => setDarkMode(v => !v)}>
              <span className={`w-5 h-5 rounded-full bg-white shadow transform transition-all ${darkMode ? 'translate-x-6' : 'translate-x-1'}`}></span>
            </button>
          </div>
          {/* Language Select */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-white font-semibold"><Globe size={20} /> Language</span>
            <select className="px-3 py-2 rounded-xl bg-gray-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base" value={language} onChange={e => setLanguage(e.target.value)}>
              <option value="EN">English</option>
              <option value="ES">Español</option>
              <option value="ZH">中文</option>
            </select>
          </div>
          {/* Notifications Toggle */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-white font-semibold"><Bell size={20} /> Notifications</span>
            <button type="button" className={`w-12 h-6 rounded-full ${notifications ? 'bg-green-500' : 'bg-gray-400'} flex items-center transition-all`} onClick={() => setNotifications(v => !v)}>
              <span className={`w-5 h-5 rounded-full bg-white shadow transform transition-all ${notifications ? 'translate-x-6' : 'translate-x-1'}`}></span>
            </button>
          </div>
          <button type="submit" className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow hover:scale-105 transition-all duration-200 w-max self-end">
            {saving ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
} 