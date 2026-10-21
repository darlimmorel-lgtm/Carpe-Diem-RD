import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, ChevronUp,
  Clock3, Instagram, MapPin, Menu, MessageCircle, Phone, Search, Users, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { business, menuCategories, navItems, whatsappUrl, type MenuItem } from "@/data/carpe";
import a1 from "@/assets/carpe-1.jpg";
import a2 from "@/assets/carpe-2.jpg";
import a3 from "@/assets/carpe-3.jpg";
import a4 from "@/assets/carpe-4.jpg";
import a5 from "@/assets/carpe-5.jpg";
import a6 from "@/assets/carpe-6.jpg";
import a7 from "@/assets/carpe-7.jpg";
import a8 from "@/assets/carpe-8.jpg";
import a9 from "@/assets/carpe-9.jpg";
import a10 from "@/assets/carpe-10.jpg";
import a11 from "@/assets/carpe-11.jpg";
import a12 from "@/assets/carpe-12.jpg";
import a13 from "@/assets/carpe-13.jpg";
import a14 from "@/assets/carpe-14.jpg";
import a15 from "@/assets/carpe-15.jpg";
import a16 from "@/assets/carpe-16.jpg";
import a17 from "@/assets/carpe-17.jpg";
import a18 from "@/assets/carpe-18.jpg";
import a19 from "@/assets/carpe-19.jpg";
import a20 from "@/assets/carpe-20.jpg";
import a21 from "@/assets/carpe-21.jpg";
import facadeImage from "@/assets/carpe-logo-hero.png";
import facadeSectionImage from "@/assets/carpe-facade.jpg";
const experienceImage = facadeSectionImage; const foodImage = a7;

const external = { target: "_blank", rel: "noreferrer noopener" } as const;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Field({ label, error, children }: { label: string; error?: string | undefined; children: ReactNode }) {
  return <label className="form-field"><span>{label}</span>{children}{error && <small role="alert">{error}</small>}</label>;
}

