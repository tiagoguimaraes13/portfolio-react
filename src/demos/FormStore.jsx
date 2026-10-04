import "./more-demos.css";
import { useDemoLanguage, DemoLanguageSwitcher } from "../i18n/DemoLanguage";
import React, { useEffect, useState } from "react";
import collection from "../assets/homeware-collection.webp";
const products = [{
  id: "lamp",
  name: "Soft light lamp",
  category: "Lighting",
  price: 8900,
  variants: ["Natural linen", "Warm sand"],
  description: "A ceramic base and soft linen shade, for a little warmth in your favourite corner."
}, {
  id: "vase",
  name: "Everyday vase",
  category: "Ceramics",
  price: 3200,
  variants: ["Sage", "Chalk"],
  description: "A simple ceramic shape for a few stems, a branch or a shelf of its own."
}, {
  id: "mug",
  name: "Morning mug",
  category: "Ceramics",
  price: 1800,
  variants: ["Terracotta", "Cream"],
  description: "A tactile everyday mug for your first coffee and your last cup of tea."
}, {
  id: "throw",
  name: "Slow Sunday throw",
  category: "Textiles",
  price: 5900,
  variants: ["Oat", "Stone"],
  description: "An easy layer of texture for the sofa, the reading chair or a quiet Sunday."
}, {
  id: "tray",
  name: "Gather serving tray",
  category: "Living",
  price: 4200,
  variants: ["Natural oak", "Smoked oak"],
  description: "A warm wooden tray for bringing a little order to the everyday."
}];

const formatMoney = (cents, language) => new Intl.NumberFormat(language, {
  style: "currency",
  currency: "EUR"
}).format(cents / 100);

