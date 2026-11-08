import type { ReactNode } from "react";

export function DataTable({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-[3px] border border-ink/15 bg-white">
      <table className="w-full text-left text-sm [&_tbody_tr]:transition-colors [&_tbody_tr:hover]:bg-ink/[0.025]">{children}</table>
    </div>
  );
}

export function Th({ children }: { children: ReactNode }) {
  return (
    <th className="border-b-2 border-ink bg-paper px-4 py-3 font-display text-sm font-bold uppercase tracking-[0.06em] text-ink/70">
      {children}
    </th>
  );
}

export function Td({ children }: { children: ReactNode }) {
  return <td className="border-b border-ink/5 px-4 py-3 align-middle">{children}</td>;
}

export function EmptyRow({ colSpan, message }: { colSpan: number; message: string }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-10 text-center text-sm text-ink/50">
        {message}
      </td>
    </tr>
  );
}
