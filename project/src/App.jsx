import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate, useNavigate, Link } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ResumeUpload from './pages/ResumeUpload';
import TechnicalAssessment from './pages/TechnicalAssessment';
import HRModule from './pages/HRModule';
import GDArena from './pages/GDArena';
import AptitudeTest from './pages/AptitudeTest';
import Reports from './pages/Reports';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import SettingsPage from './pages/Settings';
import Profile from './pages/Profile';
import { Menu, LogOut, Settings, User, ChevronDown } from 'lucide-react';
import { GlobalProvider, useGlobal } from './context/GlobalContext';
import { ToastProvider } from './context/ToastContext';
import { useToast } from './hooks/useToast';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useGlobal();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Layout with Sidebar and Ambience
function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    navigate('/');
    setUserMenuOpen(false);
  };

  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    const titles = {
      '/reports': 'Reports & Dashboard',
      '/resume-analyzer': 'Resume Analyzer',
      '/technical': 'Technical Assessment',
      '/hr-module': 'HR Interview',
      '/gd-arena': 'Group Discussion',
      '/aptitude': 'Aptitude Test',
      '/settings': 'Settings',
      '/profile': 'Profile'
    };
    return titles[path] || 'NexusAI';
  };

  return (
    <div className="flex min-h-screen text-white bg-slate-950 font-sans selection:bg-indigo-500/20 selection:text-indigo-200">
      {/* Subtle Background Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/15 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/15 blur-[120px] rounded-full"></div>
      </div>

      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <main className="flex-1 w-full min-w-0 flex flex-col z-10 relative">
        {/* Professional Header Bar */}
        <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/60 shadow-lg">
          <div className="h-16 px-4 md:px-6 flex items-center justify-between">
            {/* Left: Mobile Menu + Page Title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-300"
              >
                <Menu size={20} />
              </button>
              <div className="hidden md:block">
                <h1 className="text-lg font-semibold text-white">
                  {getPageTitle()}
                </h1>
                <p className="text-xs text-slate-500">Professional Assessment Platform</p>
              </div>
            </div>

            {/* Right: User Info */}
            <div className="flex items-center gap-3">
              <div ref={userMenuRef} className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="hidden sm:flex items-center gap-3 px-3 py-1.5 bg-slate-800/60 rounded-lg border border-slate-700/50 backdrop-blur-md hover:border-slate-600 transition-all duration-300 cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-white text-sm font-semibold shadow-lg group-hover:shadow-indigo-500/20 transition-all">
                    JD
                  </div>
                  <div className="hidden md:block text-left mr-1">
                    <p className="text-sm font-semibold text-white leading-tight">John Doe</p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Candidate</p>
                  </div>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-slate-900 border border-slate-700/50 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50">
                    <div className="p-1.5 space-y-0.5">
                      <button onClick={() => { navigate('/profile'); setUserMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors group">
                        <User size={16} className="text-slate-400 group-hover:text-emerald-400 transition-colors" />
                        Profile
                      </button>
                      <button onClick={() => { navigate('/settings'); setUserMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors group">
                        <Settings size={16} className="text-slate-400 group-hover:text-purple-400 transition-colors" />
                        Settings
                      </button>
                      <div className="h-px bg-slate-800 mx-1 my-1" />
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors group">
                        <LogOut size={16} className="text-slate-400 group-hover:text-red-400 transition-colors" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 p-3 md:p-4 lg:p-6 overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}

// Wrapper to provide toast context
function AppContent() {
  const { toasts, removeToast } = useToast();

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Redirect dashboard to reports */}
        <Route path="/dashboard" element={<Navigate to="/reports" replace />} />

        <Route path="/reports" element={
          <ProtectedRoute>
            <MainLayout><Dashboard /></MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/resume" element={
          <ProtectedRoute>
            <ResumeUpload />
          </ProtectedRoute>
        } />

        <Route path="/resume-analyzer" element={
          <ProtectedRoute>
            <MainLayout><ResumeAnalyzer /></MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/technical" element={
          <ProtectedRoute>
            <MainLayout><TechnicalAssessment /></MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/hr-module" element={
          <ProtectedRoute>
            <MainLayout><HRModule /></MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/gd-arena" element={
          <ProtectedRoute>
            <MainLayout><GDArena /></MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/aptitude" element={
          <ProtectedRoute>
            <MainLayout><AptitudeTest /></MainLayout>
          </ProtectedRoute>
        } />


        <Route path="/settings" element={
          <ProtectedRoute>
            <MainLayout><SettingsPage /></MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <MainLayout><Profile /></MainLayout>
          </ProtectedRoute>
        } />
      </Routes>

      {/* Toast Notifications */}
      <Toast toasts={toasts} removeToast={removeToast} />
    </>
  );
}

function App() {
  return (
    <GlobalProvider>
      <ToastProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ToastProvider>
    </GlobalProvider>
  );
}

export default App;
