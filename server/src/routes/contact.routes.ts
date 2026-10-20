import express from 'express';
import { Resend } from 'resend';
// import { Message } from '../models/Message';  // enable together with the DB save below

const router = express.Router();

// Where the messages go, and who they appear to come from.
// Override in Vercel / server/.env with CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'mulatumuler82@gmail.com';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

/** Stops visitors from injecting HTML into the email. */
const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

// GET /api/contact  – open in a browser to check the server is deployed and configured
router.get('/contact', (_req, res) => {
  res.status(200).json({ ok: true, emailConfigured: Boolean(process.env.RESEND_API_KEY) });
});

// POST /api/contact
router.post('/contact', async (req, res) => {
  const name = String(req.body?.name ?? '').trim();
  const email = String(req.body?.email ?? '').trim();
  const message = String(req.body?.message ?? '').trim();

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Please fill in your name, email and message.' });
  }
  if (!isEmail(email)) {
    return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
  }
  if (name.length > 100 || email.length > 200 || message.length > 5000) {
    return res.status(400).json({ success: false, error: 'Your message is too long.' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ success: false, error: 'Email service is not configured.' });
  }

  try {
    // Created here (not at import time) so dotenv has already loaded the key.
    const resend = new Resend(process.env.RESEND_API_KEY);

    // OPTIONAL: also save to MongoDB (Message model uses sender_name / message_body)
    /*
    await Message.create({ sender_name: name, email, message_body: message });
    */

    // Resend does NOT throw on failure – it returns { data, error }, so we must check it.
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email, // hitting "Reply" in Gmail answers the visitor directly
      subject: `New Portfolio Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Resend rejected the email:', error);
      return res.status(502).json({ success: false, error: 'Could not deliver your message. Please try again later.' });
    }

    console.log('Email sent, id:', data?.id);
    return res.status(200).json({ success: true, message: 'Email sent successfully to your inbox!' });
  } catch (err) {
    console.error('Error in contact route:', err);
    return res.status(500).json({ success: false, error: 'Failed to send email.' });
  }
});

export default router;