function Header({ onReserve }: { onReserve: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);
  return <><header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
    <div className="header-inner">
      <button className="brand" onClick={() => scrollTo("inicio")} aria-label="Ir al inicio"><strong>CARPE DIEM</strong><span>RD</span></button>
      <nav className="desktop-nav" aria-label="Navegación principal">{navItems.map(([label, id]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}</nav>
      <Button variant="gold" className="desktop-reserve" onClick={onReserve}>Reservar <ArrowUpRight /></Button>
      <Button variant="iconGhost" size="icon" className="mobile-menu-button" onClick={() => setOpen(true)} aria-label="Abrir menú"><Menu /></Button>
    </div>
  </header>
    {open && <div className="mobile-panel" role="dialog" aria-modal="true" aria-label="Menú de navegación">
      <div className="mobile-panel-top"><span>CARPE DIEM <small>RD</small></span><Button variant="iconGhost" size="icon" onClick={() => setOpen(false)} aria-label="Cerrar menú"><X /></Button></div>
      <nav>{navItems.map(([label, id], index) => <button key={id} onClick={() => { setOpen(false); scrollTo(id); }}><small>0{index + 1}</small>{label}</button>)}</nav>
      <Button variant="gold" size="lg" onClick={() => { setOpen(false); onReserve(); }}>Reservar mi mesa</Button>
    </div>}
  </>;
}

function Hero({ onReserve }: { onReserve: () => void }) {
  return <section id="inicio" className="hero">
    <img src={facadeImage} alt="Fachada de Carpe Diem RD con su entrada entre palmeras en la Av. España, Santo Domingo Este" width={1600} height={900} fetchPriority="high" />
    <div className="hero-shade" />
    <div className="hero-content">
      <p className="eyebrow hero-enter">Restaurante · Terraza · Lounge</p>
      <div className="gold-rule hero-enter" />
      <h1 className="hero-enter">Vive el<br /><em>momento.</em></h1>
      <p className="hero-copy hero-enter">Gastronomía, encuentros y noches para recordar en Santo Domingo Este.</p>
      <div className="hero-actions hero-enter"><Button variant="gold" size="lg" onClick={onReserve}>Reservar mi mesa <ArrowUpRight /></Button><Button variant="ivoryOutline" size="lg" onClick={() => scrollTo("menu")}>Descubrir el menú</Button></div>
    </div>
    <p className="hero-address"><MapPin /> Av. España #56 · Santo Domingo Este</p>
    <button className="scroll-cue" onClick={() => scrollTo("experiencia")} aria-label="Descubrir la experiencia"><span>Descubrir</span><ArrowDown /></button>
  </section>;
}

function Marquee() {
  const words = ["Buena mesa", "Grandes encuentros", "Coctelería", "Noches caribeñas", "Carpe Diem"];
  return <div className="marquee" aria-label={words.join(", ")}><div>{[...words, ...words].map((word, i) => <span key={`${word}-${i}`}>{word}<i>◆</i></span>)}</div></div>;
}

const featureDishes = [
  ["Dumplings de salmón", "Entradas", "Rellenos de salmón, acompañados de salsa teriyaki.", "RD$450"],
  ["Prosciutto al melón", "Entradas", "Tiras de melón con jamón serrano y reducción de balsámico.", "RD$675"],
  ["Pasta al borracho", "Pastas", "Pollo y pepperoni frito en salsa Aurora con un toque de vodka.", "RD$800"],
  ["Canoa", "Platos fuertes", "Plátano maduro relleno de churrasco y vegetales en salsa de cheddar con toque picante.", "RD$900"],
  ["Crispy queen", "Sándwiches y hamburguesas", "Pan brioche, 8 oz de pollo empanizado, mozzarella gratinada, bacon y coleslaw de la casa.", "RD$599"],
  ["The Special One", "Postres", "Esfera de chocolate rellena de helado, peta crispy y avena caramelizada.", "RD$850"],
] as const;


function Introduction() {
  return <section id="experiencia" className="section intro"><div className="section-shell intro-grid">
    <div data-reveal><p className="eyebrow">La experiencia</p><h2>Hay lugares que convierten cada encuentro en un <em>momento especial.</em></h2><p className="lead">Una combinación de gastronomía dominicana e internacional, terraza, ambiente social y experiencias nocturnas para disfrutar a tu propio ritmo.</p>
      <div className="principles">{[["01", "Sabor", "Inspiración dominicana e internacional."], ["02", "Ambiente", "Un espacio para compartir y conversar."], ["03", "Celebración", "De una comida especial a una noche entre amigos."]].map(([n,t,d]) => <div key={n}><small>{n}</small><h3>{t}</h3><p>{d}</p></div>)}</div>
      <Button variant="textLink" onClick={() => scrollTo("platos")}>Descubre nuestra propuesta <ArrowRight /></Button>
    </div>
    <figure className="portrait-frame" data-reveal><img src={experienceImage} alt="Mesas, sillones y barra iluminada del salón de Carpe Diem RD" width={1440} height={960} loading="lazy" /></figure>
  </div></section>;
}

function SignatureDishes() {
  return <section id="platos" className="section dishes"><div className="section-shell"><div className="section-heading" data-reveal><div><p className="eyebrow">Desde la cocina</p><h2>Una experiencia que empieza <em>en la mesa.</em></h2></div><p>Sabores, texturas y combinaciones para compartir y disfrutar.</p></div>
    <div className="dish-feature" data-reveal><figure><img src={foodImage} alt="Pasta con vegetales y queso rallado servida en un plato azul" width={1600} height={1000} loading="lazy" /></figure><div><p className="eyebrow">Selección destacada</p><h3>Sabores de nuestra cocina</h3><p>De las pastas a los platos dominicanos e internacionales, una propuesta para saborear sin prisa.</p><Button variant="textLink" onClick={() => scrollTo("menu")}>Ver en el menú <ArrowRight /></Button></div></div>
    <div className="dish-list">{featureDishes.map(([name, category, description, price], i) => <article key={name} data-reveal><span>0{i + 1}</span><div><small>{category}</small><h3>{name}</h3><p>{description}</p><b className="dish-price">{price}</b></div><Button variant="iconOutline" size="icon" onClick={() => scrollTo("menu")} aria-label={`Ver ${name} en el menú`}><ArrowUpRight /></Button></article>)}</div>
  </div></section>;
}

function Experiences({ onEvent }: { onEvent: () => void }) {
  const items = [["Comida y encuentros", "Almuerzos, cenas, reuniones y ocasiones especiales.", a3], ["Terraza y lounge", "Gastronomía y buenos momentos en un ambiente cálido.", facadeSectionImage], ["Noches y celebraciones", "Música, ambiente nocturno y opciones de botella y mesa los fines de semana, según disponibilidad.", a2]];
  return <section className="section moods"><div className="section-shell"><div className="section-heading" data-reveal><div><p className="eyebrow">Los ambientes</p><h2>Un espacio. Distintas maneras de <em>disfrutar.</em></h2></div></div><div className="mood-grid">{items.map(([title, text, image], i) => <article key={title} data-reveal><div className="mood-image"><img src={image} alt={`${title} en Carpe Diem RD`} width={i === 0 ? 1200 : 1600} height={i === 0 ? 1600 : 1200} loading="lazy" /></div><small>0{i + 1}</small><h3>{title}</h3><p>{text}</p>{i === 2 && <Button variant="textLink" onClick={onEvent}>Consultar opciones <ArrowRight /></Button>}</article>)}</div><p className="fine-print">El ambiente y el volumen de la música pueden variar según el día y los eventos programados.</p></div></section>;
}

function MenuSection() {
  const [active, setActive] = useState("entradas"); const [search, setSearch] = useState(""); const [selected, setSelected] = useState<MenuItem | null>(null);
  const visible = useMemo(() => { const items = search ? menuCategories.flatMap(c => c.items) : (menuCategories.find(c => c.id === active)?.items ?? []); return items.filter(i => i.name.toLowerCase().includes(search.toLowerCase())); }, [active, search]);
  return <section id="menu" className="section menu-section"><div className="section-shell"><div className="menu-top" data-reveal><div><p className="eyebrow">Nuestra propuesta</p><h2>Descubre <em>el menú.</em></h2><p>De los sabores dominicanos a las propuestas internacionales, encuentra algo para cada ocasión.</p></div></div>
    <p className="menu-tax-note">Precios no incluyen impuestos.</p>
    <div className="menu-browser" data-reveal><div className="menu-tabs" role="tablist" aria-label="Categorías del menú">{menuCategories.map(cat => <button role="tab" aria-selected={active === cat.id} key={cat.id} onClick={() => { setActive(cat.id); setSearch(""); }}>{cat.label}</button>)}</div><label className="menu-search"><Search /><span className="sr-only">Buscar en el menú</span><Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar en el menú…" /></label><div className="menu-list">{visible.length ? visible.map((item, i) => <button key={`${item.name}-${i}`} onClick={() => setSelected(item)}><span><small>{String(i + 1).padStart(2,"0")}</small><strong>{item.name}</strong>{item.detail && <em>{item.detail}</em>}</span>{(item.price || item.bottle || item.glass) && <span className="prices">{item.price && <b>{item.price}</b>}{item.bottle && <b>Botella {item.bottle}</b>}{item.glass && <b>{item.glassLabel ?? "Trago"} {item.glass}</b>}</span>}<ArrowUpRight /></button>) : <p className="empty-menu">No encontramos productos con ese nombre.</p>}</div></div>
    <p className="menu-note">Precios en pesos dominicanos (RD$). Impuestos no incluidos. Precios y disponibilidad sujetos a cambios; confirma los vigentes con el establecimiento.</p>
    <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}><DialogContent className="dark-dialog"><DialogHeader><DialogTitle>{selected?.name}</DialogTitle><DialogDescription>{selected?.detail || "Consulta disponibilidad directamente con el establecimiento."}</DialogDescription></DialogHeader>{selected && <><p className="dialog-price">{selected.price ? selected.price : selected.bottle ? [selected.bottle && `Botella ${selected.bottle}`, selected.glass && `${selected.glassLabel ?? "Trago"} ${selected.glass}`].filter(Boolean).join(" · ") : "Precio disponible en el establecimiento."}</p><div className="dialog-actions"><a href={whatsappUrl(`Hola, Carpe Diem RD. Quisiera consultar sobre: ${selected.name}.`)} {...external}><Button variant="gold">Consultar por WhatsApp <MessageCircle /></Button></a></div></>}</DialogContent></Dialog>
  </div></section>;
}

function Events({ onEvent }: { onEvent: () => void }) {
  const types = ["Cumpleaños", "Celebraciones familiares", "Reuniones de amigos", "Encuentros corporativos", "After office", "Ocasiones especiales"];
  return <section id="eventos" className="events"><img src={a2} alt="Salón y barra de Carpe Diem RD con iluminación cálida" width={1440} height={960} loading="lazy" /><div className="events-shade"/><div className="events-content section-shell" data-reveal><p className="eyebrow">Eventos y celebraciones</p><h2>Los momentos especiales merecen <em>un lugar especial.</em></h2><p>Celebra tus ocasiones en Carpe Diem RD. Consulta las opciones disponibles para compartir con amigos, familiares o compañeros de trabajo.</p><div className="event-types">{types.map(t => <span key={t}>{t}</span>)}</div><p className="fine-print">Servicio de botella y mesas durante los fines de semana, sujeto a condiciones y disponibilidad.</p><Button variant="gold" size="lg" onClick={onEvent}>Consultar mi evento <ArrowUpRight /></Button></div></section>;
}

const gallery = [
  { category: "Ambiente", image: a3, alt: "Mesas y sillones del restaurante junto a la barra" },
  { category: "Gastronomía", image: a16, alt: "Bocados dorados con guarnición verde en un cuenco" },
  { category: "Ambiente", image: a15, alt: "Selección de botellas y vitrinas iluminadas de la barra" },
  { category: "Gastronomía", image: a17, alt: "Plato con aguacate, crema y flores comestibles" },
  { category: "Celebraciones", image: a2, alt: "Vista del salón y la barra con iluminación cálida" },
  { category: "Gastronomía", image: a7, alt: "Pasta con vegetales y queso rallado en un plato azul" },
  { category: "Ambiente", image: facadeSectionImage, alt: "Vista amplia del salón con mesas y asientos de Carpe Diem RD" },
  { category: "Gastronomía", image: a19, alt: "Plato cremoso servido en vajilla azul y decorado con una flor" },
  { category: "Gastronomía", image: a1, alt: "Plato gratinado con queso y flores comestibles" },
  { category: "Gastronomía", image: a21, alt: "Bruschetta con setas y hojas frescas" },
  { category: "Gastronomía", image: a14, alt: "Carne con vegetales y crema sobre plato artesanal" },
  { category: "Cócteles", image: a4, alt: "Bartender sirviendo un cóctel rosado en copa martini" },
  { category: "Cócteles", image: a5, alt: "Cóctel rosado decorado con flores en la barra" },
  { category: "Cócteles", image: a6, alt: "Cóctel ámbar en copa coupé con espuma" },
  { category: "Gastronomía", image: a18, alt: "Arroz con pollo, crema y flores comestibles" },
  { category: "Cócteles", image: a8, alt: "Cóctel cítrico decorado con flor deshidratada" },
  { category: "Cócteles", image: a9, alt: "Cóctel rojo en la barra con luces cálidas" },
  { category: "Cócteles", image: a10, alt: "Cóctel en capas servido en la barra" },
  { category: "Cócteles", image: a11, alt: "Cóctel tropical flameado con piña" },
  { category: "Cócteles", image: a12, alt: "Cóctel rosado escarchado en vaso alto" },
  { category: "Cócteles", image: a13, alt: "Cóctel amarillo en copa coupé" },
];

function Gallery() {
  const [filter, setFilter] = useState("Todos"); const [index, setIndex] = useState<number | null>(null);
  const images = gallery.filter(g => filter === "Todos" || g.category === filter);
  const move = (dir: number) => setIndex(current => current === null ? null : (current + dir + images.length) % images.length);
  const selectedImage = index === null ? undefined : images[index];
  return <section id="galeria" className="section gallery"><div className="section-shell"><div className="section-heading" data-reveal><div><p className="eyebrow">Una mirada al ambiente</p><h2>Carpe Diem <em>en imágenes.</em></h2></div><a href={business.instagram} {...external}><Button variant="textLink"><Instagram /> Síguenos en Instagram</Button></a></div><div className="gallery-filters" role="group" aria-label="Filtros de galería">{["Todos","Ambiente","Gastronomía","Cócteles","Celebraciones"].map(f => <button className={filter === f ? "active" : ""} key={f} onClick={() => setFilter(f)}>{f}</button>)}</div><div className="gallery-grid">{images.map((item, i) => <button key={`${item.category}-${i}`} onClick={() => setIndex(i)} data-reveal><img src={item.image} alt={item.alt} width={1600} height={1200} loading="lazy"/><span>{item.category} <ArrowUpRight /></span></button>)}</div></div>
    <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setIndex(null)}><DialogContent className="lightbox">{selectedImage && <><img src={selectedImage.image} alt={selectedImage.alt}/><p>{selectedImage.alt}</p><Button variant="iconGhost" size="icon" className="lightbox-prev" onClick={() => move(-1)} aria-label="Imagen anterior"><ArrowLeft /></Button><Button variant="iconGhost" size="icon" className="lightbox-next" onClick={() => move(1)} aria-label="Imagen siguiente"><ArrowRight /></Button></>}</DialogContent></Dialog>
  </section>;
}

