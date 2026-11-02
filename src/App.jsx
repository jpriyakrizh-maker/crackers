import { useEffect, useRef, useState } from "react";
import "./App.css";
import { IMG } from "./images.js";

const DIWALI = new Date("2026-11-08T00:00:00+05:30");
const WHATSAPP = "919999999999";
const SHOP = "Happy Crackers";

const PRODUCTS = [
  { id: 1, name: "Kids Safe Box", cat: "Combos", was: 599, now: 399, bang: 1, info: "Sparklers, pencil, flowerpots, chakra" },
  { id: 2, name: "Family Pack", cat: "Combos", was: 1499, now: 999, bang: 3, info: "Garland, rockets, fountains, sparklers" },
  { id: 3, name: "Sky Shot Mega Box", cat: "Combos", was: 2999, now: 1999, bang: 5, info: "Multi-shot aerials and fancy skyshots" },
  { id: 4, name: "Colour Sparklers (10 pcs)", cat: "Sparklers", was: 120, now: 90, bang: 1, info: "Long burn, 3 colours" },
  { id: 5, name: "Gold Sparklers (5 pcs)", cat: "Sparklers", was: 60, now: 45, bang: 1, info: "Classic gold sparkle" },
  { id: 6, name: "Flowerpot Deluxe (10 pcs)", cat: "Ground", was: 350, now: 260, bang: 2, info: "Tall fountain of light" },
  { id: 7, name: "Ground Chakra (10 pcs)", cat: "Ground", was: 180, now: 135, bang: 2, info: "Spinning wheels of sparks" },
  { id: 8, name: "Rocket Pack (5 pcs)", cat: "Sky", was: 250, now: 190, bang: 4, info: "Whistle and burst" },
  { id: 9, name: "Fancy 7-Shot", cat: "Sky", was: 450, now: 330, bang: 4, info: "Seven colour bursts" },
  { id: 10, name: "Fancy 30-Shot", cat: "Sky", was: 1200, now: 880, bang: 5, info: "Loud and bright aerial" },
  { id: 11, name: "Snake Tablets (box)", cat: "Kids", was: 40, now: 30, bang: 1, info: "No sound, no spark" },
  { id: 12, name: "Pop Pop Boxes (50 pcs)", cat: "Kids", was: 90, now: 70, bang: 1, info: "Tiny pops, safe for little ones" },
];
const TABS = ["All", "Combos", "Kids", "Sparklers", "Ground", "Sky"];
const TAB_COLOR = { Combos: "#8c1d3f", Kids: "#1f7a5c", Sparklers: "#c98a1b", Ground: "#3d4fb5", Sky: "#0e1330" };
const OFFERS = [
  { code: "DIWALI5", title: "Extra 5% off", text: "On every order, on top of sale prices." },
  { code: "FREESHIP", title: "Free delivery", text: "On orders above ₹1,500 within the city." },
  { code: "BUY3GET1", title: "Buy 3, get 1 free", text: "On any sparkler or kids item." },
];
const WHY = [
  ["Green crackers", "Lower smoke, permitted sound levels."],
  ["Sealed boxes", "Packed fresh, never opened."],
  ["Fair prices", "Printed price and sale price shown clearly."],
  ["Quick pickup", "Order today, collect in 2 hours."],
];
const REVIEWS = [
  ["Every box was sealed and the Family Pack was great value.", "Anesh K."],
  ["Kids Safe Box kept my children busy all evening.", "Sandy S."],
  ["Ordered on WhatsApp, picked up in an hour.", "Saro J."],
];
const FAQ = [
  ["How do I place an order?", "Add items to your list and tap Order on WhatsApp. We confirm the total and pickup time."],
  ["Do you deliver?", "Yes, free above ₹1,500 inside the city. Below that, a small delivery charge applies."],
  ["Can I return crackers?", "Unopened sealed boxes can be exchanged within 2 days of purchase."],
  ["Are these safe for kids?", "Our Kids range has no loud sound. Children must always burst crackers with an adult."],
];

function Img({ src, alt = "", className }) {
  const [bad, setBad] = useState(false);
  if (!src || bad) return null;
  return <img className={className} src={src} alt={alt} loading="lazy" onError={() => setBad(true)} />;
}

