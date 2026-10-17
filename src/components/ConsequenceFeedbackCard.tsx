import React from 'react';
import {
  TrendingDown,
  TrendingUp,
  Clock,
  Zap,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Smile,
  Frown,
  Activity,
  Flame,
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
    step,
    title,
    label,
    consequenceText,
    partnerReaction,
    isPassivhausWay,
    deltaPresupuesto,
    deltaSemanas,
    deltaEstres,
    deltaFactura,
    prevIndicators,
    nextIndicators,
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
    <div className="w-full max-w-lg mx-auto bg-white rounded-2xl border-2 border-slate-300 shadow-xl p-4 sm:p-5 space-y-3.5 animate-card-overlay-in relative overflow-hidden">
      {/* Top Banner & Header */}
      <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-700 animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800">
              Consecuencias de tu elección
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5 leading-tight">
            {title}
          </h3>
        </div>

        <div className="text-right shrink-0">
          <span className="inline-block px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-700">
            {label}
          </span>
        </div>
      </div>

      {/* Narrative Explanation */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        {consequenceText}
      </div>

      {/* 4 STAGGERED CONSEQUENCE ITEMS (Sort the Court! inspired) */}
      <div className="space-y-2">
        {/* Item 1: Presupuesto (Reveals at step >= 1) */}
        {step >= 1 ? (
          <div
            className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 animate-item-pop transition-all ${
              deltaPresupuesto < 0
                ? 'bg-rose-50/90 border-rose-300 text-rose-950'
                : 'bg-teal-50/90 border-teal-300 text-teal-950'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-2xs ${
                  deltaPresupuesto < 0 ? 'bg-rose-600 text-white' : 'bg-teal-600 text-white'
                }`}
              >
                {deltaPresupuesto < 0 ? (
                  <TrendingDown className="w-4 h-4" />
                ) : (
                  <ShieldCheck className="w-4 h-4" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-sm font-black tracking-tight">
                    {deltaPresupuesto < 0
                      ? `−${formatoEuros(Math.abs(deltaPresupuesto))} de presupuesto`
                      : '0 € de sobrecoste · Presupuesto protegido'}
                  </span>
                  <span
                    className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${
                      deltaPresupuesto < 0
                        ? 'bg-rose-200/90 text-rose-900'
                        : 'bg-teal-200/90 text-teal-900'
                    }`}
                  >
                    {deltaPresupuesto < 0 ? '⚠️ Desfavorable' : '✓ Favorable'}
                  </span>
                </div>
                <div className="text-[11px] opacity-80 mt-0.5 flex items-center gap-2">
                  <span>
                    <strong>Variación:</strong> {deltaPresupuesto < 0 ? `${deltaPresupuesto} €` : '0 €'}
                  </span>
                  <span>•</span>
                  <span>
                    <strong>Saldo restante:</strong> {formatoEuros(nuevoSaldo)}
                  </span>
                  {nuevoDesvio > 0 && (
                    <>
                      <span>•</span>
                      <span className="text-rose-700 font-bold">
                        Desvío acumulado: +{formatoEuros(nuevoDesvio)}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-12 rounded-xl bg-slate-100/60 border border-dashed border-slate-200 animate-pulse flex items-center px-4">
            <span className="text-[10px] text-slate-400 font-medium">Evaluando impacto presupuestario...</span>
          </div>
        )}

        {/* Item 2: Plazo / Calendario (Reveals at step >= 2) */}
        {step >= 2 ? (
          <div
            className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 animate-item-pop transition-all ${
              deltaSemanas > 0
                ? deltaSemanas > 2
                  ? 'bg-rose-50/90 border-rose-300 text-rose-950'
                  : 'bg-amber-50/90 border-amber-300 text-amber-950'
                : 'bg-teal-50/90 border-teal-300 text-teal-950'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-2xs ${
                  deltaSemanas > 0
                    ? deltaSemanas > 2
                      ? 'bg-rose-600 text-white'
                      : 'bg-amber-600 text-white'
                    : 'bg-teal-600 text-white'
                }`}
              >
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-sm font-black tracking-tight">
                    {deltaSemanas > 0
                      ? `+${deltaSemanas} semanas añadidas`
                      : '0 semanas de retraso · Calendario intacto'}
                  </span>
                  <span
                    className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${
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
                <div className="text-[11px] opacity-80 mt-0.5 flex items-center gap-2">
                  <span>
                    <strong>Variación:</strong> +{deltaSemanas} sem
                  </span>
                  <span>•</span>
                  <span>
                    <strong>Semana acumulada:</strong> {nuevasSemanas} semanas
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-12 rounded-xl bg-slate-100/60 border border-dashed border-slate-200 animate-pulse flex items-center px-4">
            <span className="text-[10px] text-slate-400 font-medium">Calculando desviación de semanas...</span>
          </div>
        )}

        {/* Item 3: Estrés (Reveals at step >= 3) */}
        {step >= 3 ? (
          <div
            className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 animate-item-pop transition-all ${
              deltaEstres > 0
                ? deltaEstres > 8
                  ? 'bg-rose-50/90 border-rose-300 text-rose-950'
                  : 'bg-amber-50/90 border-amber-300 text-amber-950'
                : 'bg-teal-50/90 border-teal-300 text-teal-950'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-2xs ${
                  deltaEstres > 0
                    ? deltaEstres > 8
                      ? 'bg-rose-600 text-white'
                      : 'bg-amber-600 text-white'
                    : 'bg-teal-600 text-white'
                }`}
              >
                {deltaEstres > 0 ? <Activity className="w-4 h-4" /> : <Smile className="w-4 h-4" />}
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-sm font-black tracking-tight">
                    {deltaEstres > 0
                      ? `+${deltaEstres} puntos de estrés de obra`
                      : deltaEstres < 0
                      ? `${deltaEstres} puntos de estrés · Alivio y calma`
                      : '0 estrés añadido · Proceso bajo control'}
                  </span>
                  <span
                    className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${
                      deltaEstres > 0 ? 'bg-amber-200/90 text-amber-900' : 'bg-teal-200/90 text-teal-900'
                    }`}
                  >
                    {deltaEstres > 0 ? '⚠️ Tensión' : '✓ Tranquilidad'}
                  </span>
                </div>
                <div className="text-[11px] opacity-80 mt-0.5 flex items-center gap-2">
                  <span>
                    <strong>Variación:</strong> {deltaEstres > 0 ? `+${deltaEstres}%` : `${deltaEstres}%`}
                  </span>
                  <span>•</span>
                  <span>
                    <strong>Nivel de estrés:</strong> {nuevoEstres}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-12 rounded-xl bg-slate-100/60 border border-dashed border-slate-200 animate-pulse flex items-center px-4">
            <span className="text-[10px] text-slate-400 font-medium">Registrando tensión psicológica...</span>
          </div>
        )}

        {/* Item 4: Energía / Factura mensual (Reveals at step >= 4) */}
        {step >= 4 ? (
          <div
            className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 animate-item-pop transition-all ${
              deltaFactura > 0
                ? 'bg-rose-50/90 border-rose-300 text-rose-950'
                : 'bg-teal-50/90 border-teal-300 text-teal-950'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-2xs ${
                  deltaFactura > 0 ? 'bg-rose-600 text-white' : 'bg-teal-600 text-white'
                }`}
              >
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-sm font-black tracking-tight">
                    {deltaFactura > 0
                      ? `+${deltaFactura} €/mes factura de energía`
                      : 'Factura mínima garantizada (35 €/mes)'}
                  </span>
                  <span
                    className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${
                      deltaFactura > 0 ? 'bg-rose-200/90 text-rose-900' : 'bg-teal-200/90 text-teal-900'
                    }`}
                  >
                    {deltaFactura > 0 ? '⚠️ Factura alta' : '✓ Eficiencia Passivhaus'}
                  </span>
                </div>
                <div className="text-[11px] opacity-80 mt-0.5 flex items-center gap-2">
                  <span>
                    <strong>Variación:</strong> {deltaFactura > 0 ? `+${deltaFactura} €/mes` : '0 €/mes'}
                  </span>
                  <span>•</span>
                  <span>
                    <strong>Factura estimada:</strong> {nuevaFactura} €/mes
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-12 rounded-xl bg-slate-100/60 border border-dashed border-slate-200 animate-pulse flex items-center px-4">
            <span className="text-[10px] text-slate-400 font-medium">Estimando consumo energético y hermetismo...</span>
          </div>
        )}
      </div>

      {/* Partner Reaction message (revealed at step 5) */}
      {partnerReaction && step >= 4 && (
        <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 flex items-start gap-2.5 animate-item-pop">
          <span className="text-base shrink-0" role="img" aria-label="mensaje">
            📩
          </span>
          <div>
            <span className="text-[10px] font-bold text-sky-900 block">
              Tu Pareja (Álex):
            </span>
            <p className="text-xs text-sky-950 font-medium italic mt-0.5">
              «{partnerReaction}»
            </p>
          </div>
        </div>
      )}

      {/* Advance button */}
      <div className="pt-1">
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
