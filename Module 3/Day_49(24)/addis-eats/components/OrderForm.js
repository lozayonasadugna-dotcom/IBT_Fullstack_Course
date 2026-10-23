"use client"

import { useRef, useState } from "react"

const PHONE = /^(\+251|0)[79]\d{8}$/

function newKey() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export default function OrderForm({ lines, total, onDone }) {
  const [phone, setPhone] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  const attemptRef = useRef(null)
  const inputRef = useRef(null)

  function validate() {
    const ok = PHONE.test(phone.trim())
    setPhoneError(ok ? "" : "Enter a valid number, for example 0911234567")
    return ok
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (pending) return
    if (!validate()) {
      inputRef.current?.focus()
      return
    }

    const body = JSON.stringify({
      phone: phone.trim(),
      items: lines.map(({ id, qty }) => ({ id, qty })),
    })
    if (!attemptRef.current || attemptRef.current.body !== body) {
      attemptRef.current = { key: newKey(), body }
    }

    setPending(true)
    setError("")
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": attemptRef.current.key,
        },
        body,
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error || "Order failed. Please try again.")
        return
      }
      attemptRef.current = null
      setPhone("")
      onDone(data)
    } catch {
      setError("No connection. Please try again.")
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="phone">TeleBirr number</label>
      <input
        id="phone"
        ref={inputRef}
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        value={phone}
        aria-invalid={phoneError ? "true" : "false"}
        aria-describedby={phoneError ? "phone-error" : undefined}
        onChange={(e) => setPhone(e.target.value)}
        onBlur={() => phone && validate()}
        onFocus={(e) => e.currentTarget.scrollIntoView({ block: "center" })}
      />
      {phoneError && <p id="phone-error" className="error">{phoneError}</p>}
      {error && <p role="alert" className="error">{error}</p>}
      <button type="submit" className="primary wide" disabled={pending || lines.length === 0}>
        {pending ? "Placing..." : `Place order (${total} birr)`}
      </button>
    </form>
  )
}
