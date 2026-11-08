"use client";

import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/whatsapp";

// Appears once the shopfront (which already holds the form) has scrolled away,
// so it never sits on top of the balcão's button on a phone.
export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sign = document.getElementById("letreiro");
    if (!sign) return;
    const io = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting));
    io.observe(sign);
    return () => io.disconnect();
  }, []);

  const href = whatsappLink(
    "Olá! Vim pelo site e gostaria de saber mais sobre os serviços da Tech Visions."
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      tabIndex={visible ? undefined : -1}
      aria-hidden={visible ? undefined : true}
      className={`${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"} fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 flex h-14 w-14 items-center justify-center rounded-[3px] border-2 border-ink bg-paper text-ink shadow-[0_10px_28px_-8px_rgba(0,0,0,0.55)] transition-[transform,background-color,opacity] duration-300 ease-out-expo hover:bg-white active:scale-[0.94]`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-7 w-7"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.5 3.62 1.44 5.15L2 22l5.09-1.53a9.86 9.86 0 0 0 4.95 1.33h.004c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.06h-.003a8.16 8.16 0 0 1-4.16-1.14l-.298-.177-3.02.91.906-2.943-.194-.303a8.14 8.14 0 0 1-1.253-4.34c0-4.5 3.66-8.16 8.16-8.16 4.5 0 8.16 3.66 8.16 8.16 0 4.5-3.66 8.16-8.16 8.16z" />
      </svg>
    </a>
  );
}
