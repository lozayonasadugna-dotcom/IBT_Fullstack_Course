'use server';

export async function placeOrder(prevState, formData) {
  const name = formData.get('name');
  const phone = formData.get('phone');

  if (!name || name.trim() === '') {
    return { success: false, error: 'Name is required' };
  }

  if (!phone || phone.length < 4) {
    return { 
      success: false, 
      fieldErrors: { phone: 'Phone number must be at least 4 digits' } 
    };
  }

  return { success: true, message: `Thank you ${name}! Your order has been placed.` };
}