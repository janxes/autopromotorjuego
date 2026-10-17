import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Clock, Brain, RotateCcw } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
  hasSavedProgress?: boolean;
  savedTurn?: number;
  onResume?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  hasSavedProgress = false,
  savedTurn = 1,
  onResume,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto my-3 sm:my-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-6 sm:space-y-8 animate-in fade-in zoom-in-95 duration-300">
      {/* Top Brand Logo */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-5">
        <div className="h-9 sm:h-10 flex items-center">
          <img
            src="/images/Logomedgonnofondo.png"
            alt="Medgon Passivhaus"
            className="h-9 sm:h-10 w-auto max-w-[130px] object-contain"
          />
        </div>
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full">
          Asesoría Interactiva
        </span>
      </div>

      {/* Hero Headline & Subhead (Seth Godin Style) */}
      <div className="space-y-3">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-[1.15]">
          Tu casa empieza antes del primer ladrillo.
        </h1>
        <p className="text-base sm:text-lg font-bold text-emerald-900 leading-snug">
          No necesitas saber de construcción. Solo decidir.
        </p>
      </div>

      {/* Seth Godin Narrative Flow: Short, Punchy, Meaningful */}
      <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
        <p>
          En <strong>3 minutos</strong>, recorrerás cinco momentos clave: de la parcela al hogar. Elige entre dos opciones y descubre cómo cambian tu presupuesto, las semanas y tu estrés.
        </p>

        {/* The 3 Core Variables Pill Grid */}
        <div className="grid grid-cols-3 gap-2 py-1">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-0.5">
            <span className="text-xs sm:text-sm font-black text-slate-900 block">💰 Presupuesto</span>
            <span className="text-[10px] text-slate-500 block">Precios cerrados</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-0.5">
            <span className="text-xs sm:text-sm font-black text-slate-900 block">⏱️ Semanas</span>
            <span className="text-[10px] text-slate-500 block">Plazos en seco</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-0.5">
            <span className="text-xs sm:text-sm font-black text-slate-900 block">🧠 Estrés</span>
            <span className="text-[10px] text-slate-500 block">Cero sorpresas</span>
          </div>
        </div>

        {/* Seth Godin Highlight Callout: Freedom to experiment */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border-l-4 border-amber-500 text-amber-950 font-medium text-sm sm:text-base">
          «Puedes equivocarte. Aquí sale barato. También puedes rectificar.»
        </div>

        <p>
          No se trata de acertarlo todo. Se trata de descubrir qué preguntar, qué dejar definido y qué no confiar al «ya lo veremos».
        </p>

        <p className="font-semibold text-slate-900">
          Al terminar, tendrás algo más útil que una puntuación: mejores preguntas para construir tu casa.
        </p>
      </div>

      {/* Main Call to Action Buttons */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <button
          onClick={onStart}
          className="w-full py-4 px-6 rounded-2xl bg-slate-950 hover:bg-black text-white font-black text-base shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 flex items-center justify-center gap-2.5 transition active:scale-[0.99] cursor-pointer"
        >
          <span>Empezar mi proyecto</span>
          <ArrowRight className="w-5 h-5 text-emerald-400" />
        </button>

        {hasSavedProgress && onResume && (
          <button
            onClick={onResume}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Continuar donde lo dejé (Hito {savedTurn} de 5)</span>
          </button>
        )}
      </div>

      {/* Discreet Footnote */}
      <div className="text-center pt-1">
        <span className="text-[11px] text-slate-400 font-medium tracking-tight">
          Simulación educativa con cifras ilustrativas.
        </span>
      </div>
    </div>
  );
};
