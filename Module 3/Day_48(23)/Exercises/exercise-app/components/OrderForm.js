"use client"

import { useRef, useState } from "react"

export default function OrderForm({ cart, onDone }) {
  const [phone, setPhone] = useState("")
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  const keyRef = useRef(null)

  async function handleSubmit(e) {
    e.preventDefault()
    if (pending) return
    if (!keyRef.current) keyRef.current = crypto.randomUUID()
    setPending(true)
    setError("")
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": keyRef.current,
        },
        body: JSON.stringify({ phone, items: cart }),
      })
      if (!res.ok) throw new Error("Order failed")
      keyRef.current = null
      setPhone("")
      onDone()
    } catch {
      setError("Order failed. Please try again.")
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="phone">TeleBirr number</label>
      <input
        id="phone"
        type="tel"
        inputMode="numeric"
        required
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      {error && <p role="alert">{error}</p>}
      <button type="submit" className="add" disabled={pending || cart.length === 0}>
        {pending ? "Placing..." : "Place order"}
      </button>
    </form>
  )
}
