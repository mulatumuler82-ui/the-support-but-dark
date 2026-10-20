export type ContactPayload = { name: string; email: string; message: string };

/** Thrown when the server answered but rejected the message. */
export class ContactError extends Error {}

// Same-site API: on Vercel, /api/* is routed to the Express server (see vercel.json).
// In local dev, vite.config.ts proxies /api to http://localhost:5000.
// Override with VITE_CONTACT_API_URL in client/.env if you host the API elsewhere.
const API_URL: string = (import.meta.env.VITE_CONTACT_API_URL as string | undefined) ?? '/api/contact';

export async function sendContactMessage(payload: ContactPayload): Promise<void> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();

  if (!res.ok) throw new ContactError(data.error || 'Failed to send message.');
}
