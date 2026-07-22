"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { logActivity } from "@/lib/activityLog/logActivity";
import { MeetingSchema, type MeetingFormState } from "@/lib/validation/meeting";

function parseMeetingForm(formData: FormData) {
  return MeetingSchema.safeParse({
    client_id: formData.get("client_id"),
    title: formData.get("title"),
    starts_at: formData.get("starts_at"),
    ends_at: formData.get("ends_at"),
    location: formData.get("location"),
    notes: formData.get("notes"),
    analyst: formData.get("analyst"),
  });
}

export async function createMeetingRecord(
  _prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  await verifySession();

  const validated = parseMeetingForm(formData);
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { client_id, starts_at, ends_at, ...rest } = validated.data;
  const supabase = await createClient();
  const { data: inserted, error } = await supabase
    .from("meetings")
    .insert({
      ...rest,
      client_id: client_id || null,
      starts_at: new Date(starts_at).toISOString(),
      ends_at: ends_at ? new Date(ends_at).toISOString() : null,
    })
    .select("id")
    .single();

  if (error) {
    return { message: "Não foi possível salvar a reunião." };
  }

  await logActivity({
    action: "created",
    entityType: "meeting",
    entityId: inserted?.id,
    entityLabel: rest.title,
  });

  revalidatePath("/admin/agenda");
  redirect("/admin/agenda");
}

export async function updateMeetingRecord(
  id: string,
  _prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  await verifySession();

  const validated = parseMeetingForm(formData);
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { client_id, starts_at, ends_at, ...rest } = validated.data;
  const supabase = await createClient();
  const { error } = await supabase
    .from("meetings")
    .update({
      ...rest,
      client_id: client_id || null,
      starts_at: new Date(starts_at).toISOString(),
      ends_at: ends_at ? new Date(ends_at).toISOString() : null,
    })
    .eq("id", id);

  if (error) {
    return { message: "Não foi possível atualizar a reunião." };
  }

  await logActivity({
    action: "updated",
    entityType: "meeting",
    entityId: id,
    entityLabel: rest.title,
  });

  revalidatePath("/admin/agenda");
  revalidatePath(`/admin/agenda/${id}`);
  redirect("/admin/agenda");
}

export async function deleteMeetingRecord(id: string) {
  await verifySession();
  const supabase = await createClient();

  const { data: meeting } = await supabase
    .from("meetings")
    .select("title")
    .eq("id", id)
    .single();

  await supabase.from("meetings").delete().eq("id", id);

  if (meeting) {
    await logActivity({
      action: "deleted",
      entityType: "meeting",
      entityId: id,
      entityLabel: meeting.title,
    });
  }

  revalidatePath("/admin/agenda");
  redirect("/admin/agenda");
}
