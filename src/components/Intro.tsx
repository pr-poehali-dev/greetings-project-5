import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import EditableText from '@/components/EditableText';
import type { SiteContent } from '@/lib/content';

const TEACHER_PHOTO =
  'https://cdn.poehali.dev/projects/d610e2ce-4a6e-4e8e-8246-c61bf4051632/files/4bf2ca5d-567a-4977-876d-4f7540965c1f.jpg';

interface IntroProps {
  onStart: () => void;
  content: SiteContent;
  setContent: (c: SiteContent) => void;
  editMode: boolean;
}

const Intro = ({ onStart, content, setContent, editMode }: IntroProps) => {
  const [index, setIndex] = useState(0);
  const slide = content.slides[index];
  const isLast = index === content.slides.length - 1;

  const setSlide = (key: 'tag' | 'title' | 'text', val: string) => {
    const slides = content.slides.map((s, i) =>
      i === index ? { ...s, [key]: val } : s
    );
    setContent({ ...content, slides });
  };

  return (
    <div className="min-h-screen mesh-bg flex flex-col relative overflow-hidden">
      {/* Декоративные линии */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-accent/10 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      </div>

      <div className="flex-1 flex items-center justify-center px-5 py-12 relative">
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Фото */}
          <div className="relative order-1 md:order-none animate-float">
            <div className="absolute -inset-6 bg-gradient-to-tr from-accent/15 via-transparent to-purple-500/10 rounded-[2.5rem] blur-2xl" />
            <div className="relative rounded-[2rem] overflow-hidden ring-1 ring-white/10 shadow-2xl">
              <img
                key={index}
                src={TEACHER_PHOTO}
                alt="Преподаватель"
                className="w-full aspect-[4/5] object-cover animate-fade-in"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Бейдж */}
            <div className="glass absolute bottom-5 left-5 right-5 rounded-2xl px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
                <Icon name="Star" size={18} className="text-accent" />
              </div>
              <div className="min-w-0">
                <EditableText
                  value={content.teacher.rating}
                  onChange={(v) => setContent({ ...content, teacher: { ...content.teacher, rating: v } })}
                  editMode={editMode}
                  className="text-sm font-bold text-foreground block"
                  tag="p"
                />
                <EditableText
                  value={content.teacher.students}
                  onChange={(v) => setContent({ ...content, teacher: { ...content.teacher, students: v } })}
                  editMode={editMode}
                  className="text-xs text-muted-foreground mt-0.5 block"
                  tag="p"
                />
              </div>
            </div>
          </div>

          {/* Текст */}
          <div key={index} className="animate-slide-up">
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-8 h-px bg-accent" />
              <EditableText
                value={slide.tag}
                onChange={(v) => setSlide('tag', v)}
                editMode={editMode}
                className="text-xs font-bold tracking-widest uppercase text-accent"
              />
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5">
              <EditableText
                value={slide.title}
                onChange={(v) => setSlide('title', v)}
                editMode={editMode}
                className="text-gradient"
              />
            </h1>

            <EditableText
              value={slide.text}
              onChange={(v) => setSlide('text', v)}
              editMode={editMode}
              className="text-muted-foreground text-base md:text-lg leading-relaxed block"
              tag="p"
              multiline
            />

            {/* Индикаторы */}
            <div className="flex items-center gap-2 mt-8">
              {content.slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === index ? 'w-10 bg-accent glow' : 'w-3 bg-white/15'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Навигация */}
      <div className="px-5 pb-10 relative">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            className="text-muted-foreground disabled:opacity-0 hover:text-foreground hover:bg-white/5"
          >
            <Icon name="ChevronLeft" size={18} />
            Назад
          </Button>

          {isLast ? (
            <button
              onClick={onStart}
              className="group flex items-center gap-3 bg-accent text-accent-foreground px-8 h-12 rounded-full font-bold text-sm glow hover:scale-105 transition-all duration-300"
            >
              Начать обучение
              <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <button
              onClick={() => setIndex((i) => i + 1)}
              className="flex items-center gap-3 glass-light text-foreground px-8 h-12 rounded-full font-semibold text-sm hover:bg-white/10 transition-all duration-300 border border-white/10"
            >
              Далее
              <Icon name="ArrowRight" size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Intro;
