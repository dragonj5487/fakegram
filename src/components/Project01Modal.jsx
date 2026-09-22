import React from 'react';
import { X, Terminal, Cpu, CheckCircle } from 'lucide-react';
import { project01 } from '../data/teamData';

export default function Project01Modal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300 select-none">
      <div className="relative w-full max-w-4xl rounded-3xl border border-neutral-800 bg-neutral-950/95 p-6 sm:p-10 shadow-[0_0_80px_rgba(255,255,255,0.08)] flex flex-col max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-5 mb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 mb-1">
              <Terminal className="w-3.5 h-3.5 text-white" />
              <span>INCUBATION // LAB ARCHIVE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              project_01
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full border border-neutral-700 bg-neutral-900 text-neutral-400 hover:text-white hover:border-white transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Badge & Subtitle */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>STATUS: {project01.statusLabel}</span>
          </div>

          <h4 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug">
            {project01.subtitle}
          </h4>

          <p className="text-base text-neutral-300 leading-relaxed font-sans">
            {project01.description}
          </p>
        </div>

        {/* Feature List */}
        <div className="space-y-3 mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block">
            PLANNED SPECIFICATIONS
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project01.features.map((feature, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-300 font-mono flex flex-col justify-between"
              >
                <div className="font-bold text-white mb-2">[SPEC 0{idx + 1}]</div>
                <div>{feature}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Prototype Pipeline Status */}
        <div className="p-5 rounded-2xl border border-neutral-800/80 bg-neutral-900/30 flex items-center justify-between font-mono text-xs text-neutral-400">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-4 h-4 text-white animate-pulse" />
            <span>SYSTEM PIPELINE: STANDBY</span>
          </div>
          <span className="text-neutral-500">STAGE: DEV_0.1</span>
        </div>
      </div>
    </div>
  );
}
