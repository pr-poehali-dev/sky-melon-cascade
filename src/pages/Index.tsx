import { useEffect, useState, useCallback } from "react";
import Icon from "@/components/ui/icon";

const CATALOG_URL = "https://functions.poehali.dev/7093349e-12b4-4025-a465-82ce3b87b0b2";

interface CatalogItem {
  id: string;
  name: string;
  price: number | null;
  price_display: string | null;
  url: string | null;
  description: string | null;
  pictures: string[];
  brand: string | null;
  productivity: { name: string; value: string } | null;
  extra_params: { name: string; value: string }[];
  all_params: { name: string; value: string }[];
  category_id: string;
}

const inputCls = "w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors";
const btnPrimary = "px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20";
const btnOutline = "px-8 py-4 border-2 border-primary/30 text-primary rounded-full font-semibold text-lg hover:border-primary hover:bg-primary/5 transition-all";

const Index = () => {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Catalog state
  const [catalogTab, setCatalogTab] = useState<"massagers" | "injectors">("massagers");
  const [catalogData, setCatalogData] = useState<{ massagers: CatalogItem[]; injectors: CatalogItem[] } | null>(null);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogSearch, setCatalogSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [cardSlides, setCardSlides] = useState<Record<string, number>>({});
  const [inquiryItem, setInquiryItem] = useState<CatalogItem | null>(null);
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquirySent, setInquirySent] = useState(false);

  useEffect(() => {
    const ids = [
      "hero","pain","solutions","massager","gr","injector",
      "perf","conveyor","catalog","benefits","compare",
      "selector","service","about","faq","contacts"
    ];
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

  useEffect(() => {
    setCatalogLoading(true);
    fetch(CATALOG_URL)
      .then((r) => r.json())
      .then((d) => setCatalogData(d))
      .finally(() => setCatalogLoading(false));
  }, []);

  const filteredItems = useCallback(() => {
    if (!catalogData) return [];
    const items = catalogData[catalogTab];
    if (!catalogSearch.trim()) return items;
    const q = catalogSearch.toLowerCase();
    return items.filter(
      (it) =>
        it.name.toLowerCase().includes(q) ||
        (it.brand || "").toLowerCase().includes(q)
    );
  }, [catalogData, catalogTab, catalogSearch]);

  const navLinks = [
    { href: "#solutions",  label: "Решения" },
    { href: "#massager",   label: "Массажеры" },
    { href: "#injector",   label: "Инъекторы" },
    { href: "#catalog",    label: "Каталог" },
    { href: "#selector",   label: "Подбор" },
    { href: "#contacts",   label: "Контакты" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-xl border-b border-border z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <img
              src="https://cdn.poehali.dev/files/b643e2cd-1c2b-461b-b32b-4053b1b9e72b.jpg"
              alt="Техносиб"
              className="h-9 w-auto object-contain"
            />
            <p className="text-xs text-muted-foreground hidden sm:block mt-0.5">Оборудование для маринования и посола мяса</p>
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
                Поставка и внедрение
              </span>
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-display font-black leading-[1.05] tracking-tight mb-6 text-foreground">
                Стабильный посол и{" "}
                <span className="text-primary">выше выход</span>{" "}
                с вакуумными массажерами
              </h1>
              <p className="text-xl font-semibold text-foreground leading-relaxed mb-3 max-w-xl">
                Оборудование от ведущих производителей мясного оборудования Daribo, Niro-Tech, Hualian
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
                <button onClick={() => setModalOpen(true)} className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 text-center">
                  Получить предложение
                </button>
                <a href="#solutions" className="px-8 py-4 border-2 border-primary/30 text-primary rounded-full font-semibold text-lg hover:border-primary hover:bg-primary/5 transition-all text-center">
                  Смотреть оборудование
                </a>
              </div>
            </div>

            <div className={`transition-all duration-1000 delay-300 ${vis("hero") ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: "Shield",
                    label: "Высокое качество стали марки 304",
                    sub: "Пищевая нержавеющая сталь гарантирует безопасность продукции и долговечность оборудования",
                  },
                  {
                    icon: "Cpu",
                    label: "Комплектующие мировых брендов",
                    sub: "NORD, Mitsubishi, Schneider, SIEMENS и OMRON — лучшие компоненты для надёжной работы",
                  },
                  {
                    icon: "Zap",
                    label: "Безотказная работа",
                    sub: "Исключительная долговечность и продолжительный срок службы оборудования",
                  },
                ].map((b, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-white border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-xl flex-shrink-0">
                      <Icon name={b.icon} fallback="Star" size={22} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-base text-foreground leading-tight mb-1">{b.label}</p>
                      <p className="text-sm text-muted-foreground">{b.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl overflow-hidden border border-border shadow-xl bg-white">
                <img
                  src="https://cdn.poehali.dev/files/e7ddde3a-0e1a-47f1-916d-405e3e61e337.jpg"
                  alt="Вакуумный массажер Daribo"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ЭКРАН 2: БОЛИ vs РЕШЕНИЕ */}
      <section id="pain" className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${vis("pain") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tight text-foreground leading-tight">
              Качество посола и маринования
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
            </div>
          </div>

          <div className={`text-center mt-12 transition-all duration-700 ${vis("pain") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <button
              onClick={() => { setModalProduct("consult"); setModalOpen(true); }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              <Icon name="Phone" size={18} />
              Получить консультацию технолога
            </button>
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

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: "RefreshCw",
                title: "Вакуумные массажеры",
                desc: "Бережное вакуумное массирование — рассол проникает глубже, текстура лучше, цикл короче. Регулируемые режимы: время, вакуум, скорость.",
                specs: ["до −0.1 МПа вакуум", "100–3000 л объём", "SUS304"],
                highlight: false,
              },
              {
                icon: "Pipette",
                title: "Инъекторы рассола",
                desc: "84 иглы с регистром давления, до 4 т/ч, до 4,3 бар. Равномерное распределение рассола — без пятен и недосола по всему объёму.",
                specs: ["84 иглы", "до 4 т/ч", "до 4,3 бар"],
                highlight: true,
              },
            ].map((card, i) => (
              <div
                key={i}
                className={`group transition-all duration-700 ${vis("solutions") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className={`h-full flex flex-col p-10 border-2 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all ${card.highlight ? "border-primary shadow-primary/10" : "border-border hover:border-primary/40"}`}>
                  {card.highlight && (
                    <div className="mb-4">
                      <span className="text-sm font-bold bg-primary text-white px-4 py-1.5 rounded-full">Популярно</span>
                    </div>
                  )}
                  <div className={`w-24 h-24 flex items-center justify-center rounded-2xl mb-8 ${card.highlight ? "bg-primary" : "bg-primary/10"}`}>
                    <Icon name={card.icon} fallback="Star" size={46} className={card.highlight ? "text-white" : "text-primary"} />
                  </div>
                  <h3 className="font-display font-bold text-3xl mb-4 text-foreground">{card.title}</h3>
                  <p className="text-foreground/70 text-xl leading-relaxed mb-8 flex-1">{card.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {card.specs.map((s, j) => (
                      <span key={j} className="text-sm font-medium px-4 py-1.5 bg-primary/8 text-primary border border-primary/20 rounded-full">{s}</span>
                    ))}
                  </div>
                  <button
                    onClick={() => { setModalProduct(card.title); setModalOpen(true); }}
                    className={`w-full py-4 rounded-xl font-bold text-lg text-center transition-all ${card.highlight ? "bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20" : "border-2 border-primary/30 text-primary hover:border-primary hover:bg-primary/5"}`}
                  >
                    Оставить заявку
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ЭКРАН 9: КАТАЛОГ ─── */}
      <section id="catalog" className="py-28 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">Оборудование</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tight mt-4 text-foreground leading-tight">
              Каталог оборудования
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-xl mx-auto">Реальный ассортимент с ценами — выберите модель и оставьте заявку</p>
          </div>

          {/* Табы + поиск */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 items-start sm:items-center">
            <div className="flex gap-2 bg-white border border-border rounded-2xl p-1.5 shadow-sm">
              {(["massagers", "injectors"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setCatalogTab(tab); setCatalogSearch(""); }}
                  className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${catalogTab === tab ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {tab === "massagers" ? "Массажеры" : "Инъекторы"}
                  {catalogData && (
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${catalogTab === tab ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}`}>
                      {catalogData[tab].length}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="relative flex-1 max-w-xs">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Поиск по названию или бренду..."
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Состояние загрузки */}
          {catalogLoading && (
            <div className="flex items-center justify-center py-24">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-muted-foreground text-sm">Загружаем каталог...</p>
              </div>
            </div>
          )}

          {/* Карточки */}
          {!catalogLoading && catalogData && (
            <>
              {filteredItems().length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                  <Icon name="SearchX" size={48} className="mx-auto mb-4 opacity-30" />
                  <p className="text-lg">Ничего не найдено по запросу «{catalogSearch}»</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
                  {filteredItems().map((item, i) => {
                    const slide = cardSlides[item.id] || 0;
                    return (
                      <div
                        key={item.id}
                        className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/40 transition-all flex flex-col group"
                      >
                        {/* Фото + слайдер */}
                        <div className="relative bg-gray-50 overflow-hidden" style={{ aspectRatio: "4/3" }}>
                          <img
                            src={item.pictures[slide]}
                            alt={item.name}
                            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                            onClick={() => { setSelectedItem(item); setSelectedSlide(slide); }}
                            style={{ cursor: "pointer" }}
                          />
                          {item.pictures.length > 1 && (
                            <>
                              <button
                                onClick={(e) => { e.stopPropagation(); setCardSlides((prev) => ({ ...prev, [item.id]: (slide - 1 + item.pictures.length) % item.pictures.length })); }}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Icon name="ChevronLeft" size={16} className="text-foreground" />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); setCardSlides((prev) => ({ ...prev, [item.id]: (slide + 1) % item.pictures.length })); }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Icon name="ChevronRight" size={16} className="text-foreground" />
                              </button>
                              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                {item.pictures.map((_, pi) => (
                                  <button
                                    key={pi}
                                    onClick={(e) => { e.stopPropagation(); setCardSlides((prev) => ({ ...prev, [item.id]: pi })); }}
                                    className={`w-1.5 h-1.5 rounded-full transition-all ${pi === slide ? "bg-primary w-4" : "bg-white/70"}`}
                                  />
                                ))}
                              </div>
                            </>
                          )}
                          {item.brand && (
                            <div className="absolute top-3 left-3 bg-white/95 text-primary text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-primary/20 uppercase tracking-wide">
                              {item.brand}
                            </div>
                          )}
                        </div>

                        {/* Контент */}
                        <div className="p-5 flex flex-col flex-1">
                          <h3
                            className="font-bold text-lg text-foreground mb-2 leading-snug cursor-pointer hover:text-primary transition-colors"
                            onClick={() => { setSelectedItem(item); setSelectedSlide(0); }}
                          >
                            {item.name}
                          </h3>
                          {item.price_display && (
                            <p className="text-xl font-black text-primary mb-3">{item.price_display}</p>
                          )}

                          {/* Ключевые параметры */}
                          <div className="space-y-1.5 mb-4 flex-1">
                            {item.productivity && (
                              <div className="flex items-start gap-2 text-sm">
                                <Icon name="Zap" size={14} className="text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground"><span className="font-medium text-foreground">{item.productivity.name}:</span> {item.productivity.value}</span>
                              </div>
                            )}
                            {item.extra_params.map((p, pi) => (
                              <div key={pi} className="flex items-start gap-2 text-sm">
                                <Icon name="ChevronRight" size={14} className="text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground"><span className="font-medium text-foreground">{p.name}:</span> {p.value}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex flex-col gap-2 mt-2">
                            <button
                              onClick={() => { setInquiryItem(item); setInquiryName(""); setInquiryPhone(""); setInquirySent(false); }}
                              className="w-full py-4 bg-primary text-white rounded-xl text-base font-bold hover:bg-primary/90 transition-all shadow-md"
                            >
                              Узнать подробней
                            </button>
                            <button
                              onClick={() => { setSelectedItem(item); setSelectedSlide(0); }}
                              className="w-full py-3.5 border-2 border-primary/30 text-primary rounded-xl text-base font-semibold hover:border-primary hover:bg-primary/5 transition-all"
                            >
                              Подробнее
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ─── ПРЕИМУЩЕСТВА МАССАЖЁРОВ ─── */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/5 via-white to-primary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl lg:text-5xl font-display font-black tracking-tight text-foreground">
              Преимущества массажёров от Техно-Сиб
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row gap-10 items-stretch">

            {/* Левая колонка — список преимуществ */}
            <div className="w-full lg:w-1/2 flex flex-col gap-3 justify-between">
              {[
                { icon: "Zap",               title: "Производительность до 4 т/ч",     desc: "Рабочее давление до 4,3 бар" },
                { icon: "Gauge",             title: "Вакуумный барабан до −0,1 МПа",   desc: "Интенсивное массирование без потерь качества" },
                { icon: "Database",          title: "Объём барабана 100–3000 л",        desc: "Широкий модельный ряд под любой объём производства" },
                { icon: "ShieldCheck",       title: "Пищевая нержавеющая сталь",        desc: "Соответствие санитарным нормам" },
                { icon: "Droplets",          title: "Быстрая мойка",                    desc: "Форма барабана оптимизирована под скоростную очистку" },
                { icon: "Crosshair",         title: "Регистр давления на все иглы",     desc: "Точный и равномерный посол каждого куска" },
                { icon: "SlidersHorizontal", title: "Регулируемые параметры",           desc: "Скорость, время, вакуум и направление вращения" },
                { icon: "ListChecks",        title: "99 программ работы",               desc: "Удобная загрузка и выгрузка сырья" },
              ].map((feat, i) => (
                <div key={i} className="flex items-start gap-4 bg-white rounded-2xl border border-border px-5 py-4 hover:border-primary/40 hover:shadow-md transition-all">
                  <div className="w-11 h-11 shrink-0 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon name={feat.icon} fallback="Star" size={22} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-base text-foreground leading-snug">{feat.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Правая колонка — два фото одно под другим */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <div className="flex-1 flex items-center justify-center">
                <img
                  src="https://cdn.poehali.dev/files/2a585324-0221-4fb7-9aa4-6609095c7f34.jpg"
                  alt="Вакуумный массажер DRB-GRY750"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 flex items-center justify-center">
                <img
                  src="https://cdn.poehali.dev/files/34a98faf-2788-47ff-a4ca-b30aa4e0b733.png"
                  alt="Вакуумный массажер GRZK-100"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Модал: детальная карточка товара */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Закрыть */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white border border-border rounded-full flex items-center justify-center shadow-sm transition-all"
            >
              <Icon name="X" size={18} className="text-foreground" />
            </button>

            <div className="grid lg:grid-cols-2 gap-0">
              {/* Слайдер фото */}
              <div className="bg-gray-50 rounded-tl-3xl rounded-bl-3xl p-6 flex flex-col gap-4">
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={selectedItem.pictures[selectedSlide]}
                    alt={selectedItem.name}
                    className="w-full h-full object-contain p-4"
                  />
                  {selectedItem.pictures.length > 1 && (
                    <>
                      <button
                        onClick={() => setSelectedSlide((s) => (s - 1 + selectedItem.pictures.length) % selectedItem.pictures.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow flex items-center justify-center hover:bg-primary/5"
                      >
                        <Icon name="ChevronLeft" size={18} />
                      </button>
                      <button
                        onClick={() => setSelectedSlide((s) => (s + 1) % selectedItem.pictures.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow flex items-center justify-center hover:bg-primary/5"
                      >
                        <Icon name="ChevronRight" size={18} />
                      </button>
                    </>
                  )}
                </div>
                {selectedItem.pictures.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {selectedItem.pictures.map((pic, pi) => (
                      <button
                        key={pi}
                        onClick={() => setSelectedSlide(pi)}
                        className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${pi === selectedSlide ? "border-primary shadow-md" : "border-transparent opacity-60 hover:opacity-100"}`}
                      >
                        <img src={pic} alt="" className="w-full h-full object-contain bg-white p-1" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Информация */}
              <div className="p-8 flex flex-col">
                {selectedItem.brand && (
                  <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{selectedItem.brand}</span>
                )}
                <h2 className="text-2xl font-display font-black text-foreground mb-2 leading-tight">{selectedItem.name}</h2>
                {selectedItem.price_display && (
                  <p className="text-3xl font-black text-primary mb-4">{selectedItem.price_display}</p>
                )}

                {/* Все характеристики */}
                <div className="space-y-2 mb-6 max-h-48 overflow-y-auto pr-1">
                  {selectedItem.all_params.map((p, pi) => (
                    <div key={pi} className="flex justify-between gap-4 py-1.5 border-b border-border/50 text-sm">
                      <span className="text-muted-foreground flex-shrink-0">{p.name}</span>
                      <span className="font-medium text-foreground text-right">{p.value}</span>
                    </div>
                  ))}
                </div>

                {/* Описание */}
                {selectedItem.description && (
                  <div
                    className="text-sm text-muted-foreground leading-relaxed mb-6 max-h-28 overflow-y-auto pr-1 border-t border-border/50 pt-4"
                    dangerouslySetInnerHTML={{ __html: selectedItem.description }}
                  />
                )}

                <div className="mt-auto">
                  <button
                    onClick={() => { setSelectedItem(null); setInquiryItem(selectedItem); setInquiryName(""); setInquiryPhone(""); setInquirySent(false); }}
                    className="w-full py-4 bg-primary text-white rounded-xl text-lg font-bold hover:bg-primary/90 transition-all shadow-md"
                  >
                    Узнать подробней
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Модал: заявка на товар */}
      {inquiryItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setInquiryItem(null)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setInquiryItem(null)}
              className="absolute top-4 right-4 w-9 h-9 bg-border/40 hover:bg-border rounded-full flex items-center justify-center"
            >
              <Icon name="X" size={16} />
            </button>
            {!inquirySent ? (
              <>
                <h3 className="text-2xl font-display font-black text-foreground mb-1">Узнать подробней</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  <span className="font-medium text-foreground">{inquiryItem.name}</span>
                </p>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className={inputCls}
                  />
                  <input
                    type="tel"
                    placeholder="Телефон"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    className={inputCls}
                  />
                  <button
                    onClick={() => setInquirySent(true)}
                    disabled={!inquiryName.trim() || !inquiryPhone.trim()}
                    className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-md disabled:opacity-40"
                  >
                    Отправить
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Check" size={32} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-display font-black text-foreground mb-2">Заявка отправлена!</h3>
                <p className="text-muted-foreground">Свяжемся с вами в течение рабочего дня</p>
              </div>
            )}
          </div>
        </div>
      )}

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


      {/* ─── ЭКРАН 7: ПРОИЗВОДИТЕЛЬНОСТЬ / МОЙКА ─── */}
      <section id="perf" className="py-28 px-6 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 ${vis("perf") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <span className="text-xs font-semibold tracking-widest text-primary uppercase">Производительность и обслуживание</span>
              <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tight mt-4 mb-6 text-foreground leading-tight">
                Высокая скорость и простая мойка
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Оборудование спроектировано для интенсивного производства: максимальная пропускная способность и минимальное время на санитарную обработку между партиями.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: "Zap",         value: "До 4 т/час",            sub: "Производительность инъектора" },
                  { icon: "Gauge",       value: "До 4,3 бар",            sub: "Для вязких маринадов" },
                  { icon: "Wrench",      value: "Без инструмента",       sub: "Конвейер снимается легко" },
                ].map((tile, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-6 bg-white border-2 border-primary/15 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/40 transition-all">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                      <Icon name={tile.icon} fallback="Star" size={28} className="text-primary" />
                    </div>
                    <p className="font-black text-2xl text-foreground leading-tight mb-1">{tile.value}</p>
                    <p className="text-sm text-muted-foreground">{tile.sub}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-4 p-5 bg-white border border-primary/20 rounded-2xl mb-8 shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Bird" fallback="Star" size={24} className="text-primary" />
                </div>
                <div>
                  <p className="font-bold text-base text-foreground">Подпружиненные иглы</p>
                  <p className="text-muted-foreground text-sm">На кости и тушки птицы — иглы пружинят, не ломаются при контакте с костью, равномерно покрывают продукт</p>
                </div>
              </div>
              <a href="#contacts" className={btnPrimary + " inline-flex items-center gap-2"}>
                Уточнить комплектацию
                <Icon name="ArrowRight" size={18} />
              </a>
            </div>

            <div className={`transition-all duration-1000 delay-300 ${vis("perf") ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
              <div className="p-8 bg-white border border-border rounded-3xl shadow-xl">
                <h4 className="text-lg font-bold text-foreground mb-6 text-center">Конвейер — быстросъём</h4>
                <div className="flex justify-center mb-6">
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary/5 rounded-full" />
                    <div className="relative flex flex-col items-center gap-2">
                      <Icon name="Workflow" fallback="GitBranch" size={64} className="text-primary" />
                      <span className="text-sm font-semibold text-primary">Быстросъёмный конвейер</span>
                    </div>
                    <div className="absolute top-2 right-2 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="Unlock" size={18} className="text-primary" />
                    </div>
                    <div className="absolute bottom-2 left-2 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="Droplets" size={18} className="text-primary" />
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: "Unlock",      text: "Конвейер снимается без инструмента за 2 минуты" },
                    { icon: "Droplets",    text: "Полная мойка без разборки корпуса" },
                    { icon: "Shield",      text: "SUS304 — стойкость к дезинфектантам" },
                    { icon: "Timer",       text: "Меньше простоев между партиями" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/10 rounded-xl">
                      <Icon name={item.icon} fallback="CheckCircle" size={16} className="text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ЭКРАН 8: КОНВЕЙЕР И ШАГ ─── */}
      <section id="conveyor" className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`order-2 lg:order-1 transition-all duration-1000 ${vis("conveyor") ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
              <div className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-3xl shadow-xl">
                <h4 className="text-lg font-bold text-foreground mb-6 text-center">Зубчатый конвейер + шаг подачи</h4>
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-44 h-44 bg-white border-2 border-primary/20 rounded-2xl flex items-center justify-center shadow-sm">
                      <div className="flex flex-col items-center gap-2">
                        <Icon name="MoveHorizontal" size={52} className="text-primary" />
                        <span className="text-xs font-bold text-primary">ШАГ 15–60 мм</span>
                      </div>
                    </div>
                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center shadow-md">
                      <Icon name="Ruler" size={22} />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {["15 мм", "30 мм", "45 мм", "60 мм", "Авто", "Повтор"].map((v, i) => (
                    <div key={i} className="p-3 bg-white border border-primary/15 rounded-xl text-center">
                      <p className="font-bold text-sm text-foreground">{v}</p>
                      <p className="text-xs text-muted-foreground">{i < 4 ? "шаг подачи" : i === 4 ? "режим" : "программа"}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`order-1 lg:order-2 transition-all duration-1000 ${vis("conveyor") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <span className="text-xs font-semibold tracking-widest text-primary uppercase">Точная подача</span>
              <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tight mt-4 mb-6 text-foreground leading-tight">
                Точная подача и шаг 15–60 мм
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Зубчатый конвейер с направляющими обеспечивает точное и стабильное перемещение продукта под иглы. Настраиваемый шаг подачи от 15 до 60 мм — под любой формат и размер куска.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  { icon: "GitBranch",    text: "Зубчатый конвейер с боковыми направляющими — продукт не сдвигается" },
                  { icon: "Ruler",        text: "Шаг 15–60 мм — точная настройка под любой продукт" },
                  { icon: "RefreshCw",    text: "Повторяемость: одинаковый шаг на каждой партии" },
                  { icon: "Settings2",    text: "Быстрая смена параметров без остановки линии" },
                  { icon: "MoveHorizontal", text: "Равномерное покрытие иглами по всей длине куска" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-primary/5 border border-primary/15 rounded-xl">
                    <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg flex-shrink-0">
                      <Icon name={item.icon} fallback="CheckCircle" size={18} className="text-primary" />
                    </div>
                    <span className="text-base text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
              <a href="#contacts" className={btnPrimary + " inline-flex items-center gap-2"}>
                Проконсультироваться
                <Icon name="MessageCircle" size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ЭКРАН 10: ПРЕИМУЩЕСТВА 6 ПЛИТОК ─── */}
      <section id="benefits" className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${vis("benefits") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">После внедрения</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tight mt-4 text-foreground leading-tight">
              Что меняется после внедрения
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { icon: "TrendingUp",   title: "Выше выход",           desc: "Ориентир +20–30% влаги при корректной технологии и режиме" },
              { icon: "Target",       title: "Стабильный посол",     desc: "Однородный цвет, вкус, текстура — без серых пятен и недосола" },
              { icon: "Gauge",        title: "Быстрее цикл",         desc: "Вакуум и интенсивное массирование сокращают время выдержки" },
              { icon: "ThumbsUp",     title: "Меньше брака",         desc: "Равномерная инъекция исключает пересол и недосол крупных кусков" },
              { icon: "Repeat",       title: "Повторяемость",        desc: "Программы PLC: одинаковый результат на каждой партии" },
              { icon: "Droplets",     title: "Санитария без потерь", desc: "Быстросъёмные детали — мойка без простоев и сложной разборки" },
            ].map((tile, i) => (
              <div key={i} className={`p-7 bg-background border border-border rounded-2xl hover:border-primary/40 hover:shadow-lg transition-all flex flex-col gap-4 ${vis("benefits") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${i * 90}ms`, transitionDuration: "700ms" }}>
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon name={tile.icon} fallback="Star" size={28} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-foreground mb-2">{tile.title}</h3>
                  <p className="text-muted-foreground text-base">{tile.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href="#selector" className={btnPrimary + " inline-flex items-center gap-2"}>
              Рассчитать эффект
              <Icon name="Calculator" size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ─── ЭКРАН 11: СРАВНЕНИЕ ─── */}
      <section id="compare" className="py-28 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${vis("compare") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">Сравнение</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tight mt-4 text-foreground leading-tight">
              Почему это работает лучше
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {[
              {
                title: "Вакуумный массажер vs классический посол",
                rows: [
                  ["Параметр",              "Вакуумный массажер",    "Классический посол"],
                  ["Время цикла",           "2–8 часов",             "12–72 часа"],
                  ["Однородность посола",   "Высокая",               "Неравномерно"],
                  ["Окисление",             "Минимальное (вакуум)",  "Высокое"],
                  ["Выход",                 "+20–30% (ориентир)",    "Базовый"],
                  ["Повторяемость",         "Да (программы PLC)",    "Зависит от операт."],
                  ["Мойка",                 "Быстро, без разборки",  "Стандартная"],
                ],
              },
              {
                title: "Инъектор с регистром давления vs обычный",
                rows: [
                  ["Параметр",                   "Регистр давления",    "Обычный инъектор"],
                  ["Давление на каждой игле",    "Одинаковое",          "Варьируется"],
                  ["Риск серых пятен",           "Минимальный",         "Высокий"],
                  ["Засор одной иглы",           "Остальные работают",  "Падает вся система"],
                  ["Вязкие маринады",            "Да, до 4,3 бар",      "Ограниченно"],
                  ["Кость / тушки птицы",        "Да (подпружинен.)",   "Нет"],
                  ["Точность дозировки",         "Высокая",             "Средняя"],
                ],
              },
            ].map((table, ti) => (
              <div key={ti} className={`transition-all duration-700 ${vis("compare") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${ti * 200}ms` }}>
                <h3 className="font-bold text-xl text-foreground mb-4">{table.title}</h3>
                <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
                  {table.rows.map((row, ri) => (
                    <div key={ri} className={`grid grid-cols-3 text-sm ${ri === 0 ? "bg-primary/5 font-bold text-foreground" : "border-t border-border text-foreground"} hover:bg-primary/3 transition-colors`}>
                      {row.map((cell, ci) => (
                        <div key={ci} className={`px-4 py-3 ${ci === 1 && ri > 0 ? "text-primary font-semibold" : ""}`}>{cell}</div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="#contacts" className={btnPrimary + " inline-flex items-center gap-2"}>
              Обсудить задачу
              <Icon name="MessageSquare" size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ─── ЭКРАН 12: ПОДБОР + ФОРМА ─── */}
      <section id="selector" className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${vis("selector") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">Подбор оборудования</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tight mt-4 text-foreground leading-tight">
              Ответьте на 6 вопросов — получите решение
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-14">
            {/* Вопросы */}
            <div className={`transition-all duration-1000 ${vis("selector") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <div className="flex justify-center mb-8">
                <div className="w-24 h-24 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center">
                  <Icon name="ClipboardList" size={48} className="text-primary" />
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { n: "01", q: "Какой продукт обрабатываете?",     hint: "Мясо / птица / рыба / деликатесы" },
                  { n: "02", q: "Какой объём в смену (кг/ч)?",      hint: "Например, 500 кг/смену или 2 т/ч" },
                  { n: "03", q: "Тип сырья?",                       hint: "Целые куски / тушки / филе / кость" },
                  { n: "04", q: "Цель обработки?",                  hint: "Посол / маринование / ускорение / выход" },
                  { n: "05", q: "Вязкость маринада?",               hint: "Жидкий рассол / густой / с кусочками" },
                  { n: "06", q: "Нужна программируемость (PLC)?",   hint: "Да / нет / нужна консультация" },
                ].map((q, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-background border border-border rounded-xl hover:border-primary/40 transition-colors">
                    <span className="font-black text-2xl text-primary/30 leading-none flex-shrink-0">{q.n}</span>
                    <div>
                      <p className="font-bold text-base text-foreground">{q.q}</p>
                      <p className="text-sm text-muted-foreground">{q.hint}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Форма */}
            <div className={`transition-all duration-1000 delay-300 ${vis("selector") ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <div className="p-8 bg-background border-2 border-primary/15 rounded-3xl shadow-sm">
                <h3 className="font-display font-bold text-2xl mb-2 text-foreground">Отправьте ответы — мы подберём</h3>
                <p className="text-muted-foreground mb-6 text-sm">Технолог свяжется в течение 2 часов</p>
                <div className="space-y-4">
                  <input type="text"  placeholder="Имя"       className={inputCls} />
                  <input type="text"  placeholder="Компания"  className={inputCls} />
                  <input type="tel"   placeholder="Телефон"   className={inputCls} />
                  <input type="email" placeholder="Почта"     className={inputCls} />
                  <textarea placeholder="Комментарий: продукт, объём, задача..." rows={4} className={inputCls + " resize-none"} />
                  <button className="w-full py-4 bg-primary text-white rounded-xl font-bold text-base hover:bg-primary/90 transition-all shadow-sm">
                    Отправить запрос
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ЭКРАН 13: ВНЕДРЕНИЕ И СЕРВИС ─── */}
      <section id="service" className="py-28 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${vis("service") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">Внедрение и сервис</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tight mt-4 text-foreground leading-tight">
              От подбора до запуска — под ключ
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-14">
            {[
              { icon: "ClipboardCheck", step: "01", title: "Подбор",                  desc: "Анализ задачи, продукта, объёма. Подбор модели и режима. КП в течение 24 ч." },
              { icon: "Truck",          step: "02", title: "Поставка и монтаж",        desc: "Доставка, распаковка, установка на площадке. Подключение к коммуникациям." },
              { icon: "GraduationCap",  step: "03", title: "Пусконаладка и обучение", desc: "Настройка режимов под ваш продукт. Обучение персонала, первые тестовые партии." },
              { icon: "Wrench",         step: "04", title: "Сервис и запчасти",        desc: "Гарантийное и постгарантийное обслуживание. Наличие запчастей. Поддержка технолога." },
            ].map((s, i) => (
              <div key={i} className={`relative p-7 bg-white border border-border rounded-2xl shadow-sm hover:shadow-lg hover:border-primary/40 transition-all flex flex-col gap-4 ${vis("service") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${i * 100}ms`, transitionDuration: "700ms" }}>
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon name={s.icon} fallback="Star" size={28} className="text-primary" />
                  </div>
                  <span className="font-black text-3xl text-primary/20">{s.step}</span>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-foreground mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-8 h-8 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center">
                      <Icon name="ChevronRight" size={16} className="text-primary" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="#contacts" className={btnPrimary + " inline-flex items-center gap-2"}>
              Уточнить условия
              <Icon name="ArrowRight" size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ─── ЭКРАН 14: О КОМПАНИИ ─── */}
      <section id="about" className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 ${vis("about") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <span className="text-xs font-semibold tracking-widest text-primary uppercase">О компании</span>
              <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tight mt-4 mb-6 text-foreground leading-tight">
                Daribo & Niro-Tech
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                <strong className="text-foreground">Daribo</strong> — Shanghai DARIBO Food Machinery Co., Ltd. Штаб-квартира в Шанхае, региональные офисы в Гуанчжоу, Фучжоу и Ухане. Специализация: промышленное оборудование для посола и маринования мяса, птицы и рыбы.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                <strong className="text-foreground">Niro-Tech</strong> — российский партнёр: поставка, подбор режимов, пусконаладка и сервисное сопровождение. Вместе — полный цикл от задачи до результата.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { icon: "Building2",  text: "Производитель: Шанхай" },
                  { icon: "MapPin",     text: "Офисы: Гуанчжоу, Фучжоу, Ухань" },
                  { icon: "Headphones", text: "Поддержка: Niro-Tech (РФ)" },
                  { icon: "Settings",   text: "Подбор режимов и сервис" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/10 rounded-xl">
                    <Icon name={item.icon} fallback="Star" size={18} className="text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
              <a href="#contacts" className={btnPrimary + " inline-flex items-center gap-2"}>
                Связаться
                <Icon name="Phone" size={18} />
              </a>
            </div>

            <div className={`transition-all duration-1000 delay-300 ${vis("about") ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
              <div className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-3xl shadow-xl">
                <div className="flex flex-col items-center gap-6">
                  <div className="flex gap-6">
                    <div className="w-28 h-28 bg-white border-2 border-primary/20 rounded-2xl flex items-center justify-center shadow-sm">
                      <div className="flex flex-col items-center gap-1">
                        <Icon name="Factory" size={36} className="text-primary" />
                        <span className="text-xs font-bold text-primary">Daribo</span>
                      </div>
                    </div>
                    <div className="w-28 h-28 bg-white border-2 border-primary/20 rounded-2xl flex items-center justify-center shadow-sm">
                      <div className="flex flex-col items-center gap-1">
                        <Icon name="Handshake" fallback="Users" size={36} className="text-primary" />
                        <span className="text-xs font-bold text-primary">Niro-Tech</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Icon name="ArrowDown" size={24} className="text-primary/40" />
                  </div>
                  <div className="w-full p-5 bg-white border border-primary/20 rounded-2xl text-center shadow-sm">
                    <Icon name="CheckCircle" size={32} className="text-primary mx-auto mb-2" />
                    <p className="font-bold text-base text-foreground">Полный цикл внедрения</p>
                    <p className="text-sm text-muted-foreground">Подбор → поставка → пусконаладка → сервис</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ЭКРАН 15: FAQ ─── */}
      <section id="faq" className="py-28 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${vis("faq") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">FAQ</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tight mt-4 text-foreground leading-tight">
              Частые вопросы
            </h2>
          </div>
          <div className="space-y-3 mb-12">
            {[
              { q: "Зачем нужен вакуум в массажере?",                     a: "Вакуум раскрывает поры и волокна сырья, позволяя рассолу проникать глубже. Дополнительно тормозит окисление жиров и улучшает цвет и сроки хранения продукта." },
              { q: "Насколько вакуумный массажер ускоряет процесс?",      a: "В зависимости от продукта и режима — от 2 до 10 раз быстрее классического посола. Например, цикл на ветчину вместо 48 часов может составить 6–12 часов." },
              { q: "Что происходит при засоре одной иглы?",               a: "При конструкции с регистром давления засор одной иглы не влияет на остальные — давление перераспределяется. В обычных инъекторах засор одной иглы снижает давление во всей системе." },
              { q: "Работает ли с вязкими маринадами и специями?",        a: "Да. Инъекторы работают при давлении до 4,3 бар, что позволяет использовать густые маринады, соусы с частицами и специями без засора системы." },
              { q: "Можно ли работать с тушками птицы и костью?",         a: "Да. Модели с подпружиненными иглами специально рассчитаны на работу с тушками птицы и продуктом на кости — иглы пружинят при контакте с костью, не ломаются." },
              { q: "Как устроена мойка оборудования?",                    a: "Конвейер снимается без инструмента за 1–2 минуты. Корпус и внутренние поверхности из SUS304 легко моются стандартными дезинфектантами. Полная мойка занимает 15–30 минут." },
              { q: "Что такое PLC и зачем нужны 99 программ?",            a: "PLC — программируемый логический контроллер. Позволяет сохранять до 99 рецептур (время, вакуум, скорость, направление, интервалы) и воспроизводить их в одно касание. Исключает человеческий фактор и обеспечивает повторяемость." },
              { q: "Что нужно для подбора оборудования?",                 a: "Достаточно указать: продукт (мясо/птица/рыба), объём в смену (кг/ч или т/смену), тип сырья (куски, тушки, филе, кость), цель (посол, маринование, выход), вязкость маринада. Остальное уточним на звонке." },
            ].map((faq, i) => (
              <div key={i} className={`bg-white border border-border rounded-2xl overflow-hidden transition-all duration-700 ${vis("faq") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: `${i * 60}ms` }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-primary/3 transition-colors"
                >
                  <span className="font-semibold text-base text-foreground pr-4">{faq.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={20} className="text-primary flex-shrink-0" />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-muted-foreground text-base leading-relaxed border-t border-border bg-primary/3">
                    <div className="pt-4">{faq.a}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href="#contacts" className={btnPrimary + " inline-flex items-center gap-2"}>
              Задать вопрос
              <Icon name="MessageCircle" size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ─── ЭКРАН 16: КОНТАКТЫ ─── */}
      <section id="contacts" className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${vis("contacts") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">Связаться</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tight mt-4 text-foreground leading-tight">
              Обсудим вашу задачу
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-14 items-start">
            {/* Левая — контакты + иллюстрация */}
            <div className={`transition-all duration-1000 ${vis("contacts") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <div className="flex justify-center mb-10">
                <div className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-3xl shadow-xl w-full max-w-sm">
                  <div className="flex justify-center mb-6">
                    <div className="w-28 h-28 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <Icon name="Factory" size={56} className="text-primary" />
                    </div>
                  </div>
                  <p className="text-center text-sm font-medium text-muted-foreground mb-6">Оборудование в чистом пищевом цехе</p>
                  <div className="space-y-4">
                    {[
                      { icon: "Phone",  label: "Телефон",  value: "+7 (000) 000-00-00" },
                      { icon: "Mail",   label: "Почта",    value: "info@niro-tech.ru" },
                      { icon: "Clock",  label: "График",   value: "Пн–Пт, 9:00–18:00 МСК" },
                    ].map((c, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-white border border-primary/10 rounded-xl">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name={c.icon} fallback="Star" size={18} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{c.label}</p>
                          <p className="font-bold text-base text-foreground">{c.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Правая — форма */}
            <div className={`transition-all duration-1000 delay-300 ${vis("contacts") ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <div className="p-8 bg-background border-2 border-primary/15 rounded-3xl shadow-sm">
                <h3 className="font-display font-bold text-2xl mb-2 text-foreground">Отправить запрос</h3>
                <p className="text-muted-foreground mb-6 text-sm">Технолог ответит в течение 2 часов</p>
                <div className="space-y-4">
                  <input type="text"  placeholder="Имя"       className={inputCls} />
                  <input type="text"  placeholder="Компания"  className={inputCls} />
                  <input type="tel"   placeholder="Телефон"   className={inputCls} />
                  <input type="email" placeholder="Почта"     className={inputCls} />
                  <textarea placeholder="Комментарий (продукт, объём, задача)" rows={4} className={inputCls + " resize-none"} />
                  <button className="w-full py-4 bg-primary text-white rounded-xl font-bold text-base hover:bg-primary/90 transition-all shadow-sm">
                    Отправить запрос
                  </button>
                  <p className="text-xs text-muted-foreground text-center">
                    Нажимая «Отправить», вы соглашаетесь с{" "}
                    <a href="#" className="text-primary hover:underline">политикой обработки данных</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── МОДАЛ ─── */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display font-bold text-2xl text-foreground">
                  {modalProduct === "consult" ? "Получить консультацию технолога" : modalProduct ? "Запросить КП" : "Получить предложение"}
                </h3>
                {modalProduct && modalProduct !== "consult" && (
                  <p className="text-sm text-primary mt-1">{modalProduct}</p>
                )}
              </div>
              <button onClick={() => setModalOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-background hover:bg-primary/10 transition-colors">
                <Icon name="X" size={20} className="text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Имя"     className={inputCls} />
              <input type="tel"  placeholder="Телефон" className={inputCls} />
              <button className="w-full py-4 bg-primary text-white rounded-xl font-bold text-base hover:bg-primary/90 transition-all shadow-sm">
                Отправить
              </button>
              <p className="text-xs text-muted-foreground text-center">
                Нажимая «Отправить», вы соглашаетесь с{" "}
                <a href="#" className="text-primary hover:underline">политикой обработки данных</a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─── ФУТЕР ─── */}
      <footer className="border-t border-border py-12 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-1">
              <img
                src="https://cdn.poehali.dev/files/b643e2cd-1c2b-461b-b32b-4053b1b9e72b.jpg"
                alt="Техносиб"
                className="h-8 w-auto object-contain mb-2"
              />
              <p className="text-xs text-muted-foreground mb-4">Оборудование для маринования и посола мяса</p>
              <div className="space-y-2">
                <a href="tel:+70000000000" className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
                  <Icon name="Phone" size={14} className="text-primary" />
                  +7 (000) 000-00-00
                </a>
                <a href="mailto:info@niro-tech.ru" className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
                  <Icon name="Mail" size={14} className="text-primary" />
                  info@niro-tech.ru
                </a>
              </div>
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground mb-3">Оборудование</p>
              <div className="space-y-2">
                {["#massager", "#gr", "#injector", "#perf", "#conveyor"].map((href, i) => (
                  <a key={i} href={href} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                    {["Вакуумные массажеры", "Серия GR", "Инъекторы рассола", "Производительность", "Конвейер и шаг"][i]}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground mb-3">Компания</p>
              <div className="space-y-2">
                {["#catalog", "#benefits", "#compare", "#service", "#about", "#faq"].map((href, i) => (
                  <a key={i} href={href} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                    {["Каталог", "Преимущества", "Сравнение", "Внедрение и сервис", "О компании", "FAQ"][i]}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground mb-3">Подбор</p>
              <div className="space-y-2">
                {[["#selector", "Подобрать оборудование"], ["#contacts", "Контакты"], ["#contacts", "Запросить КП"]].map(([href, label], i) => (
                  <a key={i} href={href} className="block text-sm text-muted-foreground hover:text-primary transition-colors">{label}</a>
                ))}
              </div>
              <div className="mt-6">
                <a href="#contacts" className="inline-block px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 transition-all shadow-sm">
                  Рассчитать решение
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>© 2025 Daribo & Niro-Tech. Все права защищены.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">Политика обработки данных</a>
              <a href="#" className="hover:text-primary transition-colors">Согласие на обработку</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;