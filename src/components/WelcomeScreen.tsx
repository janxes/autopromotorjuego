import React from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';

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
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full">
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
        <p className="text-base sm:text-lg font-black text-slate-950 tracking-tight leading-snug">
          Construye tu casa en cinco decisiones.
        </p>

        {/* Las dos voces en contraste */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-2">
          <div className="p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200/90 text-rose-950 space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-rose-900 block">
              😈 El diablillo susurra:
            </span>
            <p className="text-xs sm:text-sm font-semibold italic text-rose-950 leading-relaxed">
              «Empieza ya, luego lo vemos.»
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 text-emerald-950 space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-900 block">
              🛡️ Tu ángel asesor pregunta:
            </span>
            <p className="text-xs sm:text-sm font-semibold italic text-emerald-950 leading-relaxed">
              «¿Está todo definido?»
            </p>
          </div>
        </div>

        <p>
          <strong>Tú eliges.</strong> Observa cómo cambian tu dinero, las semanas, tu estrés y el coste energético en tiempo real:
        </p>

        {/* The 4 Core Variables Pill Grid - 2 columns on mobile with 2 rows per card, 4 columns on desktop */}
        <div className="grid grid-cols-2 min-[1080px]:grid-cols-4 gap-2 sm:gap-2.5 py-1">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center text-center shadow-2xs gap-0.5 min-w-0">
            <span className="text-xs sm:text-sm font-black text-slate-900 block truncate w-full">💰 Dinero</span>
            <span className="text-xs text-slate-600 font-medium block truncate w-full">Precios cerrados</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center text-center shadow-2xs gap-0.5 min-w-0">
            <span className="text-xs sm:text-sm font-black text-slate-900 block truncate w-full">⏱️ Semanas</span>
            <span className="text-xs text-slate-600 font-medium block truncate w-full">Plazos en seco</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center text-center shadow-2xs gap-0.5 min-w-0">
            <span className="text-xs sm:text-sm font-black text-slate-900 block truncate w-full">🧠 Estrés</span>
            <span className="text-xs text-slate-600 font-medium block truncate w-full">Cero sorpresas</span>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 flex flex-col items-center justify-center text-center shadow-2xs gap-0.5 min-w-0">
            <span className="text-xs sm:text-sm font-black text-emerald-950 block truncate w-full">⚡ Eficiencia</span>
            <span className="text-xs text-emerald-700 font-medium block truncate w-full">Factura mínima</span>
          </div>
        </div>

        {/* Seth Godin Highlight Callout: Freedom to experiment */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/85 border-l-4 border-amber-500 text-amber-950 space-y-1.5 shadow-2xs">
          <p className="text-base sm:text-lg font-black text-amber-950 leading-snug">
            «Aquí, equivocarse no cuesta una hipoteca.»
          </p>
          <p className="text-xs sm:text-sm text-amber-900/95 font-medium leading-relaxed">
            Puedes equivocarte. Aquí sale gratis. También puedes rectificar y comparar qué habría ocurrido si hubieras tomado el otro camino.
          </p>
        </div>

        <p>
          En <strong>tres minutos</strong> descubrirás qué preguntar antes de construir, qué dejar cerrado en contrato y qué no confiar jamás a la improvisación.
        </p>

        <p className="font-bold text-slate-950">
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
        <span className="text-xs text-slate-600 font-medium tracking-normal">
          Simulación educativa con cifras ilustrativas.
        </span>
      </div>
    </div>
  );
};
