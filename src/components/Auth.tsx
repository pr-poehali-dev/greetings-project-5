import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  { id: 'google', label: 'Войти через Google', icon: 'Chrome', color: 'bg-white text-foreground border border-border hover:bg-muted' },
  { id: 'facebook', label: 'Войти через Facebook', icon: 'Facebook', color: 'bg-[#1877F2] text-white hover:bg-[#1877F2]/90' },
  { id: 'apple', label: 'Войти через Apple', icon: 'Apple', color: 'bg-foreground text-background hover:bg-foreground/90' },
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
    <div className="min-h-screen mesh-bg flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center mx-auto mb-5 soft-shadow animate-float">
            <Icon name="GraduationCap" size={30} className="text-accent-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold text-gradient">
            Добро пожаловать
          </h1>
          <p className="text-muted-foreground mt-2">
            Войдите, чтобы начать заниматься языками
          </p>
        </div>

        <div className="glass rounded-3xl p-6 soft-shadow">
          <div className="space-y-3">
            {providers.map((p) => (
              <button
                key={p.id}
                onClick={() => handleProvider(p.id)}
                className={`w-full h-12 rounded-xl font-medium flex items-center justify-center gap-3 transition-colors ${p.color}`}
              >
                <Icon name={p.icon} size={20} />
                {p.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 my-6">
            <span className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider">или по почте</span>
            <span className="flex-1 h-px bg-border" />
          </div>

          <div className="space-y-3">
            <Input
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 rounded-xl"
            />
            <Input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl"
            />
            <Button
              onClick={handleEmail}
              className="w-full h-12 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 text-base"
            >
              Продолжить
              <Icon name="ArrowRight" size={18} />
            </Button>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6 px-6">
          Нажимая «Продолжить», вы соглашаетесь с условиями использования и политикой конфиденциальности
        </p>
      </div>
    </div>
  );
};

export default Auth;