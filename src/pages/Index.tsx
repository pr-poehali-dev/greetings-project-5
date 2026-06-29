import { useState, useEffect } from 'react';
import Intro from '@/components/Intro';
import Auth, { User } from '@/components/Auth';
import Home from '@/components/sections/Home';
import Services from '@/components/sections/Services';
import Messages from '@/components/sections/Messages';
import Profile from '@/components/sections/Profile';
import EditorBar from '@/components/EditorBar';
import Icon from '@/components/ui/icon';
import { loadContent, saveContent, defaultContent, type SiteContent } from '@/lib/content';

type Tab = 'home' | 'services' | 'messages' | 'profile';

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'home', label: 'Главная', icon: 'House' },
  { id: 'services', label: 'Услуги', icon: 'BookOpen' },
  { id: 'messages', label: 'Чат', icon: 'MessageCircle' },
  { id: 'profile', label: 'Профиль', icon: 'User' },
];

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [introDone, setIntroDone] = useState(false);
  const [tab, setTab] = useState<Tab>('home');
  const [dark, setDark] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [editMode, setEditMode] = useState(false);
  const [savedContent, setSavedContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    const savedUser = localStorage.getItem('lingua_user');
    const savedDark = localStorage.getItem('lingua_dark');
    const c = loadContent();
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIntroDone(true);
    }
    setDark(savedDark === null ? true : savedDark === 'true');
    setContent(c);
    setSavedContent(c);
    setLoaded(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('lingua_dark', String(dark));
  }, [dark]);

  const handleAuth = (u: User) => {
    setUser(u);
    localStorage.setItem('lingua_user', JSON.stringify(u));
  };

  const updateUser = (u: User) => {
    setUser(u);
    localStorage.setItem('lingua_user', JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    setIntroDone(false);
    setTab('home');
    localStorage.removeItem('lingua_user');
  };

  const handleSave = () => {
    saveContent(content);
    setSavedContent(content);
    setEditMode(false);
  };

  const handleReset = () => {
    setContent(savedContent);
    setEditMode(false);
  };

  const handleToggleEdit = () => {
    if (editMode) {
      setContent(savedContent);
    }
    setEditMode((v) => !v);
  };

  if (!loaded) return null;

  if (!introDone) {
    return (
      <>
        <EditorBar editMode={editMode} onToggle={handleToggleEdit} onSave={handleSave} onReset={handleReset} />
        <Intro
          onStart={() => setIntroDone(true)}
          content={content}
          setContent={setContent}
          editMode={editMode}
        />
      </>
    );
  }

  if (!user) return <Auth onAuth={handleAuth} />;

  return (
    <div className={`min-h-screen mesh-bg ${editMode ? 'edit-mode' : ''}`}>
      <EditorBar editMode={editMode} onToggle={handleToggleEdit} onSave={handleSave} onReset={handleReset} />

      <main className="max-w-2xl mx-auto px-5 pt-8 pb-28">
        {tab === 'home' && (
          <Home content={content} setContent={setContent} editMode={editMode} />
        )}
        {tab === 'services' && (
          <Services content={content} setContent={setContent} editMode={editMode} />
        )}
        {tab === 'messages' && <Messages />}
        {tab === 'profile' && (
          <Profile
            user={user}
            setUser={updateUser}
            dark={dark}
            setDark={setDark}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Нижняя навигация */}
      <nav className="fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-2xl mx-auto px-4 pb-5">
          <div className="glass rounded-[1.5rem] soft-shadow flex items-center justify-around p-2">
            {tabs.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`relative flex flex-col items-center gap-1.5 px-5 py-2.5 rounded-xl transition-all duration-300 ${
                    active
                      ? 'text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {active && (
                    <span className="absolute inset-0 rounded-xl bg-accent glow" />
                  )}
                  <div className={`relative flex items-center justify-center transition-transform duration-300 ${active ? 'scale-110' : ''}`}>
                    <Icon name={t.icon} size={21} fallback="Circle" />
                  </div>
                  <span className="relative text-[11px] font-bold tracking-wide">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;
