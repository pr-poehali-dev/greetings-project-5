import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const TEACHER_PHOTO =
  'https://cdn.poehali.dev/projects/d610e2ce-4a6e-4e8e-8246-c61bf4051632/files/4bf2ca5d-567a-4977-876d-4f7540965c1f.jpg';

interface Slide {
  tag: string;
  title: string;
  text: string;
}

const slides: Slide[] = [
  {
    tag: 'Преподаватель',
    title: 'Анна Соколова',
    text: 'Помогаю говорить на английском и китайском свободно и без страха. 8 лет практики, более 400 учеников по всему миру.',
  },
  {
    tag: 'Метод',
    title: 'Живая речь с первого урока',
    text: 'Никакой зубрёжки. Только реальные диалоги, разбор произношения и постоянная практика — вы начинаете говорить сразу.',
  },
  {
    tag: 'Языки',
    title: 'English & 中文',
    text: 'Английский для работы, путешествий и экзаменов. Китайский с нуля до уверенного общения. Индивидуальная программа под вашу цель.',
  },
  {
    tag: 'Результат',
    title: 'Прогресс, который видно',
    text: 'Расписание, домашние задания и поддержка между уроками. Вы всегда знаете, на каком этапе находитесь.',
  },
];

interface IntroProps {
  onStart: () => void;
}

const Intro = ({ onStart }: IntroProps) => {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const isLast = index === slides.length - 1;

  return (
    <div className="min-h-screen mesh-bg flex flex-col">
      <div className="flex-1 flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 md:gap-14 items-center">
          <div className="relative order-1 md:order-none animate-float">
            <div className="absolute -inset-4 bg-gradient-to-tr from-accent/20 to-primary/10 rounded-[2rem] rotate-3 blur-sm" />
            <img
              key={index}
              src={TEACHER_PHOTO}
              alt="Преподаватель"
              className="relative w-full aspect-[4/5] object-cover rounded-[2rem] shadow-2xl animate-fade-in ring-1 ring-white/20"
            />
            <div className="glass absolute bottom-4 left-4 right-4 rounded-2xl px-4 py-3 flex items-center gap-3 soft-shadow">
              <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center">
                <Icon name="Star" size={16} className="text-accent" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground leading-none">4.9 рейтинг</p>
                <p className="text-xs text-muted-foreground mt-1">400+ учеников</p>
              </div>
            </div>
          </div>

          <div key={slide.title} className="animate-slide-up">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-accent">
              <span className="w-6 h-px bg-accent" />
              {slide.tag}
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-gradient mt-4 leading-tight">
              {slide.title}
            </h1>
            <p className="text-muted-foreground text-lg mt-5 leading-relaxed">
              {slide.text}
            </p>

            <div className="flex items-center gap-2 mt-8">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? 'w-8 bg-accent' : 'w-2 bg-border'
                  }`}
                  aria-label={`Слайд ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pb-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            className="text-muted-foreground disabled:opacity-0"
          >
            <Icon name="ChevronLeft" size={18} />
            Назад
          </Button>

          {isLast ? (
            <Button
              size="lg"
              onClick={onStart}
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 h-12 rounded-full text-base shadow-lg hover-lift"
            >
              Начать обучение
              <Icon name="ArrowRight" size={18} />
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={() => setIndex((i) => i + 1)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-12 rounded-full text-base"
            >
              Далее
              <Icon name="ArrowRight" size={18} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Intro;