import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sectionIds = ["hero", "pain", "solutions", "massager", "gr", "injector", "cta"];
    const observers: Record<string, IntersectionObserver> = {};

    // Hero visible immediately
    setVisibleSections((prev) => ({ ...prev, hero: true }));

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;
      observers[id] = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
            observers[id].unobserve(element);
          }
        },
        { threshold: 0.1 }
      );
      observers[id].observe(element);
    });

    return () => {
      Object.values(observers).forEach((o) => o.disconnect());
    };
  }, []);

  const navLinks = [
    { href: "#solutions", label: "Решения" },
    { href: "#massager", label: "Каталог" },
    { href: "#pain", label: "Преимущества" },
    { href: "#gr", label: "Серия GR" },
    { href: "#injector", label: "Инъекторы" },
    { href: "#cta", label: "Контакты" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <header className="fixed top-0 w-full bg-background/85 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="font-display font-black text-xl tracking-tighter bg-gradient-to-r from-white via-accent to-accent/70 bg-clip-text text-transparent leading-tight">
              Daribo & Niro-Tech
            </span>
            <span className="text-xs text-muted-foreground leading-tight hidden sm:block">
              Оборудование для посола и маринования
            </span>
          </div>
          <nav className="hidden lg:flex gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-muted-foreground hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#cta"
              className="hidden sm:block px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-accent to-accent/80 text-black rounded-full hover:shadow-lg hover:shadow-accent/40 transition-all"
            >
              Рассчитать решение
            </a>
            <button
              className="lg:hidden p-2 text-muted-foreground hover:text-white transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden border-t border-accent/10 bg-background/95 px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-white transition-colors text-sm"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ЭКРАН 1 — HERO */}
      <section id="hero" className="relative pt-28 pb-20 px-6 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div
              className={`transition-all duration-1000 ${visibleSections["hero"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="mb-6 inline-block">
                <span className="text-xs font-medium tracking-widest text-accent/80 uppercase border border-accent/30 rounded-full px-4 py-1.5">
                  Daribo · Niro-Tech · Поставка и внедрение
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-display font-black leading-tight mb-6 tracking-tight">
                <span className="bg-gradient-to-br from-white via-white to-accent/40 bg-clip-text text-transparent">
                  Стабильный посол и выше выход —
                </span>
                <br />
                <span className="text-accent">с вакуумными массажерами и инъекторами рассола</span>
              </h1>
              <p className="text-base text-white/70 leading-relaxed mb-4 max-w-xl font-light">
                Поставка Daribo и Niro-Tech + подбор режимов под мясо, птицу и рыбу
              </p>
              <p className="text-white/60 leading-relaxed mb-8 max-w-xl text-sm">
                Ускоряем цикл, выравниваем качество партии и снижаем риск брака. Подбираем оборудование и настройки
                под ветчину, копчёности, деликатесы, фабрики-кухни.
              </p>

              <ul className="space-y-3 mb-10">
                {[
                  { icon: "TrendingDown", text: "Меньше непросола и рекламаций" },
                  { icon: "Wind", text: "Вакуум — быстрее процесс, меньше окисления" },
                  { icon: "ArrowUpCircle", text: "Выше выход (ориентир до +20–30% влаги при корректной технологии)" },
                  { icon: "Shield", text: "SUS304, санитарный конструктив, быстрая мойка" },
                ].map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                    <Icon name={b.icon} fallback="CheckCircle" size={16} className="text-accent flex-shrink-0 mt-0.5" />
                    {b.text}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#hero-form"
                  className="px-8 py-4 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full hover:shadow-2xl hover:shadow-accent/50 transition-all font-semibold text-base text-center"
                >
                  Рассчитать решение
                </a>
                <a
                  href="#solutions"
                  className="px-8 py-4 border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all font-medium text-base text-white text-center"
                >
                  Смотреть оборудование
                </a>
              </div>
            </div>

            {/* Right — badges + form */}
            <div
              className={`transition-all duration-1000 delay-300 ${visibleSections["hero"] ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { label: "SUS304", sub: "Нержавеющая сталь" },
                  { label: "PLC", sub: "До 99 программ" },
                  { label: "84 иглы", sub: "Регистр давления" },
                  { label: "До 4 т/ч", sub: "Производительность" },
                ].map((badge, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center px-5 py-3 border border-accent/30 rounded-2xl bg-accent/5 backdrop-blur-sm hover:border-accent/60 transition-all"
                  >
                    <span className="text-accent font-black text-lg leading-tight">{badge.label}</span>
                    <span className="text-white/50 text-xs">{badge.sub}</span>
                  </div>
                ))}
              </div>

              {/* Mini form */}
              <div
                id="hero-form"
                className="relative p-8 border border-accent/20 rounded-2xl bg-card/60 backdrop-blur-sm"
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-accent/20 via-transparent to-transparent rounded-2xl blur-xl opacity-50" />
                <div className="relative">
                  <h3 className="font-display font-bold text-lg mb-2 text-white">Рассчитать решение</h3>
                  <p className="text-sm text-white/50 mb-6">Менеджер свяжется в течение 2 часов</p>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Компания"
                      className="w-full px-4 py-3 bg-background/60 border border-accent/20 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-accent/60 transition-colors"
                    />
                    <input
                      type="tel"
                      placeholder="Телефон"
                      className="w-full px-4 py-3 bg-background/60 border border-accent/20 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-accent/60 transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Почта"
                      className="w-full px-4 py-3 bg-background/60 border border-accent/20 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-accent/60 transition-colors"
                    />
                    <button className="w-full py-3.5 bg-gradient-to-r from-accent to-accent/80 text-black rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-accent/40 transition-all">
                      Отправить заявку
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ЭКРАН 2 — БОЛИ vs РЕШЕНИЕ */}
      <section id="pain" className="py-24 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${visibleSections["pain"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Проблема → Решение</span>
            <h2 className="text-4xl lg:text-5xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Выход и посол должны быть повторяемыми
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Проблемы */}
            <div
              className={`transition-all duration-700 ${visibleSections["pain"] ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
            >
              <h3 className="text-sm font-medium text-red-400/80 uppercase tracking-widest mb-6">Типичные проблемы</h3>
              <div className="space-y-4">
                {[
                  { icon: "TrendingDown", text: "Низкий выход — деньги уходят вместе с влагой" },
                  { icon: "AlertCircle", text: "Непросол и пятна — рекламации и брак партий" },
                  { icon: "Clock", text: "Длинный цикл посола — сдерживает объёмы выпуска" },
                  { icon: "ThumbsDown", text: "Жалобы на качество — неповторяемость вкуса" },
                  { icon: "Wrench", text: "Простои из-за мойки — сложная санитарная обработка" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 border border-red-500/15 rounded-xl bg-red-500/5 hover:bg-red-500/10 transition-all"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <Icon name={item.icon} fallback="AlertCircle" size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/75 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Решения */}
            <div
              className={`transition-all duration-700 delay-200 ${visibleSections["pain"] ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            >
              <h3 className="text-sm font-medium text-accent/80 uppercase tracking-widest mb-6">Наши решения</h3>
              <div className="space-y-4">
                {[
                  { icon: "Gauge", text: "Инъектор с регистром давления — стабильная подача в каждую иглу" },
                  { icon: "Wind", text: "Вакуум: меньше окисления, пористости — лучше текстура" },
                  { icon: "Settings", text: "Программируемые режимы — повторяемые результаты на каждой партии" },
                  { icon: "Shield", text: "Санитарный конструктив — быстрая мойка без сложной разборки" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 border border-accent/20 rounded-xl bg-accent/5 hover:bg-accent/10 transition-all"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <Icon name={item.icon} fallback="CheckCircle" size={18} className="text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Схема линии */}
              <div className="mt-8 p-6 border border-accent/10 rounded-2xl bg-card/40">
                <p className="text-xs text-white/40 uppercase tracking-widest mb-4">Схема линии</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {["Сырьё", "Инъектор", "Массажер", "Готово"].map((step, i, arr) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="px-4 py-2 bg-accent/10 border border-accent/20 rounded-lg text-sm text-white/80 font-medium">
                        {step}
                      </span>
                      {i < arr.length - 1 && <Icon name="ArrowRight" size={14} className="text-accent/50" />}
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#cta"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-accent to-accent/80 text-black rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-accent/40 transition-all"
              >
                <Icon name="Phone" size={14} />
                Консультация технолога
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ЭКРАН 3 — 3 КАРТОЧКИ РЕШЕНИЙ */}
      <section id="solutions" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${visibleSections["solutions"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Оборудование</span>
            <h2 className="text-4xl lg:text-5xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Оборудование + режим + рассол = стабильная партия
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "Drum",
                fallback: "RotateCcw",
                title: "Вакуумные массажеры",
                desc: "Бережное вакуумное массирование — рассол проникает глубже, текстура лучше, цикл короче. Регулируемые режимы: время, вакуум, скорость.",
                cta: "Подобрать массажер",
                href: "#massager",
              },
              {
                icon: "Pipette",
                fallback: "Zap",
                title: "Инъекторы рассола",
                desc: "84 иглы, регистр давления, до 4 т/ч, до 4,3 бар. Равномерное распределение рассола по всему объёму — без пятен и недосола.",
                cta: "Подобрать инъектор",
                href: "#injector",
                highlight: true,
              },
              {
                icon: "FlaskConical",
                fallback: "Beaker",
                title: "Смеси рассолов",
                desc: "Готовые рецептуры под мясо, птицу и рыбу. Повторяемость вкуса, быстрый запуск производства, снижение % брака.",
                cta: "Подобрать смесь",
                href: "#cta",
              },
            ].map((card, i) => {
              const isVisible = visibleSections["solutions"];
              return (
                <div
                  key={i}
                  className={`group relative transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${card.highlight ? "md:scale-105" : ""}`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {card.highlight && (
                    <div className="absolute -inset-1 bg-gradient-to-b from-accent/30 to-transparent rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition" />
                  )}
                  <div
                    className={`relative h-full flex flex-col p-8 border rounded-2xl backdrop-blur-sm transition-all ${
                      card.highlight
                        ? "border-accent/40 bg-accent/8"
                        : "border-accent/10 bg-card/50 hover:border-accent/30 hover:bg-card/80"
                    }`}
                  >
                    {card.highlight && (
                      <div className="absolute top-4 right-4">
                        <span className="text-xs font-semibold bg-accent text-black px-2 py-1 rounded-full">Популярно</span>
                      </div>
                    )}
                    <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-all">
                      <Icon name={card.icon} fallback={card.fallback} size={22} className="text-accent" />
                    </div>
                    <h3 className="font-display font-bold text-xl mb-3 text-white">{card.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-8 flex-1">{card.desc}</p>
                    <a
                      href={card.href}
                      className={`w-full py-3 rounded-xl font-semibold text-sm text-center transition-all ${
                        card.highlight
                          ? "bg-gradient-to-r from-accent to-accent/80 text-black hover:shadow-lg hover:shadow-accent/30"
                          : "border border-accent/20 text-white hover:border-accent/50 hover:bg-accent/10"
                      }`}
                    >
                      {card.cta}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ЭКРАН 4 — МАССАЖЕРЫ: ПРИНЦИП */}
      <section id="massager" className="py-24 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-1000 ${visibleSections["massager"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Принцип работы</span>
              <h2 className="text-4xl lg:text-5xl font-display font-black tracking-tighter mt-4 mb-6">
                <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                  Вакуумное массирование — равномернее посол, лучше текстура
                </span>
              </h2>
              <p className="text-white/70 leading-relaxed mb-8 text-sm">
                Барабан бережно перемешивает сырьё. Вакуум раскрывает поры и волокна: рассол и специи проникают
                глубже, замедляется окисление — продукт получается стабильным от партии к партии.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { icon: "Star", text: "Лучшее качество и сочность готового продукта" },
                  { icon: "Timer", text: "Ускорение цикла посола по сравнению с классическим" },
                  { icon: "Layers", text: "Равномерное распределение специй и рассола" },
                  { icon: "Calendar", text: "Улучшенные сроки годности — меньше окисления" },
                  { icon: "Fish", text: "Подходит для мяса, птицы и рыбы" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-white/80">
                    <Icon name={item.icon} fallback="CheckCircle" size={16} className="text-accent flex-shrink-0 mt-0.5" />
                    {item.text}
                  </div>
                ))}
              </div>

              <a
                href="#cta"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-accent/80 text-black rounded-full font-semibold hover:shadow-xl hover:shadow-accent/40 transition-all"
              >
                Запросить режимы
                <Icon name="ArrowRight" size={16} />
              </a>
            </div>

            {/* Visual */}
            <div
              className={`transition-all duration-1000 delay-300 ${visibleSections["massager"] ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              <div className="relative p-8 border border-accent/20 rounded-3xl bg-card/40 backdrop-blur-sm">
                <div className="absolute -inset-2 bg-gradient-to-br from-accent/15 via-transparent to-transparent rounded-3xl blur-2xl" />
                <div className="relative">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 border border-accent/30 rounded-full mb-4">
                      <Icon name="RefreshCw" size={36} className="text-accent" />
                    </div>
                    <p className="text-white/60 text-sm">Барабан с вакуумом</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Вакуум", value: "до -0.1 МПа" },
                      { label: "Объём", value: "100–3000 л" },
                      { label: "Материал", value: "SUS304" },
                      { label: "Продукты", value: "Мясо / Птица / Рыба" },
                    ].map((spec, i) => (
                      <div key={i} className="p-4 bg-accent/5 border border-accent/15 rounded-xl">
                        <p className="text-white/40 text-xs mb-1">{spec.label}</p>
                        <p className="text-white font-semibold text-sm">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ЭКРАН 5 — СЕРИЯ GR */}
      <section id="gr" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Visual */}
            <div
              className={`order-2 lg:order-1 transition-all duration-1000 ${visibleSections["gr"] ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              <div className="relative p-8 border border-accent/20 rounded-3xl bg-card/40 backdrop-blur-sm">
                <div className="absolute -inset-2 bg-gradient-to-tl from-accent/15 via-transparent to-transparent rounded-3xl blur-2xl" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-accent font-black text-2xl font-display">PLC-Панель</span>
                    <div className="px-3 py-1.5 bg-accent text-black text-xs font-bold rounded-full">99 программ</div>
                  </div>
                  {/* Fake PLC UI */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {["Время", "Вакуум", "Скорость", "Направление", "Интервал", "Программа"].map((param, i) => (
                      <div key={i} className="p-3 bg-accent/5 border border-accent/15 rounded-lg text-center">
                        <p className="text-white/40 text-xs mb-1">{param}</p>
                        <div className="w-full h-1.5 bg-accent/20 rounded-full">
                          <div
                            className="h-full bg-gradient-to-r from-accent to-accent/60 rounded-full"
                            style={{ width: `${30 + i * 12}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-white/40 text-xs text-center">Настройка и сохранение программ массирования</p>
                </div>
              </div>
            </div>

            <div
              className={`order-1 lg:order-2 transition-all duration-1000 ${visibleSections["gr"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Линейка оборудования</span>
              <h2 className="text-4xl lg:text-5xl font-display font-black tracking-tighter mt-4 mb-6">
                <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                  Серия GR: SUS304 и повторяемые настройки
                </span>
              </h2>

              <div className="space-y-4 mb-10">
                {[
                  { icon: "Shield", text: "SUS304 — пищевая нержавейка, соответствие санитарным нормам" },
                  { icon: "Droplets", text: "Форма барабана оптимизирована — проще и быстрее мойка" },
                  { icon: "SlidersHorizontal", text: "Регулируемые параметры: скорость, время, вакуум, направление" },
                  { icon: "Package", text: "Ребра сохраняют целостность кусков при массировании" },
                  { icon: "MoveVertical", text: "Удобная загрузка и выгрузка сырья" },
                  { icon: "Cpu", text: "Опция PLC: до 99 программ — время / интервалы / вакуум / скорость / направление" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-white/80">
                    <Icon name={item.icon} fallback="CheckCircle" size={16} className="text-accent flex-shrink-0 mt-0.5" />
                    {item.text}
                  </div>
                ))}
              </div>

              <a
                href="#cta"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-accent/80 text-black rounded-full font-semibold hover:shadow-xl hover:shadow-accent/40 transition-all"
              >
                КП на серию GR
                <Icon name="FileText" size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ЭКРАН 6 — ИНЪЕКТОРЫ */}
      <section id="injector" className="py-24 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-1000 ${visibleSections["injector"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Технология инъекции</span>
              <h2 className="text-4xl lg:text-5xl font-display font-black tracking-tighter mt-4 mb-6">
                <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                  Регистр давления на иглах — меньше непросола
                </span>
              </h2>
              <p className="text-white/70 leading-relaxed mb-8 text-sm">
                Рассол подаётся напрямую в регистр: одинаковое давление на каждой игле, стабильность даже при
                засоре одной из игл. Результат — равномерный посол без серых пятен и недосола в центре куска.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { icon: "Network", text: "84 иглы — максимальное покрытие продукта" },
                  { icon: "AlertTriangle", text: "Меньше брака: нет серых и зелёных пятен" },
                  { icon: "Crosshair", text: "Точная подача рассола с контролем давления" },
                  { icon: "Zap", text: "Производительность до 4 т/ч при давлении до 4,3 бар" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-white/80">
                    <Icon name={item.icon} fallback="CheckCircle" size={16} className="text-accent flex-shrink-0 mt-0.5" />
                    {item.text}
                  </div>
                ))}
              </div>

              <a
                href="#cta"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-accent/80 text-black rounded-full font-semibold hover:shadow-xl hover:shadow-accent/40 transition-all"
              >
                КП на инъектор
                <Icon name="FileText" size={16} />
              </a>
            </div>

            {/* Scheme */}
            <div
              className={`transition-all duration-1000 delay-300 ${visibleSections["injector"] ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              <div className="relative p-8 border border-accent/20 rounded-3xl bg-card/40 backdrop-blur-sm">
                <div className="absolute -inset-2 bg-gradient-to-br from-accent/15 via-transparent to-transparent rounded-3xl blur-2xl" />
                <div className="relative">
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-6">Схема работы инъектора</p>
                  {/* Flow diagram */}
                  <div className="flex flex-col gap-3">
                    {[
                      { icon: "Droplets", label: "Насос рассола", sub: "Точная дозировка" },
                      { icon: "ArrowDown", label: "", sub: "" },
                      { icon: "GitBranch", label: "Регистр давления", sub: "Равное давление на все иглы" },
                      { icon: "ArrowDown", label: "", sub: "" },
                      { icon: "Pipette", label: "84 иглы", sub: "Равномерное распределение" },
                      { icon: "ArrowDown", label: "", sub: "" },
                      { icon: "CheckCircle", label: "Готовый продукт", sub: "Без пятен, без брака" },
                    ].map((step, i) =>
                      step.label === "" ? (
                        <div key={i} className="flex justify-center">
                          <Icon name="ArrowDown" size={16} className="text-accent/40" />
                        </div>
                      ) : (
                        <div key={i} className="flex items-center gap-4 p-4 bg-accent/5 border border-accent/15 rounded-xl">
                          <div className="w-8 h-8 flex items-center justify-center bg-accent/10 rounded-lg flex-shrink-0">
                            <Icon name={step.icon} fallback="Circle" size={16} className="text-accent" />
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{step.label}</p>
                            <p className="text-white/40 text-xs">{step.sub}</p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — ФИНАЛ */}
      <section id="cta" className="py-24 px-6">
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 ${visibleSections["cta"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="relative p-12 border border-accent/20 rounded-3xl bg-card/40 backdrop-blur-sm text-center">
            <div className="absolute -inset-2 bg-gradient-to-br from-accent/20 via-transparent to-transparent rounded-3xl blur-3xl opacity-50" />
            <div className="relative">
              <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Получить предложение</span>
              <h2 className="text-4xl lg:text-5xl font-display font-black tracking-tighter mt-4 mb-4">
                <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                  Подберём оборудование под ваш продукт
                </span>
              </h2>
              <p className="text-white/60 mb-10 max-w-xl mx-auto">
                Оставьте контакт — технолог перезвонит, разберёт вашу ситуацию и предложит оптимальный режим и
                комплектацию.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Компания"
                  className="px-4 py-3 bg-background/60 border border-accent/20 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-accent/60 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  className="px-4 py-3 bg-background/60 border border-accent/20 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-accent/60 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Почта"
                  className="px-4 py-3 bg-background/60 border border-accent/20 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-accent/60 transition-colors"
                />
              </div>
              <button className="px-10 py-4 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full font-bold text-base hover:shadow-2xl hover:shadow-accent/40 transition-all">
                Отправить заявку
              </button>

              <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/10">
                <div>
                  <div className="text-2xl font-bold text-accent mb-1">+20–30%</div>
                  <p className="text-xs text-white/50">Ориентир по выходу при корректной технологии</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">SUS304</div>
                  <p className="text-xs text-white/50">Пищевая нержавейка</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent mb-1">4 т/ч</div>
                  <p className="text-xs text-white/50">Производительность инъектора</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-accent/10 py-10 px-6 bg-background/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <div>
            <p className="font-semibold text-white mb-1">Daribo & Niro-Tech</p>
            <p className="text-xs">Оборудование для посола и маринования</p>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white transition-colors text-xs">
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-xs">© 2025 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
