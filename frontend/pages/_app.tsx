import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { mainnet, polygon, polygonZkEvmTestnet } from 'wagmi/chains';
import WalletConnect from '../components/WalletConnect';
import SidebarNav from '../components/SidebarNav';
import BottomNav from '../components/BottomNav';
import { useRouter } from 'next/router';
import { useEffect, useState, createContext, useContext } from 'react';
import { Bell } from 'lucide-react';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonZkEvmTestnet, polygon, mainnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

// Toast context and provider
const ToastContext = createContext({ show: (msg: string, type?: string) => {} });

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null);
  const show = (msg: string, type = 'info') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };
  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {toast && (
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-xl text-white font-semibold text-base animate-fade-in-up transition-all duration-300
          ${toast.type === 'success' ? 'bg-green-500/90' : toast.type === 'error' ? 'bg-red-500/90' : 'bg-blue-500/90'}`}
        >
          {toast.msg}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() { return useContext(ToastContext); }

// Add JudgeModeContext
const JudgeModeContext = createContext({ judgeMode: false, setJudgeMode: (v: boolean) => {} });

function JudgeModeProvider({ children }: { children: React.ReactNode }) {
  const [judgeMode, setJudgeMode] = useState(false);
  return (
    <JudgeModeContext.Provider value={{ judgeMode, setJudgeMode }}>
      {children}
    </JudgeModeContext.Provider>
  );
}

export function useJudgeMode() {
  return useContext(JudgeModeContext);
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [show, setShow] = useState(true);
  const [mounted, setMounted] = useState(false);
  const toast = useToast();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [showHistory, setShowHistory] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [notifOpen, setNotifOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState([
    { id: 1, text: 'Deposit confirmed: 0.1 BTC', read: false },
    { id: 2, text: 'You earned the Goal Crusher badge!', read: false },
    { id: 3, text: 'Alice sent you a gift!', read: true },
  ]);
  // Demo/mock history data
  const demoHistory = [
    { id: 1, type: 'Deposit', section: 'DeFi', amount: '0.1', status: 'Confirmed', time: '2m ago', tx: '0xabc...' },
    { id: 2, type: 'Shield', section: 'Privacy', amount: '0.01', status: 'Confirmed', time: '5m ago', tx: '0xdef...' },
    { id: 3, type: 'Withdraw', section: 'Bridge', amount: '0.05', status: 'Pending', time: 'just now', tx: '0xghi...' },
  ];
  // Demo analytics from demoHistory
  const totalDeposited = demoHistory.filter(tx => tx.type === 'Deposit').reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
  const totalShielded = demoHistory.filter(tx => tx.type === 'Shield').reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
  const totalWithdrawn = demoHistory.filter(tx => tx.type === 'Withdraw').reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
  const counts = demoHistory.reduce((acc, tx) => { acc[tx.section] = (acc[tx.section] || 0) + 1; return acc; }, {} as Record<string, number>);

  useEffect(() => {
    setShow(false);
    const timeout = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timeout);
  }, [router.pathname]);

  useEffect(() => setMounted(true), []);

  // Register service worker for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(() => toast.show('PWA ready: App can be installed/offline!', 'success'))
        .catch(() => toast.show('PWA service worker registration failed', 'error'));
    }
  }, []);

  // Check notification permission
  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  // Custom install prompt
  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      toast.show('App installed! 🎉', 'success');
    } else {
      toast.show('App install dismissed', 'info');
    }
    setShowInstall(false);
    setDeferredPrompt(null);
  };

  const handleNotifications = async () => {
    if (!('Notification' in window)) {
      toast.show('Notifications not supported', 'error');
      return;
    }
    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
    if (permission === 'granted') {
      toast.show('Notifications enabled! 🔔', 'success');
    } else {
      toast.show('Notifications denied', 'info');
    }
  };

  return (
    <WagmiConfig config={config}>
      <ToastProvider>
        <JudgeModeProvider>
        <div className="min-h-screen bg-gray-900 text-white flex">
          <SidebarNav />
          <div className="flex-1 flex flex-col min-h-screen pl-0 md:pl-20">
            <div className="w-full flex justify-end items-start p-4 md:p-6">
              {/* <div className="hidden md:block"><WalletConnect /></div> */}
            </div>
              {/* History, Insights, and Enable Notifications Buttons Row */}
              {mounted && (
                <div className="w-full flex flex-col md:flex-row gap-3 md:gap-4 items-center justify-end px-4 md:px-8 mt-2 mb-4 z-40">
                <button
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold shadow-md text-base hover:scale-105 hover:shadow-xl transition-all duration-200 backdrop-blur-md"
                  onClick={() => setShowHistory(true)}
                >
                  <span>📜</span> History
                </button>
                  <button
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold shadow-md text-base hover:scale-105 hover:shadow-xl transition-all duration-200 backdrop-blur-md"
                    onClick={() => setShowInsights(true)}
                  >
                    <span>📊</span> Insights
                  </button>
                  {notificationPermission === 'default' && (
                    <button
                      className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-400 text-white font-bold shadow-md text-base hover:scale-105 hover:shadow-xl transition-all duration-200 backdrop-blur-md"
                      onClick={handleNotifications}
                    >
                      <span>🔔</span> Enable Notifications
                    </button>
                  )}
                </div>
              )}
              <div className="flex-1">
                {/* Only render floating UI after mount to avoid hydration errors */}
                {mounted && <>
                {/* History Modal */}
                {showHistory && (
                  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-2xl flex flex-col gap-4 relative">
                      <button
                        className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none"
                        onClick={() => setShowHistory(false)}
                        aria-label="Close"
                      >
                        &times;
                      </button>
                      <h3 className="text-xl font-bold text-white mb-2">Unified Transaction History</h3>
                      <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
                        {demoHistory.map(tx => (
                          <div key={tx.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 bg-gray-800/60 rounded-lg p-3">
                            <span className="font-bold text-blue-300">{tx.section}</span>
                            <span className={`font-bold ${tx.type === 'Deposit' ? 'text-green-400' : tx.type === 'Withdraw' ? 'text-pink-400' : 'text-fuchsia-400'}`}>{tx.type}</span>
                            <span className="text-white">{tx.amount} BTC</span>
                            <span className={`text-xs font-semibold ${tx.status === 'Confirmed' ? 'text-green-400' : tx.status === 'Pending' ? 'text-yellow-400' : 'text-red-400'}`}>{tx.status}</span>
                            <span className="text-xs text-gray-400">{tx.time}</span>
                            <span className="text-xs text-gray-500 truncate">{tx.tx}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {showInstall && (
                  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold shadow-xl text-base md:text-lg animate-pulse">
                    <span>Install Citrea App for the best experience!</span>
                    <button
                      className="ml-3 px-4 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold transition-all duration-150"
                      onClick={handleInstall}
                    >
                      Install
                    </button>
                  </div>
                )}
                  {/* Notification Bell */}
                  <div className="fixed top-4 right-20 z-50">
                    <button className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all" onClick={() => setNotifOpen(v => !v)}>
                      <Bell size={24} className="text-white" />
                      {notifications.some(n => !n.read) && <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full" />}
                    </button>
                    {notifOpen && (
                      <div className="absolute right-0 mt-2 w-80 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl py-2 flex flex-col gap-1 z-50">
                        <div className="px-4 py-2 text-gray-300 font-bold text-sm border-b border-white/10">Notifications</div>
                        {notifications.length === 0 && <div className="px-4 py-4 text-gray-500 text-sm">No notifications</div>}
                        {notifications.map(n => (
                <button
                            key={n.id}
                            className={`flex items-center gap-2 px-4 py-3 text-left text-gray-200 hover:bg-white/20 transition-all ${!n.read ? 'font-bold' : ''}`}
                            onClick={() => setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
                          >
                            {!n.read && <span className="w-2 h-2 bg-pink-500 rounded-full" />}
                            <span>{n.text}</span>
                      </button>
                        ))}
                      </div>
                    )}
                  </div>
              </>}
              <div
                key={router.pathname}
                className={`transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}
              >
                <Component {...pageProps} />
              </div>
            </div>
          </div>
          <BottomNav />
        </div>
        </JudgeModeProvider>
      </ToastProvider>
    </WagmiConfig>
  );
} 