import React, { useState, useRef } from 'react';
import { X, RotateCw } from 'lucide-react';
import { teamMembers as initialMembers } from '../data/teamData';

export default function MemberCardsModal({ onClose }) {
  const [members, setMembers] = useState(initialMembers);
  const [flippedMap, setFlippedMap] = useState({});
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [imgErrorMap, setImgErrorMap] = useState({});

  const dragStartPos = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  const toggleFlip = (id) => {
    setFlippedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleImageError = (id) => {
    setImgErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  // Drag & Reorder Handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    isDragging.current = true;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const updated = [...members];
    const item = updated.splice(draggedIndex, 1)[0];
    updated.splice(index, 0, item);
    setDraggedIndex(index);
    setMembers(updated);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setTimeout(() => {
      isDragging.current = false;
    }, 150);
  };

  const handleMouseDown = (e) => {
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    isDragging.current = false;
  };

  const handleMouseUp = (e, id) => {
    const dx = Math.abs(e.clientX - dragStartPos.current.x);
    const dy = Math.abs(e.clientY - dragStartPos.current.y);
    if (dx < 6 && dy < 6 && !isDragging.current) {
      toggleFlip(id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-transparent animate-in fade-in duration-200 select-none">
      {/* 90% Dim right under the card, outer screen left clear */}
      <div className="relative w-full max-w-5xl rounded-3xl border border-neutral-800/90 bg-black/90 backdrop-blur-md p-6 sm:p-10 shadow-[0_0_90px_rgba(0,0,0,0.95)] flex flex-col max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800/70 pb-5 mb-8">
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            팀원 소개
          </h3>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full border border-neutral-700 bg-neutral-900/80 text-neutral-400 hover:text-white hover:border-white transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Member Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow items-center">
          {members.map((member, index) => {
            const isFlipped = !!flippedMap[member.id];
            const isBeingDragged = draggedIndex === index;

            return (
              <div
                key={member.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                onMouseDown={handleMouseDown}
                onMouseUp={(e) => handleMouseUp(e, member.id)}
                style={{ perspective: '1200px' }}
                className={`relative h-[450px] cursor-grab active:cursor-grabbing transition-transform duration-300 ${
                  isBeingDragged
                    ? 'scale-105 rotate-2 opacity-80 shadow-[0_0_40px_rgba(255,255,255,0.3)] animate-pulse'
                    : 'hover:-translate-y-2'
                }`}
              >
                {/* 3D Flip Container */}
                <div
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    transition: 'transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  }}
                  className="relative w-full h-full"
                >
                  {/* ================= FRONT SIDE ================= */}
                  <div
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                    className="absolute inset-0 rounded-2xl p-7 flex flex-col justify-between border border-neutral-700/80 bg-gradient-to-b from-neutral-900/95 via-neutral-950/95 to-black shadow-2xl overflow-hidden cursor-pointer"
                  >
                    <div className="h-4" />

                    {/* Center: J, C, J huge and JEON, JUNG, CHOI smaller */}
                    <div className="my-auto flex flex-col items-center justify-center text-center">
                      <span className="font-mono font-black text-8xl sm:text-9xl text-white tracking-tighter drop-shadow-[0_0_35px_rgba(255,255,255,0.45)] mb-3">
                        {member.initialChar}
                      </span>

                      <span className="font-mono font-bold text-xl sm:text-2xl text-neutral-300 tracking-widest uppercase">
                        {member.code}
                      </span>
                    </div>

                    {/* Bottom Flip Indicator */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-800/80 text-xs font-mono text-neutral-400">
                      <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                        <RotateCw className="w-3.5 h-3.5" />
                        FLIP
                      </span>
                      <span className="text-neutral-500 font-bold">
                        0{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* ================= BACK SIDE ================= */}
                  <div
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                    className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between border border-neutral-600/90 bg-neutral-950 shadow-2xl overflow-hidden cursor-pointer"
                  >
                    <div>
                      {/* Back Header */}
                      <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-black bg-white px-2.5 py-0.5 rounded">
                            {member.code}
                          </span>
                          <span className="font-mono text-xs text-neutral-300 font-semibold">
                            {member.studentId}
                          </span>
                        </div>
                        <RotateCw className="w-4 h-4 text-neutral-400 hover:text-white" />
                      </div>

                      {/* Photo & Name */}
                      <div className="flex items-center gap-3.5 mb-4">
                        <div className="w-14 h-14 rounded-xl border border-neutral-700 bg-neutral-900 overflow-hidden flex-shrink-0 flex items-center justify-center">
                          {!imgErrorMap[member.id] ? (
                            <img
                              src={member.image}
                              alt={member.name}
                              onError={() => handleImageError(member.id)}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center text-center">
                              <span className="font-bold text-white text-base">
                                {member.name[0]}
                              </span>
                              <span className="text-[8px] font-mono text-neutral-500">
                                사진
                              </span>
                            </div>
                          )}
                        </div>
                        <div>
                          <h5 className="font-black text-2xl text-white">
                            {member.name}
                          </h5>
                          <span className="font-mono text-xs text-neutral-400">
                            {member.studentId}
                          </span>
                        </div>
                      </div>

                      {/* Personal Story & Introduction */}
                      <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/80 text-sm text-neutral-200 leading-relaxed break-keep mb-3">
                        {member.summary}
                      </div>
                    </div>

                    {/* Bottom Tags & Close Hint */}
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {member.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="pt-2.5 border-t border-neutral-900 text-xs font-mono text-neutral-400 flex justify-between">
                        <span>다시 클릭하면 닫힙니다</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
