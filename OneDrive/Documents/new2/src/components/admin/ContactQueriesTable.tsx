"use client";

import { useState } from "react";

export type ContactRow = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
};

const statuses = ["Pending", "Done", "Completed", "Resolved"];

export function ContactQueriesTable({ contacts: initialContacts }: { contacts: ContactRow[] }) {
  const [contacts, setContacts] = useState(initialContacts);
  const [error, setError] = useState<string | null>(null);
  const [savingIds, setSavingIds] = useState<number[]>([]);

  async function updateStatus(id: number, status: string) {
    setError(null);
    setSavingIds((current) => [...current, id]);

    const response = await fetch("/api/admin/contact-status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    setSavingIds((current) => current.filter((item) => item !== id));

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setError(body?.message || "Unable to update status.");
      return;
    }

    setContacts((current) =>
      current.map((contact) => (contact.id === id ? { ...contact, status } : contact)),
    );
  }

  return (
    <div className="space-y-6">
      {error ? <div className="rounded-3xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/70 dark:bg-rose-950/30 dark:text-rose-200">{error}</div> : null}
      <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
        <table className="min-w-full border-separate border-spacing-0 text-sm">
          <thead className="bg-slate-100 text-left text-xs uppercase tracking-[0.2em] text-slate-500 dark:bg-slate-950/80 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Submitted</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-950/90">
            {contacts.map((contact) => (
              <tr key={contact.id} className="border-t border-slate-100 dark:border-slate-800">
                <td className="px-4 py-4 align-top text-slate-900 dark:text-slate-100">
                  <div className="font-semibold">{contact.name}</div>
                  <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{contact.phone || "No phone"}</div>
                </td>
                <td className="px-4 py-4 align-top text-slate-900 dark:text-slate-100">{contact.email}</td>
                <td className="px-4 py-4 align-top text-slate-900 dark:text-slate-100">{contact.subject}</td>
                <td className="px-4 py-4 align-top text-slate-900 dark:text-slate-100">
                  <select
                    value={contact.status}
                    onChange={(event) => updateStatus(contact.id, event.target.value)}
                    className="rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-500/20"
                    disabled={savingIds.includes(contact.id)}>
                    {statuses.map((statusOption) => (
                      <option key={statusOption} value={statusOption}>
                        {statusOption}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-4 align-top text-slate-500 dark:text-slate-400">{new Date(contact.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
