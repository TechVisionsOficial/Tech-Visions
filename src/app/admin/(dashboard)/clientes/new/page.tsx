import { getUser } from "@/lib/auth/dal";
import { ClientForm } from "../ClientForm";
import { createClientRecord } from "../actions";

export default async function NewClientPage() {
  await getUser();
  return (
    <div>
      <h1 className="font-display text-2xl font-medium">Novo cliente</h1>
      <div className="mt-6">
        <ClientForm action={createClientRecord} />
      </div>
    </div>
  );
}
