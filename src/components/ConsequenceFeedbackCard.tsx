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
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium w-full">
        {consequenceText}
      </div>

      {/* Animated Visual Cue corresponding to Phase Consequence */}
      {feedback.animation && (
        <div className="space-y-2 w-full animate-in fade-in duration-200">
          <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/90 flex items-start gap-2.5 text-left w-full shadow-2xs">
            <div className="text-2xl p-1.5 rounded-lg bg-white border border-amber-200 shadow-2xs shrink-0">
              {feedback.animation.icon}
            </div>
            <div className="space-y-0.5">
              <span className="text-xs font-black uppercase tracking-wider text-amber-900 block">
                Así reacciona tu proyecto:
              </span>
              <p className="text-xs sm:text-sm text-amber-950 font-medium leading-snug">
                {feedback.animation.description}
              </p>
            </div>
          </div>

          {/* Interactive 5 Principles Visualization for Passivhaus no es menú a la carta */}
          {feedback.animation.visualType === 'five_principles' && (
            <div className="p-3.5 rounded-2xl bg-slate-900 text-white space-y-3 shadow-sm border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                  Los 5 Principios Passivhaus
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    feedback.isPassivhausWay
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                      : 'bg-amber-950 text-amber-300 border border-amber-700'
                  }`}
                >
                  {feedback.isPassivhausWay
                    ? '🎯 Objetivo de certificación previsto'
                    : '⚠️ Escenario: Sin verificar'}
                </span>
              </div>

              {/* The 5 Pieces Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-1.5 text-center text-xs">
                {/* 1. Aislamiento */}
                <div
                  className={`p-2 rounded-xl border flex sm:flex-col items-center justify-between sm:justify-center gap-1 ${
                    feedback.isPassivhausWay
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-100'
                      : 'bg-emerald-950/40 border-emerald-600 text-emerald-200'
                  }`}
                >
                  <span className="text-base">🧱</span>
                  <span className="text-[11px] font-bold">1. Aislamiento</span>
                  <span className="text-[9px] text-emerald-400">✓ Envolvente</span>
                </div>

                {/* 2. Ventanas */}
                <div
                  className={`p-2 rounded-xl border flex sm:flex-col items-center justify-between sm:justify-center gap-1 ${
                    feedback.isPassivhausWay
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-100'
                      : 'bg-emerald-950/40 border-emerald-600 text-emerald-200'
                  }`}
                >
                  <span className="text-base">🪟</span>
                  <span className="text-[11px] font-bold">2. Ventanas</span>
                  <span className="text-[9px] text-emerald-400">✓ Triple vidrio</span>
                </div>

                {/* 3. Puentes térmicos */}
                <div
                  className={`p-2 rounded-xl border flex sm:flex-col items-center justify-between sm:justify-center gap-1 ${
                    feedback.isPassivhausWay
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-100'
                      : 'bg-slate-800/80 border-dashed border-amber-500 text-amber-200'
                  }`}
                >
                  <span className="text-base">{feedback.isPassivhausWay ? '📐' : '❓'}</span>
                  <span className="text-[11px] font-bold">3. P. Térmicos</span>
                  <span
                    className={`text-[9px] font-semibold ${
                      feedback.isPassivhausWay ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {feedback.isPassivhausWay ? '✓ Sin puentes' : '¿Aislado?'}
                  </span>
                </div>

                {/* 4. Hermeticidad */}
                <div
                  className={`p-2 rounded-xl border flex sm:flex-col items-center justify-between sm:justify-center gap-1 ${
                    feedback.isPassivhausWay
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-100'
                      : 'bg-slate-800/80 border-dashed border-amber-500 text-amber-200'
                  }`}
                >
                  <span className="text-base">{feedback.isPassivhausWay ? '🛡️' : '❓'}</span>
                  <span className="text-[11px] font-bold">4. Hermetismo</span>
                  <span
                    className={`text-[9px] font-semibold ${
                      feedback.isPassivhausWay ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {feedback.isPassivhausWay ? '✓ Blower Door' : '¿Fugas?'}
                  </span>
                </div>

                {/* 5. Ventilación VMC */}
                <div
                  className={`p-2 rounded-xl border flex sm:flex-col items-center justify-between sm:justify-center gap-1 ${
                    feedback.isPassivhausWay
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-100'
                      : 'bg-slate-800/80 border-dashed border-amber-500 text-amber-200'
                  }`}
                >
                  <span className="text-base">{feedback.isPassivhausWay ? '💨' : '❓'}</span>
                  <span className="text-[11px] font-bold">5. VMC Filtros</span>
                  <span
                    className={`text-[9px] font-semibold ${
                      feedback.isPassivhausWay ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {feedback.isPassivhausWay ? '✓ 92% recupera' : '¿Natural?'}
                  </span>
                </div>
              </div>

              {/* The Verification Route */}
              {feedback.isPassivhausWay ? (
                <div className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-left space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block">
                    Ruta de verificación rigurosa:
                  </span>
                  <div className="text-[11px] sm:text-xs text-slate-200 font-mono flex flex-wrap items-center gap-1">
                    <span className="text-emerald-300 font-bold">Proyectar</span>
                    <span>→</span>
                    <span className="text-emerald-300 font-bold">Calcular (PHPP)</span>
                    <span>→</span>
                    <span className="text-emerald-300 font-bold">Ejecutar y comprobar</span>
                    <span>→</span>
                    <span className="text-slate-400 italic">Certificar, si se solicita</span>
                  </div>
                  <p className="text-[10px] text-slate-400 pt-1 leading-snug">
                    * La certificación oficial la expide un certificador autorizado tras auditar la obra y el test Blower Door; el cálculo PHPP aporta la base matemática previa.
                  </p>
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-800/80 text-left space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block">
                    Incertidumbre energética del conjunto:
                  </span>
                  <p className="text-[11px] text-amber-200/90 leading-snug">
                    Elementos añadidos por separado sin balance PHPP. Si más adelante decides certificar la casa, se requerirá una revisión de proyecto con posibles sobrecostes y semanas de ajuste.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Postal de la parcela que se gira y revela ficha técnica */}
          {feedback.animation.visualType === 'parcel_postcard' && (
            <div className="p-3.5 rounded-2xl bg-white border border-slate-300 space-y-2.5 shadow-sm text-left">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1">
                  <span>🌄</span> Postal de la Parcela & Ficha de Viabilidad
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${feedback.isPassivhausWay ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'}`}>
                  {feedback.isPassivhausWay ? '✓ Viabilidad contrastada' : '⚠️ Reserva a ciegas'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className={`p-2 rounded-xl border ${feedback.isPassivhausWay ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-800'}`}>
                  <span className="font-bold block text-[11px]">¿Cabe el modelo?</span>
                  <span className="text-[10px]">{feedback.isPassivhausWay ? '✓ Huella y cotas comprobadas' : '❓ Pendiente de verificar'}</span>
                </div>
                <div className={`p-2 rounded-xl border ${feedback.isPassivhausWay ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-800'}`}>
                  <span className="font-bold block text-[11px]">¿Accesos grúa/camión?</span>
                  <span className="text-[10px]">{feedback.isPassivhausWay ? '✓ Radio de giro validado' : '❓ Calles estrechas'}</span>
                </div>
                <div className={`p-2 rounded-xl border ${feedback.isPassivhausWay ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-800'}`}>
                  <span className="font-bold block text-[11px]">¿Pendiente y terreno?</span>
                  <span className="text-[10px]">{feedback.isPassivhausWay ? '✓ Topografía y cota de roca' : '❓ Desnivel no medido'}</span>
                </div>
                <div className={`p-2 rounded-xl border ${feedback.isPassivhausWay ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-800'}`}>
                  <span className="font-bold block text-[11px]">¿Urbanística y lindes?</span>
                  <span className="text-[10px]">{feedback.isPassivhausWay ? '✓ Ficha municipal limpia' : '❓ Posibles servidumbres'}</span>
                </div>
              </div>
            </div>
          )}

          {/* El precio de la casa no es toda la cuenta (Cajas desglosadas) */}
          {feedback.animation.visualType === 'budget_breakdown' && (
            <div className="p-3.5 rounded-2xl bg-white border border-slate-300 space-y-2.5 shadow-sm text-left">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Desglose de la Cuenta Completa
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${feedback.isPassivhausWay ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'}`}>
                  {feedback.isPassivhausWay ? '✓ Presupuesto Global' : '⚠️ Solo Precio Portada'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                  <span className="font-bold block text-[11px]">🏡 Vivienda en Taller</span>
                  <span className="text-[10px]">Estructura, envolvente y montaje</span>
                </div>
                <div className={`p-2 rounded-xl border ${feedback.isPassivhausWay ? 'bg-sky-50 border-sky-200 text-sky-950' : 'bg-slate-100 border-dashed border-slate-300 text-slate-600'}`}>
                  <span className="font-bold block text-[11px]">📍 Parcela e ITP</span>
                  <span className="text-[10px]">{feedback.isPassivhausWay ? 'Partida acotada y reservada' : 'No contemplada en oferta'}</span>
                </div>
                <div className={`p-2 rounded-xl border ${feedback.isPassivhausWay ? 'bg-sky-50 border-sky-200 text-sky-950' : 'bg-slate-100 border-dashed border-slate-300 text-slate-600'}`}>
                  <span className="font-bold block text-[11px]">📋 Licencia e ICIO</span>
                  <span className="text-[10px]">{feedback.isPassivhausWay ? 'Tasas y proyectos visados' : 'Gastos municipales aparte'}</span>
                </div>
                <div className={`p-2 rounded-xl border ${feedback.isPassivhausWay ? 'bg-sky-50 border-sky-200 text-sky-950' : 'bg-slate-100 border-dashed border-slate-300 text-slate-600'}`}>
                  <span className="font-bold block text-[11px]">🚜 Obra exterior y acometidas</span>
                  <span className="text-[10px]">{feedback.isPassivhausWay ? 'Zanjas, luz, agua y vallado' : 'Sorpresa de última hora'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Desplazar pared: Elementos afectados y tarjeta de impacto */}
          {feedback.animation.visualType === 'wall_impact' && (
            <div className="p-3.5 rounded-2xl bg-white border border-slate-300 space-y-2.5 shadow-sm text-left">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Ficha de Impacto del Cambio
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${feedback.isPassivhausWay ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'}`}>
                  {feedback.isPassivhausWay ? '✓ Valoración informada' : '⚠️ Cambio sobre la marcha'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold block">Coste</span>
                  <span className={`font-black text-xs ${feedback.isPassivhausWay ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {feedback.isPassivhausWay ? 'Acotado en plano' : '+5.500 € rozas'}
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold block">Plazo</span>
                  <span className={`font-black text-xs ${feedback.isPassivhausWay ? 'text-slate-800' : 'text-rose-700'}`}>
                    {feedback.isPassivhausWay ? 'Sin parón' : '+3 semanas'}
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold block">Afectados</span>
                  <span className="font-bold text-[11px] text-slate-800">
                    Tubos, VMC y forjado
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Carpeta y Llavero de Entrega de Llaves */}
          {feedback.animation.visualType === 'keys_handover_folder' && (
            <div className="p-3.5 rounded-2xl bg-white border border-slate-300 space-y-2.5 shadow-sm text-left">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <span className="text-base">🔑</span> Carpeta de Entrega y Puesta en Marcha
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${feedback.isPassivhausWay ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'}`}>
                  {feedback.isPassivhausWay ? '✓ Entrega ordenada y sellada' : '⚠️ Flecos por WhatsApp'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className={`p-2 rounded-xl border ${feedback.isPassivhausWay ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                  <span className="font-bold block text-[11px]">📋 Revisión y Acta</span>
                  <span className="text-[10px]">{feedback.isPassivhausWay ? 'Protocolo oficial firmado' : 'Revisar viviendo dentro'}</span>
                </div>
                <div className={`p-2 rounded-xl border ${feedback.isPassivhausWay ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                  <span className="font-bold block text-[11px]">📁 Documentación</span>
                  <span className="text-[10px]">{feedback.isPassivhausWay ? 'Libro digital del edificio' : 'Planos pendientes de envío'}</span>
                </div>
                <div className={`p-2 rounded-xl border ${feedback.isPassivhausWay ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                  <span className="font-bold block text-[11px]">✍️ Pendientes por escrito</span>
                  <span className="text-[10px]">{feedback.isPassivhausWay ? 'Garantía con retención' : 'Promesas de palabra'}</span>
                </div>
                <div className={`p-2 rounded-xl border ${feedback.isPassivhausWay ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                  <span className="font-bold block text-[11px]">⚙️ Uso de instalaciones</span>
                  <span className="text-[10px]">{feedback.isPassivhausWay ? 'VMC calibrada y filtros' : 'Averías y ruidos no probados'}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

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
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            onAdvance();
            requestAnimationFrame(() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
            });
            setTimeout(() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
              const el = document.getElementById('scenario-top-anchor');
              if (el) {
                el.scrollIntoView({ behavior: 'auto', block: 'start' });
              }
            }, 50);
          }}
          className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-slate-900 hover:bg-black text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer"
        >
          <span>{isComplete ? 'Avanzar al siguiente hito' : 'Saltar animación'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
