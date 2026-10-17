import React, { useState } from 'react';
import { GameState, TurnMessage, ChoiceOption } from '../types/game';
import { CHECKLIST_PREGUNTAS_TRAMPA } from '../utils/gameLogic';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  Building,
  Check,
  History,
  Copy,
  ChevronDown,
  ChevronUp,
  Volume2,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

interface GameNarrativeViewProps {
  state: GameState;
  messages: TurnMessage[];
  currentChoices: ChoiceOption[];
  onSelectChoice: (choice: ChoiceOption) => void;
  onSubmitCustomMessage: (message: string) => void;
  onRewindChoice: () => void;
  isLoading: boolean;
  onOpenLCC: () => void;
  onOpenCatalog: () => void;
  onSpeakText?: (text: string) => void;
}

const LEVEL_STEPPER = [
  { level: 0, label: 'Calibración' },
  { level: 1, label: '1. Presupuesto' },
  { level: 2, label: '2. Lodo vs Fábrica' },
  { level: 3, label: '3. Hermeticidad' },
  { level: 4, label: '4. Salud y VMC' },
  { level: 5, label: '5. Balance 30 Años' },
];

export const GameNarrativeView: React.FC<GameNarrativeViewProps> = ({
  state,
  messages,
  currentChoices,
  onSelectChoice,
  onSubmitCustomMessage,
  onRewindChoice,
  isLoading,
  onOpenLCC,
  onOpenCatalog,
  onSpeakText,
}) => {
  const [showHistory, setShowHistory] = useState(false);
  const [showRawMarkdown, setShowRawMarkdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const [customInput, setCustomInput] = useState('');

  // Latest message from assistant
  const latestAssistantMsg = [...messages].reverse().find((m) => m.role === 'assistant');
  const pastMessages = messages.slice(0, messages.length - 1);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim() || isLoading) return;
    onSubmitCustomMessage(customInput.trim());
    setCustomInput('');
  };

  const handleCopyMarkdown = () => {
    if (latestAssistantMsg?.statusPanelMarkdown) {
      navigator.clipboard.writeText(latestAssistantMsg.statusPanelMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatoEuros = (val: number) =>
    new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(val) + ' €';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Clean Stepper: Accessible, generous whitespace */}
      <nav aria-label="Progreso de la odisea" className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between overflow-x-auto gap-2 pb-1 scrollbar-none">
          {LEVEL_STEPPER.map((s) => {
            const isCurrent = state.level === s.level;
            const isDone = state.level > s.level;
            return (
              <div
                key={s.level}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition ${
                  isCurrent
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : isDone
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    : 'text-slate-400 bg-slate-50'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-current opacity-75" />
                )}
                <span>{s.label}</span>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Optional History Toggle if multiple turns occurred */}
      {pastMessages.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition"
          >
            <History className="w-3.5 h-3.5" />
            <span>{showHistory ? 'Ocultar historial anterior' : `Ver historial anterior (${pastMessages.length})`}</span>
            {showHistory ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}

      {/* Collapsed Past Messages */}
      {showHistory && (
        <div className="space-y-4 pt-2 border-t border-slate-200">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Historial de Turnos Anteriores</h4>
          {pastMessages.map((msg) => (
            <div
              key={msg.id}
              className={`p-4 rounded-xl border text-sm leading-relaxed ${
                msg.role === 'assistant'
                  ? 'bg-slate-50 border-slate-200 text-slate-700'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-950 font-medium'
              }`}
            >
              <div className="text-xs font-bold text-slate-500 mb-1">
                {msg.role === 'assistant' ? 'Game Master:' : 'Tu decisión:'}
              </div>
              <p className="whitespace-pre-line">{msg.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Main Focus: The Current Turn Card */}
      {latestAssistantMsg && (
        <section aria-labelledby="current-stage-title" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          {/* Card Header with speaker affordance */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-1">
                {state.level === 0 ? 'Fase Inicial de Ajuste' : `Nivel ${state.level} de 5`}
              </span>
              <h2 id="current-stage-title" className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {state.faseNombre}
              </h2>
            </div>

            {onSpeakText && (
              <button
                onClick={() => onSpeakText(latestAssistantMsg.text)}
                title="Escuchar narración en voz alta"
                className="flex items-center gap-1.5 text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 transition shrink-0"
              >
                <Volume2 className="w-4 h-4 text-emerald-700" />
                <span className="hidden sm:inline">Leer en voz alta</span>
              </button>
            )}
          </div>

          {/* Clean, spacious prose */}
          <div className="text-slate-800 text-base sm:text-lg leading-relaxed whitespace-pre-line font-normal space-y-4">
            {latestAssistantMsg.text}
          </div>

          {/* ALERTA DEL AUTOPROMOTOR: High-contrast, clean civic callout */}
          {latestAssistantMsg.alertaAutopromotor && (
            <div className="p-6 rounded-2xl bg-amber-50/70 border-2 border-amber-300 text-slate-950 space-y-4">
              <div className="flex items-center gap-2 text-amber-900 font-extrabold text-base">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
                <span>⚠️ ALERTA DEL AUTOPROMOTOR (Lección de Obra Real)</span>
              </div>

              <div className="space-y-3 text-sm leading-relaxed">
                <div>
                  <span className="font-bold text-amber-950 block text-xs uppercase tracking-wider">
                    Impacto en obra:
                  </span>
                  <p className="mt-0.5 text-slate-800">{latestAssistantMsg.alertaAutopromotor.impacto}</p>
                </div>

                <div className="pt-2 border-t border-amber-200">
                  <span className="font-bold text-amber-950 block text-xs uppercase tracking-wider">
                    El porqué técnico:
                  </span>
                  <p className="mt-0.5 text-slate-800">{latestAssistantMsg.alertaAutopromotor.porqueTecnico}</p>
                </div>

                <div className="pt-2 border-t border-amber-200">
                  <span className="font-bold text-emerald-950 block text-xs uppercase tracking-wider">
                    La alternativa de catálogo industrializado:
                  </span>
                  <p className="mt-0.5 text-emerald-950 font-medium">
                    {latestAssistantMsg.alertaAutopromotor.alternativaIndustrializada}
                  </p>
                </div>

                {latestAssistantMsg.alertaAutopromotor.analogia && (
                  <div className="pt-2 border-t border-amber-200">
                    <span className="font-bold text-amber-900 block text-xs uppercase tracking-wider">
                      💡 Analogía explicada:
                    </span>
                    <p className="mt-0.5 text-slate-800 italic">
                      «{latestAssistantMsg.alertaAutopromotor.analogia}»
                    </p>
                    {latestAssistantMsg.alertaAutopromotor.adaptableACadaCaso && (
                      <div className="mt-2 p-2.5 rounded-lg bg-amber-100/60 text-xs text-amber-950">
                        <strong>🎯 Adaptable a tu caso:</strong> {latestAssistantMsg.alertaAutopromotor.adaptableACadaCaso}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* State Status Summary & Collapsible Markdown Panel */}
          {latestAssistantMsg.statusPanelMarkdown && (
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Panel de Estado de la Partida
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyMarkdown}
                    className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded transition"
                    title="Copiar texto exacto del panel"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? 'Copiado' : 'Copiar formato'}</span>
                  </button>
                  <button
                    onClick={() => setShowRawMarkdown(!showRawMarkdown)}
                    className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded transition"
                  >
                    <span>{showRawMarkdown ? 'Ocultar código' : 'Ver código Markdown'}</span>
                    {showRawMarkdown ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {showRawMarkdown ? (
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono whitespace-pre-wrap leading-relaxed select-all">
                  {latestAssistantMsg.statusPanelMarkdown}
                </pre>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-slate-500 block">Restante / Inicial</span>
                    <strong className="text-slate-900 text-sm font-bold block mt-0.5">
                      {formatoEuros(state.presupuestoRestante)}
                    </strong>
                    <span className="text-slate-500">de {formatoEuros(state.presupuestoInicial)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Desvío acumulado</span>
                    <strong className={`text-sm font-bold block mt-0.5 ${state.desvioAcumuladoEuros > 0 ? 'text-rose-700' : 'text-emerald-700'}`}>
                      +{state.desvioAcumuladoPorcentaje.toFixed(1)}% (+{formatoEuros(state.desvioAcumuladoEuros)})
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Tiempo transcurrido</span>
                    <strong className="text-slate-900 text-sm font-bold block mt-0.5">
                      Semana {state.tiempoSemanas}
                    </strong>
                    <span className="text-slate-500">vs Sem. {state.tiempoPrevistoSemanas} prev.</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Factura de clima</span>
                    <strong className="text-slate-900 text-sm font-bold block mt-0.5">
                      {state.facturaEnergeticaMes} €/mes
                    </strong>
                    <span className="text-emerald-700 font-medium">n50: {state.blowerDoorN50} h⁻¹</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-3 shadow-xs">
          <div className="inline-block w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          <h3 className="text-base font-bold text-slate-900">Calculando consecuencias y desvíos técnicos...</h3>
          <p className="text-xs text-slate-500">
            Auditando mediciones, comprobando tiempos de fraguado y costes de explotación a 30 años.
          </p>
        </div>
      )}

      {/* Decision Choice Cards: Large, clean, accessible buttons */}
      {!state.gameOver && currentChoices.length > 0 && !isLoading && (
        <section aria-labelledby="decision-title" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 id="decision-title" className="text-base sm:text-lg font-bold text-slate-900">
              {state.level === 0 ? 'Selecciona tu tipo de parcela y vivienda:' : '¿Qué camino decides tomar?'}
            </h3>
            <span className="text-xs text-slate-500 font-medium">Paso a paso</span>
          </div>

          <div className="space-y-3">
            {currentChoices.map((choice) => {
              const isBad = choice.isBadDecision;
              const isRewind = choice.isRewindAction;

              return (
                <button
                  key={choice.id}
                  onClick={() => {
                    if (isRewind) {
                      onRewindChoice();
                    } else {
                      onSelectChoice(choice);
                    }
                  }}
                  className={`w-full text-left p-5 sm:p-6 rounded-2xl border-2 transition-all flex items-start justify-between gap-4 group ${
                    isRewind
                      ? 'bg-amber-50 border-amber-400 hover:bg-amber-100 text-slate-950 shadow-sm'
                      : choice.recommended
                      ? 'bg-white border-emerald-600 hover:bg-emerald-50/50 shadow-sm hover:shadow-md'
                      : isBad
                      ? 'bg-white border-slate-300 hover:border-rose-400 hover:bg-rose-50/30'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2.5">
                      {choice.letter && (
                        <span className="w-8 h-8 rounded-xl bg-slate-900 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0">
                          {choice.letter}
                        </span>
                      )}
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition">
                        {choice.label}
                      </h4>
                      {choice.recommended && (
                        <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
                          Recomendado
                        </span>
                      )}
                      {isRewind && (
                        <span className="bg-amber-200 text-amber-950 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <RotateCcw className="w-3.5 h-3.5" />
                          Rebobinar
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed pl-10">
                      {choice.description}
                    </p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-emerald-700 shrink-0 mt-1" />
                </button>
              );
            })}
          </div>

          {/* Simple custom input */}
          <form onSubmit={handleCustomSubmit} className="pt-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="¿Prefieres plantear una duda técnica o alternativa propia?"
                className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600"
              />
              <button
                type="submit"
                disabled={!customInput.trim()}
                className="bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white font-semibold px-5 py-3 rounded-xl text-sm transition"
              >
                Enviar
              </button>
            </div>
          </form>
        </section>
      )}

      {/* PANTALLA DE CIERRE Y BALANCE FINAL: Generous, clean, highly readable */}
      {state.gameOver && (
        <section aria-labelledby="closing-title" className="space-y-6 pt-4">
          <div className="bg-white border-2 border-emerald-600 rounded-3xl p-6 sm:p-10 shadow-sm text-center space-y-4">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block">
              Informe Final de la Odisea
            </span>
            <h2 id="closing-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Balance Final a 30 Años
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Has recorrido los 5 niveles críticos de la autopromoción. Este es el resultado financiero,
              térmico y de salud alcanzado en tu proyecto.
            </p>

            {/* Perfil del Autopromotor */}
            <div className="pt-2">
              <div className="inline-block bg-slate-50 border border-slate-300 px-6 py-3 rounded-2xl">
                <span className="text-xs text-slate-500 block uppercase font-medium">Tu Perfil de Autopromotor</span>
                <span className="text-xl font-extrabold text-emerald-800 block mt-0.5">
                  {state.desvioAcumuladoPorcentaje <= 3
                    ? '🏆 «Autopromotor Blindado Passivhaus»'
                    : state.desvioAcumuladoPorcentaje <= 12
                    ? '⚖️ «Superviviente Prudente de Gremios»'
                    : '🏚️ «Víctima de Partidas Abiertas y Humedades»'}
                </span>
              </div>
            </div>
          </div>

          {/* Tabla comparativa final: Tu Proyecto vs Obra Tradicional */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <Building className="w-5 h-5 text-emerald-700" />
              <h3 className="text-lg font-bold text-slate-900">
                1. Comparativa: Tu Proyecto vs. Obra Tradicional Convencional
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 text-xs">
                    <th className="py-3 px-3 font-semibold">Parámetro</th>
                    <th className="py-3 px-3 font-bold text-emerald-800 bg-emerald-50/50">Tu Proyecto</th>
                    <th className="py-3 px-3 font-bold text-rose-800 bg-rose-50/50">Obra Tradicional Habitual</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 px-3 font-medium text-slate-900">Desvío de Presupuesto</td>
                    <td className="py-3 px-3 font-bold text-emerald-800 bg-emerald-50/30">
                      +{state.desvioAcumuladoPorcentaje.toFixed(1)}% (+{formatoEuros(state.desvioAcumuladoEuros)})
                    </td>
                    <td className="py-3 px-3 text-rose-800 bg-rose-50/30">
                      +18.5% a +25% (+46.000 € a +62.000 €)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium text-slate-900">Plazo Total de Construcción</td>
                    <td className="py-3 px-3 font-bold text-emerald-800 bg-emerald-50/30">
                      {state.tiempoSemanas} Semanas
                    </td>
                    <td className="py-3 px-3 text-rose-800 bg-rose-50/30">
                      78 - 96 Semanas (18-22 meses)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium text-slate-900">Factura de Climatización</td>
                    <td className="py-3 px-3 font-bold text-emerald-800 bg-emerald-50/30">
                      {state.facturaEnergeticaMes} €/mes
                    </td>
                    <td className="py-3 px-3 text-rose-800 bg-rose-50/30">
                      220 - 320 €/mes
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium text-slate-900">Hermeticidad Test Blower Door</td>
                    <td className="py-3 px-3 font-bold text-emerald-800 bg-emerald-50/30">
                      n50 = {state.blowerDoorN50} h⁻¹ (Passivhaus)
                    </td>
                    <td className="py-3 px-3 text-rose-800 bg-rose-50/30">
                      n50 = 5,5 a 7,0 h⁻¹ (Colador)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium text-slate-900">Calidad de Aire y Moho</td>
                    <td className="py-3 px-3 font-bold text-emerald-800 bg-emerald-50/30">
                      0 moho (VMC continua y filtrado F7/HEPA)
                    </td>
                    <td className="py-3 px-3 text-rose-800 bg-rose-50/30">
                      Condensación en cajas de persiana y puentes fríos
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. «Guía de Preguntas Trampa para Constructores» */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                2. «Guía de Preguntas Trampa para Constructores»
              </h3>
              <span className="text-xs bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded-full">
                Checklist Imprescindible
              </span>
            </div>
            <p className="text-sm text-slate-600">
              Haz estas 4 preguntas técnicas a cualquier constructor antes de comprometer tus ahorros:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {CHECKLIST_PREGUNTAS_TRAMPA.map((item) => (
                <div key={item.num} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {item.num}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm leading-snug">{item.pregunta}</h4>
                  </div>
                  <p className="text-xs text-rose-900 pl-8.5">
                    <strong>El peligro tradicional:</strong> {item.porQue}
                  </p>
                  <p className="text-xs text-emerald-900 font-medium pl-8.5">
                    <strong>La respuesta Passivhaus:</strong> {item.respuestaPassivhaus}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Llamada a la acción (CTA) */}
          <div className="bg-slate-900 rounded-3xl p-8 text-white text-center space-y-4 shadow-md">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              ¿Listo para dar el paso con certidumbre total?
            </h3>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Consulta el catálogo de modelos en madera técnica con precio notarial cerrado o solicita
              el estudio de viabilidad bioclimática de tu parcela.
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={onOpenCatalog}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl text-sm flex items-center gap-2 shadow-sm transition"
              >
                <span>Ver Catálogo de Viviendas</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenLCC}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-5 py-3 rounded-xl text-sm border border-slate-700 transition"
              >
                Ver Análisis Completo a 30 Años
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
