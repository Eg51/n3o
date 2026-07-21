"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import Link from 'next/link'

interface ChatWidgetProps {
  /** Support agent / team name shown in the popup header */
  supportName?: string;
  /** Opening message shown in the popup body */
  message?: string;
  /** Whether the popup is open on first render */
  defaultOpen?: boolean;
}

export default function ChatWidget({
  supportName = "Ashie",
  message = "Hi , how can we be of help today?",
  defaultOpen = true,
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* Popup card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            role="dialog"
            aria-label="Support chat"
            className="w-[88vw] max-w-[300px] rounded-2xl bg-slate-300 p-5 shadow-2xl sm:w-80 sm:max-w-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-slate-600">
                {" "}
                <span className="font-semibold text-slate-900">
                  {supportName}
                </span>
              </p>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="shrink-0 rounded-full p-1 text-slate-500 transition-colors hover:bg-slate-400/30 hover:text-slate-800"
              >
                <X size={16} />
              </button>
            </div>

           <Link href={'/UserChat'}>
            <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="mt-3 cursor-pointer text-[15px] leading-relaxed text-slate-900"
              >
                {message}
              </motion.p>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating toggle button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500
         text-white shadow-lg transition-colors hover:bg-blue-600 sm:h-14 sm:w-14"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex"
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="chat-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex"
            >
              <MessageCircle size={22} fill="currentColor" className="text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
