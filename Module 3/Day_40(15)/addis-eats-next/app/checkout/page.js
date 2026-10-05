'use client';

import { useActionState } from 'react';
import { placeOrder } from '@/app/actions';
import Link from 'next/link';

export default function CheckoutPage() {
  const [state, formAction] = useActionState(placeOrder, null);

  return (
    <main style={{ padding: '2rem' }}>
      <Link href="/cart">&larr; Back to Cart</Link>
      <h1 style={{ marginTop: '1rem' }}>Checkout</h1>

      <form action={formAction} style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <div>
          <label>Your Name:</label><br />
          <input 
            type="text" 
            name="name" 
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem' }} 
          />
        </div>

        <div>
          <label>Phone Number:</label><br />
          <input 
            type="text" 
            name="phone" 
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem' }} 
          />
          {state?.fieldErrors?.phone && (
            <p style={{ color: 'red', fontSize: '0.85rem', marginTop: '0.2rem' }}>
              {state.fieldErrors.phone}
            </p>
          )}
        </div>

        <button 
          type="submit" 
          style={{ padding: '0.7rem', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Place Order
        </button>

        {state?.message && <p style={{ color: 'green' }}>{state.message}</p>}
        {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
      </form>
    </main>
  );
}