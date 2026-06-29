export interface SiteContent {
  teacher: {
    name: string;
    rating: string;
    students: string;
  };
  slides: Array<{
    tag: string;
    title: string;
    text: string;
  }>;
  home: {
    heroTitle: string;
    heroSubtitle: string;
    news: Array<{ date: string; title: string; text: string; tag: string }>;
    schedule: Array<{ day: string; date: string; time: string; subject: string; free: boolean }>;
  };
  services: {
    title: string;
    subtitle: string;
    plans: Array<{
      id: string;
      title: string;
      lang: string;
      desc: string;
      price: number;
      unit: string;
      popular?: boolean;
      features: string[];
    }>;
  };
}

export const defaultContent: SiteContent = {
  teacher: {
    name: 'Анна Соколова',
    rating: '4.9 рейтинг',
    students: '400+ учеников',
  },
  slides: [
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
  ],
  home: {
    heroTitle: 'Ваш путь к свободному языку',
    heroSubtitle: 'Следите за новостями и не пропускайте важные обновления.',
    schedule: [
      { day: 'Пн', date: '30', time: '10:00', subject: 'Английский · Разговорный', free: false },
      { day: 'Вт', date: '01', time: '14:00', subject: 'Китайский · HSK 2', free: false },
      { day: 'Ср', date: '02', time: '12:00', subject: 'Свободно для записи', free: true },
      { day: 'Чт', date: '03', time: '18:00', subject: 'Английский · Бизнес', free: false },
      { day: 'Пт', date: '04', time: '11:00', subject: 'Свободно для записи', free: true },
    ],
    news: [
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
    ],
  },
  services: {
    title: 'Услуги',
    subtitle: 'Выберите формат занятий и оплатите в пару нажатий',
    plans: [
      {
        id: 'trial',
        title: 'Пробный урок',
        lang: 'Английский / Китайский',
        desc: 'Знакомство, оценка уровня и план обучения',
        price: 500,
        unit: 'за урок',
        features: ['Индивидуально', '45 минут', 'План на будущее'],
      },
      {
        id: 'single',
        title: 'Разовое занятие',
        lang: 'Английский / Китайский',
        desc: 'Один урок с полной подготовкой и материалами',
        price: 1800,
        unit: 'за урок',
        popular: true,
        features: ['Индивидуально', '60 минут', 'Домашнее задание', 'Материалы'],
      },
      {
        id: 'pack',
        title: 'Пакет 8 уроков',
        lang: 'Английский / Китайский',
        desc: 'Системный курс с заметным прогрессом',
        price: 12800,
        unit: 'за месяц',
        features: ['8 уроков', 'Поддержка в чате', 'Гибкое расписание', 'Запись уроков'],
      },
    ],
  },
};

const STORAGE_KEY = 'lingua_content';

export function loadContent(): SiteContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultContent, ...JSON.parse(raw) };
  } catch (_e) {
    // ignore parse errors
  }
  return defaultContent;
}

export function saveContent(c: SiteContent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
}