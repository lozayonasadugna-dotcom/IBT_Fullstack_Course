import { NextResponse } from "next/server"


const orders = []
const byKey = new Map()

export async function GET() {
  return NextResponse.json({ count: orders.length, orders })
}

export async function POST(request) {
  const key = request.headers.get("Idempotency-Key")
  if (key && byKey.has(key)) {
    return NextResponse.json(byKey.get(key))
  }
  const body = await request.json()
  const order = { id: Date.now(), phone: body.phone, items: body.items.length }
  orders.push(order)
  if (key) byKey.set(key, order)
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return NextResponse.json(order, { status: 201 })
}
