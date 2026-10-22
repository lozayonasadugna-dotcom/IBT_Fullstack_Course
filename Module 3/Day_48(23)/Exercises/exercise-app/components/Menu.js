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
  const [notice, setNotice] = useState("")
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (cartOpen && !dialog.open) dialog.showModal()
    if (!cartOpen && dialog.open) dialog.close()
  }, [cartOpen])

  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(""), 2500)
    return () => clearTimeout(timer)
  }, [notice])

  function addToCart(dish) {
    if (cart.some((item) => item.id === dish.id)) {
      setNotice(`${dish.name} is already in your cart`)
      return
    }
    setCart((items) => [...items, dish])
    setNotice(`${dish.name} added to your cart`)
  }

  function removeFromCart(id) {
    setCart((items) => items.filter((item) => item.id !== id))
  }

  function handleOrderDone() {
    setCart([])
    setCartOpen(false)
    setNotice("Order placed")
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

      <p className="notice" role="status">{notice}</p>

      <main className="grid">
        {dishes.map((dish) => (
          <DishCard
            key={dish.id}
            dish={dish}
            inCart={cart.some((item) => item.id === dish.id)}
            onAdd={addToCart}
            onOpen={setSelected}
          />
        ))}
      </main>

      {selected && <p className="detail">{selected.name} selected</p>}

      <dialog ref={dialogRef} className="panel" onClose={() => setCartOpen(false)}>
        <button type="button" className="close" onClick={() => setCartOpen(false)}>
          Close
        </button>
        <h2>Your order</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id}>
                <span>{item.name} - {item.price} birr</span>
                <button
                  type="button"
                  aria-label={`Remove ${item.name}`}
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <OrderForm cart={cart} onDone={handleOrderDone} />
      </dialog>
    </>
  )
}
