import { NextResponse } from "next/server"
import { createHmac } from "node:crypto"
import { dishes } from "../../../lib/dishes"

const store = (globalThis.__addisOrders ??= { list: [], byKey: new Map() })
const PHONE = /^(\+251|0)[79]\d{8}$/
const bad = (message) => NextResponse.json({ error: message }, { status: 400 })

function makeRef(id) {
  const secret = process.env.SESSION_SECRET
  if (!secret) return null
  return createHmac("sha256", secret).update(String(id)).digest("hex").slice(0, 8).toUpperCase()
}

export async function GET() {
  return NextResponse.json({ count: store.list.length })
}

export async function POST(request) {
  const key = request.headers.get("Idempotency-Key")
  if (!key || key.length > 100) return bad("Missing Idempotency-Key header")

  const earlier = store.byKey.get(key)
  if (earlier) return NextResponse.json(earlier)

  let body
  try {
    body = await request.json()
  } catch {
    return bad("Invalid request")
  }

  const phone = String(body?.phone ?? "").trim()
  if (!PHONE.test(phone)) return bad("Enter a valid phone number")

  const fulfillment = body?.fulfillment ?? "pickup"
  const payment = body?.payment ?? null
  const address = typeof body?.address === "string" ? body.address.trim() : ""
  if (!["pickup", "delivery"].includes(fulfillment)) return bad("Choose pickup or delivery")
  if (fulfillment === "delivery") {
    if (!["telebirr", "cbe"].includes(payment)) return bad("Choose TeleBirr or CBE for delivery")
    if (address.length < 5 || address.length > 300) return bad("Enter a valid delivery location")
  }

  const items = Array.isArray(body?.items) ? body.items : []
  if (items.length === 0 || items.length > 20) return bad("Your cart is empty")

  let total = 0
  let count = 0
  for (const item of items) {
    const dish = dishes.find((d) => d.id === item.id)
    const qty = Number(item.qty)
    if (!dish || !Number.isInteger(qty) || qty < 1 || qty > 10) return bad("Invalid item in cart")
    total += dish.price * qty
    count += qty
  }

  const id = Date.now()
  const ref = makeRef(id)
  if (!ref) return NextResponse.json({ error: "Server is not configured" }, { status: 500 })

  const repeat = store.byKey.get(key)
  if (repeat) return NextResponse.json(repeat)

  const order = { id, ref, total, items: count }
  store.byKey.set(key, order)
  store.list.push({ ...order, phone, fulfillment, payment, address })

  await new Promise((resolve) => setTimeout(resolve, 1500))
  return NextResponse.json(order, { status: 201 })
}
