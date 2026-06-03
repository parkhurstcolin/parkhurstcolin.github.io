import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export function useCrud<Row extends { id: string }>(
  table: string,
  orderBy: { column: string; ascending?: boolean },
) {
  const [rows, setRows] = useState<Row[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function reload() {
    const { data } = await supabase
      .from(table)
      .select("*")
      .order(orderBy.column, { ascending: orderBy.ascending ?? true });
    setRows((data ?? []) as Row[]);
  }

  useEffect(() => {
    reload();
  }, []);

  async function save(payload: Record<string, unknown>) {
    setSaving(true);
    setError(null);
    const { error } = editingId
      ? await supabase.from(table).update(payload).eq("id", editingId)
      : await supabase.from(table).insert(payload);
    setSaving(false);
    if (error) {
      setError(error.message);
      return false;
    }
    await reload();
    return true;
  }

  async function remove(id: string) {
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) {
      setError(error.message);
      return;
    }
    await reload();
  }

  return {
    rows,
    reload,
    editingId,
    setEditingId,
    error,
    setError,
    saving,
    save,
    remove,
  };
}
