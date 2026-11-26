"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, AlertCircle, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export function ToastContainer() {
  const { toasts, dismissToast } = useStore();

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed top-24 right-4 sm:right-6 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2.5"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-[#3F3F46] bg-[#18181B]/95 backdrop-blur-xl p-4 shadow-2xl"
          >
            {toast.variant === "success" && (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#4ADE80] mt-0.5" aria-hidden="true" />
            )}
            {toast.variant === "info" && (
              <Info className="h-5 w-5 shrink-0 text-[#22D3EE] mt-0.5" aria-hidden="true" />
            )}
            {toast.variant === "error" && (
              <AlertCircle className="h-5 w-5 shrink-0 text-[#F87171] mt-0.5" aria-hidden="true" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#FAFAFA]">{toast.title}</p>
              {toast.description && (
                <p className="mt-0.5 text-xs text-[#A1A1AA]">{toast.description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              aria-label="Fermer la notification"
              className="text-[#71717A] hover:text-[#FAFAFA]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
