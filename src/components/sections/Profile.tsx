import { Button } from '@/components/ui/button';
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
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="animate-fade-in pb-4">
      <h2 className="font-display text-3xl font-bold text-foreground mb-6">Профиль</h2>

      <div className="bg-card border border-border rounded-2xl p-6 flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-accent/15 flex items-center justify-center overflow-hidden">
            {user.avatar ? (
              <img src={user.avatar} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="font-display text-2xl font-bold text-accent">{initials}</span>
            )}
          </div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center border-2 border-card">
            <Icon name="Camera" size={14} />
          </button>
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-lg">{user.name}</h3>
          <p className="text-muted-foreground text-sm">{user.email}</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="UserCog" size={18} className="text-accent" /> Личные данные
        </h4>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Имя</label>
            <Input
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="h-11 rounded-xl"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Почта</label>
            <Input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="h-11 rounded-xl"
            />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Settings" size={18} className="text-accent" /> Настройки
        </h4>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <Icon name={dark ? 'Moon' : 'Sun'} size={18} className="text-muted-foreground" />
            <span className="text-foreground">Тёмная тема</span>
          </div>
          <Switch checked={dark} onCheckedChange={setDark} />
        </div>
        <div className="flex items-center justify-between py-2 border-t border-border">
          <div className="flex items-center gap-3">
            <Icon name="Bell" size={18} className="text-muted-foreground" />
            <span className="text-foreground">Уведомления</span>
          </div>
          <Switch defaultChecked />
        </div>
      </div>

      <Button
        onClick={onLogout}
        variant="outline"
        className="w-full h-12 rounded-xl text-destructive border-destructive/30 hover:bg-destructive/5 hover:text-destructive"
      >
        <Icon name="LogOut" size={18} />
        Выйти из аккаунта
      </Button>
    </div>
  );
};

export default Profile;
