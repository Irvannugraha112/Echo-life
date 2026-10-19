"use client";

import { useState } from "react";

export default function HomePage() {
  const [pulse, setPulse] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    if (!pulse.trim()) return;
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setPulse("");
    }, 1500);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col px-5 py-10">
      <header className="mb-10">
        <p className="text-sm font-medium tracking-wide text-calm">
          EchoLife
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-ink">Daily Pulse</h1>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">
          Tulis yang terasa penting hari ini. Singkat saja — ini menjadi
          bagian dari kontinuitas dirimu.
        </p>
      </header>

      <section className="flex flex-1 flex-col">
        <label htmlFor="pulse" className="sr-only">
          Pulse hari ini
        </label>
        <textarea
          id="pulse"
          value={pulse}
          onChange={(e) => setPulse(e.target.value)}
          placeholder="Apa yang ingin kamu ingat dari hari ini?"
          rows={6}
          className="w-full resize-none rounded-2xl border border-soft bg-white px-4 py-3 text-base leading-relaxed text-ink outline-none ring-calm/30 placeholder:text-ink/40 focus:ring-2"
        />

        <button
          type="button"
          onClick={handleSave}
          disabled={!pulse.trim()}
          className="mt-4 rounded-2xl bg-ink px-5 py-3 text-sm font-medium text-white transition enabled:active:scale-[0.98] disabled:opacity-40"
        >
          {saved ? "Tersimpan" : "Simpan Pulse"}
        </button>
      </section>

      <footer className="mt-12 border-t border-soft pt-6">
        <p className="text-center text-xs text-ink/50">
          Continuity grows one moment at a time.
        </p>
      </footer>
    </main>
  );
}
