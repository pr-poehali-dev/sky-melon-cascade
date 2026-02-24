import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const ids = ["hero", "pain", "solutions", "massager", "gr", "injector", "cta"];
    setVisibleSections((prev) => ({ ...prev, hero: true }));
    const observers: Record<string, IntersectionObserver> = {};
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      observers[id] = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
            observers[id].unobserve(el);
          }
        },
        { threshold: 0.08 }
      );
      observers[id].observe(el);
    });
    return () => Object.values(observers).forEach((o) => o.disconnect());
  }, []);

  const vis = (id: string) => visibleSections[id];

  const navLinks = [
    { href: "#solutions", label: "Решения" },
    { href: "#massager", label: "Массажеры" },
    { href: "#gr", label: "Серия GR" },
    { href: "#injector", label: "Инъекторы" },
    { href: "#cta", label: "Контакты" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-xl border-b border-border z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <span className="font-display font-black text-xl tracking-tight text-primary leading-tight">
              Daribo & Niro-Tech
            </span>
            <p className="text-xs text-muted-foreground hidden sm:block">Оборудование для посола и маринования</p>
          </div>
          <nav className="hidden lg:flex gap-7 text-sm font-medium">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-muted-foreground hover:text-primary transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#cta"
              className="hidden sm:block px-5 py-2.5 text-sm font-semibold bg-primary text-white rounded-full hover:bg-primary/90 transition-all shadow-sm"
            >
              Рассчитать решение
            </a>
            <button className="lg:hidden p-2 text-muted-foreground" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden border-t border-border bg-white px-6 py-4 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ЭКРАН 1: HERO */}
      <section id="hero" className="relative pt-28 pb-20 px-6 min-h-screen flex items-center bg-gradient-to-br from-primary/5 via-background to-background overflow-hidden">
        <div className="absolute top-24 right-0 w-[600px] h-[600px] bg-primary/6 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div className={`transition-all duration-1000 ${vis("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase border border-primary/30 rounded-full px-4 py-1.5 mb-6 bg-primary/5">
                Daribo · Niro-Tech · Поставка и внедрение
              </span>
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-display font-black leading-[1.05] tracking-tight mb-6 text-foreground">
                Стабильный посол и{" "}
                <span className="text-primary">выше выход</span>{" "}
                с вакуумными массажерами
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-4 max-w-xl">
                Поставка Daribo и Niro-Tech + подбор режимов под мясо, птицу и рыбу
              </p>
              <p className="text-base text-muted-foreground leading-relaxed mb-10 max-w-xl">
                Ускоряем цикл, выравниваем качество партии, снижаем риск брака. Подбираем оборудование и настройки под ветчину, копчёности, деликатесы, фабрики-кухни.
              </p>

              <ul className="space-y-3 mb-10">
                {[
                  { icon: "TrendingDown",  text: "Меньше непросола и рекламаций" },
                  { icon: "Wind",          text: "Вакуум — быстрее процесс, меньше окисления" },
                  { icon: "ArrowUpCircle", text: "Выход до +20–30% влаги при корректной технологии" },
                  { icon: "Shield",        text: "SUS304, санитарный конструктив, быстрая мойка" },
                ].map((b, i) => (
                  <li key={i} className="flex items-center gap-3 text-base font-medium text-foreground">
                    <div className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-lg flex-shrink-0">
                      <Icon name={b.icon} fallback="CheckCircle" size={17} className="text-primary" />
                    </div>
                    {b.text}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#hero-form" className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 text-center">
                  Рассчитать решение
                </a>
                <a href="#solutions" className="px-8 py-4 border-2 border-primary/30 text-primary rounded-full font-semibold text-lg hover:border-primary hover:bg-primary/5 transition-all text-center">
                  Смотреть оборудование
                </a>
              </div>
            </div>

            <div className={`transition-all duration-1000 delay-300 ${vis("hero") ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "SUS304",   sub: "Нержавеющая сталь",    icon: "Shield" },
                  { label: "99 прогр", sub: "PLC-панель управления", icon: "Cpu" },
                  { label: "84 иглы",  sub: "Регистр давления",      icon: "Pipette" },
                  { label: "До 4 т/ч", sub: "Производительность",    icon: "Zap" },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 bg-white border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-xl flex-shrink-0">
                      <Icon name={b.icon} fallback="Star" size={22} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-black text-xl text-foreground leading-tight">{b.label}</p>
                      <p className="text-xs text-muted-foreground">{b.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div id="hero-form" className="p-8 bg-white border border-border rounded-2xl shadow-xl">
                <h3 className="font-display font-bold text-2xl mb-1 text-foreground">Рассчитать решение</h3>
                <p className="text-sm text-muted-foreground mb-6">Менеджер свяжется в течение 2 часов</p>
                <div className="space-y-4">
                  <input type="text"  placeholder="Компания" className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors" />
                  <input type="tel"   placeholder="Телефон"  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors" />
                  <input type="email" placeholder="Почта"    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors" />
                  <button className="w-full py-3.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all shadow-sm">
                    Отправить заявку
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ЭКРАН 2: БОЛИ vs РЕШЕНИЕ */}
      <section id="pain" className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${vis("pain") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">Проблема → Решение</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tight mt-4 text-foreground leading-tight">
              Выход и посол должны быть<br />повторяемыми
            </h2>
          </div>

          {/* Схема линии */}
          <div className={`flex items-center justify-center gap-2 flex-wrap mb-16 transition-all duration-700 ${vis("pain") ? "opacity-100" : "opacity-0"}`}>
            {[
              { icon: "Package",     label: "Сырьё" },
              { icon: "Pipette",     label: "Инъектор" },
              { icon: "RefreshCw",   label: "Массажер" },
              { icon: "Thermometer", label: "Термообработка" },
              { icon: "CheckCircle", label: "Готово" },
            ].map((step, i, arr) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-2 px-5 py-4 bg-primary/5 border border-primary/15 rounded-2xl min-w-[100px]">
                  <Icon name={step.icon} fallback="Circle" size={28} className="text-primary" />
                  <span className="text-sm font-semibold text-foreground">{step.label}</span>
                </div>
                {i < arr.length - 1 && <Icon name="ChevronRight" size={20} className="text-primary/40" />}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className={`transition-all duration-700 ${vis("pain") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-50 border border-red-200 rounded-xl flex items-center justify-center">
                  <Icon name="AlertTriangle" size={20} className="text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Типичные проблемы производства</h3>
              </div>
              <div className="space-y-3">
                {[
                  { icon: "TrendingDown", text: "Низкий выход — деньги уходят вместе с влагой" },
                  { icon: "AlertCircle",  text: "Непросол и пятна — рекламации и брак партий" },
                  { icon: "Clock",        text: "Длинный цикл посола сдерживает объёмы выпуска" },
                  { icon: "ThumbsDown",   text: "Жалобы на качество — неповторяемость вкуса" },
                  { icon: "Wrench",       text: "Простои из-за мойки — сложная санобработка" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 border border-red-100 rounded-xl bg-red-50 hover:bg-red-100/60 transition-all" style={{ transitionDelay: `${i * 80}ms` }}>
                    <Icon name={item.icon} fallback="AlertCircle" size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-base text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`transition-all duration-700 delay-200 ${vis("pain") ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center">
                  <Icon name="CheckCircle" size={20} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Что даёт наше оборудование</h3>
              </div>
              <div className="space-y-3">
                {[
                  { icon: "Gauge",    text: "Регистр давления — стабильная подача в каждую иглу" },
                  { icon: "Wind",     text: "Вакуум: меньше окисления, лучше текстура продукта" },
                  { icon: "Settings", text: "Программируемые режимы — повторяемые результаты" },
                  { icon: "Shield",   text: "Санитарный конструктив — быстрая мойка без разборки" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 border border-primary/15 rounded-xl bg-primary/5 hover:bg-primary/10 transition-all" style={{ transitionDelay: `${i * 80}ms` }}>
                    <Icon name={item.icon} fallback="CheckCircle" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-base text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
              <a href="#cta" className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-all shadow-sm">
                <Icon name="Phone" size={15} />
                Консультация технолога
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ЭКРАН 3: 3 КАРТОЧКИ */}
      <section id="solutions" className="py-28 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${vis("solutions") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">Оборудование</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tight mt-4 text-foreground leading-tight">
              Оборудование + режим + рассол<br />= стабильная партия
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "RefreshCw",
                title: "Вакуумные массажеры",
                desc: "Бережное вакуумное массирование — рассол проникает глубже, текстура лучше, цикл короче. Регулируемые режимы: время, вакуум, скорость.",
                cta: "Подробнее о массажерах",
                href: "#massager",
                specs: ["до −0.1 МПа вакуум", "100–3000 л объём", "SUS304"],
              },
              {
                icon: "Pipette",
                title: "Инъекторы рассола",
                desc: "84 иглы с регистром давления, до 4 т/ч, до 4,3 бар. Равномерное распределение рассола — без пятен и недосола по всему объёму.",
                cta: "Подробнее об инъекторах",
                href: "#injector",
                highlight: true,
                specs: ["84 иглы", "до 4 т/ч", "до 4,3 бар"],
              },
              {
                icon: "FlaskConical",
                title: "Смеси рассолов",
                desc: "Готовые рецептуры под мясо, птицу и рыбу. Повторяемость вкуса, быстрый запуск производства, снижение % брака.",
                cta: "Запросить рецептуру",
                href: "#cta",
                specs: ["Мясо / Птица / Рыба", "Быстрый старт", "Снижение брака"],
              },
            ].map((card, i) => (
              <div
                key={i}
                className={`group transition-all duration-700 ${vis("solutions") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className={`h-full flex flex-col p-8 border-2 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all ${card.highlight ? "border-primary shadow-primary/10" : "border-border hover:border-primary/40"}`}>
                  {card.highlight && (
                    <div className="mb-4">
                      <span className="text-xs font-bold bg-primary text-white px-3 py-1 rounded-full">Популярно</span>
                    </div>
                  )}
                  <div className={`w-20 h-20 flex items-center justify-center rounded-2xl mb-6 ${card.highlight ? "bg-primary" : "bg-primary/10"}`}>
                    <Icon name={card.icon} fallback="Star" size={38} className={card.highlight ? "text-white" : "text-primary"} />
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-3 text-foreground">{card.title}</h3>
                  <p className="text-muted-foreground text-base leading-relaxed mb-6 flex-1">{card.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {card.specs.map((s, j) => (
                      <span key={j} className="text-xs font-medium px-3 py-1 bg-primary/8 text-primary border border-primary/20 rounded-full">{s}</span>
                    ))}
                  </div>
                  <a href={card.href} className={`w-full py-3.5 rounded-xl font-semibold text-base text-center transition-all ${card.highlight ? "bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20" : "border-2 border-primary/30 text-primary hover:border-primary hover:bg-primary/5"}`}>
                    {card.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЭКРАН 4: МАССАЖЕРЫ */}
      <section id="massager" className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 ${vis("massager") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <span className="text-xs font-semibold tracking-widest text-primary uppercase">Вакуумное массирование</span>
              <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tight mt-4 mb-6 text-foreground leading-tight">
                Равномернее посол, лучше текстура
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Барабан бережно перемешивает сырьё. Вакуум раскрывает поры и волокна: рассол и специи проникают глубже, замедляется окисление — продукт получается стабильным от партии к партии.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  { icon: "Star",     text: "Лучшее качество и сочность готового продукта" },
                  { icon: "Timer",    text: "Ускорение цикла посола" },
                  { icon: "Layers",   text: "Равномерное распределение специй и рассола" },
                  { icon: "Calendar", text: "Улучшенные сроки годности — меньше окисления" },
                  { icon: "Fish",     text: "Подходит для мяса, птицы и рыбы" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-primary/5 border border-primary/15 rounded-xl">
                    <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg flex-shrink-0">
                      <Icon name={item.icon} fallback="CheckCircle" size={18} className="text-primary" />
                    </div>
                    <span className="text-base font-medium text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
              <a href="#cta" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                Запросить режимы
                <Icon name="ArrowRight" size={18} />
              </a>
            </div>

            <div className={`transition-all duration-1000 delay-300 ${vis("massager") ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
              <div className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-3xl shadow-xl">
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="w-36 h-36 bg-primary/15 rounded-full flex items-center justify-center">
                      <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
                        <Icon name="RefreshCw" size={52} className="text-primary" />
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-white border border-primary/20 rounded-full flex items-center justify-center shadow-sm">
                      <Icon name="Wind" size={18} className="text-primary" />
                    </div>
                    <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-white border border-primary/20 rounded-full flex items-center justify-center shadow-sm">
                      <Icon name="Droplets" size={18} className="text-primary" />
                    </div>
                  </div>
                </div>
                <h4 className="text-center text-lg font-bold text-foreground mb-6">Вакуумный барабан — серия GR</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Вакуум",   value: "до −0.1 МПа" },
                    { label: "Объём",    value: "100–3000 л" },
                    { label: "Материал", value: "SUS304" },
                    { label: "Продукты", value: "Мясо / Птица / Рыба" },
                  ].map((spec, i) => (
                    <div key={i} className="p-4 bg-white border border-primary/15 rounded-xl text-center shadow-sm">
                      <p className="text-xs text-muted-foreground mb-1">{spec.label}</p>
                      <p className="text-base font-bold text-foreground">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ЭКРАН 5: СЕРИЯ GR */}
      <section id="gr" className="py-28 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`order-2 lg:order-1 transition-all duration-1000 ${vis("gr") ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
              <div className="p-8 bg-white border border-border rounded-3xl shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xl font-black text-primary font-display">PLC-Панель управления</span>
                  <span className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-full">99 программ</span>
                </div>
                <div className="flex justify-center my-6">
                  <div className="w-32 h-32 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Icon name="Cpu" size={64} className="text-primary" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: "Timer",      label: "Время" },
                    { icon: "Wind",       label: "Вакуум" },
                    { icon: "Gauge",      label: "Скорость" },
                    { icon: "RotateCcw",  label: "Направление" },
                    { icon: "AlarmClock", label: "Интервалы" },
                    { icon: "BookOpen",   label: "Программа" },
                  ].map((p, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 p-3 bg-primary/5 border border-primary/10 rounded-xl">
                      <Icon name={p.icon} fallback="Settings" size={22} className="text-primary" />
                      <span className="text-xs font-medium text-foreground">{p.label}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-center text-muted-foreground mt-4">Настройка и сохранение программ массирования</p>
              </div>
            </div>

            <div className={`order-1 lg:order-2 transition-all duration-1000 ${vis("gr") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <span className="text-xs font-semibold tracking-widest text-primary uppercase">Серия GR</span>
              <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tight mt-4 mb-6 text-foreground leading-tight">
                SUS304 и повторяемые настройки
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Конструктив оптимизирован под требования пищевого производства: быстрая мойка, стойкость к агрессивным средам, простое обслуживание.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  { icon: "Shield",            text: "SUS304 — пищевая нержавейка, соответствие санитарным нормам" },
                  { icon: "Droplets",          text: "Форма барабана оптимизирована под быструю мойку" },
                  { icon: "SlidersHorizontal", text: "Регулируемые параметры: скорость, время, вакуум, направление" },
                  { icon: "Package",           text: "Рёбра сохраняют целостность кусков при массировании" },
                  { icon: "MoveVertical",      text: "Удобная загрузка и выгрузка сырья" },
                  { icon: "Cpu",               text: "Опция PLC: до 99 программ — время / интервалы / вакуум / скорость" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-background border border-border rounded-xl hover:border-primary/40 transition-colors">
                    <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg flex-shrink-0">
                      <Icon name={item.icon} fallback="CheckCircle" size={18} className="text-primary" />
                    </div>
                    <span className="text-base text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
              <a href="#cta" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                КП на серию GR
                <Icon name="FileText" size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ЭКРАН 6: ИНЪЕКТОРЫ */}
      <section id="injector" className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 ${vis("injector") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <span className="text-xs font-semibold tracking-widest text-primary uppercase">Технология инъекции</span>
              <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tight mt-4 mb-6 text-foreground leading-tight">
                Регистр давления на иглах — меньше непросола
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Рассол подаётся напрямую в регистр: одинаковое давление на каждой игле, стабильность даже при засоре одной из игл. Результат — равномерный посол без серых пятен.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  { icon: "Network",       text: "84 иглы — максимальное покрытие продукта" },
                  { icon: "AlertTriangle", text: "Меньше брака: нет серых и зелёных пятен" },
                  { icon: "Crosshair",     text: "Точная подача рассола с контролем давления" },
                  { icon: "Zap",           text: "До 4 т/ч при давлении до 4,3 бар" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-primary/5 border border-primary/15 rounded-xl">
                    <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg flex-shrink-0">
                      <Icon name={item.icon} fallback="CheckCircle" size={18} className="text-primary" />
                    </div>
                    <span className="text-base font-medium text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
              <a href="#cta" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                КП на инъектор
                <Icon name="FileText" size={18} />
              </a>
            </div>

            <div className={`transition-all duration-1000 delay-300 ${vis("injector") ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
              <div className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-3xl shadow-xl">
                <h4 className="text-lg font-bold text-foreground mb-6 text-center">Схема работы инъектора</h4>
                <div className="flex flex-col gap-2">
                  {[
                    { icon: "Droplets",    label: "Насос рассола",      sub: "Точная дозировка" },
                    null,
                    { icon: "GitBranch",   label: "Регистр давления",   sub: "Равное давление на все иглы" },
                    null,
                    { icon: "Pipette",     label: "84 иглы",            sub: "Равномерное распределение" },
                    null,
                    { icon: "CheckCircle", label: "Готовый продукт",    sub: "Без пятен и брака" },
                  ].map((step, i) =>
                    step === null ? (
                      <div key={i} className="flex justify-center py-1">
                        <Icon name="ArrowDown" size={18} className="text-primary/40" />
                      </div>
                    ) : (
                      <div key={i} className="flex items-center gap-4 p-4 bg-white border border-primary/15 rounded-xl shadow-sm">
                        <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-xl flex-shrink-0">
                          <Icon name={step.icon} fallback="Circle" size={22} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-bold text-base text-foreground">{step.label}</p>
                          <p className="text-sm text-muted-foreground">{step.sub}</p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-28 px-6 bg-primary/5">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${vis("cta") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="p-12 bg-white border-2 border-primary/20 rounded-3xl shadow-2xl shadow-primary/10 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center">
                <Icon name="Phone" size={36} className="text-primary" />
              </div>
            </div>
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">Получить предложение</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tight mt-4 mb-4 text-foreground leading-tight">
              Подберём оборудование<br />под ваш продукт
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Оставьте контакт — технолог перезвонит, разберёт вашу ситуацию и предложит оптимальный режим и комплектацию.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-6 max-w-2xl mx-auto">
              <input type="text"  placeholder="Компания" className="px-4 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors" />
              <input type="tel"   placeholder="Телефон"  className="px-4 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors" />
              <input type="email" placeholder="Почта"    className="px-4 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors" />
            </div>
            <button className="px-12 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
              Отправить заявку
            </button>

            <div className="grid grid-cols-3 gap-8 mt-14 pt-8 border-t border-border">
              {[
                { value: "+20–30%", label: "Ориентир по выходу при корректной технологии", icon: "TrendingUp" },
                { value: "SUS304",  label: "Пищевая нержавейка",                           icon: "Shield" },
                { value: "4 т/ч",   label: "Производительность инъектора",                 icon: "Zap" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Icon name={stat.icon} fallback="Star" size={24} className="text-primary" />
                  <div className="text-3xl font-black text-primary">{stat.value}</div>
                  <p className="text-xs text-muted-foreground text-center">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <div>
            <p className="font-bold text-base text-foreground mb-1">Daribo & Niro-Tech</p>
            <p className="text-xs">Оборудование для посола и маринования</p>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-primary transition-colors text-xs">{l.label}</a>
            ))}
          </div>
          <p className="text-xs">© 2025 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
