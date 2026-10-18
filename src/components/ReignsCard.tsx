import React, { useState } from 'react';
import { GameCard, CardChoice } from '../types/game';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, Lightbulb, ChevronDown, ChevronUp, Compass } from 'lucide-react';

interface ReignsCardProps {
  card: GameCard;
  onChoose: (choice: CardChoice) => void;
  onPreviewChoice?: (choice: CardChoice | null) => void;
  isLocked?: boolean;
  selectedChoiceId?: string | null;
}

export const ReignsCard: React.FC<ReignsCardProps> = ({
  card,
  onChoose,
  onPreviewChoice,
  isLocked = false,
  selectedChoiceId = null,
}) => {
  const [hoveredChoice, setHoveredChoice] = useState<'left' | 'right' | null>(null);
  const [showAnalogy, setShowAnalogy] = useState(false);
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);

  // Drag physics for mobile swipe
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacityLeftBadge = useTransform(x, [-100, -25], [1, 0]);
  const opacityRightBadge = useTransform(x, [25, 100], [0, 1]);

  const handleDragEnd = (_: any, info: any) => {
    if (isLocked) return;
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
            <circle cx="43" cy="42" r="3" fill="#0f172a" />
            <circle cx="57" cy="42" r="3" fill="#0f172a" />
            <rect x="38" y="37" width="10" height="9" rx="2" fill="none" stroke="#047857" strokeWidth="2" />
            <rect x="52" y="37" width="10" height="9" rx="2" fill="none" stroke="#047857" strokeWidth="2" />
            <line x1="48" y1="41" x2="52" y2="41" stroke="#047857" strokeWidth="2" />
            <path d="M 44 54 Q 50 58 56 54" stroke="#047857" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 22 88 C 28 66 72 66 78 88 Z" fill="#047857" />
            <rect x="42" y="66" width="16" height="22" fill="#d1fae5" />
          </svg>
        );
      case 'builder':
        return (
          <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-2xs">
            <circle cx="50" cy="50" r="46" fill="#fef2f2" stroke="#f87171" strokeWidth="2.5" />
            <circle cx="50" cy="45" r="20" fill="#fed7aa" />
            <path d="M 24 35 C 24 22 76 22 76 35 Z" fill="#f59e0b" />
            <rect x="20" y="34" width="60" height="6" rx="3" fill="#d97706" />
            <circle cx="42" cy="46" r="3" fill="#0f172a" />
            <circle cx="58" cy="46" r="3" fill="#0f172a" />
            <path d="M 37 54 C 42 62 58 62 63 54" stroke="#92400e" strokeWidth="2.5" fill="#78350f" />
            <path d="M 20 88 C 26 68 74 68 80 88 Z" fill="#dc2626" />
            <rect x="45" y="68" width="10" height="20" fill="#fbbf24" />
          </svg>
        );
      case 'advisor':
        return (
          <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-2xs">
            <circle cx="50" cy="50" r="46" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2.5" />
            <circle cx="50" cy="42" r="20" fill="#fed7aa" />
            <path d="M 30 25 C 30 18 70 18 70 25 L 72 45 C 72 55 28 55 28 45 Z" fill="#1e293b" />
            <circle cx="43" cy="42" r="3" fill="#0f172a" />
            <circle cx="57" cy="42" r="3" fill="#0f172a" />
            <path d="M 45 52 Q 50 56 55 52" stroke="#0f172a" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 22 88 C 28 66 72 66 78 88 Z" fill="#10b981" />
            <polygon points="50,68 45,78 55,78" fill="#ecfdf5" />
          </svg>
        );
      case 'devil':
        return (
          <div className="w-14 h-14 rounded-full bg-rose-100 border-2 border-rose-300 flex items-center justify-center text-3xl shadow-2xs">
            😈
          </div>
        );
      case 'partner':
      default:
        return (
          <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-2xs">
            <circle cx="50" cy="50" r="46" fill="#f0f9ff" stroke="#38bdf8" strokeWidth="2.5" />
            <circle cx="50" cy="42" r="20" fill="#fed7aa" />
            <path d="M 28 36 Q 50 14 72 36" fill="#0284c7" />
            <circle cx="43" cy="42" r="3" fill="#0f172a" />
            <circle cx="57" cy="42" r="3" fill="#0f172a" />
            <path d="M 44 53 Q 50 58 56 53" stroke="#0284c7" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 22 88 C 28 66 72 66 78 88 Z" fill="#0284c7" />
            <circle cx="50" cy="74" r="5" fill="#fef08a" />
          </svg>
        );
    }
  };

  const isLeftSelected = selectedChoiceId === card.leftChoice.id;
  const isRightSelected = selectedChoiceId === card.rightChoice.id;

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center space-y-3 sm:space-y-4">
      {/* Reigns Central Character Card */}
      <motion.div
        style={{ x, rotate }}
        drag={isLocked ? false : 'x'}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.6}
        onDragEnd={handleDragEnd}
        className={`w-full bg-white rounded-2xl sm:rounded-3xl border-2 border-slate-200/90 shadow-md p-4 sm:p-5 text-center relative select-none transition-shadow ${
          isLocked ? 'cursor-not-allowed opacity-90' : 'cursor-grab active:cursor-grabbing hover:shadow-lg'
        }`}
      >
        {/* Swipe Left Stamp Overlay */}
        <motion.div
          style={{ opacity: opacityLeftBadge }}
          className="absolute top-4 left-4 z-20 bg-slate-900 text-white font-extrabold text-[11px] px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm pointer-events-none"
        >
          {card.leftChoice.label}
        </motion.div>

        {/* Swipe Right Stamp Overlay */}
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
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
              {card.character.role}
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight">
              {card.character.name}
            </h3>
          </div>
        </div>

        {/* Character Dialogue Prompt */}
        <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 text-left">
          <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
            {card.prompt}
          </p>
          {card.detailContext && (
            <p className="text-xs sm:text-sm text-slate-700 mt-2 font-medium leading-relaxed border-t border-slate-200/60 pt-2">
              {card.detailContext}
            </p>
          )}
        </div>

        {/* Diablillo vs Asesor Dual Voices */}
        {card.devilVoice && card.advisorVoice && (
          <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
            <div className="p-2.5 rounded-xl bg-rose-50/90 border border-rose-200/90 text-rose-950 space-y-0.5 shadow-2xs">
              <span className="text-xs font-black uppercase tracking-wider text-rose-900 flex items-center gap-1">
                <span>😈</span>
                <span>El Diablillo susurra:</span>
              </span>
              <p className="text-xs sm:text-sm font-semibold italic text-rose-950 leading-relaxed">
                «{card.devilVoice}»
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50/90 border border-emerald-200/90 text-emerald-950 space-y-0.5 shadow-2xs">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-900 flex items-center gap-1">
                <span>🛡️</span>
                <span>Tu Asesor responde:</span>
              </span>
              <p className="text-xs sm:text-sm font-semibold italic text-emerald-950 leading-relaxed">
                «{card.advisorVoice}»
              </p>
            </div>
          </div>
        )}

        {/* Phase Analogy Accordion (Easy to understand & adaptable to each case) */}
        {card.phaseAnalogy && (
          <div className="mt-2.5 rounded-xl border border-amber-200/90 bg-amber-50/70 overflow-hidden text-left shadow-2xs">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowAnalogy(!showAnalogy);
              }}
              className="w-full px-3 py-2.5 flex items-center justify-between text-xs sm:text-sm font-bold text-amber-950 hover:bg-amber-100/70 transition cursor-pointer"
            >
              <div className="flex items-center gap-1.5 min-w-0 pr-1">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="truncate">
                  Analogía de la fase: <strong>{card.phaseAnalogy.title}</strong>
                </span>
              </div>
              {showAnalogy ? (
                <ChevronUp className="w-4 h-4 text-amber-800 shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-amber-800 shrink-0" />
              )}
            </button>

            {showAnalogy && (
              <div className="p-3.5 bg-white/95 border-t border-amber-200/80 text-xs sm:text-sm text-slate-800 space-y-2.5 animate-in fade-in duration-150">
                <div className="text-xs sm:text-sm text-amber-950 font-serif italic border-l-3 border-amber-500 pl-2.5 bg-amber-50/80 py-1.5 rounded-r font-medium">
                  «{card.phaseAnalogy.metaphor}»
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                  {card.phaseAnalogy.explanation}
                </p>

                {card.phaseAnalogy.cases && card.phaseAnalogy.cases.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      🎯 Adaptable a tu caso concreto:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {card.phaseAnalogy.cases.map((c, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCaseIdx(idx);
                          }}
                          className={`text-xs px-2.5 py-1 rounded-md font-bold transition cursor-pointer ${
                            selectedCaseIdx === idx
                              ? 'bg-amber-700 text-white shadow-2xs'
                              : 'bg-amber-100/80 text-amber-900 hover:bg-amber-200/80'
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                    {card.phaseAnalogy.cases[selectedCaseIdx] && (
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed">
                        <span className="font-bold text-amber-950 block mb-0.5">
                          Para tu proyecto:
                        </span>
                        {card.phaseAnalogy.cases[selectedCaseIdx].tip}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Compact Swipe hint */}
        <div className="mt-2.5 text-center">
          <span className="text-xs text-slate-500 font-medium">
            {isLocked ? 'Procesando decisión...' : '← Arrastra la tarjeta o pulsa una opción abajo →'}
          </span>
        </div>
      </motion.div>

      {/* Two Clear Buttons Under the Card - 2 columns on mobile, 2 rows in each card */}
      <div className="w-full grid grid-cols-2 gap-2 sm:gap-3">
        {/* Left Choice Button */}
        <button
          disabled={isLocked}
          onClick={() => onChoose(card.leftChoice)}
          onMouseEnter={() => {
            if (!isLocked) {
              setHoveredChoice('left');
              onPreviewChoice?.(card.leftChoice);
            }
          }}
          onMouseLeave={() => {
            if (!isLocked) {
              setHoveredChoice(null);
              onPreviewChoice?.(null);
            }
          }}
          className={`p-2.5 sm:p-3.5 rounded-xl border-2 transition-all text-left grid grid-rows-[auto_1fr] gap-1 sm:gap-2 shadow-2xs group relative h-full min-h-[90px] sm:min-h-[105px] ${
            isLeftSelected
              ? 'border-slate-900 bg-slate-900 text-white ring-4 ring-slate-300 scale-102 z-10'
              : isLocked && !isLeftSelected
              ? 'opacity-40 grayscale border-slate-200 bg-white cursor-not-allowed'
              : 'border-slate-300 bg-white hover:border-slate-800 hover:bg-slate-50 active:scale-98 cursor-pointer'
          }`}
        >
          {/* Fila 1: Indicador y flecha */}
          <div className="flex items-center justify-between w-full">
            <span
              className={`w-5 h-5 rounded-md font-bold text-xs flex items-center justify-center transition shrink-0 ${
                isLeftSelected
                  ? 'bg-white text-slate-900'
                  : 'bg-slate-100 group-hover:bg-slate-900 group-hover:text-white text-slate-700'
              }`}
            >
              {isLeftSelected ? <Check className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
            </span>
            <span
              className={`text-xs font-black uppercase tracking-wider ${
                isLeftSelected ? 'text-slate-200' : 'text-slate-600'
              }`}
            >
              {isLeftSelected ? 'Seleccionada' : 'Opción A'}
            </span>
          </div>

          {/* Fila 2: Texto de la decisión */}
          <div className="w-full flex flex-col justify-center min-w-0">
            <h4
              className={`text-xs sm:text-sm font-extrabold leading-tight break-words ${
                isLeftSelected ? 'text-white' : 'text-slate-900'
              }`}
            >
              {card.leftChoice.label}
            </h4>
            {card.leftChoice.subtext && (
              <p
                className={`text-xs mt-1 line-clamp-2 leading-snug break-words font-medium ${
                  isLeftSelected ? 'text-slate-200' : 'text-slate-600'
                }`}
              >
                {card.leftChoice.subtext}
              </p>
            )}
          </div>
        </button>

        {/* Right Choice Button */}
        <button
          disabled={isLocked}
          onClick={() => onChoose(card.rightChoice)}
          onMouseEnter={() => {
            if (!isLocked) {
              setHoveredChoice('right');
              onPreviewChoice?.(card.rightChoice);
            }
          }}
          onMouseLeave={() => {
            if (!isLocked) {
              setHoveredChoice(null);
              onPreviewChoice?.(null);
            }
          }}
          className={`p-2.5 sm:p-3.5 rounded-xl border-2 transition-all text-left grid grid-rows-[auto_1fr] gap-1 sm:gap-2 shadow-2xs group relative h-full min-h-[90px] sm:min-h-[105px] ${
            isRightSelected
              ? 'border-emerald-700 bg-emerald-800 text-white ring-4 ring-emerald-300 scale-102 z-10'
              : isLocked && !isRightSelected
              ? 'opacity-40 grayscale border-slate-200 bg-white cursor-not-allowed'
              : 'border-emerald-600 bg-white hover:bg-emerald-50 active:scale-98 cursor-pointer'
          }`}
        >
          {/* Fila 1: Indicador y flecha */}
          <div className="flex items-center justify-between w-full">
            <span
              className={`text-xs font-black uppercase tracking-wider ${
                isRightSelected ? 'text-emerald-100' : 'text-emerald-800'
              }`}
            >
              {isRightSelected ? 'Seleccionada' : 'Opción B'}
            </span>
            <span
              className={`w-5 h-5 rounded-md font-bold text-xs flex items-center justify-center transition shrink-0 ${
                isRightSelected
                  ? 'bg-white text-emerald-900'
                  : 'bg-emerald-100 group-hover:bg-emerald-700 group-hover:text-white text-emerald-800'
              }`}
            >
              {isRightSelected ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </span>
          </div>

          {/* Fila 2: Texto de la decisión */}
          <div className="w-full flex flex-col justify-center min-w-0">
            <h4
              className={`text-xs sm:text-sm font-extrabold leading-tight break-words ${
                isRightSelected ? 'text-white' : 'text-slate-900'
              }`}
            >
              {card.rightChoice.label}
            </h4>
            {card.rightChoice.subtext && (
              <p
                className={`text-xs mt-1 line-clamp-2 leading-snug break-words font-medium ${
                  isRightSelected ? 'text-emerald-100' : 'text-slate-700'
                }`}
              >
                {card.rightChoice.subtext}
              </p>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};
