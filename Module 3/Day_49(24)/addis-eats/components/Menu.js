"use client"

import { useEffect, useRef, useState } from "react"
import DishCard from "./DishCard"
import OrderForm from "./OrderForm"
import { dishes, categories } from "../lib/dishes"

export default function Menu() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [category, setCategory] = useState("All")
  const [notice, setNotice] = useState("")
  const [confirmation, setConfirmation] = useState(null)
  const dialogRef = useRef(null)
  const headingRef = useRef(null)

  const lines = cart.map(({ id, qty }) => ({ ...dishes.find((d) => d.id === id), qty }))
  const total = lines.reduce((sum, line) => sum + line.price * line.qty, 0)
  const count = cart.reduce((sum, item) => sum + item.qty, 0)
  const visible = category === "All" ? dishes : dishes.filter((d) => d.category === category)

  useEffect(() => {
    const dialog = dialogRef.current
    if (cartOpen && !dialog.open) dialog.showModal()
    if (!cartOpen && dialog.open) dialog.close()
  }, [cartOpen])

  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(""), 3000)
    return () => clearTimeout(timer)
  }, [notice])

  useEffect(() => {
    if (confirmation) headingRef.current?.focus()
  }, [confirmation])

  function addToCart(dish) {
    if (cart.some((item) => item.id === dish.id)) {
      setNotice(`${dish.name} is already in your cart. Change the amount in your cart.`)
      return
    }
    setCart((items) => [...items, { id: dish.id, qty: 1 }])
    setNotice(`${dish.name} added to your cart`)
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

  return (
    <>
      <a href="#menu" className="skip">Skip to menu</a>
      <header>
        <h1>Addis Eats</h1>
        <button type="button" className="cart-btn" onClick={() => setCartOpen(true)}>
          Cart ({count})
        </button>
      </header>

      <main id="menu">
        <p className="notice" role="status">{notice}</p>

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

        <ul className="grid">
          {visible.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              inCart={cart.some((item) => item.id === dish.id)}
              onAdd={addToCart}
            />
          ))}
        </ul>
      </main>

      <dialog ref={dialogRef} className="panel" aria-labelledby="cart-title" onClose={handleClose}>
        <button type="button" className="close" onClick={() => setCartOpen(false)}>
          Close
        </button>

        {confirmation ? (
          <section>
            <h2 id="cart-title" ref={headingRef} tabIndex={-1}>Order placed</h2>
            <p>Your reference is <strong>{confirmation.ref}</strong>.</p>
            <p>Total: {confirmation.total} birr</p>
          </section>
        ) : (
          <>
            <h2 id="cart-title">Your order</h2>
            {lines.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul className="cart-list">
                {lines.map((line) => (
                  <li key={line.id}>
                    <span>{line.name}<br />{line.price * line.qty} birr</span>
                    <span className="qty">
                      <button type="button" aria-label={`Decrease ${line.name}`} onClick={() => changeQty(line.id, -1)}>-</button>
                      <span aria-live="polite">{line.qty}</span>
                      <button type="button" aria-label={`Increase ${line.name}`} onClick={() => changeQty(line.id, 1)}>+</button>
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <OrderForm lines={lines} total={total} onDone={handleOrderDone} />
          </>
        )}
      </dialog>
    </>
  )
}
