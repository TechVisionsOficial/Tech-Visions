import { LoginForm } from "./LoginForm";
import { Wordmark } from "@/components/Wordmark";

// The way in: the counter in front of a shut steel door.
export default function LoginPage() {
  return (
    <div className="steel-ribs flex min-h-screen items-center justify-center px-5 py-10">
      <div className="w-full max-w-sm rounded-[3px] border-t-[8px] border-ink bg-paper p-8">
        <h1>
          <Wordmark className="h-8 w-auto text-ink" />
        </h1>
        <p className="mt-3 font-display text-lg font-bold uppercase tracking-[0.08em] text-ink/60">Painel interno</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