type ModalKind = "reservation" | "event" | null;
function RequestDialog({ kind, onClose }: { kind: ModalKind; onClose: () => void }) {
  const [errors, setErrors] = useState<Record<string,string>>({});
  const isReservation = kind === "reservation";
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const data = new FormData(e.currentTarget); const required = isReservation ? ["name","phone","date","time","people"] : ["name","phone","type","date","people","description"]; const next: Record<string,string> = {};
    required.forEach(key => { if (!String(data.get(key) || "").trim()) next[key] = "Este campo es obligatorio."; });
    const date = String(data.get("date") || ""); const today = new Date().toISOString().slice(0,10); if (date && date < today) next["date"] = "Selecciona una fecha de hoy en adelante.";
    setErrors(next); if (Object.keys(next).length) return;
    const message = isReservation ? `Hola, Carpe Diem RD. Me gustaría consultar una reserva.\n\nNombre: ${data.get("name")}\nTeléfono: ${data.get("phone")}\nFecha: ${date}\nHora: ${data.get("time")}\nPersonas: ${data.get("people")}\nOcasión: ${data.get("occasion") || "No indicada"}\nComentarios: ${data.get("comments") || "Sin comentarios"}\n\n¿Podrían confirmar la disponibilidad? Gracias.` : `Hola, Carpe Diem RD. Quisiera solicitar información para un evento.\n\nNombre: ${data.get("name")}\nTeléfono: ${data.get("phone")}\nTipo de evento: ${data.get("type")}\nFecha estimada: ${date}\nInvitados aproximados: ${data.get("people")}\nDescripción: ${data.get("description")}\n\n¿Podrían compartir las opciones y condiciones disponibles? Gracias.`;
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }
  return <Dialog open={kind !== null} onOpenChange={(open) => !open && onClose()}><DialogContent className="request-dialog"><DialogHeader><p className="eyebrow">{isReservation ? "Tu próxima mesa" : "Tu próxima celebración"}</p><DialogTitle>{isReservation ? "Consultar una reserva" : "Consultar un evento"}</DialogTitle><DialogDescription>{isReservation ? "Tu solicitud se enviará por WhatsApp. La reserva quedará pendiente de confirmación por parte del establecimiento." : "Cuéntanos lo esencial. La solicitud se enviará por WhatsApp y estará sujeta a confirmación."}</DialogDescription></DialogHeader><form onSubmit={submit} noValidate>
    <div className="form-grid"><Field label="Nombre completo" error={errors["name"]}><Input name="name" autoComplete="name" aria-invalid={!!errors["name"]}/></Field><Field label="Teléfono" error={errors["phone"]}><Input name="phone" type="tel" autoComplete="tel" aria-invalid={!!errors["phone"]}/></Field>
    {isReservation ? <><Field label="Fecha deseada" error={errors["date"]}><Input name="date" type="date" min={new Date().toISOString().slice(0,10)}/></Field><Field label="Hora deseada" error={errors["time"]}><Input name="time" type="time"/></Field><Field label="Número de personas" error={errors["people"]}><Input name="people" type="number" min="1" inputMode="numeric"/></Field><Field label="Ocasión especial (opcional)"><Input name="occasion"/></Field><Field label="Comentarios (opcional)"><Textarea name="comments" rows={3}/></Field></> : <><Field label="Tipo de evento" error={errors["type"]}><Input name="type" placeholder="Ej. cumpleaños"/></Field><Field label="Fecha estimada" error={errors["date"]}><Input name="date" type="date" min={new Date().toISOString().slice(0,10)}/></Field><Field label="Invitados aproximados" error={errors["people"]}><Input name="people" type="number" min="1"/></Field><Field label="Descripción" error={errors["description"]}><Textarea name="description" rows={3}/></Field></>}</div><Button variant="gold" size="lg" type="submit">Enviar solicitud por WhatsApp <MessageCircle /></Button>
  </form></DialogContent></Dialog>;
}

