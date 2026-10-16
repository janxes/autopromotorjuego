import React from 'react';
import { CardChoice } from '../types/game';
import { GitCompare, ArrowLeftRight, RotateCcw, X, Sparkles, AlertCircle } from 'lucide-react';

interface ParallelUniverseModalProps {
  chosenChoice: CardChoice;
  alternativeChoice: CardChoice;
  onExploreAlternative: () => void;
  onClose: () => void;
}

export const ParallelUniverseModal: React.FC<ParallelUniverseModalProps> = ({
  chosenChoice,
  alternativeChoice,
  onExploreAlternative,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <GitCompare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 block">
                Universo Paralelo
              </span>
              <h3 className="text-lg font-black text-slate-900">
                ¿Qué habría pasado si hubieses elegido la otra opción?
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dual Timeline Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Timeline A: Lo que elegiste */}
          <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-300 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Tu Camino
              </span>
              <span className="text-[10px] font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                Elegido
              </span>
            </div>

            <h4 className="text-base font-bold text-slate-900 leading-snug">
              {chosenChoice.label}
            </h4>

            <p className="text-xs text-slate-600 leading-relaxed">
              {chosenChoice.consequenceText}
            </p>

            <div className="pt-2 border-t border-slate-200 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Presupuesto:</span>
                <strong className={chosenChoice.deltaPresupuesto < 0 ? 'text-rose-700' : 'text-emerald-700'}>
                  {chosenChoice.deltaPresupuesto === 0 ? '0 € desvíos' : `${chosenChoice.deltaPresupuesto} €`}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Semanas:</span>
                <strong className={chosenChoice.deltaSemanas > 3 ? 'text-rose-700' : 'text-slate-700'}>
                  +{chosenChoice.deltaSemanas} semanas
                </strong>
              </div>
            </div>
          </div>

          {/* Timeline B: La Alternativa */}
          <div className="p-5 rounded-2xl bg-purple-50/60 border-2 border-purple-300 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                La Otra Posibilidad
              </span>
              <span className="text-[10px] font-bold bg-purple-200 text-purple-900 px-2 py-0.5 rounded-full">
                Alternativa
              </span>
            </div>

            <h4 className="text-base font-bold text-purple-950 leading-snug">
              {alternativeChoice.label}
            </h4>

            <p className="text-xs text-purple-900/80 leading-relaxed">
              {chosenChoice.parallelOutcome?.narrative || alternativeChoice.consequenceText}
            </p>

            <div className="pt-2 border-t border-purple-200 space-y-1 text-xs text-purple-950">
              <div className="flex justify-between">
                <span className="text-purple-700">Impacto simulado:</span>
                <strong>{chosenChoice.parallelOutcome?.budgetResult}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-700">Tiempo:</span>
                <strong>{chosenChoice.parallelOutcome?.weeksResult}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-3 bg-slate-50 rounded-xl text-center text-xs text-slate-500">
          💡 <em>Valores ilustrativos del juego para entender la física y la economía de obra sin riesgos.</em>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition"
          >
            Continuar mi partida
          </button>
          <button
            onClick={onExploreAlternative}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Explorar esta alternativa en mi casa</span>
          </button>
        </div>
      </div>
    </div>
  );
};
