import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface Msg {
  id: number;
  from: 'me' | 'teacher';
  text: string;
  time: string;
}

const initial: Msg[] = [
  { id: 1, from: 'teacher', text: 'Здравствуйте! Рада видеть вас. Готовы начать занятия?', time: '10:02' },
  { id: 2, from: 'me', text: 'Здравствуйте! Да, хочу подтянуть разговорный английский.', time: '10:05' },
  { id: 3, from: 'teacher', text: 'Отлично! Предлагаю начать с пробного урока. Когда вам удобно?', time: '10:06' },
];

const Messages = () => {
  const [messages, setMessages] = useState<Msg[]>(initial);
  const [text, setText] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    if (!text.trim()) return;
    const time = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    setMessages((m) => [...m, { id: Date.now(), from: 'me', text: text.trim(), time }]);
    setText('');
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          from: 'teacher',
          text: 'Спасибо за сообщение! Отвечу вам в ближайшее время.',
          time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 900);
  };

  return (
    <div className="animate-fade-in flex flex-col h-[calc(100vh-200px)]">
      {/* Шапка чата */}
      <div className="flex items-center gap-3 pb-4 mb-1 border-b border-white/8">
        <div className="relative">
          <div className="w-11 h-11 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center">
            <Icon name="User" size={20} className="text-accent" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-background" />
        </div>
        <div>
          <h2 className="font-bold text-foreground text-sm">Анна Соколова</h2>
          <p className="text-xs text-emerald-400 font-medium">онлайн</p>
        </div>
        <div className="ml-auto flex gap-2">
          <button className="w-9 h-9 rounded-xl glass-light flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="Phone" size={16} />
          </button>
          <button className="w-9 h-9 rounded-xl glass-light flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="MoreHorizontal" size={16} />
          </button>
        </div>
      </div>

      {/* Сообщения */}
      <div className="flex-1 overflow-y-auto py-4 space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-end gap-2 animate-fade-in ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            {m.from === 'teacher' && (
              <div className="w-7 h-7 rounded-full bg-accent/15 border border-accent/20 flex items-center justify-center shrink-0 mb-1">
                <Icon name="User" size={13} className="text-accent" />
              </div>
            )}
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                m.from === 'me'
                  ? 'bg-accent text-accent-foreground rounded-br-sm'
                  : 'glass-light text-foreground rounded-bl-sm border border-white/6'
              }`}
            >
              <p className="text-sm leading-relaxed">{m.text}</p>
              <p className={`text-[10px] mt-1.5 ${m.from === 'me' ? 'opacity-60 text-right' : 'text-muted-foreground'}`}>
                {m.time}
              </p>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Поле ввода */}
      <div className="flex items-center gap-2 pt-3 border-t border-white/8">
        <div className="flex-1 flex items-center glass-light rounded-2xl border border-white/8 px-4 h-12">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Написать сообщение…"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button className="text-muted-foreground hover:text-accent transition-colors ml-2">
            <Icon name="Paperclip" size={16} />
          </button>
        </div>
        <button
          onClick={send}
          className="w-12 h-12 shrink-0 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center glow hover:scale-105 transition-all duration-200"
          aria-label="Отправить"
        >
          <Icon name="Send" size={17} />
        </button>
      </div>
    </div>
  );
};

export default Messages;