function useCountdown() {
  const calc = () => {
    const d = Math.max(0, DIWALI - new Date());
    return [Math.floor(d / 864e5), Math.floor(d / 36e5) % 24, Math.floor(d / 6e4) % 60, Math.floor(d / 1e3) % 60];
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

const PAPER = ["#e8b04a", "#ff5d73", "#ff9f1c", "#f7f7ff", "#2ec4b6", "#c77dff", "#ff3d81"];

function Sky({ burstRef }) {
  const cv = useRef(null);
  useEffect(() => {
    const c = cv.current, ctx = c.getContext("2d");
    let parts = [], raf, t = 0;
    const size = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    size(); window.addEventListener("resize", size);
    // paper blast: mode "left" / "right" = party popper from the bottom corner, otherwise a pop at x, y
    burstRef.current = (x, y, mode) => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const n = mode ? 130 : 70;
      for (let i = 0; i < n; i++) {
        let a, sp;
        if (mode === "left") { a = -Math.PI / 2 + 0.15 + (Math.random() - 0.5) * 0.9; sp = 9 + Math.random() * 11; }
        else if (mode === "right") { a = -Math.PI / 2 - 0.15 + (Math.random() - 0.5) * 0.9; sp = 9 + Math.random() * 11; }
        else { a = Math.random() * 6.28; sp = 2 + Math.random() * 7; }
        parts.push({
          x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, w: 6 + Math.random() * 7, h: 3 + Math.random() * 5,
          rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.4, ph: Math.random() * 6.28,
          col: PAPER[Math.floor(Math.random() * PAPER.length)], life: 1,
        });
      }
    };
    const loop = () => {
      t += 0.05;
      ctx.clearRect(0, 0, c.width, c.height);
      parts = parts.filter((p) => p.life > 0 && p.y < c.height + 30);
      for (const p of parts) {
        p.vy += 0.14; p.vx *= 0.985; p.vy *= 0.985;
        p.x += p.vx + Math.sin(t + p.ph) * 0.6; p.y += p.vy; p.rot += p.vr; p.life -= 0.0035;
        ctx.save();
        ctx.globalAlpha = Math.min(1, p.life * 3);
        ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.scale(1, Math.cos(t * 2 + p.ph));
        ctx.fillStyle = p.col; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", size); };
  }, []);
  return <canvas ref={cv} className="sky" aria-hidden="true" />;
}

export default function App() {
  const burstRef = useRef(() => {});
  const [cart, setCart] = useState({});
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("popular");
  const [code, setCode] = useState("");
  const [d, h, m, s] = useCountdown();

  useEffect(() => {
    const t = [450, 1100].map((ms) => setTimeout(() => {
      const el = document.querySelector(".hero");
      if (!el) return;
      burstRef.current(0, el.offsetHeight, "left");
      burstRef.current(el.offsetWidth, el.offsetHeight, "right");
    }, ms));
    return () => t.forEach(clearTimeout);
  }, []);

  const change = (id, n) => setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] || 0) + n) }));
  const lines = PRODUCTS.filter((p) => cart[p.id]);
  const count = lines.reduce((t, p) => t + cart[p.id], 0);
  const sub = lines.reduce((t, p) => t + p.now * cart[p.id], 0);
  const disc = code.trim().toUpperCase() === "DIWALI5" ? Math.round(sub * 0.05) : 0;
  const ship = sub === 0 || sub >= 1500 ? 0 : 60;
  const total = sub - disc + ship;
  const msg = encodeURIComponent(
    `Hello ${SHOP}, I would like to order:\n` + lines.map((p) => `${cart[p.id]} x ${p.name}`).join("\n") +
    `\nTotal: ₹${total}${disc ? " (code DIWALI5)" : ""}`
  );
  let shown = PRODUCTS.filter((p) => (tab === "All" || p.cat === tab) && p.name.toLowerCase().includes(q.toLowerCase()));
  if (sort === "low") shown = [...shown].sort((a, b) => a.now - b.now);
  if (sort === "high") shown = [...shown].sort((a, b) => b.now - a.now);
  if (sort === "off") shown = [...shown].sort((a, b) => b.was / b.now - a.was / a.now);

  return (
    <>
      <div className="announce"><marquee>Diwali sale: up to 33% off · Free delivery above ₹1,500 · Use code DIWALI5 for 5% extra</marquee></div>
      <header className="nav">
        <a href="#top" className="logo"><svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1l2.2 7.3L22 6l-5.5 5.7L23 15l-7.7-.5L12 23l-3.3-8.5L1 15l6.5-3.3L2 6l7.8 2.3z" fill="#e8b04a" /></svg>{SHOP}</a>
        <nav className="links" aria-label="Main">
          <a href="#offers">Offers</a><a href="#products">Shop</a><a href="#why">Why us</a><a href="#faq">FAQ</a><a href="#contact">Contact</a>
        </nav>
        <button className="cartbtn" onClick={() => setOpen(true)}>Cart <span>{count}</span></button>
      </header>

      <section id="top" className="hero" onClick={(e) => { if (e.target.closest("a,button")) return; const r = e.currentTarget.getBoundingClientRect(); burstRef.current(e.clientX - r.left, e.clientY - r.top); }}>
        <Img className="herobg" src="https://www.fnp.com/images/pr/x/v20220926163733/diwali-special-choco-crackers_1.jpg" />
        <div className="shade" />
        <Sky burstRef={burstRef} />
        <div className="wrap herogrid">
          <div>
            <p className="kicker">Diwali 2026 collection</p>
            <h1>Celebrate Diwali with safer, brighter crackers</h1>
            <p className="lead">Green crackers, sealed fresh and priced for the festival. Order online, pick up in two hours or get free delivery on bigger orders.</p>
            <div className="row">
              <a className="btn primary" href="#products">Shop crackers</a>
              <a className="btn" href="#offers">See offers</a>
            </div>
            <ul className="facts"><li><b>33%</b> max discount</li><li><b>₹1,500+</b> free delivery</li><li><b>2 hrs</b> store pickup</li></ul>
          </div>
          <div className="herocard">
            <Img className="himg" src={IMG.heroCard} alt="Diwali crackers" />
            <div className="timer">
              <span>Diwali in</span>
              {[["d", d], ["h", h], ["m", m], ["s", s]].map(([l, v]) => <b key={l}>{String(v).padStart(2, "0")}<i>{l}</i></b>)}
            </div>
          </div>
        </div>
      </section>

      <section className="wrap" id="offers">
        <h2>Festival offers</h2>
        <div className="grid offers">
          {OFFERS.map((o, i) => (
            <article key={o.code} className="offer">
              <div className="oimg"><Img src={IMG.offers[i]} alt={o.title} /></div>
              <div className="obody"><h3>{o.title}</h3><p>{o.text}</p>
              <button onClick={() => { setCode(o.code); setOpen(true); }}>Apply {o.code}</button></div>
            </article>
          ))}
        </div>
      </section>

      <section className="banner">
        <Img className="bgimg" src={IMG.banner} />
        <div className="shade wine" />
        <div className="wrap bcontent">
          <h2>Festival combo boxes from ₹399</h2>
          <p>Ready-packed boxes for kids, families and sky shows. Pick one and you are set for Diwali night.</p>
          <a className="btn primary" href="#products" onClick={() => setTab("Combos")}>View combo boxes</a>
        </div>
      </section>

      <section className="wrap tight" id="products">
        <div className="shophead">
          <h2>Shop crackers</h2>
          <div className="tools">
            <input type="search" placeholder="Search crackers" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search crackers" />
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
              <option value="popular">Popular</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="off">Biggest discount</option>
            </select>
          </div>
        </div>
        <div className="tabs" role="tablist">
          {TABS.map((t) => <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? "on" : ""} onClick={() => setTab(t)}>{t}</button>)}
        </div>
        {shown.length === 0 && <p className="empty">No crackers match your search. Try another name or category.</p>}
        <div className="grid products">
          {shown.map((p) => (
            <article key={p.id} className="card">
              <div className="thumb" style={{ background: `linear-gradient(135deg, ${TAB_COLOR[p.cat]}, #0e1330)` }}>
                <Img className="pimg" src={IMG.product(p.id)} alt={p.name} />
                <span className="badge">{Math.round(100 - (p.now / p.was) * 100)}% off</span>
                <svg viewBox="0 0 24 24" width="56" height="56" aria-hidden="true"><path d="M12 1l2.2 7.3L22 6l-5.5 5.7L23 15l-7.7-.5L12 23l-3.3-8.5L1 15l6.5-3.3L2 6l7.8 2.3z" fill="#e8b04a" opacity=".9" /></svg>
              </div>
              <div className="body">
                <p className="cat">{p.cat}</p>
                <h3>{p.name}</h3>
                <p className="info">{p.info}</p>
                <p className="meter" aria-label={`Sound level ${p.bang} of 5`}>Sound {[1, 2, 3, 4, 5].map((n) => <i key={n} className={n <= p.bang ? "on" : ""} />)}</p>
                <div className="buy">
                  <p className="price"><b>₹{p.now}</b><s>₹{p.was}</s></p>
                  {cart[p.id] ? (
                    <div className="qty"><button onClick={() => change(p.id, -1)} aria-label="Remove one">−</button><span>{cart[p.id]}</span><button onClick={() => change(p.id, 1)} aria-label="Add one">+</button></div>
                  ) : (
                    <button className="add" onClick={() => change(p.id, 1)}>Add</button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="why" id="why">
        <div className="wrap">
          <h2>Why {SHOP}</h2>
          <div className="grid">{WHY.map(([t, x], i) => <article key={t}><div className="wimg"><Img src={IMG.why[i]} alt={t} /></div><div className="wbody"><h3>{t}</h3><p>{x}</p></div></article>)}</div>
        </div>
      </section>

      <section className="wrap">
        <h2>How ordering works</h2>
        <ol className="steps">
          <li><b>Build your cart</b><span>Add crackers and apply a sale code.</span></li>
          <li><b>Send on WhatsApp</b><span>We confirm stock and your total.</span></li>
          <li><b>Pick up or delivery</b><span>Collect in two hours or get it delivered.</span></li>
        </ol>
      </section>

      <section className="wrap tight">
        <h2>Customer reviews</h2>
        <div className="grid">{REVIEWS.map(([t, n], i) => <blockquote key={n}><p>{t}</p><footer><span className="av">{n[0]}<Img src={IMG.people[i]} alt={n} /></span>{n}</footer></blockquote>)}</div>
      </section>

      <section className="wrap faq" id="faq">
        <h2>Frequently asked questions</h2>
        {FAQ.map(([a, b]) => <details key={a}><summary>{a}</summary><p>{b}</p></details>)}
      </section>

      <footer className="foot" id="contact">
        <Img className="bgimg" src={IMG.footer} />
        <div className="shade" />
        <div className="wrap cols">
          <div><h3>{SHOP}</h3><p>Safe, green crackers for every home. Sale runs till Diwali.</p></div>
          <div><h3>Visit</h3><p>12,STR MainRoad, Cumbum</p><p>Open daily 9 AM – 9 PM</p></div>
          <div><h3>Contact</h3><p>+91 99999 99999</p><a href={`https://wa.me/${WHATSAPP}`}>Chat on WhatsApp</a></div>
          <div><h3>Explore</h3><a href="#offers">Offers</a><a href="#products">Shop</a><a href="#faq">FAQ</a></div>
        </div>
        <p className="safe">Please burst crackers outdoors, in permitted hours, with an adult nearby and water ready.</p>
       <p className="safe">Happy Diwali-2026🪔🧨✨🎆❤️</p>


      </footer>

      {open && <div className="scrim" onClick={() => setOpen(false)} />}
      <aside className={"drawer" + (open ? " open" : "")} aria-label="Cart" aria-hidden={!open}>
        <div className="dhead"><h3>Your cart ({count})</h3><button onClick={() => setOpen(false)} aria-label="Close cart">×</button></div>
        <div className="dlines">
          {lines.length === 0 && <p className="empty">Your cart is empty. Add crackers to get started.</p>}
          {lines.map((p) => (
            <div key={p.id} className="dline">
              <div><b>{p.name}</b><span>₹{p.now} each</span></div>
              <div className="qty"><button onClick={() => change(p.id, -1)} aria-label="Remove one">−</button><span>{cart[p.id]}</span><button onClick={() => change(p.id, 1)} aria-label="Add one">+</button></div>
            </div>
          ))}
        </div>
        <div className="dfoot">
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Sale code" aria-label="Sale code" />
          <p><span>Subtotal</span><span>₹{sub}</span></p>
          {disc > 0 && <p><span>Code DIWALI5</span><span>−₹{disc}</span></p>}
          <p><span>Delivery</span><span>{ship ? `₹${ship}` : "Free"}</span></p>
          <p className="tot"><span>Total</span><span>₹{total}</span></p>
          <a className={"btn primary" + (count ? "" : " off")} href={count ? `https://wa.me/${WHATSAPP}?text=${msg}` : undefined} target="_blank" rel="noreferrer">Order on WhatsApp</a>
        </div>
      </aside>
    </>
  );
}
