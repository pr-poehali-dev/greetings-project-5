import { useState, useEffect } from 'react';
import Intro from '@/components/Intro';
import Auth, { User } from '@/components/Auth';
import Home from '@/components/sections/Home';
import Services from '@/components/sections/Services';
import Messages from '@/components/sections/Messages';
import Profile from '@/components/sections/Profile';
import Icon from '@/components/ui/icon';

type Tab = 'home' | 'services' | 'messages' | 'profile';

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'home', label: 'Главная', icon: 'House' },
  { id: 'services', label: 'Услуги', icon: 'BookOpen' },
  { id: 'messages', label: 'Сообщения', icon: 'MessageCircle' },
  { id: 'profile', label: 'Профиль', icon: 'User' },
];

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [introDone, setIntroDone] = useState(false);
  const [tab, setTab] = useState<Tab>('home');
  const [dark, setDark] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('lingua_user');
    const savedDark = localStorage.getItem('lingua_dark') === 'true';
    if (saved) {
      setUser(JSON.parse(saved));
      setIntroDone(true);
    }
    setDark(savedDark);
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

  if (!loaded) return null;

  if (!introDone) return <Intro onStart={() => setIntroDone(true)} />;
  if (!user) return <Auth onAuth={handleAuth} />;

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-2xl mx-auto px-5 pt-8 pb-28">
        {tab === 'home' && <Home />}
        {tab === 'services' && <Services />}
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

      <nav className="fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-2xl mx-auto px-4 pb-4">
          <div className="bg-card/90 backdrop-blur-lg border border-border rounded-2xl shadow-xl flex items-center justify-around p-2">
            {tabs.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                    active ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div
                    className={`flex items-center justify-center transition-all ${
                      active ? 'scale-110' : ''
                    }`}
                  >
                    <Icon name={t.icon} size={22} fallback="Circle" />
                  </div>
                  <span className="text-[11px] font-medium">{t.label}</span>
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
