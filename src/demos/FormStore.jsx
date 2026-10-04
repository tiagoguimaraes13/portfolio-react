import React, { useEffect, useState } from "react";
import "./more-demos.css";
import collection from "../assets/homeware-collection.webp";
const products = [
  {
    id: "lamp",
    name: "Soft light lamp",
    category: "Lighting",
    price: 8900,
    variants: ["Natural linen", "Warm sand"],
    description:
      "A ceramic base and soft linen shade, for a little warmth in your favourite corner.",
  },
  {
    id: "vase",
    name: "Everyday vase",
    category: "Ceramics",
    price: 3200,
    variants: ["Sage", "Chalk"],
    description:
      "A simple ceramic shape for a few stems, a branch or a shelf of its own.",
  },
  {
    id: "mug",
    name: "Morning mug",
    category: "Ceramics",
    price: 1800,
    variants: ["Terracotta", "Cream"],
    description:
      "A tactile everyday mug for your first coffee and your last cup of tea.",
  },
  {
    id: "throw",
    name: "Slow Sunday throw",
    category: "Textiles",
    price: 5900,
    variants: ["Oat", "Stone"],
    description:
      "An easy layer of texture for the sofa, the reading chair or a quiet Sunday.",
  },
  {
    id: "tray",
    name: "Gather serving tray",
    category: "Living",
    price: 4200,
    variants: ["Natural oak", "Smoked oak"],
    description:
      "A warm wooden tray for bringing a little order to the everyday.",
  },
];
const money = (cents) =>
  new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(
    cents / 100
  );
