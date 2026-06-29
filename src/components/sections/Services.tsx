import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Plan {
  id: string;
  title: string;
  lang: string;
  desc: string;
  price: number;
  unit: string;
  popular?: boolean;
  features: string[];
}

const plans: Plan[] = [
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
];

const Services = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const handleBuy = (plan: Plan) => {
    setLoading(plan.id);
    setTimeout(() => {
      setLoading(null);
      toast({
        title: 'Демо-оплата',
        description: `«${plan.title}» — ${plan.price.toLocaleString('ru-RU')} ₽. Подключим настоящую оплату по вашему запросу.`,
      });
    }, 700);
  };

  return (
    <div className="animate-fade-in pb-4">
      <h2 className="font-display text-3xl font-bold text-foreground mb-1">Услуги</h2>
      <p className="text-muted-foreground text-sm mb-6">
        Выберите формат занятий и оплатите в пару нажатий
      </p>

      <div className="space-y-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl p-6 border hover-lift ${
              plan.popular
                ? 'border-accent bg-accent/5 shadow-lg'
                : 'border-border bg-card'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-6 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                Популярный выбор
              </span>
            )}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-xs text-accent font-semibold uppercase tracking-wide">
                  {plan.lang}
                </p>
                <h3 className="font-display text-2xl font-bold text-foreground mt-1">
                  {plan.title}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">{plan.desc}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-display text-3xl font-bold text-foreground">
                  {plan.price.toLocaleString('ru-RU')} ₽
                </p>
                <p className="text-xs text-muted-foreground">{plan.unit}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {plan.features.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full"
                >
                  <Icon name="Check" size={12} className="text-accent" />
                  {f}
                </span>
              ))}
            </div>

            <Button
              onClick={() => handleBuy(plan)}
              disabled={loading === plan.id}
              className={`w-full h-12 rounded-xl mt-5 text-base ${
                plan.popular
                  ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
            >
              {loading === plan.id ? (
                <Icon name="Loader2" size={18} className="animate-spin" />
              ) : (
                <>
                  <Icon name="CreditCard" size={18} />
                  Купить занятие
                </>
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
