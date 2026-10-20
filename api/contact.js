// Vercel serverless function:  GET /api/contact (health check)  and  POST /api/contact (send email)
const { Resend } = require('resend');

// Where messages go and who they appear to come from.
// Override with CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL in the Vercel environment variables.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'mulatumuler82@gmail.com';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

/** Stops visitors from injecting HTML into the email. */
const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  // Open /api/contact in the browser to check the function is deployed and configured.
  if (req.method === 'GET') {
    res.status(200).json({
      ok: true,
      emailConfigured: Boolean(process.env.RESEND_API_KEY),
      build: 'vercel-function-v1',
    });
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST, OPTIONS');
    res.status(405).json({ success: false, error: 'Method not allowed.' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  const name = String((body && body.name) || '').trim();
  const email = String((body && body.email) || '').trim();
  const message = String((body && body.message) || '').trim();

  if (!name || !email || !message) {
    res.status(400).json({ success: false, error: 'Please fill in your name, email and message.' });
    return;
  }
  if (!isEmail(email)) {
    res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
    return;
  }
  if (name.length > 100 || email.length > 200 || message.length > 5000) {
    res.status(400).json({ success: false, error: 'Your message is too long.' });
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    res.status(500).json({ success: false, error: 'Email service is not configured.' });
    return;
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Resend does NOT throw on failure – it returns { data, error }, so we must check it.
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email, // pressing "Reply" in Gmail answers the visitor directly
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
      res.status(502).json({ success: false, error: 'Could not deliver your message. Please try again later.' });
      return;
    }

    console.log('Email sent, id:', data && data.id);
    res.status(200).json({ success: true, message: 'Email sent successfully to your inbox!' });
  } catch (err) {
    console.error('Error in contact function:', err);
    res.status(500).json({ success: false, error: 'Failed to send email.' });
  }
};
