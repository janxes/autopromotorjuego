import React from 'react';
import { GameState, GameIndicators, CardChoice } from '../types/game';
import {
  RotateCcw,
  Sparkles,
  LineChart,
  Wind,
  Home,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  FileSpreadsheet,
  Award,
} from 'lucide-react';

interface HUDHeaderProps {
  state?: GameState;
  indicators?: GameIndicators;
  activeTab: 'game' | 'adventure' | 'lcc' | 'blower' | 'catalog' | 'certificate';
  setActiveTab: (tab: 'game' | 'adventure' | 'lcc' | 'blower' | 'catalog' | 'certificate') => void;
  onRestart: () => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  isSpeaking: boolean;
  onToggleSpeech: () => void;
  previewChoice?: CardChoice | null;
}

export const HUDHeader: React.FC<HUDHeaderProps> = ({
  state,
  indicators,
  activeTab,
  setActiveTab,
  onRestart,
  fontSize,
  setFontSize,
  highContrast,
  setHighContrast,
  isSpeaking,
  onToggleSpeech,
  previewChoice,
}) => {
  const formatoEuros = (val: number) =>
    new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(val) + ' €';

  // Resolved values from indicators or state
  const presupuestoRestante = indicators?.presupuestoRestante ?? state?.presupuestoRestante ?? 250000;
  const desvioEuros = indicators?.desvioEuros ?? state?.desvioAcumuladoEuros ?? 0;
  const semanasTranscurridas = indicators?.semanasTranscurridas ?? state?.tiempoSemanas ?? 0;
  const semanasPrevistas = indicators?.semanasPrevistas ?? state?.tiempoPrevistoSemanas ?? 24;
  const estresPorcentaje = indicators?.estresPorcentaje ?? state?.estresPorcentaje ?? 10;
  const facturaEnergetica = indicators?.facturaEnergeticaMes ?? state?.facturaEnergeticaMes ?? 35;
  const blowerDoorN50 = indicators?.n50BlowerDoor ?? state?.blowerDoorN50 ?? 0.45;

  const estresBarra = `[${'■'.repeat(Math.round(estresPorcentaje / 10))}${'□'.repeat(10 - Math.round(estresPorcentaje / 10))}] ${estresPorcentaje}%`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 shadow-xs">
      {/* Top 3-Zone Clean Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-white shadow-xs">
            <Home className="w-5 h-5" />
          </div>
          <div>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('adventure');
              }}
              className="text-base sm:text-lg font-black tracking-tight text-slate-900 hover:text-emerald-800 transition"
            >
              La Odisea del Autopromotor
            </a>
            <span className="hidden lg:inline text-xs text-slate-500 font-medium ml-2">
              · Madera técnica y estándar Passivhaus
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Clean, accessible, democratic styling) */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-1.5" aria-label="Navegación principal">
          <button
            onClick={() => setActiveTab('adventure')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
              activeTab === 'adventure' || activeTab === 'game'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Aventura
          </button>

          <button
            onClick={() => setActiveTab('lcc')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
              activeTab === 'lcc'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Coste 30 Años (LCC)
          </button>

          <button
            onClick={() => setActiveTab('blower')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
              activeTab === 'blower'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Test Blower Door
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
              activeTab === 'catalog'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Catálogo Viviendas
          </button>

          <button
            onClick={() => setActiveTab('certificate')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
              activeTab === 'certificate'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-emerald-800 hover:bg-emerald-50'
            }`}
          >
            Certificado
          </button>
        </nav>

        {/* Zone 3: Accessibility Toolbar & Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Audio speech reader */}
          <button
            onClick={onToggleSpeech}
            title={isSpeaking ? 'Detener lectura en voz alta' : 'Escuchar en voz alta'}
            aria-label={isSpeaking ? 'Detener lectura' : 'Escuchar narración'}
            className={`p-2 rounded-xl text-xs font-medium border transition flex items-center gap-1.5 ${
              isSpeaking
                ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4 text-amber-700" /> : <Volume2 className="w-4 h-4 text-slate-600" />}
            <span className="hidden xl:inline text-xs font-bold">
              {isSpeaking ? 'Detener' : 'Voz'}
            </span>
          </button>

          {/* Font Size Selector */}
          <div className="flex items-center border border-slate-200 rounded-xl p-0.5 bg-slate-50 text-xs font-bold text-slate-700">
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-1 rounded-lg ${fontSize === 'normal' ? 'bg-white shadow-xs text-slate-900' : 'hover:text-black'}`}
              title="Tamaño normal de texto"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-1 rounded-lg text-sm ${fontSize === 'large' ? 'bg-white shadow-xs text-slate-900' : 'hover:text-black'}`}
              title="Tamaño grande de texto"
            >
              A+
            </button>
          </div>

          {/* High contrast toggle */}
          <button
            onClick={() => setHighContrast(!highContrast)}
            title="Alternar contraste accesible"
            aria-label="Alternar alto contraste"
            className={`p-2 rounded-xl border text-xs transition ${
              highContrast
                ? 'bg-black text-white border-black font-bold'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {highContrast ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Reset button */}
          <button
            onClick={onRestart}
            title="Reiniciar aventura"
            className="p-2 rounded-xl bg-slate-50 text-slate-600 hover:text-rose-700 border border-slate-200 hover:bg-rose-50 hover:border-rose-200 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile nav row */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-100 px-3 py-2 bg-slate-50 text-xs font-medium overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('adventure')}
          className={`px-2.5 py-1 rounded-lg whitespace-nowrap ${activeTab === 'adventure' || activeTab === 'game' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'}`}
        >
          Aventura
        </button>
        <button
          onClick={() => setActiveTab('lcc')}
          className={`px-2.5 py-1 rounded-lg whitespace-nowrap ${activeTab === 'lcc' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'}`}
        >
          LCC 30 Años
        </button>
        <button
          onClick={() => setActiveTab('blower')}
          className={`px-2.5 py-1 rounded-lg whitespace-nowrap ${activeTab === 'blower' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'}`}
        >
          Blower Door
        </button>
        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-2.5 py-1 rounded-lg whitespace-nowrap ${activeTab === 'catalog' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'}`}
        >
          Catálogo
        </button>
      </div>

      {/* Four Reigns Indicators Always in the Same Position */}
      <div className="bg-slate-50/90 border-t border-slate-200 px-4 sm:px-6 py-2.5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Indicator 1: Presupuesto */}
          <div
            className={`bg-white p-3 rounded-2xl border transition-all shadow-2xs relative ${
              previewChoice?.deltaPresupuesto
                ? previewChoice.deltaPresupuesto < 0
                  ? 'border-rose-400 ring-2 ring-rose-200'
                  : 'border-emerald-400 ring-2 ring-emerald-200'
                : 'border-slate-200/80'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                💰 Presupuesto
              </span>
              {previewChoice && (
                <span
                  className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                    previewChoice.deltaPresupuesto < 0
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {previewChoice.deltaPresupuesto < 0
                    ? `${previewChoice.deltaPresupuesto} €`
                    : '✓ Blindado'}
                </span>
              )}
            </div>
            <div className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
              {formatoEuros(presupuestoRestante)}
            </div>
            <div className="text-[11px] text-slate-500 truncate">
              {desvioEuros === 0 ? (
                <span className="text-emerald-700 font-semibold">Desvíos: 0 €</span>
              ) : (
                <span className="text-rose-700 font-semibold">
                  Desvío: +{formatoEuros(desvioEuros)}
                </span>
              )}
            </div>
          </div>

          {/* Indicator 2: Plazos / Tiempo */}
          <div
            className={`bg-white p-3 rounded-2xl border transition-all shadow-2xs relative ${
              previewChoice?.deltaSemanas
                ? previewChoice.deltaSemanas > 3
                  ? 'border-rose-400 ring-2 ring-rose-200'
                  : 'border-slate-400 ring-2 ring-slate-200'
                : 'border-slate-200/80'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                ⏳ Plazo Obra
              </span>
              {previewChoice && (
                <span
                  className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                    previewChoice.deltaSemanas > 2
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  +{previewChoice.deltaSemanas} sem
                </span>
              )}
            </div>
            <div className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
              Semana {semanasTranscurridas}
            </div>
            <div className="text-[11px] text-slate-500 truncate">
              Previsto: {semanasPrevistas} semanas
            </div>
          </div>

          {/* Indicator 3: Estrés / Bienestar */}
          <div
            className={`bg-white p-3 rounded-2xl border transition-all shadow-2xs relative ${
              previewChoice?.deltaEstres
                ? previewChoice.deltaEstres > 0
                  ? 'border-amber-400 ring-2 ring-amber-200'
                  : 'border-emerald-400 ring-2 ring-emerald-200'
                : 'border-slate-200/80'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                🧠 Estrés
              </span>
              {previewChoice && (
                <span
                  className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                    previewChoice.deltaEstres > 0
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {previewChoice.deltaEstres > 0 ? `+${previewChoice.deltaEstres}%` : '-5%'}
                </span>
              )}
            </div>
            <div className="text-base sm:text-lg font-black text-slate-900 mt-0.5 font-mono">
              {estresPorcentaje}%
            </div>
            <div className="text-[11px] text-slate-500 truncate font-mono">
              {estresBarra}
            </div>
          </div>

          {/* Indicator 4: Confort y Factura Passivhaus */}
          <div
            className={`bg-white p-3 rounded-2xl border transition-all shadow-2xs relative ${
              previewChoice?.deltaFactura
                ? previewChoice.deltaFactura > 0
                  ? 'border-rose-400 ring-2 ring-rose-200'
                  : 'border-emerald-400 ring-2 ring-emerald-200'
                : 'border-slate-200/80'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                ⚡ Energía
              </span>
              {previewChoice && (
                <span
                  className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                    previewChoice.deltaFactura > 0
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {previewChoice.deltaFactura > 0 ? `+${previewChoice.deltaFactura} €` : 'Óptimo'}
                </span>
              )}
            </div>
            <div className="text-base sm:text-lg font-black text-emerald-800 mt-0.5">
              {facturaEnergetica} €/mes
            </div>
            <div className="text-[11px] text-slate-500 truncate">
              Blower Door: {blowerDoorN50} h⁻¹
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
