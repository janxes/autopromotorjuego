import React, { useState } from 'react';
import { GameCard, CardChoice } from '../types/game';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ReignsCardProps {
  card: GameCard;
  onChoose: (choice: CardChoice) => void;
  onPreviewChoice?: (choice: CardChoice | null) => void;
}

export const ReignsCard: React.FC<ReignsCardProps> = ({
  card,
  onChoose,
  onPreviewChoice,
}) => {
  const [hoveredChoice, setHoveredChoice] = useState<'left' | 'right' | null>(null);

  // Drag physics for mobile swipe
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacityLeftBadge = useTransform(x, [-100, -25], [1, 0]);
  const opacityRightBadge = useTransform(x, [25, 100], [0, 1]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -80) {
      onChoose(card.leftChoice);
    } else if (info.offset.x > 80) {
      onChoose(card.rightChoice);
    }
  };

  const getCharacterGeometricAvatar = () => {
    switch (card.character.id) {
      case 'architect':
        return (
          <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-2xs">
            <circle cx="50" cy="50" r="46" fill="#ecfdf5" stroke="#10b981" strokeWidth="2.5" />
            <circle cx="50" cy="42" r="20" fill="#fed7aa" />
            <path d="M 28 35 Q 50 18 72 35" fill="#047857" />
            <rect x="37" y="38" width="11" height="7" rx="2" fill="none" stroke="#0f172a" strokeWidth="2" />
            <rect x="52" y="38" width="11" height="7" rx="2" fill="none" stroke="#0f172a" strokeWidth="2" />
            <line x1="48" y1="42" x2="52" y2="42" stroke="#0f172a" strokeWidth="2" />
            <path d="M 24 85 Q 50 65 76 85" fill="#065f46" />
            <polygon points="44,68 56,68 50,80" fill="#ffffff" />
          </svg>
        );
      case 'builder':
        return (
          <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-2xs">
            <circle cx="50" cy="50" r="46" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5" />
            <path d="M 26 38 C 26 22 74 22 74 38 Z" fill="#eab308" />
            <rect x="22" y="36" width="56" height="5" rx="2" fill="#ca8a04" />
            <circle cx="50" cy="50" r="19" fill="#fed7aa" />
            <circle cx="43" cy="48" r="2.5" fill="#0f172a" />
            <circle cx="57" cy="48" r="2.5" fill="#0f172a" />
            <path d="M 44 56 Q 50 60 56 56" stroke="#92400e" strokeWidth="2" fill="none" />
            <path d="M 24 88 Q 50 72 76 88" fill="#b45309" />
          </svg>
        );
      case 'advisor':
        return (
          <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-2xs">
            <circle cx="50" cy="50" r="46" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2.5" />
            <circle cx="50" cy="44" r="20" fill="#fed7aa" />
            <path d="M 30 36 C 30 20 70 20 70 36" fill="#312e81" />
            <circle cx="44" cy="42" r="2.5" fill="#0f172a" />
            <circle cx="56" cy="42" r="2.5" fill="#0f172a" />
            <path d="M 46 54 Q 50 57 54 54" stroke="#0f172a" strokeWidth="2" fill="none" />
            <path d="M 22 86 Q 50 68 78 86" fill="#4338ca" />
            <circle cx="50" cy="74" r="4" fill="#10b981" />
          </svg>
        );
      case 'partner':
      default:
        return (
          <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-2xs">
            <circle cx="50" cy="50" r="46" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2.5" />
            <circle cx="50" cy="44" r="20" fill="#fed7aa" />
            <path d="M 32 32 Q 50 16 68 32 Q 72 40 68 44 Q 50 24 32 44 Z" fill="#0369a1" />
            <circle cx="43" cy="44" r="2.5" fill="#0f172a" />
            <circle cx="57" cy="44" r="2.5" fill="#0f172a" />
            <path d="M 44 54 Q 50 60 56 54" stroke="#0f172a" strokeWidth="2" fill="none" />
            <path d="M 22 88 Q 50 70 78 88" fill="#0284c7" />
          </svg>
        );
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center space-y-3 sm:space-y-4">
      {/* Reigns Character Card */}
      <motion.div
        style={{ x, rotate }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.6}
        onDragEnd={handleDragEnd}
        className="w-full bg-white rounded-2xl border-2 border-slate-200 shadow-md p-4 sm:p-5 relative cursor-grab active:cursor-grabbing select-none transition-shadow hover:shadow-lg"
      >
        {/* Swipe Overlays for Left/Right dragging */}
        <motion.div
          style={{ opacity: opacityLeftBadge }}
          className="absolute top-4 left-4 z-20 bg-rose-600 text-white font-extrabold text-[11px] px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm pointer-events-none"
        >
          {card.leftChoice.label}
        </motion.div>

        <motion.div
          style={{ opacity: opacityRightBadge }}
          className="absolute top-4 right-4 z-20 bg-emerald-600 text-white font-extrabold text-[11px] px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm pointer-events-none"
        >
          {card.rightChoice.label}
        </motion.div>

        {/* Character Lockup */}
        <div className="flex items-center gap-3">
          <div className="shrink-0 p-0.5 rounded-full bg-slate-50 border border-slate-200">
            {getCharacterGeometricAvatar()}
          </div>

          <div className="text-left">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              {card.character.role}
            </span>
            <h3 className="text-base font-black text-slate-900 tracking-tight leading-tight">
              {card.character.name}
            </h3>
          </div>
        </div>

        {/* Character Dialogue Prompt */}
        <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-left">
          <p className="text-sm sm:text-base font-semibold text-slate-800 leading-snug">
            {card.prompt}
          </p>
          {card.detailContext && (
            <p className="text-[11px] text-slate-500 mt-1.5 font-normal leading-normal">
              {card.detailContext}
            </p>
          )}
        </div>

        {/* Compact Swipe hint */}
        <div className="mt-2 text-center">
          <span className="text-[10px] text-slate-400 font-medium">
            ← Arrastra la tarjeta o pulsa una opción abajo →
          </span>
        </div>
      </motion.div>

      {/* Two Clear Buttons Under the Card */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
        {/* Left Choice Button */}
        <button
          onClick={() => onChoose(card.leftChoice)}
          onMouseEnter={() => {
            setHoveredChoice('left');
            onPreviewChoice?.(card.leftChoice);
          }}
          onMouseLeave={() => {
            setHoveredChoice(null);
            onPreviewChoice?.(null);
          }}
          className="p-3.5 sm:p-4 rounded-xl border-2 border-slate-300 bg-white hover:border-slate-800 hover:bg-slate-50 active:scale-98 transition-all text-left flex flex-col justify-between space-y-1.5 shadow-2xs group"
        >
          <div className="flex items-center justify-between">
            <span className="w-5 h-5 rounded-md bg-slate-100 group-hover:bg-slate-900 group-hover:text-white text-slate-700 font-bold text-[10px] flex items-center justify-center transition">
              <ArrowLeft className="w-3 h-3" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Opción A
            </span>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
              {card.leftChoice.label}
            </h4>
            {card.leftChoice.subtext && (
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                {card.leftChoice.subtext}
              </p>
            )}
          </div>
        </button>

        {/* Right Choice Button */}
        <button
          onClick={() => onChoose(card.rightChoice)}
          onMouseEnter={() => {
            setHoveredChoice('right');
            onPreviewChoice?.(card.rightChoice);
          }}
          onMouseLeave={() => {
            setHoveredChoice(null);
            onPreviewChoice?.(null);
          }}
          className="p-3.5 sm:p-4 rounded-xl border-2 border-emerald-600 bg-white hover:bg-emerald-50 active:scale-98 transition-all text-left flex flex-col justify-between space-y-1.5 shadow-2xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              Opción B
            </span>
            <span className="w-5 h-5 rounded-md bg-emerald-100 group-hover:bg-emerald-700 group-hover:text-white text-emerald-800 font-bold text-[10px] flex items-center justify-center transition">
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
              {card.rightChoice.label}
            </h4>
            {card.rightChoice.subtext && (
              <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">
                {card.rightChoice.subtext}
              </p>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};
