import Icon from '@/components/ui/icon';

const news = [
  {
    date: 'Сегодня',
    title: 'Новый интенсив по разговорному английскому',
    text: 'Группа стартует 5 числа. Осталось 3 места — успейте записаться на странице «Услуги».',
    tag: 'Анонс',
  },
  {
    date: 'Вчера',
    title: 'Запись урока «Времена в китайском» доступна',
    text: 'Ученики курса HSK 2 могут пересмотреть разбор в личном кабинете.',
    tag: 'Материалы',
  },
  {
    date: '3 дня назад',
    title: 'Анна вернулась из Шанхая',
    text: 'Привезла свежие материалы по живой разговорной речи и новые темы для занятий.',
    tag: 'Новость',
  },
];

const schedule = [
  { day: 'Пн', date: '30', time: '10:00', subject: 'Английский · Разговорный', free: false },
  { day: 'Вт', date: '01', time: '14:00', subject: 'Китайский · HSK 2', free: false },
  { day: 'Ср', date: '02', time: '12:00', subject: 'Свободно для записи', free: true },
  { day: 'Чт', date: '03', time: '18:00', subject: 'Английский · Бизнес', free: false },
  { day: 'Пт', date: '04', time: '11:00', subject: 'Свободно для записи', free: true },
];

const Home = () => {
  return (
    <div className="animate-fade-in pb-4">
      <div className="bg-gradient-to-br from-primary via-primary to-accent/80 text-primary-foreground rounded-[1.75rem] p-7 mb-7 relative overflow-hidden soft-shadow">
        <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-white/10 blur-xl" />
        <div className="absolute -left-6 -bottom-12 w-32 h-32 rounded-full bg-accent/30 blur-2xl" />
        <p className="text-xs uppercase tracking-widest opacity-70 mb-2">Добро пожаловать обратно</p>
        <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight relative">
          Ваш путь к свободному языку
        </h2>
        <p className="opacity-80 mt-3 text-sm relative">
          Следите за новостями и не пропускайте важные обновления.
        </p>
      </div>

      <div className="mb-7">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-2xl font-bold text-foreground">Расписание уроков</h3>
          <Icon name="CalendarDays" size={20} className="text-accent" />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 stagger">
          {schedule.map((s, i) => (
            <div
              key={i}
              className={`min-w-[140px] rounded-2xl p-4 border hover-lift ${
                s.free
                  ? 'border-dashed border-accent/50 bg-accent/5'
                  : 'border-border bg-card/70 backdrop-blur-sm'
              }`}
            >
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-foreground">{s.date}</span>
                <span className="text-xs text-muted-foreground uppercase">{s.day}</span>
              </div>
              <p className="text-accent font-semibold text-sm mt-2">{s.time}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">{s.subject}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display text-2xl font-bold text-foreground mb-3">Новости</h3>
        <div className="space-y-3 stagger">
          {news.map((n, i) => (
            <article
              key={i}
              className="bg-card/70 backdrop-blur-sm border border-border rounded-2xl p-5 hover-lift"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-accent uppercase tracking-wide bg-accent/10 px-2 py-0.5 rounded-full">
                  {n.tag}
                </span>
                <span className="text-xs text-muted-foreground">{n.date}</span>
              </div>
              <h4 className="font-bold text-foreground text-lg leading-snug">{n.title}</h4>
              <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{n.text}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;