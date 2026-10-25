"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import DishCard from "./DishCard"
import OrderForm from "./OrderForm"
import { dishes, categories } from "../lib/dishes"

const slides = [
  { image: "/dishes/logo.png", title: "Addis Eats, Ethiopian food with heart", note: "Welcome to our table in Addis Ababa.", kind: "logo" },
  { image: "/dishes/doro-wat.jpg", title: "Today's special · Doro Wat", note: "A slow-cooked favorite, made with heart.", kind: "food" },
  { image: "/dishes/asa-tibs.jpg", title: "Asa Tibs · fresh from the kitchen", note: "A little spice, a lot of soul.", kind: "food" },
]

export default function Menu() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [category, setCategory] = useState("All")
  const [notice, setNotice] = useState("")
  const [confirmation, setConfirmation] = useState(null)
  const [menuVisible, setMenuVisible] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  const [theme, setTheme] = useState("dark")
  const [selectedDish, setSelectedDish] = useState(null)
  const dialogRef = useRef(null)
  const dishDialogRef = useRef(null)
  const headingRef = useRef(null)
  const menuRef = useRef(null)

  const lines = cart.map(({ id, qty }) => ({ ...dishes.find((dish) => dish.id === id), qty }))
  const total = lines.reduce((sum, line) => sum + line.price * line.qty, 0)
  const count = cart.reduce((sum, item) => sum + item.qty, 0)
  const visible = category === "All" ? dishes : dishes.filter((dish) => dish.category === category)
  const currentSlide = slides[slideIndex]

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlideIndex((index) => (index + 1) % slides.length)
    }, 6000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (cartOpen && !dialog.open) dialog.showModal()
    if (!cartOpen && dialog.open) dialog.close()
  }, [cartOpen])

  useEffect(() => {
    const dialog = dishDialogRef.current
    if (selectedDish && !dialog.open) dialog.showModal()
    if (!selectedDish && dialog.open) dialog.close()
  }, [selectedDish])

  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(""), 3000)
    return () => window.clearTimeout(timer)
  }, [notice])

  useEffect(() => {
    if (confirmation) headingRef.current?.focus()
  }, [confirmation])

  function revealMenu() {
    setMenuVisible(true)
    window.setTimeout(() => menuRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50)
  }

  function addToCart(dish) {
    if (cart.some((item) => item.id === dish.id)) {
      setNotice(`${dish.name} is already in your cart. Change the amount in your cart.`)
      return
    }
    setCart((items) => [...items, { id: dish.id, qty: 1 }])
    setNotice(`${dish.name} added to your cart`)
  }

  function orderDish(dish) {
    addToCart(dish)
    setSelectedDish(null)
    setCartOpen(true)
  }

  function changeQty(id, delta) {
    setCart((items) =>
      items.flatMap((item) => {
        if (item.id !== id) return [item]
        const qty = Math.min(item.qty + delta, 10)
        return qty <= 0 ? [] : [{ ...item, qty }]
      })
    )
  }

  function handleOrderDone(order) {
    setCart([])
    setConfirmation(order)
    setNotice("Order placed")
  }

  function handleClose() {
    setCartOpen(false)
    setConfirmation(null)
  }

  function moveSlide(delta) {
    setSlideIndex((index) => (index + delta + slides.length) % slides.length)
  }

  return (
    <>
      <a href="#main-content" className="skip">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Addis Eats home">
          <Image className="brand-emblem" src="/dishes/logo.png" width={58} height={58} alt="Addis Eats Ethiopian food emblem" />
          <span className="brand-name">Addis <em>Eats</em></span>
        </a>
        <nav className="header-actions" aria-label="Main navigation">
          <button type="button" className="nav-link" onClick={revealMenu}>Menu</button>
          <button
            type="button"
            className="nav-link"
            onClick={() => setTheme((current) => current === "dark" ? "light" : "dark")}
            aria-pressed={theme === "light"}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            <span aria-hidden="true">{theme === "dark" ? "☼" : "☾"}</span>
            {theme === "dark" ? "Light" : "Night"}
          </button>
          <button type="button" className="nav-link sign-in-link" onClick={revealMenu}>Sign in to order</button>
          <button type="button" className="cart-btn" onClick={() => setCartOpen(true)}>
            Your bag <span className="cart-count">{count}</span>
          </button>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="home" aria-label="Welcome to Addis Eats">
          <div className="hero-image" aria-hidden="true">
            <div className={`hero-image-fallback slide-${slideIndex + 1}`} />
            <Image
              key={currentSlide.image}
              className={`hero-slide-image ${currentSlide.kind === "logo" ? "hero-slide-logo" : ""}`}
              src={currentSlide.image}
              alt=""
              fill
              priority
              sizes="100vw"
            />
            <div className="hero-image-shade" />
          </div>
          <div className="hero-copy">
            <p className="eyebrow"><span /> A taste of home in Addis Ababa</p>
            <h1>Addis <em>Eats</em></h1>
            <p className="hero-description">
              Ethiopian comfort food, prepared with care and shared with love. Come hungry; leave feeling at home.
            </p>
            <button type="button" className="button button-gold hero-button" onClick={revealMenu}>
              View the menu <span aria-hidden="true">↗</span>
            </button>
            <div className="hero-note">
              <span className="note-rule" />
              <span>{currentSlide.note}</span>
            </div>
          </div>
          <div className="hero-caption">
            <span className="caption-number">0{slideIndex + 1}</span>
            <span className="caption-rule" />
            <span>{currentSlide.title}</span>
          </div>
          <div className="slide-controls" aria-label="Featured dishes slideshow">
            <button type="button" aria-label="Previous slide" onClick={() => moveSlide(-1)}>←</button>
            <span>{String(slideIndex + 1).padStart(2, "0")} <i>/</i> {String(slides.length).padStart(2, "0")}</span>
            <button type="button" aria-label="Next slide" onClick={() => moveSlide(1)}>→</button>
          </div>
          <span className="hero-orbit orbit-one" aria-hidden="true" />
          <span className="hero-orbit orbit-two" aria-hidden="true" />
        </section>

        {menuVisible && (
          <section className="menu-section reveal-section" id="menu" ref={menuRef}>
            <div className="section-heading">
              <div>
                <p className="eyebrow"><span /> Cooked fresh, shared gladly</p>
                <h2>A little more <em>delicious.</em></h2>
                <p className="section-intro">From familiar favorites to something new, there is a place at our table for you.</p>
              </div>
              <span className="section-index">01 <i>—</i> OUR MENU</span>
            </div>

            <article className="special-card">
              <button type="button" className="special-art" onClick={() => setSelectedDish(dishes[0])} aria-label="View today&apos;s Doro Wat special">
                <Image src={dishes[0].image} alt="" fill sizes="160px" />
                <span>View special</span>
              </button>
              <div className="special-copy">
                <p className="eyebrow">Today&apos;s special</p>
                <h3>Doro Wat — a feast to share</h3>
                <p>Chicken slow-simmered in our rich berbere sauce, with a tender egg and fresh injera. The heart of an Ethiopian table.</p>
              </div>
              <div className="special-price"><span>Today&apos;s special</span><strong>350 <small>birr</small></strong></div>
            </article>

            <div className="menu-tools">
              <div>
                <p className="eyebrow"><span /> Find your favorite</p>
                <h2 className="menu-title">The menu</h2>
              </div>
              <div className="filters" role="group" aria-label="Filter dishes">
                {categories.map((name) => (
                  <button
                    key={name}
                    type="button"
                    className="chip"
                    aria-pressed={category === name}
                    onClick={() => setCategory(name)}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            <p className="notice" role="status">{notice}</p>
            <ul className="grid">
              {visible.map((dish, index) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  index={index}
                  inCart={cart.some((item) => item.id === dish.id)}
                  onAdd={addToCart}
                  onOpen={setSelectedDish}
                />
              ))}
            </ul>
            <div className="order-callout">
              <span>Ready when you are.</span>
              <button type="button" className="button button-outline" onClick={() => setCartOpen(true)}>
                {count ? `Review your bag · ${count}` : "Start an order"} <span aria-hidden="true">↗</span>
              </button>
            </div>
          </section>
        )}

        <section className="visit-strip" id="visit">
          <div><p className="eyebrow"><span /> Come by</p><h2>A table in <em>Bole.</em></h2></div>
          <p>Bole Rwanda, Addis Ababa<br /><a href="mailto:addis.eats@gmail.com">addis.eats@gmail.com</a></p>
          <a className="map-link" href="https://www.google.com/maps/search/?api=1&query=Bole+Rwanda%2C+Addis+Ababa" target="_blank" rel="noreferrer">
            Find us on the map <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#home"><span className="brand-name">Addis <em>Eats</em></span></a>
        <span>Good food, good company. Made with care in Addis Ababa.</span>
        <a href="mailto:addis.eats@gmail.com">Contact us</a>
        <span>© Addis Eats</span>
      </footer>

      <dialog ref={dialogRef} className="panel" aria-labelledby="cart-title" onClose={handleClose}>
        <div className="panel-top">
          <p className="eyebrow"><span /> Addis Eats</p>
          <button type="button" className="close" onClick={() => setCartOpen(false)} aria-label="Close your bag">×</button>
        </div>
        {confirmation ? (
          <section className="confirmation">
            <p className="eyebrow">Thank you for ordering</p>
            <h2 id="cart-title" ref={headingRef} tabIndex={-1}>On its way to <em>you.</em></h2>
            <p>Your order reference is <strong>{confirmation.ref}</strong>.</p>
            <p>Total: <strong>{confirmation.total} birr</strong></p>
            <button type="button" className="button button-gold wide" onClick={() => { setCartOpen(false); revealMenu() }}>Back to the menu</button>
          </section>
        ) : (
          <>
            <h2 id="cart-title" className="cart-title">Your <em>bag.</em></h2>
            {lines.length === 0 ? (
              <div className="empty-cart">
                <span aria-hidden="true">✳</span>
                <p>Your bag is waiting for something delicious.</p>
                <button type="button" className="button button-outline wide" onClick={() => { setCartOpen(false); revealMenu() }}>Explore the menu</button>
              </div>
            ) : (
              <>
                <ul className="cart-list">
                  {lines.map((line) => (
                    <li key={line.id}>
                      <span><strong>{line.name}</strong><br /><span className="cart-line-price">{line.price * line.qty} birr</span></span>
                      <span className="qty">
                        <button type="button" aria-label={`Decrease ${line.name}`} onClick={() => changeQty(line.id, -1)}>−</button>
                        <span aria-live="polite">{line.qty}</span>
                        <button type="button" aria-label={`Increase ${line.name}`} onClick={() => changeQty(line.id, 1)}>+</button>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="cart-total"><span>Subtotal</span><strong>{total} birr</strong></div>
              </>
            )}
            <OrderForm lines={lines} total={total} onDone={handleOrderDone} />
          </>
        )}
      </dialog>

      <dialog
        ref={dishDialogRef}
        className="dish-dialog"
        aria-labelledby="dish-dialog-title"
        onClose={() => setSelectedDish(null)}
      >
        {selectedDish && (
          <>
            <button type="button" className="close dish-dialog-close" onClick={() => setSelectedDish(null)} aria-label="Close dish details">×</button>
            <div className="dish-dialog-image">
              <Image src={selectedDish.image} alt={`${selectedDish.name} Ethiopian dish`} fill sizes="(max-width: 620px) 100vw, 560px" />
            </div>
            <div className="dish-dialog-copy">
              <p className="eyebrow"><span /> {selectedDish.category}</p>
              <h2 id="dish-dialog-title">{selectedDish.name}</h2>
              <p className="dish-dialog-description">{selectedDish.desc}</p>
              <p className="dish-dialog-price">{selectedDish.price} <small>birr</small></p>
              <button type="button" className="button button-gold wide" onClick={() => orderDish(selectedDish)}>
                Order this dish <span aria-hidden="true">↗</span>
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  )
}
