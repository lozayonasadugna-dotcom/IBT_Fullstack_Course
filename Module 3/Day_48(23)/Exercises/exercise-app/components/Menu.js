"use client"

import { useEffect, useRef, useState } from "react"
import DishCard from "./DishCard"
import OrderForm from "./OrderForm"
import { dishes } from "../lib/dishes"

export default function Menu() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (cartOpen && !dialog.open) dialog.showModal()
    if (!cartOpen && dialog.open) dialog.close()
  }, [cartOpen])

  function addToCart(dish) {
    setCart((items) => [...items, dish])
  }

  function handleOrderDone() {
    setCart([])
    setCartOpen(false)
  }

  return (
    <>
      <header>
        <h1>Addis Eats</h1>
        <div
          className="lang"
          onKeyDown={(e) => {
            if (e.key === "Escape") setLangOpen(false)
          }}
        >
          <button
            type="button"
            className="lang-btn"
            aria-expanded={langOpen}
            onClick={() => setLangOpen((open) => !open)}
          >
            Language
          </button>
          {langOpen && (
            <div className="lang-menu">
              <button type="button" onClick={() => setLangOpen(false)}>English</button>
              <button type="button" onClick={() => setLangOpen(false)}>አማርኛ</button>
            </div>
          )}
        </div>
        <button type="button" className="cart-btn" onClick={() => setCartOpen(true)}>
          Cart ({cart.length})
        </button>
      </header>

      <main className="grid">
        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} onAdd={addToCart} onOpen={setSelected} />
        ))}
      </main>

      {selected && <p className="detail">{selected.name} selected</p>}

      <dialog ref={dialogRef} className="panel" onClose={() => setCartOpen(false)}>
        <button type="button" className="close" onClick={() => setCartOpen(false)}>
          Close
        </button>
        <h2>Your order</h2>
        <p>{cart.length} items</p>
        <OrderForm cart={cart} onDone={handleOrderDone} />
      </dialog>
    </>
  )
}
