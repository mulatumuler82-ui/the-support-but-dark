import { useEffect, useState } from 'react';

/** Types and deletes a rotating list of phrases. */
export default function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = words[index];
    let delay = deleting ? 30 : 65;
    if (!deleting && text === full) delay = 1700;
    if (deleting && text === '') delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === full) setDeleting(true);
      else if (deleting && text === '') {
        setDeleting(false);
        setIndex((index + 1) % words.length);
      } else {
        setText(full.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, words]);

  return (
    <span>
      {text}
      <span className="pf-caret" aria-hidden="true" />
    </span>
  );
}
