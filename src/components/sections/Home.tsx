import Icon from '@/components/ui/icon';
import EditableText from '@/components/EditableText';
import type { SiteContent } from '@/lib/content';

interface Props {
  content: SiteContent;
  setContent: (c: SiteContent) => void;
  editMode: boolean;
}

const Home = ({ content, setContent, editMode }: Props) => {
  const { home } = content;

  return (
    <div className="animate-fade-in pb-4">

      {/* Hero */}
      <div className="relative rounded-[1.75rem] p-7 mb-7 overflow-hidden soft-shadow">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-card to-card/80" />
        <div className="absolute -right-12 -top-12 w-52 h-52 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -left-8 -bottom-14 w-36 h-36 rounded-full bg-purple-500/10 blur-2xl" />
        <div className="relative">
          <p className="text-xs uppercase tracking-widest text-accent font-bold mb-3">
            Добро пожаловать обратно
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight text-gradient">
            <EditableText
              value={home.heroTitle}
              onChange={(v) => setContent({ ...content, home: { ...home, heroTitle: v } })}
              editMode={editMode}
            />
          </h2>
          <EditableText
            value={home.heroSubtitle}
            onChange={(v) => setContent({ ...content, home: { ...home, heroSubtitle: v } })}
            editMode={editMode}
            className="text-muted-foreground mt-3 text-sm leading-relaxed block"
            tag="p"
          />
        </div>
      </div>

      {/* Расписание */}
      <div className="mb-7">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl font-bold text-foreground">Расписание</h3>
          <div className="flex items-center gap-1.5 text-accent text-xs font-semibold">
            <Icon name="CalendarDays" size={15} />
            Эта неделя
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 stagger">
          {home.schedule.map((s, i) => (
            <div
              key={i}
              className={`min-w-[138px] rounded-2xl p-4 border hover-lift shrink-0 ${
                s.free
                  ? 'border-dashed border-accent/40 bg-accent/5'
                  : 'glass-light border-white/6'
              }`}
            >
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="font-display text-2xl font-bold text-foreground">{s.date}</span>
                <span className="text-[11px] text-muted-foreground uppercase font-semibold">{s.day}</span>
              </div>
              <p className={`text-sm font-bold mb-1 ${s.free ? 'text-accent glow-text' : 'text-accent'}`}>{s.time}</p>
              <p className="text-xs text-muted-foreground leading-snug">{s.subject}</p>
              {s.free && (
                <span className="mt-2 inline-block text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                  Записаться
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Новости */}
      <div>
        <h3 className="font-display text-xl font-bold text-foreground mb-4">Новости</h3>
        <div className="space-y-3 stagger">
          {home.news.map((n, i) => (
            <article
              key={i}
              className="glass-light border border-white/6 rounded-2xl p-5 hover-lift"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-accent uppercase tracking-wider bg-accent/10 px-2.5 py-1 rounded-full">
                  <EditableText
                    value={n.tag}
                    onChange={(v) => {
                      const news = home.news.map((x, j) => j === i ? { ...x, tag: v } : x);
                      setContent({ ...content, home: { ...home, news } });
                    }}
                    editMode={editMode}
                  />
                </span>
                <span className="text-xs text-muted-foreground">{n.date}</span>
              </div>
              <h4 className="font-bold text-foreground text-base leading-snug mb-1">
                <EditableText
                  value={n.title}
                  onChange={(v) => {
                    const news = home.news.map((x, j) => j === i ? { ...x, title: v } : x);
                    setContent({ ...content, home: { ...home, news } });
                  }}
                  editMode={editMode}
                />
              </h4>
              <EditableText
                value={n.text}
                onChange={(v) => {
                  const news = home.news.map((x, j) => j === i ? { ...x, text: v } : x);
                  setContent({ ...content, home: { ...home, news } });
                }}
                editMode={editMode}
                className="text-muted-foreground text-sm leading-relaxed block"
                tag="p"
                multiline
              />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
