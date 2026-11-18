import type { ReactNode } from "react";
import { FadeIn } from "./FadeIn";
import { SplitHeading } from "./SplitHeading";

/** Opening of an inner page: title rises in word by word, the lead settles under it. */
export function PageHero({ title, lead, children }: { title: string; lead?: string; children?: ReactNode }) {
  return (
    <section className="px-6 pb-16 pt-16 sm:pt-24">
      <div className="mx-auto max-w-6xl">
        <SplitHeading
          text={title}
          className="max-w-4xl font-display text-5xl font-medium leading-[1.04] tracking-[-0.03em] sm:text-6xl md:text-7xl"
        />
        {lead && (
          <FadeIn delay={0.35}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/70">{lead}</p>
          </FadeIn>
        )}
        {children && <FadeIn delay={0.5}>{children}</FadeIn>}
      </div>
    </section>
  );
}
