import React from 'react';
import { GameIndicators, GameHistoryEntry, CardChoice } from '../types/game';
import { FileText, Calendar, Wallet, CheckCircle, GitCompare, ShieldCheck } from 'lucide-react';

interface MyProjectViewProps {
  indicators: GameIndicators;
  history: GameHistoryEntry[];
  onOpenParallelUniverse: (chosen: CardChoice, unselected: CardChoice) => void;
}

export const MyProjectView: React.FC<MyProjectViewProps> = ({
  indicators,
  history,
  onOpenParallelUniverse,
}) => {
  const formatoEuros = (val: number) =>
    new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(val) + ' €';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          «Mi Proyecto»: Estado, Calendario y Documentación
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          La radiografía administrativa y técnica completa de tu autopromoción en tiempo real.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <Wallet className="w-4 h-4 text-emerald-700" />
            Saldo Presupuestario
          </span>
          <div className="text-2xl font-black text-slate-900">
            {formatoEuros(indicators.presupuestoRestante)}
          </div>
          <span className="text-xs text-slate-500 block">
            Desvíos acumulados: {indicators.desvioEuros === 0 ? '0 €' : `+${formatoEuros(indicators.desvioEuros)}`}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-sky-700" />
            Cronograma
          </span>
          <div className="text-2xl font-black text-slate-900">
            Semana {indicators.semanasTranscurridas}
          </div>
          <span className="text-xs text-slate-500 block">
            Plazo de referencia: Semana {indicators.semanasPrevistas}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-700" />
            Estándar Energético
          </span>
          <div className="text-2xl font-black text-emerald-800">
            {indicators.facturaEnergeticaMes} €/mes
          </div>
          <span className="text-xs text-slate-500 block">
            Hermeticidad n50: {indicators.n50BlowerDoor} ren/h
          </span>
        </div>
      </div>

      {/* Decision Log & Parallel Universe Triggers */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">
            Historial de Decisiones Tomadas
          </h3>
          <span className="text-xs font-semibold text-slate-500">
            {history.length} hitos registrados
          </span>
        </div>

        {history.length === 0 ? (
          <p className="text-sm text-slate-400 py-6 text-center italic">
            Aún no has tomado decisiones. ¡Comienza en la vista «Mi futura casa»!
          </p>
        ) : (
          <div className="space-y-3">
            {history.map((entry, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 font-mono">#{idx + 1}</span>
                    <strong className="text-sm font-bold text-slate-900">{entry.chosenLabel}</strong>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">{entry.consequenceText}</p>
                </div>

                <button
                  onClick={() => {
                    const fakeChosen: CardChoice = {
                      id: entry.chosenOptionId,
                      label: entry.chosenLabel,
                      deltaPresupuesto: 0,
                      deltaSemanas: 0,
                      deltaEstres: 0,
                      deltaFactura: 0,
                      consequenceText: entry.consequenceText,
                      parallelOutcome: {
                        title: 'Lo que elegiste',
                        budgetResult: 'Tu decisión actual',
                        weeksResult: 'En curso',
                        narrative: entry.consequenceText,
                      },
                    };
                    onOpenParallelUniverse(fakeChosen, entry.unselectedChoice);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-purple-300 text-purple-900 hover:bg-purple-100 text-xs font-bold flex items-center gap-1.5 transition shrink-0"
                >
                  <GitCompare className="w-3.5 h-3.5" />
                  <span>Ver otra posibilidad</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Technical Documents Shelf */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 pb-2.5 border-b border-slate-100">
          Carpeta de Documentación Técnica
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <span className="font-semibold text-slate-700">Maqueta 3D de Precisión</span>
            <span className="text-emerald-700 font-bold">✓ Cero improvisación</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <span className="font-semibold text-slate-700">Madera Técnica en Taller</span>
            <span className="text-emerald-700 font-bold">✓ Seco y protegido</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <span className="font-semibold text-slate-700">Test de Inflado Hermético</span>
            <span className="text-emerald-700 font-bold">✓ Cero corrientes</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <span className="font-semibold text-slate-700">Pulmón de Aire Filtrado</span>
            <span className="text-emerald-700 font-bold">✓ 90% calor retenido</span>
          </div>
        </div>
      </div>
    </div>
  );
};
