import React, { useState } from 'react';
import { AlertTriangle, Lightbulb, ChevronDown, ChevronUp, RotateCcw, Check } from 'lucide-react';

interface TechnicalTipCardProps {
  warning: string;
  advice: string;
  quote: string;
  onKeepDecision: () => void;
  onReviewDecision: () => void;
}

export const TechnicalTipCard: React.FC<TechnicalTipCardProps> = ({
  warning,
  advice,
  quote,
  onKeepDecision,
  onReviewDecision,
}) => {
  const [showDeepDetail, setShowDeepDetail] = useState(false);

  return (
    <div className="w-full max-w-lg mx-auto bg-amber-50/90 border-2 border-amber-300 rounded-3xl p-6 sm:p-7 shadow-md space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-200">
      {/* Part 1: Immediate Consequence Warning */}
      <div className="flex items-start gap-3">
        <span className="text-xl shrink-0" role="img" aria-label="alerta">
          ⚠️
        </span>
        <div className="space-y-1">
          <h4 className="text-sm font-extrabold text-amber-950 leading-snug">
            {warning}
          </h4>
        </div>
      </div>

      {/* Part 2: Technical Advice */}
      <div className="p-3.5 rounded-xl bg-white/80 border border-amber-200 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-1">
        <strong className="text-amber-900 font-bold block text-xs uppercase tracking-wider">
          Consejo técnico:
        </strong>
        <p>{advice}</p>
      </div>

      {/* Part 3: Ironic / Real Construction Quote */}
      <div className="text-xs text-amber-900 italic pl-3 border-l-2 border-amber-400 font-serif">
        {quote}
      </div>

      {/* Optional Deep Details Accordion */}
      <div>
        <button
          onClick={() => setShowDeepDetail(!showDeepDetail)}
          className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1 transition"
        >
          <span>{showDeepDetail ? 'Ocultar detalles técnicos' : 'Entender esta decisión a fondo'}</span>
          {showDeepDetail ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showDeepDetail && (
          <div className="mt-2.5 p-3 rounded-xl bg-amber-100/60 text-xs text-amber-950 leading-relaxed space-y-1">
            <p>
              En la obra tradicional los sobrecostes ocurren por la falta de un gemelo digital BIM que resuelva
              encuentros antes de entrar en parcela. La edificación industrializada de madera técnica
              fija los precios y las tolerancias en fábrica con precisión milimétrica.
            </p>
          </div>
        )}
      </div>

      {/* Two Buttons: Mantener mi decisión vs Revisar antes de seguir */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          onClick={onKeepDecision}
          className="px-4 py-2.5 rounded-xl border border-amber-400 text-amber-950 hover:bg-amber-100 font-semibold text-xs transition"
        >
          Mantener mi decisión
        </button>

        <button
          onClick={onReviewDecision}
          className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Revisar antes de seguir</span>
        </button>
      </div>
    </div>
  );
};
