import React from 'react';
import { X } from 'lucide-react';

export default function Project01Modal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/20 backdrop-blur-[1px] animate-in fade-in duration-300 select-none">
      {/* Translucent modal box: 3D cubes and JCJ remain clearly visible behind */}
      <div className="relative w-full max-w-2xl rounded-3xl border border-neutral-700/60 bg-neutral-950/80 backdrop-blur-xl p-8 sm:p-14 shadow-[0_0_80px_rgba(0,0,0,0.85)] flex flex-col items-center justify-center min-h-[360px]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-full border border-neutral-700 bg-neutral-900/80 text-neutral-400 hover:text-white hover:border-white transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Centered 준비중 */}
        <div className="flex flex-col items-center justify-center text-center my-auto">
          <h3 className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-widest uppercase mb-3">
            project_01
          </h3>
          <p className="text-xl sm:text-2xl font-bold text-neutral-300 tracking-wider">
            준비 중
          </p>
        </div>
      </div>
    </div>
  );
}
