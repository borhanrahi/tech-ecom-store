import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { account } from '@/lib/appwrite';

export async function POST(req: Request) {
  try {
    // Verify Appwrite session
    const user = await account.get().catch(() => null);
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { items } = await req.json();
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            images: item.imgs?.thumbnails || []
          },
          unit_amount: item.discountedPrice * 100,
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
      metadata: {
        userId: user.$id,
        items: JSON.stringify(items)
      }
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Payment failed' },
      { status: 500 }
    );
  }
}