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
    <div className="w-full max-w-lg mx-auto bg-amber-50/95 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
      {/* Part 1: Immediate Consequence Warning */}
      <div className="flex items-start gap-2.5">
        <span className="text-lg shrink-0" role="img" aria-label="alerta">
          ⚠️
        </span>
        <div className="space-y-0.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">
            Alerta de Obra Real
          </span>
          <h4 className="text-xs sm:text-sm font-extrabold text-amber-950 leading-snug">
            {warning}
          </h4>
        </div>
      </div>

      {/* Part 2: Plain Language Advice */}
      <div className="p-3 rounded-xl bg-white/90 border border-amber-200 text-xs text-slate-800 leading-relaxed space-y-1">
        <strong className="text-amber-900 font-bold block text-[11px] uppercase tracking-wider">
          La lección para no caer en la trampa:
        </strong>
        <p>{advice}</p>
      </div>

      {/* Part 3: Real Constructor Friction Quote */}
      <div className="text-xs text-amber-900 italic pl-2.5 border-l-2 border-amber-400 font-serif">
        {quote}
      </div>

      {/* Analogies & Simple Explanation Accordion */}
      <div>
        <button
          onClick={() => setShowDeepDetail(!showDeepDetail)}
          className="text-[11px] font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1 transition"
        >
          <span>{showDeepDetail ? 'Ocultar explicación simple' : 'Ver la analogía explicada'}</span>
          {showDeepDetail ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        {showDeepDetail && (
          <div className="mt-2 p-2.5 rounded-xl bg-amber-100/70 text-xs text-amber-950 leading-relaxed space-y-1">
            <p>
              En la obra tradicional los sobrecostes ocurren por empezar a levantar paredes sobre el barro sin haber resuelto cada tubo y cada esquina en una maqueta 3D previa. 
            </p>
            <p className="font-semibold text-amber-900">
              Analogía: Es como intentar montar un mueble cortando maderas a ojo en el suelo en vez de recibir piezas de precisión con instrucciones exactas.
            </p>
          </div>
        )}
      </div>

      {/* Two Buttons: Mantener mi decisión vs Revisar antes de seguir */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <button
          onClick={onKeepDecision}
          className="px-3 py-2 rounded-xl border border-amber-400 text-amber-950 hover:bg-amber-100 font-semibold text-xs transition"
        >
          Asumir el golpe y seguir
        </button>

        <button
          onClick={onReviewDecision}
          className="px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-xs transition"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Rectificar opción</span>
        </button>
      </div>
    </div>
  );
};
