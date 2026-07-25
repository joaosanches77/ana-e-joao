import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import monogram from "@/assets/ja-monogram.png.asset.json";

export const Route = createFileRoute("/")({
  component: Wedding,
});

const NAV = [
  { id: "inicio", label: "Início" },
  { id: "localizacoes", label: "Localizações" },
  { id: "horario", label: "Horário" },
  { id: "rsvp", label: "Confirmação" },
  { id: "info", label: "Informações" },
  { id: "galeria", label: "Galeria" },
  { id: "contactos", label: "Contactos" },
];

const GALLERY = [
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6.png",
  "7.png",
  "8.png",
  "9.png",
];

const TIMELINE = [
  { time: "13h00", label: "Cerimónia", desc: "Igreja Nossa Senhora de Fátima" },
  { time: "14h30", label: "Receção", desc: "Chegada à Quinta da Quintã" },
  { time: "16h00", label: "Almoço", desc: "Momento gastronómico" },
  { time: "19h00", label: "Festa", desc: "Abertura da pista de dança" },
];

function Wedding() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen text-[color:var(--darkbrown)]">
      {/* NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[color:var(--timberwolf)]/95 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between">
          <button
            onClick={() => scrollTo("inicio")}
            className="flex items-center"
            aria-label="Início"
          >
            <img src="/logo.png" alt="JA" className="h-9 w-auto" />
          </button>
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] text-[color:var(--darkbrown)]">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="hover:text-[color:var(--rifle)] transition-colors"
              >
                {n.label}
              </button>
            ))}
          </nav>
          <button
            className="md:hidden p-2 text-[color:var(--darkbrown)]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <div className="w-6 h-[1.5px] bg-current mb-1.5" />
            <div className="w-6 h-[1.5px] bg-current mb-1.5" />
            <div className="w-4 h-[1.5px] bg-current" />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[color:var(--timberwolf)] border-t border-[color:var(--border)]">
            <div className="flex flex-col py-4 px-6">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  onClick={() => scrollTo(n.id)}
                  className="py-3 text-left text-xs uppercase tracking-[0.2em] border-b border-[color:var(--border)] last:border-0"
                >
                  {n.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center justify-center px-6 pt-24"
        style={{
          background:
            "linear-gradient(180deg, #DDDBD7 0%, #E8E5DE 60%, #DDDBD7 100%)",
        }}
      >
        {/* subtle botanical accent */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #53583E 0%, transparent 40%), radial-gradient(circle at 80% 70%, #593B1F 0%, transparent 40%)",
          }}
        />
        <div className="relative text-center reveal">
          {/* Monogram */}
          <div className="mx-auto mb-8 flex items-center justify-center">
            <img src="/logo.png" alt="Monograma JA" className="h-20 md:h-24 w-auto" />
          </div>

          <p className="uppercase text-xs tracking-[0.4em] text-[color:var(--rifle)] mb-6">
            Venha celebrar connosco
          </p>

          <h1 className="font-serif text-[15vw] md:text-[9rem] leading-[0.95] text-[color:var(--darkbrown)] font-light">
            <span className="italic">Ana</span>
            <span className="mx-4 md:mx-6 text-[color:var(--rifle)] font-serif">&amp;</span>
            <span className="italic">João</span>
          </h1>

          <div className="ornament my-10 max-w-md mx-auto">
            <span className="font-serif italic text-lg">04 · 09 · 2027</span>
          </div>

          <p className="uppercase text-xs tracking-[0.35em] text-[color:var(--darkbrown)]/80">
            Sábado · pelas 13h00
          </p>

          <button
            onClick={() => scrollTo("rsvp")}
            className="mt-12 inline-block px-10 py-4 bg-[color:var(--rifle)] text-white text-xs uppercase tracking-[0.3em] hover:bg-[color:var(--darkbrown)] transition-colors duration-500"
          >
            Confirmar Presença
          </button>
        </div>
      </section>

      {/* LOCALIZAÇÕES */}
      <section id="localizacoes" className="py-24 md:py-32 px-6 bg-[color:var(--timberwolf)]">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="Onde" title="Localizações" />
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <LocationCard
              tag="Cerimónia"
              title="Igreja N. Sra. de Fátima"
              address="Mamodeiro, Aveiro"
              mapSrc="https://www.google.com/maps?q=Igreja+Nossa+Senhora+de+Fatima+Mamodeiro&output=embed"
            />
            <LocationCard
              tag="Copo de Água"
              title="Quinta da Quintã"
              address="Mozelos, Santa Maria da Feira"
              mapSrc="https://www.google.com/maps?q=Quinta+da+Quinta+Mozelos&output=embed"
            />
          </div>
        </div>
      </section>

      {/* HORÁRIO */}
      <section id="horario" className="py-24 md:py-32 px-6 bg-[color:var(--background)]">
        <div className="mx-auto max-w-3xl">
          <SectionTitle eyebrow="O Dia" title="Horário" />
          <div className="relative mt-20">
            {/* vertical line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[color:var(--rifle)]/30" />
            <ul className="space-y-16">
              {TIMELINE.map((item, i) => (
                <li
                  key={item.time}
                  className={`reveal relative grid grid-cols-2 gap-8 items-center ${
                    i % 2 === 0 ? "" : ""
                  }`}
                >
                  <div className={`${i % 2 === 0 ? "text-right pr-8" : "col-start-2 pl-8"}`}>
                    <p className="font-serif text-3xl italic text-[color:var(--rifle)]">
                      {item.time}
                    </p>
                  </div>
                  <div className={`${i % 2 === 0 ? "pl-8" : "col-start-1 row-start-1 text-right pr-8"}`}>
                    <p className="font-serif text-2xl text-[color:var(--darkbrown)]">
                      {item.label}
                    </p>
                    <p className="text-sm text-[color:var(--darkbrown)]/70 mt-1">
                      {item.desc}
                    </p>
                  </div>
                  {/* dot */}
                  <span className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[color:var(--rifle)] ring-4 ring-[color:var(--background)]" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CONFIRMAÇÃO */}
      <section
        id="rsvp"
        className="py-24 md:py-32 px-6 bg-[color:var(--timberwolf)]"
      >
        <div className="mx-auto max-w-2xl text-center">
          <SectionTitle eyebrow="Presença" title="Confirmação" />
          <p className="mt-6 text-[color:var(--darkbrown)]/85 font-light">
            Agradecemos a sua confirmação até ao dia 04 de Junho de 2027.
          </p>

          <form
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
            className="mt-12 grid gap-5 text-left reveal"
          >
            <Field label="Nome completo" name="nome" type="text" required />
            <Field
              label="Nº de adultos e crianças"
              name="convidados"
              type="text"
              placeholder="Ex: 2 adultos, 1 criança"
              required
            />
            <div>
              <label className="block text-xs uppercase tracking-[0.25em] text-[color:var(--darkbrown)] mb-2">
                Alergias ou restrições alimentares
              </label>
              <textarea
                name="alergias"
                rows={4}
                className="w-full bg-white/70 border border-[color:var(--darkbrown)]/20 px-4 py-3 text-[color:var(--darkbrown)] focus:outline-none focus:border-[color:var(--rifle)] transition-colors font-sans text-sm"
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-10 py-4 bg-[color:var(--rifle)] text-white text-xs uppercase tracking-[0.3em] hover:bg-[color:var(--darkbrown)] transition-colors duration-500 justify-self-center"
            >
              Confirmar
            </button>
          </form>
        </div>
      </section>

      {/* INFO */}
      <section id="info" className="py-24 md:py-32 px-6 bg-[color:var(--timberwolf)]">
        <div className="mx-auto max-w-5xl">
          <SectionTitle eyebrow="Notas" title="Informações Úteis" />
          <div className="grid md:grid-cols-2 gap-10 mt-16">
            <InfoBlock title="Estacionamento">
              <p>
                Há facilidade de estacionamento nas imediações da Igreja de Mamodeiro. A
                Quinta da Quintã dispõe de parque privativo para os convidados.
              </p>
            </InfoBlock>
            <InfoBlock title="Alojamento">
              <ul className="space-y-4">
                <HotelItem name="Hotel Feira Pedra Bela" note="A 15 min da Quinta" />
                <HotelItem name="Hotel Afonso V & SPA" note="Centro de Aveiro" />
              </ul>
            </InfoBlock>
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section id="galeria" className="py-24 md:py-32 px-6 bg-[color:var(--background)]">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="Memórias" title="A Nossa Galeria" />
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {GALLERY.map((src, i) => (
              <div
                key={src}
                className={`reveal overflow-hidden bg-[color:var(--grullo)] ${
                  i === 0 || i === 4 ? "row-span-2 aspect-[3/4]" : "aspect-square"
                }`}
              >
                <img
                  src={src}
                  alt={`Momento ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1500ms]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER / CONTACTOS */}
      <footer
        id="contactos"
        className="py-20 px-6 text-center"
        style={{ backgroundColor: "var(--rifle)", color: "#F5F3EF" }}
      >
        <div className="mx-auto max-w-2xl">
          <div className="mx-auto mb-6 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Monograma JA"
              className="h-16 w-auto"
              style={{ filter: "brightness(0) invert(1)", opacity: 0.9 }}
            />
          </div>
          <p className="uppercase text-xs tracking-[0.4em] opacity-80">Dúvidas?</p>
          <h3 className="font-serif text-4xl md:text-5xl italic mt-4">Fale connosco</h3>
          <div className="mt-8 font-serif text-lg space-y-2">
            <p>
              <span className="opacity-70 text-sm uppercase tracking-widest not-italic font-sans mr-3">
                Noiva
              </span>
              915 180 985
            </p>
            <p>
              <span className="opacity-70 text-sm uppercase tracking-widest not-italic font-sans mr-3">
                Noivo
              </span>
              968 722 961
            </p>
          </div>
          <div className="mt-14 pt-8 border-t border-white/20 text-xs uppercase tracking-[0.35em] opacity-70">
            Ana &amp; João · 2027
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  light = false,
}: {
  eyebrow: string;
  title: string;
  light?: boolean;
}) {
  return (
    <div className="text-center reveal">
      <p
        className={`uppercase text-xs tracking-[0.4em] ${
          light ? "text-[color:var(--darkbrown)]/80" : "text-[color:var(--rifle)]"
        }`}
      >
        {eyebrow}
      </p>
      <h2 className="font-serif italic text-5xl md:text-6xl mt-4 text-[color:var(--darkbrown)]">
        {title}
      </h2>
      <div className="mt-6 mx-auto w-16 h-px bg-[color:var(--rifle)]/50" />
    </div>
  );
}

function LocationCard({
  tag,
  title,
  address,
  mapSrc,
}: {
  tag: string;
  title: string;
  address: string;
  mapSrc: string;
}) {
  return (
    <article className="reveal bg-white shadow-sm overflow-hidden">
      <div className="aspect-[4/3] bg-[color:var(--grullo)]/40">
        <iframe
          src={mapSrc}
          title={title}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="p-8 text-center">
        <p className="uppercase text-[10px] tracking-[0.35em] text-[color:var(--rifle)]">
          {tag}
        </p>
        <h3 className="font-serif italic text-3xl mt-3 text-[color:var(--darkbrown)]">
          {title}
        </h3>
        <p className="mt-3 text-sm text-[color:var(--darkbrown)]/70">{address}</p>
      </div>
    </article>
  );
}

function Field({
  label,
  name,
  type,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.25em] text-[color:var(--darkbrown)] mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full bg-white/70 border border-[color:var(--darkbrown)]/20 px-4 py-3 text-[color:var(--darkbrown)] focus:outline-none focus:border-[color:var(--rifle)] transition-colors font-sans text-sm"
      />
    </div>
  );
}

function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="reveal bg-white/60 p-10 border border-[color:var(--rifle)]/10">
      <h3 className="font-serif italic text-3xl text-[color:var(--rifle)]">{title}</h3>
      <div className="mt-5 w-10 h-px bg-[color:var(--rifle)]/40" />
      <div className="mt-6 text-[color:var(--darkbrown)]/85 leading-relaxed text-sm">
        {children}
      </div>
    </div>
  );
}

function HotelItem({ name, note }: { name: string; note: string }) {
  return (
    <li className="flex items-start gap-4 pb-4 border-b border-[color:var(--darkbrown)]/10 last:border-0">
      <div className="w-14 h-14 shrink-0 bg-[color:var(--grullo)]/60 flex items-center justify-center">
        <span className="font-serif italic text-[color:var(--rifle)] text-lg">H</span>
      </div>
      <div className="min-w-0">
        <p className="font-serif text-xl text-[color:var(--darkbrown)]">{name}</p>
        <p className="text-xs uppercase tracking-widest text-[color:var(--darkbrown)]/60 mt-1">
          {note}
        </p>
      </div>
    </li>
  );
}
