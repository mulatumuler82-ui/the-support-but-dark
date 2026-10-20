import { useState } from 'react';
import type { FormEvent } from 'react';
import Reveal from './ui/Reveal';
import { ContactError, sendContactMessage } from '../api/contact';

type Status = { type: 'idle' | 'sending' | 'success' | 'error'; text: string };

const FIELDS = [
  { key: 'name', label: 'Your name', type: 'text' },
  { key: 'email', label: 'Your email', type: 'email' },
] as const;

const labelClass =
  'pointer-events-none absolute left-0 top-1 text-xs text-[#8B93AD] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#7B6CFF]';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>({ type: 'idle', text: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'sending', text: 'Sending...' });

    try {
      await sendContactMessage(formData);
      setStatus({ type: 'success', text: 'Message sent successfully to your inbox!' });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus({
        type: 'error',
        text: err instanceof ContactError ? err.message : 'Network error. Please check your connection.',
      });
    }
  };

  return (
    <section id="contact" className="relative">
      <div className="pf-aurora pf-aurora-bottom" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-14 items-start">
        <Reveal>
          <h2 className="pf-display text-4xl md:text-6xl font-bold text-white leading-[1.05] mb-6">
            Let's work together.
          </h2>
          <p className="text-[#8B93AD] text-lg max-w-md leading-relaxed">
            Send a direct message for contract work, collaborations, or job opportunities. Your note goes straight to
            my inbox.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <form
            onSubmit={handleSubmit}
            className="space-y-7 bg-[#0E1220]/70 backdrop-blur border border-[#1C2340] rounded-3xl p-8 shadow-2xl shadow-black/40"
          >
            {FIELDS.map((f) => (
              <div key={f.key} className="relative">
                <input
                  id={f.key}
                  type={f.type}
                  required
                  placeholder=" "
                  value={formData[f.key]}
                  onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                  className="peer w-full bg-transparent border-b border-[#2a3358] pt-6 pb-2 text-white outline-none focus:border-[#7B6CFF] transition"
                />
                <label htmlFor={f.key} className={labelClass}>
                  {f.label}
                </label>
              </div>
            ))}

            <div className="relative">
              <textarea
                id="message"
                required
                rows={4}
                placeholder=" "
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="peer w-full bg-transparent border-b border-[#2a3358] pt-6 pb-2 text-white outline-none focus:border-[#7B6CFF] transition resize-none"
              />
              <label htmlFor="message" className={labelClass}>
                Message
              </label>
            </div>

            <button
              type="submit"
              disabled={status.type === 'sending'}
              className="pf-btn w-full py-3.5 rounded-full font-semibold text-[#07090F] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status.type === 'sending' ? 'Sending...' : 'Send message'}
            </button>

            <p
              aria-live="polite"
              className={`text-sm text-center min-h-[1.25rem] transition ${
                status.type === 'success'
                  ? 'text-emerald-400'
                  : status.type === 'error'
                  ? 'text-rose-400'
                  : 'text-[#8B93AD]'
              }`}
            >
              {status.type !== 'sending' && status.text}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
