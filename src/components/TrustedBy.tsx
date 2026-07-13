import React from "react";
import { motion } from "motion/react";

export default function TrustedBy() {
  const clients = [
    { name: "Sinar Cargo", label: "Logistics" },
    { name: "Vexa Land", label: "Property" },
    { name: "EdLearn LMS", label: "Education" },
    { name: "Lumina Agency", label: "SaaS & AI" },
    { name: "RajaOngkir Co", label: "Logistics" },
    { name: "Nusa Raya", label: "Government" }
  ];

  // For a mathematically perfect continuous scroll loop:
  // Duplicate the client list exactly once.
  // Animate from 0% to -50% using a linear ease.
  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <section id="trusted-by" className="py-12 bg-white dark:bg-slate-950 border-t border-b border-slate-100 dark:border-slate-900/60 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Label Block */}
          <div className="shrink-0 text-center md:text-left">
            <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">
              PROVEN TRACK RECORD
            </span>
            <h4 className="text-sm font-sans font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center md:justify-start gap-1.5">
              <span>Trusted by Elite Partners</span>
              <span className="text-brand-success font-mono text-xs">• Active Sessions</span>
            </h4>
          </div>

          {/* Marquee Wrapper */}
          <div className="flex-1 w-full overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />

            {/* Marquee Inner Container with Framer Motion */}
            <motion.div
              className="flex gap-8 whitespace-nowrap items-center w-max"
              animate={{ x: ["0%", "-33.333%"] }}
              transition={{
                ease: "linear",
                duration: 22,
                repeat: Infinity
              }}
            >
              {duplicatedClients.map((client, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700/60 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500/80 shrink-0" />
                  <span className="font-heading font-extrabold text-sm text-slate-800 dark:text-slate-200 tracking-tight">
                    {client.name}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider bg-slate-100 dark:bg-slate-950/80 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800/40">
                    {client.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
