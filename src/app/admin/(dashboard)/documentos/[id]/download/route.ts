import { NextResponse } from "next/server";
import { verifySession } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await verifySession();
  const { id } = await params;
  const supabase = await createClient();

  const { data: doc } = await supabase
    .from("documents")
    .select("storage_path")
    .eq("id", id)
    .single();

  if (!doc) {
    return NextResponse.json({ error: "Documento não encontrado." }, { status: 404 });
  }

  const { data: signed, error } = await supabase.storage
    .from("documents")
    .createSignedUrl(doc.storage_path, 60);

  if (error || !signed) {
    return NextResponse.json(
      { error: "Não foi possível gerar o link de download." },
      { status: 500 }
    );
  }

  return NextResponse.redirect(signed.signedUrl);
}
