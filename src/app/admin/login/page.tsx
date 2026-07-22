import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-2xl border border-ink/10 bg-white p-8 shadow-sm">
        <h1 className="font-display text-2xl font-medium">tech·visions</h1>
        <p className="mt-1 text-sm text-ink/60">Painel interno</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
