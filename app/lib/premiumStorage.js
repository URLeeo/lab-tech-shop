"use client";

import { useSyncExternalStore } from "react";

export const PREMIUM_STORAGE_KEY = "techcart:isPremium";
export const PREMIUM_CHANGED_EVENT = "techcart-premium-changed";

function getSnapshot() {
  if (typeof window === "undefined") {
    return false;
  }

  return localStorage.getItem(PREMIUM_STORAGE_KEY) === "true";
}

function getServerSnapshot() {
  return false;
}

function subscribe(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener(PREMIUM_CHANGED_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(PREMIUM_CHANGED_EVENT, callback);
  };
}

export function usePremiumStatus() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function savePremiumStatus() {
  localStorage.setItem(PREMIUM_STORAGE_KEY, "true");
  window.dispatchEvent(new Event(PREMIUM_CHANGED_EVENT));
}

export function clearPremiumStatus() {
  localStorage.removeItem(PREMIUM_STORAGE_KEY);
  window.dispatchEvent(new Event(PREMIUM_CHANGED_EVENT));
}
