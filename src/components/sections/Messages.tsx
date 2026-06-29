import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
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
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <div className="w-11 h-11 rounded-full bg-accent/15 flex items-center justify-center">
          <Icon name="User" size={20} className="text-accent" />
        </div>
        <div>
          <h2 className="font-semibold text-foreground">Анна Соколова</h2>
          <p className="text-xs text-green-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> онлайн
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                m.from === 'me'
                  ? 'bg-accent text-accent-foreground rounded-br-md'
                  : 'bg-card border border-border text-foreground rounded-bl-md'
              }`}
            >
              <p className="text-sm leading-relaxed">{m.text}</p>
              <p className={`text-[10px] mt-1 ${m.from === 'me' ? 'opacity-70' : 'text-muted-foreground'}`}>
                {m.time}
              </p>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-border">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Написать сообщение…"
          className="h-12 rounded-full"
        />
        <button
          onClick={send}
          className="w-12 h-12 shrink-0 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:bg-accent/90 transition-colors"
          aria-label="Отправить"
        >
          <Icon name="Send" size={18} />
        </button>
      </div>
    </div>
  );
};

export default Messages;
