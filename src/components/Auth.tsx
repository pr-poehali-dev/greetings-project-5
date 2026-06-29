import { useState } from 'react';
import Icon from '@/components/ui/icon';

export interface User {
  name: string;
  email: string;
  avatar: string;
}

interface AuthProps {
  onAuth: (user: User) => void;
}

const providers = [
  { id: 'google', label: 'Google', icon: 'Chrome' },
  { id: 'facebook', label: 'Facebook', icon: 'Facebook' },
  { id: 'apple', label: 'Apple', icon: 'Apple' },
];

const Auth = ({ onAuth }: AuthProps) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleProvider = (id: string) => {
    const label = id.charAt(0).toUpperCase() + id.slice(1);
    onAuth({ name: `Ученик ${label}`, email: `${id}@example.com`, avatar: '' });
  };

  const handleEmail = () => {
    if (!email.trim()) return;
    onAuth({ name: name.trim() || 'Новый ученик', email: email.trim(), avatar: '' });
  };

  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center px-5 py-10 relative overflow-hidden">
      {/* Декор */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-accent/6 blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm animate-slide-up relative">
        {/* Логотип */}
        <div className="text-center mb-8">
          <div className="relative inline-flex mb-5">
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center glow animate-float">
              <Icon name="GraduationCap" size={30} className="text-accent-foreground" />
            </div>
            <div className="absolute -inset-2 rounded-3xl bg-accent/20 blur-xl -z-10" />
          </div>
          <h1 className="font-display text-2xl font-bold text-gradient mb-2">
            Добро пожаловать
          </h1>
          <p className="text-muted-foreground text-sm">
            Войдите, чтобы начать заниматься языками
          </p>
        </div>

        {/* Карточка */}
        <div className="glass rounded-[1.75rem] p-6 soft-shadow border border-white/8">

          {/* Социальные кнопки */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {providers.map((p) => (
              <button
                key={p.id}
                onClick={() => handleProvider(p.id)}
                className="h-12 rounded-xl glass-light border border-white/8 flex flex-col items-center justify-center gap-1 hover:bg-white/10 hover:border-accent/30 transition-all group"
              >
                <Icon name={p.icon} size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-[10px] text-muted-foreground group-hover:text-foreground font-medium transition-colors">{p.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="flex-1 h-px bg-white/8" />
            <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">или по почте</span>
            <span className="flex-1 h-px bg-white/8" />
          </div>

          <div className="space-y-3">
            <input
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent/50 focus:bg-white/8 transition-all"
            />
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleEmail()}
              className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent/50 focus:bg-white/8 transition-all"
            />
            <button
              onClick={handleEmail}
              className="w-full h-12 rounded-xl bg-accent text-accent-foreground font-bold text-sm flex items-center justify-center gap-2 glow hover:scale-[1.02] transition-all duration-300"
            >
              Продолжить
              <Icon name="ArrowRight" size={17} />
            </button>
          </div>
        </div>

        <p className="text-center text-[11px] text-muted-foreground mt-5 px-4 leading-relaxed">
          Нажимая «Продолжить», вы соглашаетесь с условиями использования и политикой конфиденциальности
        </p>
      </div>
    </div>
  );
};

export default Auth;
