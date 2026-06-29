import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import type { User } from '@/components/Auth';

interface ProfileProps {
  user: User;
  setUser: (u: User) => void;
  dark: boolean;
  setDark: (v: boolean) => void;
  onLogout: () => void;
}

const Profile = ({ user, setUser, dark, setDark, onLogout }: ProfileProps) => {
  const initials = user.name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="animate-fade-in pb-4">
      <h2 className="font-display text-2xl font-bold text-gradient mb-7">Профиль</h2>

      {/* Аватар */}
      <div className="relative rounded-[1.75rem] p-6 mb-5 overflow-hidden glass-light border border-white/8">
        <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-accent/8 blur-3xl" />
        <div className="flex items-center gap-4 relative">
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-accent/15 border border-accent/25 flex items-center justify-center overflow-hidden">
              {user.avatar ? (
                <img src={user.avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="font-display text-2xl font-bold text-accent glow-text">{initials}</span>
              )}
            </div>
            <button className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-xl bg-accent text-accent-foreground flex items-center justify-center border-2 border-background glow">
              <Icon name="Camera" size={13} />
            </button>
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-foreground text-lg truncate">{user.name}</h3>
            <p className="text-muted-foreground text-sm truncate">{user.email}</p>
            <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Ученик
            </span>
          </div>
        </div>
      </div>

      {/* Личные данные */}
      <div className="glass-light border border-white/8 rounded-[1.5rem] p-5 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-accent/15 flex items-center justify-center">
            <Icon name="UserCog" size={15} className="text-accent" />
          </div>
          <span className="font-bold text-foreground text-sm">Личные данные</span>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Имя</label>
            <Input
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="h-11 rounded-xl bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground focus:border-accent/50"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Почта</label>
            <Input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="h-11 rounded-xl bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground focus:border-accent/50"
            />
          </div>
        </div>
      </div>

      {/* Настройки */}
      <div className="glass-light border border-white/8 rounded-[1.5rem] p-5 mb-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-accent/15 flex items-center justify-center">
            <Icon name="Settings" size={15} className="text-accent" />
          </div>
          <span className="font-bold text-foreground text-sm">Настройки</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between py-3 border-b border-white/6">
            <div className="flex items-center gap-3">
              <Icon name={dark ? 'Moon' : 'Sun'} size={16} className="text-muted-foreground" />
              <span className="text-foreground text-sm">Тёмная тема</span>
            </div>
            <Switch checked={dark} onCheckedChange={setDark} />
          </div>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Icon name="Bell" size={16} className="text-muted-foreground" />
              <span className="text-foreground text-sm">Уведомления</span>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      {/* Выход */}
      <button
        onClick={onLogout}
        className="w-full h-12 rounded-xl glass-light border border-destructive/20 text-destructive text-sm font-semibold flex items-center justify-center gap-2 hover:bg-destructive/8 transition-colors"
      >
        <Icon name="LogOut" size={17} />
        Выйти из аккаунта
      </button>
    </div>
  );
};

export default Profile;
