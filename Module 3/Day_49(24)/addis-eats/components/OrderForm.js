"use client"

import { useRef, useState } from "react"

const PHONE = /^(\+251|0)[79]\d{8}$/

function newKey() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export default function OrderForm({ lines, total, onDone }) {
  const [phone, setPhone] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [fulfillment, setFulfillment] = useState("pickup")
  const [payment, setPayment] = useState("telebirr")
  const [address, setAddress] = useState("")
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  const attemptRef = useRef(null)
  const inputRef = useRef(null)

  function validate() {
    const ok = PHONE.test(phone.trim())
    setPhoneError(ok ? "" : "Enter a valid Ethiopian mobile number, for example 0911234567")
    return ok
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (pending) return
    if (!validate()) {
      inputRef.current?.focus()
      return
    }
    if (fulfillment === "delivery" && address.trim().length < 5) {
      setError("Add a delivery location so we know where to bring your order.")
      return
    }

    const body = JSON.stringify({
      phone: phone.trim(),
      items: lines.map(({ id, qty }) => ({ id, qty })),
      fulfillment,
      payment: fulfillment === "delivery" ? payment : null,
      address: fulfillment === "delivery" ? address.trim() : "",
    })
    if (!attemptRef.current || attemptRef.current.body !== body) {
      attemptRef.current = { key: newKey(), body }
    }

    setPending(true)
    setError("")
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": attemptRef.current.key,
        },
        body,
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        setError(data.error || "Order failed. Please try again.")
        return
      }
      attemptRef.current = null
      setPhone("")
      setAddress("")
      onDone(data)
    } catch {
      setError("No connection. Please try again.")
    } finally {
      setPending(false)
    }
  }

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.trim())}`

  return (
    <form className="order-form" onSubmit={handleSubmit} noValidate>
      <fieldset className="fulfillment-options">
        <legend>How would you like your order?</legend>
        <label className={`choice-card ${fulfillment === "pickup" ? "selected" : ""}`}>
          <input
            type="radio"
            name="fulfillment"
            value="pickup"
            checked={fulfillment === "pickup"}
            onChange={() => setFulfillment("pickup")}
          />
          <span><strong>Pick up</strong><small>Bole Rwanda, Addis Ababa</small></span>
        </label>
        <label className={`choice-card ${fulfillment === "delivery" ? "selected" : ""}`}>
          <input
            type="radio"
            name="fulfillment"
            value="delivery"
            checked={fulfillment === "delivery"}
            onChange={() => setFulfillment("delivery")}
          />
          <span><strong>Delivery</strong><small>Tell us where to bring it</small></span>
        </label>
      </fieldset>

      {fulfillment === "delivery" && (
        <div className="delivery-details">
          <fieldset className="payment-options">
            <legend>Choose a payment method</legend>
            <label className={`payment-choice ${payment === "telebirr" ? "selected" : ""}`}>
              <input
                type="radio"
                name="payment"
                value="telebirr"
                checked={payment === "telebirr"}
                onChange={() => setPayment("telebirr")}
              />
              <span className="payment-mark">T</span>
              <span><strong>TeleBirr</strong><small>Mobile payment</small></span>
            </label>
            <label className={`payment-choice ${payment === "cbe" ? "selected" : ""}`}>
              <input
                type="radio"
                name="payment"
                value="cbe"
                checked={payment === "cbe"}
                onChange={() => setPayment("cbe")}
              />
              <span className="payment-mark">C</span>
              <span><strong>CBE</strong><small>Commercial Bank of Ethiopia</small></span>
            </label>
          </fieldset>
          <label htmlFor="delivery-address">Delivery location</label>
          <input
            id="delivery-address"
            type="text"
            autoComplete="street-address"
            placeholder="Area, street, building or landmark"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          {address.trim().length >= 5 && (
            <a className="map-link address-map-link" href={mapUrl} target="_blank" rel="noreferrer">
              Open this location in Google Maps <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      )}

      <label htmlFor="phone">{fulfillment === "delivery" ? "Payment / contact phone number" : "Contact phone number"}</label>
      <input
        id="phone"
        ref={inputRef}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        value={phone}
        placeholder="+251 9xx xxx xxx"
        aria-invalid={phoneError ? "true" : "false"}
        aria-describedby={phoneError ? "phone-error" : undefined}
        onChange={(event) => setPhone(event.target.value)}
        onBlur={() => phone && validate()}
        onFocus={(event) => event.currentTarget.scrollIntoView({ block: "center" })}
      />
      {phoneError && <p id="phone-error" className="error">{phoneError}</p>}
      {fulfillment === "pickup" && <p className="pickup-note">Pickup from Bole Rwanda, Addis Ababa.</p>}
      {error && <p role="alert" className="error">{error}</p>}
      <button type="submit" className="button button-gold wide place-order" disabled={pending || lines.length === 0}>
        {pending ? "Preparing your order…" : `Place order · ${total} birr`} <span aria-hidden="true">↗</span>
      </button>
      <p className="checkout-note">Payment will be arranged when your order is confirmed.</p>
    </form>
  )
}