export default function FormStore() {
  const {
    tr,
    language
  } = useDemoLanguage();

  const money = cents => formatMoney(cents, language);

  const [filter, setFilter] = useState("All");
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("shop");
  const [variants, setVariants] = useState({});
  const [sort, setSort] = useState("featured");
  const [notice, setNotice] = useState("");
  const [order, setOrder] = useState(null);
  useEffect(() => {
    document.title = tr('FORM & FIELD — Online store concept | TOIMU');
  }, [language, tr]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const count = cart.reduce((a, l) => a + l.qty, 0);
  const subtotal = cart.reduce((a, l) => a + l.price * l.qty, 0);
  const delivery = subtotal === 0 || subtotal >= 10000 ? 0 : 500;
  const total = subtotal + delivery;

  function show(next) {
    setView(next);
    setNotice("");
    window.scrollTo(0, 0);
  }

  function add(p) {
    const variant = variants[p.id] || p.variants[0];
    setCart(c => {
      const found = c.find(l => l.id === p.id && l.variant === variant);
      return found ? c.map(l => l === found ? { ...l,
        qty: Math.min(l.qty + 1, 10)
      } : l) : [...c, { ...p,
        variant,
        qty: 1
      }];
    });
    setNotice({
      name: p.name,
      variant
    });
  }

  function quantity(key, qty) {
    setCart(c => c.map(l => `${l.id}:${l.variant}` === key ? { ...l,
      qty: Math.max(1, Math.min(10, qty))
    } : l));
  }

  function checkout(e) {
    e.preventDefault();

    if (!cart.length) {
      show("cart");
      return;
    }

    const d = new FormData(e.currentTarget);
    setOrder({
      name: d.get("name").trim(),
      lines: cart.map(l => ({ ...l
      })),
      subtotal,
      delivery,
      total
    });
    setCart([]);
    setView("confirmation");
    window.scrollTo(0, 0);
  }

  const visible = products.filter(p => filter === "All" || p.category === filter).slice().sort((a, b) => sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : 0);
  const totals = <dl className="store-totals">
      <dt>{tr("Subtotal")}</dt>
      <dd>{money(subtotal)}</dd>
      <dt>{tr("Demo delivery")}</dt>
      <dd>{delivery ? money(delivery) : tr("Free")}</dd>
      <dt>{tr("Total")}</dt>
      <dd>{money(total)}</dd>
    </dl>;
  return <div className="store-site">
      <div className="demo-strip">
        <a href="#work">{tr("Back to TOIMU Technologies")}</a>
        <span>{tr("Concept store \xB7 No payments \xB7 No real orders")}</span>
      </div>
      <header className="store-header">
      <DemoLanguageSwitcher />
        <button className="store-logo" onClick={() => show("shop")}>
          FORM <i>&</i> FIELD
        </button>
        <nav aria-label={tr("Store navigation")}>
          <button onClick={() => {
          show("shop");
          setFilter("All");
        }}>{tr("The collection")}</button>
          <button onClick={() => show("cart")}>{tr("Bag")} ({count})</button>
        </nav>
      </header>
      <main>
        {view === "shop" ? <>
            <section className="store-hero">
              <div>
                <p className="demo-kicker">{tr("Good things, for everyday living.")}</p>
                <h1>{tr("A softer")}<br />{tr("kind of home.")}</h1>
                <p>{tr("Considered pieces. Natural textures.")}<br />{tr("Little things that make a space your own.")}</p>
                <button className="store-button" onClick={() => document.getElementById("store-products").scrollIntoView({
              behavior: "smooth"
            })}>{tr("Explore the collection")}</button>
              </div>
              <img src={collection} alt={tr("Illustrative homeware collection: lamp, vase, mug, linen throw and wooden tray")} />
            </section>
            <section id="store-products" className="store-products">
              <div className="store-collection-heading">
                <div>
                  <p className="demo-kicker">{tr("The collection")}</p>
                  <h2>{tr("Everyday favourites.")}</h2>
                </div>
                <label>{tr("Sort by")}<select value={sort} onChange={e => setSort(e.target.value)}>
                    <option value="featured">{tr("Featured")}</option>
                    <option value="low">{tr("Price: low to high")}</option>
                    <option value="high">{tr("Price: high to low")}</option>
                  </select>
                </label>
              </div>
              <div className="store-filters" role="group" aria-label={tr("Product categories")}>
                {["All", "Lighting", "Ceramics", "Textiles", "Living"].map(f => {
              return <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f}>
                      {tr(f)}
                    </button>;
            })}
              </div>
              <p className="store-caption">{tr("Fictional products and illustrative collection photography. Colours are example options.")}</p>
              <p className="store-notice" role="status">
                {notice && tr("{product} · {finish} added to your bag.", {
              product: tr(notice.name),
              finish: tr(notice.variant)
            })}
              </p>
              <div className="store-grid">
                {visible.map((p, i) => {
              return <article key={p.id} className="store-product">
                    <div className={`store-product-image store-product-${p.id}`}>
                      <img src={collection} alt={tr("{product} — illustrative collection photograph", {
                    product: tr(p.name)
                  })} loading="lazy" />
                      <span>{tr(p.category)}</span>
                    </div>
                    <div className="store-product-title">
                      <h3>{tr(p.name)}</h3>
                      <span>{money(p.price)}</span>
                    </div>
                    <p>{tr(p.description)}</p>
                    <label htmlFor={`variant-${p.id}`}>{tr("Finish")}<select id={`variant-${p.id}`} value={variants[p.id] || p.variants[0]} onChange={e => setVariants({ ...variants,
                    [p.id]: e.target.value
                  })}>
                        {p.variants.map(v => {
                      return <option key={v} value={v}>{tr(v)}</option>;
                    })}
                      </select>
                    </label>
                    <button className="store-button" onClick={() => add(p)}>{tr("Add")}{" "}{language === "en" ? p.name.toLowerCase() : tr(p.name)}{" "}{tr("to bag")}</button>
                  </article>;
            })}
              </div>
            </section>
            <section className="store-story">
              <p className="demo-kicker">{tr("Less noise. More home.")}</p>
              <h2>{tr("Make room for")}<br />{tr("the things you love.")}</h2>
              <p>{tr("A fictional lifestyle shop, designed to demonstrate an inviting shopping experience from browsing to checkout.")}</p>
              <a href="#contact">{tr("Let\u2019s build your online store")}</a>
            </section>
          </> : null}
        {view === "cart" && <section className="store-cart store-page">
            <p className="demo-kicker">{tr("Your collection")}</p>
            <h1>{tr("Your bag.")}</h1>
            {cart.length ? <div className="store-cart-layout">
                <div>
                  {cart.map(l => {
              const key = `${l.id}:${l.variant}`;
              return <article className="store-cart-line" key={key}>
                        <div>
                          <h2>{tr(l.name)}</h2>
                          <p>
                            {tr(l.variant)} · {money(l.price)}{" "}{tr("each")}</p>
                          <label>{tr("Quantity for")}{" "}{tr(l.name)}, {tr(l.variant)}
                            <select aria-label={tr("Quantity for {product}, {finish}", {
                      product: tr(l.name),
                      finish: tr(l.variant)
                    })} value={l.qty} onChange={e => quantity(key, Number(e.target.value))}>
                              {Array.from({
                        length: 10
                      }, (_, i) => {
                        return <option key={i + 1} value={i + 1}>{i + 1}</option>;
                      })}
                            </select>
                          </label>
                          <button className="store-remove" onClick={() => setCart(c => c.filter(x => `${x.id}:${x.variant}` !== key))}>{tr("Remove")}{" "}{language === "en" ? l.name.toLowerCase() : tr(l.name)}, {tr(l.variant)}
                          </button>
                        </div>
                        <strong>{money(l.price * l.qty)}</strong>
                      </article>;
            })}
                </div>
                <aside>
                  <h2>{tr("Order summary")}</h2>
                  {totals}
                  <p className="demo-form-note">{tr("Illustrative delivery: \u20AC5, free from \u20AC100. No real charges.")}</p>
                  <button className="store-button" onClick={() => show("checkout")}>{tr("Try demo checkout")}</button>
                </aside>
              </div> : <div className="store-empty">
                <p>{tr("Your bag is waiting for something lovely.")}</p>
                <button className="store-button" onClick={() => show("shop")}>{tr("Explore the collection")}</button>
              </div>}
            <button className="store-text-button" onClick={() => show("shop")}>{tr("Continue browsing")}</button>
          </section>}
        {view === "checkout" && <section className="store-page">
            <p className="demo-kicker">{tr("Simulated checkout")}</p>
            <h1>{tr("The final details.")}</h1>
            <div className="store-cart-layout">
              <form className="store-checkout" onSubmit={checkout}>
                <p>{tr("Use fictional details. Nothing is sent or saved to a server.")}</p>
                <label>{tr("Your name")}<input name="name" required maxLength={80} pattern=".*\S.*" placeholder={tr("Demo Guest")} />
                </label>
                <label>{tr("Email address")}<input name="email" required type="email" placeholder="you@example.com" />
                </label>
                <label>{tr("Street address")}<input name="address" required maxLength={200} placeholder={tr("12 Example Street")} />
                </label>
                <div className="demo-form-row">
                  <label>{tr("City")}<input name="city" required maxLength={100} placeholder={tr("Tallinn")} />
                  </label>
                  <label>{tr("Postal code")}<input name="postal" required maxLength={20} placeholder="10111" />
                  </label>
                </div>
                <label>{tr("Country")}<select name="country">
                    <option value={"Estonia"}>{tr("Estonia")}</option>
                    <option value={"Finland"}>{tr("Finland")}</option>
                    <option value={"Portugal"}>{tr("Portugal")}</option>
                    <option value={"Other (demo)"}>{tr("Other (demo)")}</option>
                  </select>
                </label>
                <div className="store-demo-payment">
                  <strong>{tr("Demo payment")}</strong>
                  <p>{tr("No card details are needed. This button creates an on-screen example order only.")}</p>
                </div>
                <button className="store-button" type="submit">{tr("Place demo order")}</button>
                <button className="store-text-button" type="button" onClick={() => show("cart")}>{tr("Back to bag")}</button>
              </form>
              <aside>
                <h2>{tr("Your order")}</h2>
                {cart.map(l => {
              return <p className="store-review-line" key={`${l.id}:${l.variant}`}>
                    <span>
                      {tr(l.name)} · {tr(l.variant)}{" "}{tr("\xD7")}{" "}{l.qty}
                    </span>
                    <strong>{money(l.price * l.qty)}</strong>
                  </p>;
            })}
                {totals}
              </aside>
            </div>
          </section>}
        {view === "confirmation" && order && <section className="store-page store-confirmation">
            <p className="demo-kicker">{tr("Demo order complete")}</p>
            <h1>{tr("Lovely choice,")}<br />
              {order.name}.
            </h1>
            <p>{tr("Your simulated order is shown below. No payment was taken, no email was sent and nothing will be shipped.")}</p>
            <div>
              {order.lines.map(l => {
            return <p className="store-review-line" key={`${l.id}:${l.variant}`}>
                  <span>
                    {tr(l.name)} · {tr(l.variant)}{" "}{tr("\xD7")}{" "}{l.qty}
                  </span>
                  <strong>{money(l.price * l.qty)}</strong>
                </p>;
          })}
              <dl className="store-totals">
                <dt>{tr("Subtotal")}</dt>
                <dd>{money(order.subtotal)}</dd>
                <dt>{tr("Demo delivery")}</dt>
                <dd>{money(order.delivery)}</dd>
                <dt>{tr("Demo total")}</dt>
                <dd>{money(order.total)}</dd>
              </dl>
            </div>
            <button className="store-button" onClick={() => {
          setOrder(null);
          show("shop");
        }}>{tr("Continue exploring")}</button>
            <a href="#contact">{tr("Want a store like this for your business?")}</a>
          </section>}
      </main>
      <footer className="store-footer">
        <span className="store-logo">
          FORM <i>&</i> FIELD
        </span>
        <p>{tr("Online store concept by TOIMU Technologies O\xDC")}</p>
        <a href="#work">{tr("Return to portfolio")}</a>
      </footer>
    </div>;
}
