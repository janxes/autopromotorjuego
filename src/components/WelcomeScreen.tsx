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

        {/* Core Autopromotor Insight: Por eso lo encargas */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/90 border-2 border-emerald-300 text-emerald-950 space-y-2 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xl">💡</span>
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-900">
              La gran clave del autopromotor: ¿Por qué lo encargas?
            </span>
          </div>
          <p className="text-sm sm:text-base font-bold text-emerald-950 leading-snug">
            Construir no tiene por qué ser una pesadilla de imprevistos que asumas tú en el barro.
          </p>
          <p className="text-xs sm:text-sm text-emerald-900/90 font-medium leading-relaxed">
            En la <strong>obra tradicional</strong>, cada lluvia, retraso y sobrecoste te toca sufrirlo a ti.
            Con la <strong>industrialización en madera técnica y Passivhaus de Medgón</strong>, delegas toda la complejidad técnica en fábrica: <strong>precio cerrado, entrega en semanas y máximo confort sin sorpresas</strong>.
          </p>
        </div>

        {/* Seth Godin Visual Duality: Two Perspectives */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-2">
          <div className="p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200/90 text-rose-950 space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-rose-900 block">
              😈 En la obra tradicional asumes tú:
            </span>
            <p className="text-xs sm:text-sm font-semibold italic text-rose-950 leading-relaxed">
              «Imprevistos, retrasos de meses y facturas abiertas.»
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 text-emerald-950 space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-900 block">
              🛡️ Encargándolo a Medgón obtienes:
            </span>
            <p className="text-xs sm:text-sm font-semibold italic text-emerald-950 leading-relaxed">
              «Fabricación precisa, precio cerrado y entrega rápida.»
            </p>
          </div>
        </div>

        {/* Introductory Help and Accessibility Link */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-start gap-2.5">
            <HelpCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="text-xs sm:text-sm font-black text-slate-900 block">
                ¿Cómo funciona la simulación?
              </span>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                10 decisiones rápidas. Puedes ampliar el tamaño de texto con el botón <strong>«A»</strong> del menú superior o activar alto contraste.
              </p>
            </div>
          </div>
          {onOpenHelp && (
            <button
              type="button"
              onClick={onOpenHelp}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition shrink-0 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Ver guía de ayuda</span>
            </button>
          )}
        </div>

        <p className="text-xs sm:text-sm text-slate-700 font-medium">
          Observa en tiempo real el impacto de cada decisión en tus 4 indicadores clave:
        </p>

        {/* The 4 Core Variables Pill Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 py-1">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center text-center shadow-2xs gap-0.5 min-w-0">
            <span className="text-xs sm:text-sm font-black text-slate-900 block truncate w-full">💰 Dinero</span>
            <span className="text-xs text-slate-600 font-medium block truncate w-full">Precios cerrados</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center text-center shadow-2xs gap-0.5 min-w-0">
            <span className="text-xs sm:text-sm font-black text-slate-900 block truncate w-full">⏱️ Semanas</span>
            <span className="text-xs text-slate-600 font-medium block truncate w-full">Montaje en días</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center text-center shadow-2xs gap-0.5 min-w-0">
            <span className="text-xs sm:text-sm font-black text-slate-900 block truncate w-full">🧠 Estrés</span>
            <span className="text-xs text-slate-600 font-medium block truncate w-full">Cero imprevistos</span>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 flex flex-col items-center justify-center text-center shadow-2xs gap-0.5 min-w-0">
            <span className="text-xs sm:text-sm font-black text-emerald-950 block truncate w-full">⚡ Factura</span>
            <span className="text-xs text-emerald-700 font-medium block truncate w-full">Passivhaus mínima</span>
          </div>
        </div>

        {/* Highlight Callout: Freedom to experiment */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/85 border-l-4 border-amber-500 text-amber-950 space-y-1 shadow-2xs">
          <p className="text-sm sm:text-base font-black text-amber-950 leading-snug">
            «Aquí, equivocarse no cuesta una hipoteca.»
          </p>
          <p className="text-xs sm:text-sm text-amber-900/95 font-medium leading-relaxed">
            Prueba ambos caminos. Si tomas una mala decisión, verás la consecuencia al instante y podrás rectificar gratis para comparar.
          </p>
        </div>
      </div>

      {/* Main Single Action Button (No Express vs Full friction) */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <button
          onClick={() => onStart('full')}
          className="w-full py-4 px-6 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-base sm:text-lg shadow-lg shadow-emerald-950/20 flex items-center justify-center gap-2.5 transition active:scale-[0.99] cursor-pointer"
        >
          <span>Comenzar simulación (10 decisiones clave)</span>
          <ArrowRight className="w-5 h-5 text-emerald-300" />
        </button>

        {hasSavedProgress && onResume && (
          <button
            onClick={onResume}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Continuar donde lo dejé (Hito {savedTurn} de {totalTurns})</span>
          </button>
        )}
      </div>

      {/* Discreet Footnote */}
      <div className="text-center pt-1">
        <span className="text-xs text-slate-500 font-medium">
          Duración estimada: ~4 minutos • Texto directo y adaptado a móvil.
        </span>
      </div>
    </div>
  );
};
