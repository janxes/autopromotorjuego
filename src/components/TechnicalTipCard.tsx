import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp, RotateCcw, Compass, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { TechnicalTip, PhaseAnalogyCase } from '../types/game';

interface TechnicalTipCardProps {
  warning: string;
  advice: string;
  quote: string;
  analogy?: TechnicalTip['analogy'];
  onKeepDecision: () => void;
  onReviewDecision: () => void;
}

export const TechnicalTipCard: React.FC<TechnicalTipCardProps> = ({
  warning,
  advice,
  quote,
  analogy,
  onKeepDecision,
  onReviewDecision,
}) => {
  const [showDeepDetail, setShowDeepDetail] = useState(true); // Open by default so the player sees the analogy
  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number>(0);

  // Fallback analogy in case none is passed
  const activeAnalogy = analogy || {
    title: 'La analogía de la obra improvisada vs de precisión',
    story: 'En la obra tradicional los sobrecostes ocurren por empezar a levantar paredes sobre el barro sin haber resuelto cada tubo y cada esquina en una maqueta digital previa.',
    lesson: 'Es como intentar montar un mueble cortando maderas a ojo en el suelo en vez de recibir piezas de precisión con instrucciones exactas.',
    adaptableAdvice: 'Para tu caso: exige siempre mediciones cerradas y planos de detalle antes de mover la primera máquina.',
    cases: [
      {
        label: 'Presupuesto de banco justo',
        tip: 'Un precio sin partidas cerradas suele desviarse entre un +15% y un +25% que tendrás que pagar de tu bolsillo.'
      },
      {
        label: 'Terreno con desniveles',
        tip: 'Las cotas milimétricas calculadas en taller evitan sorpresas de contención de tierras.'
      }
    ]
  };

  const casesList: PhaseAnalogyCase[] = activeAnalogy.cases || [];

  return (
    <div className="w-full max-w-lg mx-auto bg-amber-50/95 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
      {/* Part 1: Immediate Consequence Warning */}
      <div className="flex items-start gap-2.5">
        <div className="p-1 rounded-lg bg-amber-200/80 text-amber-900 shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5 text-amber-800" />
        </div>
        <div className="space-y-0.5">
          <span className="text-xs font-black uppercase tracking-wider text-amber-900 block">
            Alerta pedagógica · Fricción en obra tradicional
          </span>
          <h4 className="text-xs sm:text-sm font-extrabold text-amber-950 leading-snug">
            {warning}
          </h4>
        </div>
      </div>

      {/* Part 2: Plain Language Advice */}
      <div className="p-3.5 rounded-xl bg-white/95 border border-amber-200 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-1 shadow-2xs">
        <strong className="text-amber-950 font-bold block text-xs uppercase tracking-wider">
          La lección para no caer en la trampa:
        </strong>
        <p className="text-slate-800 font-medium">{advice}</p>
      </div>

      {/* Part 3: Real Constructor Friction Quote */}
      <div className="text-xs sm:text-sm text-amber-950 italic pl-3 border-l-3 border-amber-500 font-serif bg-amber-100/60 py-2 pr-2.5 rounded-r-lg font-medium">
        {quote}
      </div>

      {/* Part 4: Dynamic & Adaptable Analogy Section */}
      <div className="rounded-xl border border-amber-300/80 bg-amber-100/60 overflow-hidden">
        <button
          onClick={() => setShowDeepDetail(!showDeepDetail)}
          className="w-full px-3.5 py-2.5 text-left text-xs sm:text-sm font-bold text-amber-950 hover:bg-amber-200/50 flex items-center justify-between gap-1 transition"
        >
          <div className="flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Analogía cotidiana: <strong>{activeAnalogy.title}</strong></span>
          </div>
          {showDeepDetail ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
        </button>

        {showDeepDetail && (
          <div className="p-3.5 bg-white/95 border-t border-amber-200 text-xs sm:text-sm text-slate-800 space-y-2.5">
            {/* Analogy Story */}
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
                📖 Para entenderlo de un vistazo:
              </span>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                {activeAnalogy.story}
              </p>
            </div>

            {/* Core Lesson */}
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200/90 text-xs sm:text-sm text-amber-950 font-semibold flex items-start gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{activeAnalogy.lesson}</span>
            </div>

            {/* Adaptable to each specific case */}
            {casesList.length > 0 && (
              <div className="space-y-2 pt-1 border-t border-amber-100">
                <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                  <Compass className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>¿Cómo se adapta a tu caso particular?</span>
                </div>

                {/* Case selector pills */}
                <div className="flex flex-wrap gap-1.5">
                  {casesList.map((c, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedCaseIndex(idx)}
                      className={`text-xs px-2.5 py-1 rounded-md font-bold transition text-left ${
                        selectedCaseIndex === idx
                          ? 'bg-amber-600 text-white shadow-2xs'
                          : 'bg-amber-100/80 text-amber-900 hover:bg-amber-200/80'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>

                {/* Selected case tip */}
                {casesList[selectedCaseIndex] && (
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed animate-in fade-in duration-150">
                    <span className="font-bold text-amber-950 block mb-0.5">
                      Consejo para este caso:
                    </span>
                    {casesList[selectedCaseIndex].tip}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Two Buttons: Mantener mi decisión vs Revisar antes de seguir */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <button
          onClick={onKeepDecision}
          className="px-3 py-2.5 rounded-xl border border-amber-400 text-amber-950 hover:bg-amber-100 font-semibold text-xs transition active:scale-98"
        >
          Asumir el golpe y seguir
        </button>

        <button
          onClick={onReviewDecision}
          className="px-3 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition active:scale-98"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Rectificar opción</span>
        </button>
      </div>
    </div>
  );
};