function Reservation({ onReserve }: { onReserve: () => void }) {
  return <section id="reservas" className="reservation section"><div className="section-shell reservation-inner" data-reveal><div><p className="eyebrow">Tu mesa te espera</p><h2>Haz una pausa.<br/><em>Vive el momento.</em></h2></div><div><p>Cuéntanos cuándo quieres visitarnos. Enviaremos tu solicitud por WhatsApp para que el equipo confirme disponibilidad.</p><p className="consumption">Consumo orientativo · RD$1,000–RD$4,000 por persona</p><Button variant="dark" size="lg" onClick={onReserve}>Reservar mi mesa <ArrowUpRight /></Button></div></div></section>;
}

function Contact() {
  const [error, setError] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); const d = new FormData(e.currentTarget); if (!["name","email","message"].every(k => String(d.get(k)||"").trim())) { setError("Completa nombre, correo y mensaje."); return; } setError(""); window.open(whatsappUrl(`Hola, Carpe Diem RD. Quisiera hacer una consulta.\n\nNombre: ${d.get("name")}\nCorreo: ${d.get("email")}\nTeléfono: ${d.get("phone") || "No indicado"}\nMensaje: ${d.get("message")}`), "_blank", "noopener,noreferrer"); }
  return <section id="contacto" className="section contact"><div className="section-shell"><div className="section-heading" data-reveal><div><p className="eyebrow">Visítanos</p><h2>Nos encontramos en <em>Santo Domingo Este.</em></h2></div></div><div className="contact-grid"><div className="contact-details" data-reveal><h3>Carpe Diem RD</h3><p><MapPin /> Av. España #56<br/>Santo Domingo Este, Santo Domingo<br/>República Dominicana, 11501</p><a href={`tel:${business.phone.replace(/[^+\d]/g,"")}`}><Phone /> {business.phone}</a><a href={business.instagram} {...external}><Instagram /> @carpediem.rd</a><a href={business.instagramAlt} {...external}><Instagram /> @carpe_diemrd</a><div className="hours"><Clock3/><div><strong>Domingo a jueves</strong><span>10:00 a. m. – 2:00 a. m.</span><strong>Viernes y sábado</strong><span>10:00 a. m. – 3:00 a. m.</span></div></div><p className="fine-print">Los horarios pueden cambiar en días festivos o por eventos especiales.</p><a href={business.mapUrl} {...external}><Button variant="ivoryOutline">Cómo llegar <ArrowUpRight /></Button></a></div>
      <div className="map-wrap" data-reveal><iframe title="Mapa de Carpe Diem RD en Avenida España" src="https://www.google.com/maps?q=Carpe%20Diem%20RD%20Av.%20Espa%C3%B1a%2056%20Santo%20Domingo%20Este&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/></div>
      <form className="contact-form" onSubmit={submit} noValidate data-reveal><p className="eyebrow">Escríbenos</p><h3>¿En qué podemos ayudarte?</h3><Field label="Nombre"><Input name="name" autoComplete="name"/></Field><Field label="Correo electrónico"><Input name="email" type="email" autoComplete="email"/></Field><Field label="Teléfono (opcional)"><Input name="phone" type="tel"/></Field><Field label="Mensaje"><Textarea name="message" rows={4}/></Field>{error && <p className="form-error" role="alert">{error}</p>}<Button variant="gold" type="submit">Enviar por WhatsApp <MessageCircle /></Button><small>No almacenamos estos datos. La consulta se prepara para enviarse por WhatsApp.</small></form></div></div></section>;
}

