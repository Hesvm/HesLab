import { useEffect, useRef, useState, type FC } from 'react';
import { TOAST_EVENT } from '../lib/toast';

export const Toaster: FC = () => {
  const [msg, setMsg] = useState<{ id: number; text: string } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setMsg({ id: Date.now(), text: detail });
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setMsg(null), 2400);
    };

    window.addEventListener(TOAST_EVENT, handleToast);
    return () => {
      window.removeEventListener(TOAST_EVENT, handleToast);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  if (!msg) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[200] flex justify-center px-4"
    >
      <span
        key={msg.id}
        className="rounded-full bg-zinc-900/95 text-white border border-white/10 px-5 py-2.5 text-[13px] font-medium shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200"
      >
        {msg.text}
      </span>
    </div>
  );
};

export default Toaster;
