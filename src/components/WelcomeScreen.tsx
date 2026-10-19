import React, { useState } from 'react';
import { ArrowRight, RotateCcw, Check, Zap, Map, HelpCircle } from 'lucide-react';
import { GameMode } from '../types/game';

interface WelcomeScreenProps {
  onStart: (mode: GameMode) => void;
  hasSavedProgress?: boolean;
  savedTurn?: number;
  totalTurns?: number;
  currentMode?: GameMode;
  onResume?: () => void;
  onOpenHelp?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  hasSavedProgress = false,
  savedTurn = 1,
  totalTurns = 10,
  currentMode = 'full',
  onResume,
  onOpenHelp,
}) => {
  const [selectedMode, setSelectedMode] = useState<GameMode>(currentMode);

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
          Construir no es apilar materiales. Es tomar diez decisiones estratégicas en el orden correcto.
        </p>
      </div>

      {/* Main Copy (Short, Punchy, Seth Godin Manifesto) */}
      <div className="space-y-4 text-xs sm:text-sm text-slate-800 font-normal leading-relaxed">
        <p>
          La mayoría de la gente cree que el mayor riesgo de una obra es el hormigón o la lluvia.
          <strong> No lo es.</strong>
        </p>

        <p>
          El verdadero riesgo son las decisiones que tomas antes de que entre la excavadora:
          firmar folios abiertos, no contrastar la viabilidad de la parcela, añadir soluciones Passivhaus como un menú a la carta o dejar la coordinación en un grupo de WhatsApp.
        </p>

        {/* Seth Godin Visual Duality: Two Perspectives */}
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

        {/* Introductory Help and Accessibility Link */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-start gap-2.5">
            <HelpCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="text-xs sm:text-sm font-black text-emerald-950 block">
                ¿Cómo se juega y cuál es la intención de este juego?
              </span>
              <p className="text-[11px] sm:text-xs text-emerald-900/90 font-medium leading-relaxed">
                Descubre cómo tomar decisiones estratégicas de autopromoción y cómo utilizar las <strong>opciones de accesibilidad</strong> (como ampliar el tamaño de texto con el botón <strong>«A»</strong> o activar el modo de alto contraste).
              </p>
            </div>
          </div>
          {onOpenHelp && (
            <button
              type="button"
              onClick={onOpenHelp}
              className="px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition shrink-0 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Ver guía de ayuda</span>
            </button>
          )}
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

        {/* MODE SELECTOR: Full (10 phases) vs Quick (5 phases) */}
        <div className="pt-2 space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-900 block">
            Elige tu modo de simulación:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Mode 1: Full Journey */}
            <button
              type="button"
              onClick={() => setSelectedMode('full')}
              className={`p-3.5 rounded-2xl border text-left transition relative cursor-pointer ${
                selectedMode === 'full'
                  ? 'bg-emerald-50/90 border-emerald-600 ring-2 ring-emerald-500/30'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Map className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="text-xs sm:text-sm font-black text-slate-900">
                    «De la parcela a las llaves»
                  </span>
                </div>
                {selectedMode === 'full' && (
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                )}
              </div>
              <p className="text-[11px] text-slate-600 mt-1 font-medium leading-snug">
                El recorrido completo en <strong>10 fases</strong> estratégicas (~5–8 min).
              </p>
              <span className="inline-block mt-2 text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                Recomendado
              </span>
            </button>

            {/* Mode 2: Quick Play */}
            <button
              type="button"
              onClick={() => setSelectedMode('quick')}
              className={`p-3.5 rounded-2xl border text-left transition relative cursor-pointer ${
                selectedMode === 'quick'
                  ? 'bg-sky-50/90 border-sky-600 ring-2 ring-sky-500/30'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-sky-700 shrink-0" />
                  <span className="text-xs sm:text-sm font-black text-slate-900">
                    «Partida rápida»
                  </span>
                </div>
                {selectedMode === 'quick' && (
                  <Check className="w-4 h-4 text-sky-700 shrink-0" />
                )}
              </div>
              <p className="text-[11px] text-slate-600 mt-1 font-medium leading-snug">
                <strong>5 decisiones clave</strong> express seleccionadas (~3–4 min).
              </p>
              <span className="inline-block mt-2 text-[10px] font-bold text-sky-800 bg-sky-100/70 px-2 py-0.5 rounded-md">
                Express
              </span>
            </button>
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
          En {selectedMode === 'full' ? 'unos 5–8 minutos' : 'tres minutos'} descubrirás qué preguntar antes de construir, qué dejar cerrado en contrato y qué no confiar jamás a la improvisación.
        </p>

        <p className="font-bold text-slate-950">
          Al terminar, tendrás algo más útil que una puntuación: mejores preguntas para construir tu casa.
        </p>
      </div>

      {/* Main Call to Action Buttons */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <button
          onClick={() => onStart(selectedMode)}
          className="w-full py-4 px-6 rounded-2xl bg-slate-950 hover:bg-black text-white font-black text-base shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 flex items-center justify-center gap-2.5 transition active:scale-[0.99] cursor-pointer"
        >
          <span>
            {selectedMode === 'full'
              ? 'Empezar el recorrido completo (10 fases)'
              : 'Empezar partida rápida (5 fases)'}
          </span>
          <ArrowRight className="w-5 h-5 text-emerald-400" />
        </button>

        {hasSavedProgress && onResume && (
          <button
            onClick={onResume}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Continuar donde lo dejé (Hito {savedTurn} de {totalTurns})</span>
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