function Footer({ onReserve }: { onReserve: () => void }) {
  return <footer><div className="section-shell footer-grid"><div className="footer-brand"><strong>CARPE DIEM</strong><span>RD</span><p>Vive el momento con estilo.</p></div><div><h3>Explora</h3>{navItems.slice(1).map(([label,id]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}</div><div><h3>Contacto</h3><a href={`tel:${business.phone.replace(/[^+\d]/g,"")}`}>{business.phone}</a><a href={business.instagram} {...external}>Instagram</a></div><div><h3>Horario</h3><p>Dom–Jue · 10 a. m.–2 a. m.<br/>Vie–Sáb · 10 a. m.–3 a. m.</p><Button variant="gold" onClick={onReserve}>Reservar</Button></div></div><div className="footer-bottom section-shell"><span>© {new Date().getFullYear()} Carpe Diem RD</span><span>Av. España #56 · Santo Domingo Este</span><button onClick={() => scrollTo("inicio")} aria-label="Volver arriba">Volver arriba <ChevronUp /></button></div></footer>;
}

export function CarpeDiemPage() {
  const [modal, setModal] = useState<ModalKind>(null); useReveal();
  return <><Header onReserve={() => setModal("reservation")}/><main><Hero onReserve={() => setModal("reservation")}/><Marquee/><Introduction/><SignatureDishes/><Experiences onEvent={() => setModal("event")}/><MenuSection/><Events onEvent={() => setModal("event")}/><Gallery/><Reservation onReserve={() => setModal("reservation")}/><Contact/></main><Footer onReserve={() => setModal("reservation")}/><a className="whatsapp-float" href={whatsappUrl("Hola, Carpe Diem RD. Quisiera hacer una consulta.")} aria-label="Consultar por WhatsApp" title="Consultar por WhatsApp" {...external}><MessageCircle/><span>WhatsApp</span></a><RequestDialog kind={modal} onClose={() => setModal(null)}/></>;
}