import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import EditableText from '@/components/EditableText';
import { useToast } from '@/hooks/use-toast';
import type { SiteContent } from '@/lib/content';

interface Props {
  content: SiteContent;
  setContent: (c: SiteContent) => void;
  editMode: boolean;
}

const Services = ({ content, setContent, editMode }: Props) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);
  const { services } = content;

  const handleBuy = (plan: typeof services.plans[0]) => {
    setLoading(plan.id);
    setTimeout(() => {
      setLoading(null);
      toast({
        title: 'Демо-оплата',
        description: `«${plan.title}» — ${plan.price.toLocaleString('ru-RU')} ₽. Подключим настоящую оплату по вашему запросу.`,
      });
    }, 700);
  };

  const setPlan = (i: number, key: string, val: string | number) => {
    const plans = services.plans.map((p, j) => j === i ? { ...p, [key]: val } : p);
    setContent({ ...content, services: { ...services, plans } });
  };

  return (
    <div className="animate-fade-in pb-4">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-gradient mb-1">
          <EditableText
            value={services.title}
            onChange={(v) => setContent({ ...content, services: { ...services, title: v } })}
            editMode={editMode}
          />
        </h2>
        <EditableText
          value={services.subtitle}
          onChange={(v) => setContent({ ...content, services: { ...services, subtitle: v } })}
          editMode={editMode}
          className="text-muted-foreground text-sm block"
          tag="p"
        />
      </div>

      <div className="space-y-4 stagger">
        {services.plans.map((plan, i) => (
          <div
            key={plan.id}
            className={`relative rounded-[1.5rem] p-6 border hover-lift ${
              plan.popular
                ? 'border-accent/40 bg-gradient-to-br from-accent/8 to-transparent glow'
                : 'glass-light border-white/6'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-6 bg-accent text-accent-foreground text-[11px] font-bold px-3 py-1 rounded-full shadow-lg">
                Популярный выбор
              </span>
            )}

            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1 min-w-0">
                <EditableText
                  value={plan.lang}
                  onChange={(v) => setPlan(i, 'lang', v)}
                  editMode={editMode}
                  className="text-[11px] text-accent font-bold uppercase tracking-wider block mb-1"
                  tag="p"
                />
                <h3 className="font-display text-xl font-bold text-foreground">
                  <EditableText
                    value={plan.title}
                    onChange={(v) => setPlan(i, 'title', v)}
                    editMode={editMode}
                  />
                </h3>
                <EditableText
                  value={plan.desc}
                  onChange={(v) => setPlan(i, 'desc', v)}
                  editMode={editMode}
                  className="text-muted-foreground text-sm mt-1 block"
                  tag="p"
                />
              </div>
              <div className="text-right shrink-0">
                <p className="font-display text-3xl font-bold text-gradient-warm">
                  {plan.price.toLocaleString('ru-RU')} ₽
                </p>
                <p className="text-[11px] text-muted-foreground">{plan.unit}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {plan.features.map((f, fi) => (
                <span
                  key={fi}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-white/5 border border-white/8 px-2.5 py-1 rounded-full"
                >
                  <Icon name="Check" size={11} className="text-accent" />
                  {f}
                </span>
              ))}
            </div>

            <Button
              onClick={() => handleBuy(plan)}
              disabled={loading === plan.id}
              className={`w-full h-11 rounded-xl text-sm font-bold transition-all duration-300 ${
                plan.popular
                  ? 'bg-accent text-accent-foreground hover:bg-accent/90 glow hover:scale-[1.02]'
                  : 'glass-light text-foreground hover:bg-white/10 border border-white/10'
              }`}
            >
              {loading === plan.id ? (
                <Icon name="Loader2" size={17} className="animate-spin" />
              ) : (
                <>
                  <Icon name="CreditCard" size={17} />
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