export default function FormStore() {
  const [filter, setFilter] = useState("All");
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("shop");
  const [variants, setVariants] = useState({});
  const [sort, setSort] = useState("featured");
  const [notice, setNotice] = useState("");
  const [order, setOrder] = useState(null);
  useEffect(() => {
    document.title = "FORM & FIELD — Online store concept | TOIMU";
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
    setCart((c) => {
      const found = c.find((l) => l.id === p.id && l.variant === variant);
      return found
        ? c.map((l) =>
            l === found ? { ...l, qty: Math.min(l.qty + 1, 10) } : l
          )
        : [...c, { ...p, variant, qty: 1 }];
    });
    setNotice(`${p.name} · ${variant} added to your bag.`);
  }
  function quantity(key, qty) {
    setCart((c) =>
      c.map((l) =>
        `${l.id}:${l.variant}` === key
          ? { ...l, qty: Math.max(1, Math.min(10, qty)) }
          : l
      )
    );
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
      lines: cart.map((l) => ({ ...l })),
      subtotal,
      delivery,
      total,
    });
    setCart([]);
    setView("confirmation");
    window.scrollTo(0, 0);
  }
  const visible = products
    .filter((p) => filter === "All" || p.category === filter)
    .slice()
    .sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
        ? b.price - a.price
        : 0
    );
  const totals = (
    <dl className="store-totals">
      <dt>Subtotal</dt>
      <dd>{money(subtotal)}</dd>
      <dt>Demo delivery</dt>
      <dd>{delivery ? money(delivery) : "Free"}</dd>
      <dt>Total</dt>
      <dd>{money(total)}</dd>
    </dl>
  );
  return (
    <div className="store-site">
      <div className="demo-strip">
        <a href="#work">Back to TOIMU Technologies</a>
        <span>Concept store · No payments · No real orders</span>
      </div>
      <header className="store-header">
        <button className="store-logo" onClick={() => show("shop")}>
          FORM <i>&</i> FIELD
        </button>
        <nav aria-label="Store navigation">
          <button
            onClick={() => {
              show("shop");
              setFilter("All");
            }}
          >
            The collection
          </button>
          <button onClick={() => show("cart")}>Bag ({count})</button>
        </nav>
      </header>
      <main>
        {view === "shop" ? (
          <>
            <section className="store-hero">
              <div>
                <p className="demo-kicker">Good things, for everyday living.</p>
                <h1>
                  A softer
                  <br />
                  kind of home.
                </h1>
                <p>
                  Considered pieces. Natural textures.
                  <br />
                  Little things that make a space your own.
                </p>
                <button
                  className="store-button"
                  onClick={() =>
                    document
                      .getElementById("store-products")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Explore the collection
                </button>
              </div>
              <img
                src={collection}
                alt="Illustrative homeware collection: lamp, vase, mug, linen throw and wooden tray"
              />
            </section>
            <section id="store-products" className="store-products">
              <div className="store-collection-heading">
                <div>
                  <p className="demo-kicker">The collection</p>
                  <h2>Everyday favourites.</h2>
                </div>
                <label>
                  Sort by
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="low">Price: low to high</option>
                    <option value="high">Price: high to low</option>
                  </select>
                </label>
              </div>
              <div
                className="store-filters"
                role="group"
                aria-label="Product categories"
              >
                {["All", "Lighting", "Ceramics", "Textiles", "Living"].map(
                  (f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      aria-pressed={filter === f}
                    >
                      {f}
                    </button>
                  )
                )}
              </div>
              <p className="store-caption">
                Fictional products and illustrative collection photography.
                Colours are example options.
              </p>
              <p className="store-notice" role="status">
                {notice}
              </p>
              <div className="store-grid">
                {visible.map((p, i) => (
                  <article key={p.id} className="store-product">
                    <div
                      className={`store-product-image store-product-${p.id}`}
                    >
                      <img
                        src={collection}
                        alt={`${p.name} — illustrative collection photograph`}
                        loading="lazy"
                      />
                      <span>{p.category}</span>
                    </div>
                    <div className="store-product-title">
                      <h3>{p.name}</h3>
                      <span>{money(p.price)}</span>
                    </div>
                    <p>{p.description}</p>
                    <label htmlFor={`variant-${p.id}`}>
                      Finish
                      <select
                        id={`variant-${p.id}`}
                        value={variants[p.id] || p.variants[0]}
                        onChange={(e) =>
                          setVariants({ ...variants, [p.id]: e.target.value })
                        }
                      >
                        {p.variants.map((v) => (
                          <option key={v}>{v}</option>
                        ))}
                      </select>
                    </label>
                    <button className="store-button" onClick={() => add(p)}>
                      Add {p.name.toLowerCase()} to bag
                    </button>
                  </article>
                ))}
              </div>
            </section>
            <section className="store-story">
              <p className="demo-kicker">Less noise. More home.</p>
              <h2>
                Make room for
                <br />
                the things you love.
              </h2>
              <p>
                A fictional lifestyle shop, designed to demonstrate an inviting
                shopping experience from browsing to checkout.
              </p>
              <a href="#contact">Let’s build your online store</a>
            </section>
          </>
        ) : null}
        {view === "cart" && (
          <section className="store-cart store-page">
            <p className="demo-kicker">Your collection</p>
            <h1>Your bag.</h1>
            {cart.length ? (
              <div className="store-cart-layout">
                <div>
                  {cart.map((l) => {
                    const key = `${l.id}:${l.variant}`;
                    return (
                      <article className="store-cart-line" key={key}>
                        <div>
                          <h2>{l.name}</h2>
                          <p>
                            {l.variant} · {money(l.price)} each
                          </p>
                          <label>
                            Quantity for {l.name}, {l.variant}
                            <select
                              aria-label={`Quantity for ${l.name}, ${l.variant}`}
                              value={l.qty}
                              onChange={(e) =>
                                quantity(key, Number(e.target.value))
                              }
                            >
                              {Array.from({ length: 10 }, (_, i) => (
                                <option key={i + 1}>{i + 1}</option>
                              ))}
                            </select>
                          </label>
                          <button
                            className="store-remove"
                            onClick={() =>
                              setCart((c) =>
                                c.filter((x) => `${x.id}:${x.variant}` !== key)
                              )
                            }
                          >
                            Remove {l.name.toLowerCase()}, {l.variant}
                          </button>
                        </div>
                        <strong>{money(l.price * l.qty)}</strong>
                      </article>
                    );
                  })}
                </div>
                <aside>
                  <h2>Order summary</h2>
                  {totals}
                  <p className="demo-form-note">
                    Illustrative delivery: €5, free from €100. No real charges.
                  </p>
                  <button
                    className="store-button"
                    onClick={() => show("checkout")}
                  >
                    Try demo checkout
                  </button>
                </aside>
              </div>
            ) : (
              <div className="store-empty">
                <p>Your bag is waiting for something lovely.</p>
                <button className="store-button" onClick={() => show("shop")}>
                  Explore the collection
                </button>
              </div>
            )}
            <button className="store-text-button" onClick={() => show("shop")}>
              Continue browsing
            </button>
          </section>
        )}
        {view === "checkout" && (
          <section className="store-page">
            <p className="demo-kicker">Simulated checkout</p>
            <h1>The final details.</h1>
            <div className="store-cart-layout">
              <form className="store-checkout" onSubmit={checkout}>
                <p>
                  Use fictional details. Nothing is sent or saved to a server.
                </p>
                <label>
                  Your name
                  <input
                    name="name"
                    required
                    maxLength={80}
                    pattern=".*\S.*"
                    placeholder="Demo Guest"
                  />
                </label>
                <label>
                  Email address
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder="you@example.com"
                  />
                </label>
                <label>
                  Street address
                  <input
                    name="address"
                    required
                    maxLength={200}
                    placeholder="12 Example Street"
                  />
                </label>
                <div className="demo-form-row">
                  <label>
                    City
                    <input
                      name="city"
                      required
                      maxLength={100}
                      placeholder="Tallinn"
                    />
                  </label>
                  <label>
                    Postal code
                    <input
                      name="postal"
                      required
                      maxLength={20}
                      placeholder="10111"
                    />
                  </label>
                </div>
                <label>
                  Country
                  <select name="country">
                    <option>Estonia</option>
                    <option>Finland</option>
                    <option>Portugal</option>
                    <option>Other (demo)</option>
                  </select>
                </label>
                <div className="store-demo-payment">
                  <strong>Demo payment</strong>
                  <p>
                    No card details are needed. This button creates an on-screen
                    example order only.
                  </p>
                </div>
                <button className="store-button" type="submit">
                  Place demo order
                </button>
                <button
                  className="store-text-button"
                  type="button"
                  onClick={() => show("cart")}
                >
                  Back to bag
                </button>
              </form>
              <aside>
                <h2>Your order</h2>
                {cart.map((l) => (
                  <p className="store-review-line" key={`${l.id}:${l.variant}`}>
                    <span>
                      {l.name} · {l.variant} × {l.qty}
                    </span>
                    <strong>{money(l.price * l.qty)}</strong>
                  </p>
                ))}
                {totals}
              </aside>
            </div>
          </section>
        )}
        {view === "confirmation" && order && (
          <section className="store-page store-confirmation">
            <p className="demo-kicker">Demo order complete</p>
            <h1>
              Lovely choice,
              <br />
              {order.name}.
            </h1>
            <p>
              Your simulated order is shown below. No payment was taken, no
              email was sent and nothing will be shipped.
            </p>
            <div>
              {order.lines.map((l) => (
                <p className="store-review-line" key={`${l.id}:${l.variant}`}>
                  <span>
                    {l.name} · {l.variant} × {l.qty}
                  </span>
                  <strong>{money(l.price * l.qty)}</strong>
                </p>
              ))}
              <dl className="store-totals">
                <dt>Subtotal</dt>
                <dd>{money(order.subtotal)}</dd>
                <dt>Demo delivery</dt>
                <dd>{money(order.delivery)}</dd>
                <dt>Demo total</dt>
                <dd>{money(order.total)}</dd>
              </dl>
            </div>
            <button
              className="store-button"
              onClick={() => {
                setOrder(null);
                show("shop");
              }}
            >
              Continue exploring
            </button>
            <a href="#contact">Want a store like this for your business?</a>
          </section>
        )}
      </main>
      <footer className="store-footer">
        <span className="store-logo">
          FORM <i>&</i> FIELD
        </span>
        <p>Online store concept by TOIMU Technologies OÜ</p>
        <a href="#work">Return to portfolio</a>
      </footer>
    </div>
  );
}
