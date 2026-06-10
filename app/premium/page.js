"use client";

import { useState } from "react";
import Link from "next/link";
import {
  clearPremiumStatus,
  savePremiumStatus,
  usePremiumStatus,
} from "../lib/premiumStorage";

const initialForm = {
  cardholderName: "",
  cardNumber: "",
  expiryDate: "",
  cvc: "",
  email: "",
};

export default function PremiumPage() {
  const [form, setForm] = useState(initialForm);
  const isPaid = usePremiumStatus();
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const digitsOnlyCardNumber = form.cardNumber.replace(/\D/g, "");
    const digitsOnlyCvc = form.cvc.replace(/\D/g, "");

    if (
      !form.cardholderName.trim() ||
      !form.email.trim() ||
      digitsOnlyCardNumber.length < 12 ||
      !form.expiryDate.trim() ||
      digitsOnlyCvc.length < 3
    ) {
      setError(
        "Please fill every field and use a valid-looking card number and CVC."
      );
      return;
    }

    savePremiumStatus();
    setError("");
  }

  function handleRestoreAds() {
    clearPremiumStatus();
    setForm(initialForm);
    setError("");
  }

  if (isPaid) {
    return (
      <main className="mx-auto flex w-full max-w-3xl flex-1 items-center px-6 py-16">
        <section className="w-full rounded-3xl border border-emerald-500/30 bg-emerald-50 p-8 text-center shadow-sm dark:border-emerald-400/30 dark:bg-emerald-950/30">
          <p className="text-5xl" aria-hidden="true">
            ✅
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-emerald-900 dark:text-emerald-100">
            Payment complete, ads removed!
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-emerald-800 dark:text-emerald-200">
            Your fake TechCart Premium purchase is saved in this browser. Refresh
            the page or come back later and the ads will stay gone.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
            >
              Back to the shop
            </Link>
            <button
              type="button"
              onClick={handleRestoreAds}
              className="rounded-full border border-emerald-700 px-5 py-3 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-100 dark:border-emerald-300 dark:text-emerald-100 dark:hover:bg-emerald-900"
            >
              Restore ads
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
      <section className="grid gap-8 rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900 md:grid-cols-[0.9fr_1.1fr] md:p-8">
        <div className="rounded-2xl bg-indigo-600 p-6 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-100">
            TechCart Premium
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            Remove every annoying ad.
          </h1>
          <p className="mt-4 text-indigo-100">
            This is a mock checkout. No money is charged and no payment details
            are sent anywhere. Submitting only saves a Premium flag in your
            browser.
          </p>
          <div className="mt-8 rounded-2xl bg-white/10 p-4">
            <p className="text-sm text-indigo-100">Lifetime plan</p>
            <p className="mt-1 text-4xl font-black">$0.00</p>
            <p className="mt-1 text-sm text-indigo-100">
              Fake payment, real localStorage practice.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Payment details
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Use any test-looking values. The form is controlled with React
              state.
            </p>
          </div>

          <label className="block">
            <span className="text-sm font-medium">Cardholder name</span>
            <input
              name="cardholderName"
              value={form.cardholderName}
              onChange={handleChange}
              placeholder="Aslan Mammadzada"
              className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-zinc-950"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-zinc-950"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Card number</span>
            <input
              name="cardNumber"
              inputMode="numeric"
              value={form.cardNumber}
              onChange={handleChange}
              placeholder="4242 4242 4242 4242"
              className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-zinc-950"
            />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium">Expiry date</span>
              <input
                name="expiryDate"
                value={form.expiryDate}
                onChange={handleChange}
                placeholder="12/30"
                className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-zinc-950"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium">CVC</span>
              <input
                name="cvc"
                inputMode="numeric"
                value={form.cvc}
                onChange={handleChange}
                placeholder="123"
                className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-zinc-950"
              />
            </label>
          </div>

          {error && (
            <p className="rounded-xl border border-red-500/30 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:bg-red-950/30 dark:text-red-200">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
          >
            Complete mock payment
          </button>
        </form>
      </section>
    </main>
  );
}
