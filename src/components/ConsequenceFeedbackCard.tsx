import React from 'react';
import {
  TrendingDown,
  Clock,
  Zap,
  ShieldCheck,
  Smile,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { DecisionFeedbackState } from '../hooks/useDecisionFeedback';

interface ConsequenceFeedbackCardProps {
  feedback: DecisionFeedbackState;
  onAdvance: () => void;
}

export const ConsequenceFeedbackCard: React.FC<ConsequenceFeedbackCardProps> = ({
  feedback,
  onAdvance,
}) => {
  const {
    title,
    label,
    consequenceText,
    deltaPresupuesto,
    deltaSemanas,
    deltaEstres,
    deltaFactura,
    partnerReaction,
    nextIndicators,
    step,
  } = feedback;

  const formatoEuros = (val: number) =>
    new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(val) + ' €';

  // Computed values
  const nuevoSaldo = nextIndicators?.presupuestoRestante ?? 250000;
  const nuevoDesvio = nextIndicators?.desvioEuros ?? 0;
  const nuevasSemanas = nextIndicators?.semanasTranscurridas ?? 0;
  const nuevoEstres = nextIndicators?.estresPorcentaje ?? 10;
  const nuevaFactura = nextIndicators?.facturaEnergeticaMes ?? 35;

  const isComplete = step >= 5;

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-2xl border-2 border-slate-300 shadow-xl p-4 sm:p-5 space-y-3.5 animate-card-overlay-in relative overflow-hidden flex flex-col">
      {/* Top Banner & Header - strictly 1 single column */}
      <div className="flex flex-col items-start gap-1.5 border-b border-slate-100 pb-2.5 w-full">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-700 animate-ping shrink-0" />
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800">
            Consecuencias de tu elección
          </span>
        </div>

        <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-700">
          {label}
        </span>

        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight mt-0.5">
          {title}
        </h3>
      </div>

      {/* Narrative Explanation - single column */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium w-full">
        {consequenceText}
      </div>

      {/* 4 STAGGERED CONSEQUENCE ITEMS - strictly 1 single column in all sections */}
      <div className="flex flex-col space-y-2.5 w-full">
        {/* Item 1: Presupuesto (Reveals at step >= 1) */}
        {step >= 1 ? (
          <div
            className={`p-3 rounded-xl border flex flex-col items-start gap-2 animate-item-pop transition-all w-full ${
              deltaPresupuesto < 0
                ? 'bg-rose-50/90 border-rose-300 text-rose-950'
                : 'bg-teal-50/90 border-teal-300 text-teal-950'
            }`}
          >
            <div className="flex items-center justify-between w-full gap-2">
              <span
                className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0 ${
                  deltaPresupuesto < 0
                    ? 'bg-rose-200/90 text-rose-900'
                    : 'bg-teal-200/90 text-teal-900'
                }`}
              >
                {deltaPresupuesto < 0 ? '⚠️ Desfavorable' : '✓ Favorable'}
              </span>
            </div>

            <div className="flex items-center gap-2 w-full min-w-0">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-2xs ${
                  deltaPresupuesto < 0 ? 'bg-rose-600 text-white' : 'bg-teal-600 text-white'
                }`}
              >
                {deltaPresupuesto < 0 ? (
                  <TrendingDown className="w-3.5 h-3.5" />
                ) : (
                  <ShieldCheck className="w-3.5 h-3.5" />
                )}
              </div>
              <span className="text-xs sm:text-sm font-black tracking-tight">
                {deltaPresupuesto < 0
                  ? `−${formatoEuros(Math.abs(deltaPresupuesto))} de presupuesto`
                  : '0 € de sobrecoste · Presupuesto protegido'}
              </span>
            </div>

            <div className="text-[11px] opacity-85 flex flex-col items-start gap-0.5 pl-9 w-full">
              <span>
                <strong>Variación:</strong> {deltaPresupuesto < 0 ? `${deltaPresupuesto} €` : '0 €'}
              </span>
              <span>
                <strong>Saldo restante:</strong> {formatoEuros(nuevoSaldo)}
              </span>
              {nuevoDesvio > 0 && (
                <span className="text-rose-700 font-bold">
                  Desvío acumulado: +{formatoEuros(nuevoDesvio)}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="h-12 rounded-xl bg-slate-100/60 border border-dashed border-slate-200 animate-pulse flex items-center px-4 w-full">
            <span className="text-[10px] text-slate-400 font-medium">Evaluando impacto presupuestario...</span>
          </div>
        )}

        {/* Item 2: Plazo / Calendario (Reveals at step >= 2) */}
        {step >= 2 ? (
          <div
            className={`p-3 rounded-xl border flex flex-col items-start gap-2 animate-item-pop transition-all w-full ${
              deltaSemanas > 0
                ? deltaSemanas > 2
                  ? 'bg-rose-50/90 border-rose-300 text-rose-950'
                  : 'bg-amber-50/90 border-amber-300 text-amber-950'
                : 'bg-teal-50/90 border-teal-300 text-teal-950'
            }`}
          >
            <div className="flex items-center justify-between w-full gap-2">
              <span
                className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0 ${
                  deltaSemanas > 0
                    ? deltaSemanas > 2
                      ? 'bg-rose-200/90 text-rose-900'
                      : 'bg-amber-200/90 text-amber-900'
                    : 'bg-teal-200/90 text-teal-900'
                }`}
              >
                {deltaSemanas > 0 ? (deltaSemanas > 2 ? '⚠️ Retraso' : '⚡ Advertencia') : '✓ Favorable'}
              </span>
            </div>

            <div className="flex items-center gap-2 w-full min-w-0">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-2xs ${
                  deltaSemanas > 0
                    ? deltaSemanas > 2
                      ? 'bg-rose-600 text-white'
                      : 'bg-amber-600 text-white'
                    : 'bg-teal-600 text-white'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs sm:text-sm font-black tracking-tight">
                {deltaSemanas > 0
                  ? `+${deltaSemanas} semanas añadidas`
                  : '0 semanas de retraso · Calendario intacto'}
              </span>
            </div>

            <div className="text-[11px] opacity-85 flex flex-col items-start gap-0.5 pl-9 w-full">
              <span>
                <strong>Variación:</strong> +{deltaSemanas} sem
              </span>
              <span>
                <strong>Semana acumulada:</strong> {nuevasSemanas} semanas
              </span>
            </div>
          </div>
        ) : (
          <div className="h-12 rounded-xl bg-slate-100/60 border border-dashed border-slate-200 animate-pulse flex items-center px-4 w-full">
            <span className="text-[10px] text-slate-400 font-medium">Calculando desviación de semanas...</span>
          </div>
        )}

        {/* Item 3: Estrés (Reveals at step >= 3) */}
        {step >= 3 ? (
          <div
            className={`p-3 rounded-xl border flex flex-col items-start gap-2 animate-item-pop transition-all w-full ${
              deltaEstres > 0
                ? deltaEstres > 8
                  ? 'bg-rose-50/90 border-rose-300 text-rose-950'
                  : 'bg-amber-50/90 border-amber-300 text-amber-950'
                : 'bg-teal-50/90 border-teal-300 text-teal-950'
            }`}
          >
            <div className="flex items-center justify-between w-full gap-2">
              <span
                className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0 ${
                  deltaEstres > 0 ? 'bg-amber-200/90 text-amber-900' : 'bg-teal-200/90 text-teal-900'
                }`}
              >
                {deltaEstres > 0 ? '⚠️ Tensión' : '✓ Tranquilidad'}
              </span>
            </div>

            <div className="flex items-center gap-2 w-full min-w-0">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-2xs ${
                  deltaEstres > 0
                    ? deltaEstres > 8
                      ? 'bg-rose-600 text-white'
                      : 'bg-amber-600 text-white'
                    : 'bg-teal-600 text-white'
                }`}
              >
                {deltaEstres > 0 ? <Activity className="w-3.5 h-3.5" /> : <Smile className="w-3.5 h-3.5" />}
              </div>
              <span className="text-xs sm:text-sm font-black tracking-tight">
                {deltaEstres > 0
                  ? `+${deltaEstres} puntos de estrés de obra`
                  : deltaEstres < 0
                  ? `${deltaEstres} puntos de estrés · Alivio y calma`
                  : '0 estrés añadido · Proceso bajo control'}
              </span>
            </div>

            <div className="text-[11px] opacity-85 flex flex-col items-start gap-0.5 pl-9 w-full">
              <span>
                <strong>Variación:</strong> {deltaEstres > 0 ? `+${deltaEstres}%` : `${deltaEstres}%`}
              </span>
              <span>
                <strong>Nivel de estrés:</strong> {nuevoEstres}%
              </span>
            </div>
          </div>
        ) : (
          <div className="h-12 rounded-xl bg-slate-100/60 border border-dashed border-slate-200 animate-pulse flex items-center px-4 w-full">
            <span className="text-[10px] text-slate-400 font-medium">Registrando tensión psicológica...</span>
          </div>
        )}

        {/* Item 4: Energía / Factura mensual (Reveals at step >= 4) */}
        {step >= 4 ? (
          <div
            className={`p-3 rounded-xl border flex flex-col items-start gap-2 animate-item-pop transition-all w-full ${
              deltaFactura > 0
                ? 'bg-rose-50/90 border-rose-300 text-rose-950'
                : 'bg-teal-50/90 border-teal-300 text-teal-950'
            }`}
          >
            <div className="flex items-center justify-between w-full gap-2">
              <span
                className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0 ${
                  deltaFactura > 0 ? 'bg-rose-200/90 text-rose-900' : 'bg-teal-200/90 text-teal-900'
                }`}
              >
                {deltaFactura > 0 ? '⚠️ Factura alta' : '✓ Eficiencia Passivhaus'}
              </span>
            </div>

            <div className="flex items-center gap-2 w-full min-w-0">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-2xs ${
                  deltaFactura > 0 ? 'bg-rose-600 text-white' : 'bg-teal-600 text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs sm:text-sm font-black tracking-tight">
                {deltaFactura > 0
                  ? `+${deltaFactura} €/mes factura de energía`
                  : 'Factura mínima garantizada (35 €/mes)'}
              </span>
            </div>

            <div className="text-[11px] opacity-85 flex flex-col items-start gap-0.5 pl-9 w-full">
              <span>
                <strong>Variación:</strong> {deltaFactura > 0 ? `+${deltaFactura} €/mes` : '0 €/mes'}
              </span>
              <span>
                <strong>Factura estimada:</strong> {nuevaFactura} €/mes
              </span>
            </div>
          </div>
        ) : (
          <div className="h-12 rounded-xl bg-slate-100/60 border border-dashed border-slate-200 animate-pulse flex items-center px-4 w-full">
            <span className="text-[10px] text-slate-400 font-medium">Estimando consumo energético y hermetismo...</span>
          </div>
        )}
      </div>

      {/* Partner Reaction message (revealed at step 5) - single column */}
      {partnerReaction && step >= 4 && (
        <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 flex flex-col items-start gap-1 animate-item-pop w-full">
          <div className="flex items-center gap-1.5">
            <span className="text-sm shrink-0" role="img" aria-label="mensaje">
              📩
            </span>
            <span className="text-[10px] font-bold text-sky-900">
              Tu Pareja (Álex):
            </span>
          </div>
          <p className="text-xs text-sky-950 font-medium italic pl-5 leading-snug">
            «{partnerReaction}»
          </p>
        </div>
      )}

      {/* Advance button */}
      <div className="pt-1 w-full">
        <button
          onClick={onAdvance}
          className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-slate-900 hover:bg-black text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer"
        >
          <span>{isComplete ? 'Avanzar al siguiente hito' : 'Saltar animación'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
