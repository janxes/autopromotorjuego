import React, { useState, useEffect, useRef } from 'react';
import { GameState, GameIndicators, CardChoice } from '../types/game';
import {
  RotateCcw,
  LineChart,
  Wind,
  Home,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Award,
  BookOpen,
  Menu,
  X,
  TrendingDown,
  TrendingUp,
  Clock,
  Activity,
  Zap,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { HighlightedIndicatorId, FeedbackTone } from '../hooks/useDecisionFeedback';

/**
 * Pure Vanilla JS progressive counter using requestAnimationFrame & cubic ease-out
 */
function useAnimatedCounter(targetValue: number, durationMs: number = 600): number {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const startValueRef = useRef(targetValue);
  const targetRef = useRef(targetValue);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect user's reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(targetValue);
      startValueRef.current = targetValue;
      targetRef.current = targetValue;
      return;
    }

    if (targetValue === targetRef.current && displayValue === targetValue) {
      return;
    }

    const startVal = displayValue;
    startValueRef.current = startVal;
    targetRef.current = targetValue;
    startTimeRef.current = null;

    let animId: number;
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(1, elapsed / durationMs);
      // Cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + (targetValue - startVal) * ease);
      setDisplayValue(current);

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(targetValue);
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [targetValue, durationMs]);

  return displayValue;
}

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
  // Animated Feedback Props
  highlightedIndicator?: HighlightedIndicatorId;
  highlightTone?: FeedbackTone;
  activeDelta?: {
    presupuesto?: number;
    semanas?: number;
    estres?: number;
    factura?: number;
  } | null;
  onOpenWelcome?: () => void;
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
  highlightedIndicator,
  highlightTone,
  activeDelta,
  onOpenWelcome,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const formatoEuros = (val: number) =>
    new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(val) + ' €';

  // Resolved raw values
  const rawPresupuesto = indicators?.presupuestoRestante ?? state?.presupuestoRestante ?? 250000;
  const desvioEuros = indicators?.desvioEuros ?? state?.desvioAcumuladoEuros ?? 0;
  const rawSemanas = indicators?.semanasTranscurridas ?? state?.tiempoSemanas ?? 0;
  const semanasPrevistas = indicators?.semanasPrevistas ?? state?.tiempoPrevistoSemanas ?? 24;
  const rawEstres = indicators?.estresPorcentaje ?? state?.estresPorcentaje ?? 10;
  const rawFactura = indicators?.facturaEnergeticaMes ?? state?.facturaEnergeticaMes ?? 35;
  const blowerDoorN50 = indicators?.n50BlowerDoor ?? state?.blowerDoorN50 ?? 0.45;

  // Progressive Counter Animation for indicators
  const animatedPresupuesto = useAnimatedCounter(rawPresupuesto, 650);
  const animatedSemanas = useAnimatedCounter(rawSemanas, 650);
  const animatedEstres = useAnimatedCounter(rawEstres, 650);
  const animatedFactura = useAnimatedCounter(rawFactura, 650);

  // Progressive ASCII & visual stress bar
  const estresBarra = `[${'■'.repeat(Math.min(10, Math.max(0, Math.round(animatedEstres / 10))))}${'□'.repeat(
    10 - Math.min(10, Math.max(0, Math.round(animatedEstres / 10)))
  )}] ${animatedEstres}%`;

  // Helper to determine active styling for an indicator
  const getIndicatorHaloClass = (id: HighlightedIndicatorId) => {
    if (highlightedIndicator !== id) return '';
    if (highlightTone === 'favorable') return 'animate-halo-teal border-teal-500 bg-teal-50/50 z-20';
    if (highlightTone === 'unfavorable') return 'animate-halo-red border-rose-500 bg-rose-50/50 z-20';
    if (highlightTone === 'warning') return 'animate-halo-amber border-amber-500 bg-amber-50/50 z-20';
    return 'ring-2 ring-slate-400 z-20';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 shadow-xs w-full">
      {/* Top Bar matched to the exact width of the 'main' section */}
      <div className="w-full max-w-2xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-3 relative">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="h-8 sm:h-9 flex items-center justify-center shrink-0">
            <img
              src="/images/Logomedgonnofondo.png"
              alt="Medgon Passivhaus"
              className="h-8 sm:h-9 w-auto max-w-[110px] object-contain"
            />
          </div>
          <div>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('adventure');
              }}
              className="text-sm sm:text-base font-black tracking-tight text-slate-900 hover:text-emerald-800 transition block leading-tight"
            >
              La Odisea del Autopromotor
            </a>
            <span className="text-[10px] text-slate-500 font-medium block">
              El juego de construir tu mejor casa.
            </span>
          </div>
        </div>

        {/* 3 Horizontal Stripes Menu Button */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-2 rounded-xl border text-slate-800 transition flex items-center justify-center focus:outline-hidden cursor-pointer ${
              menuOpen
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 border-slate-300'
            }`}
            aria-label="Abrir menú de navegación"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          {/* Backdrop to close menu when clicking outside */}
          {menuOpen && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setMenuOpen(false)}
            />
          )}

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute top-full right-0 mt-2 w-72 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-xl border border-slate-200 p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {/* Navigation items */}
              <div className="space-y-1 pb-2 border-b border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block">
                  Vistas y Simuladores
                </span>
                <button
                  onClick={() => {
                    onOpenWelcome?.();
                    setActiveTab('adventure');
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition text-left cursor-pointer text-slate-700 hover:bg-slate-100"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Pantalla de Bienvenida</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('adventure');
                    setMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                    activeTab === 'adventure' || activeTab === 'game'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Home className="w-4 h-4 text-emerald-500" />
                  <span>Aventura («Mi futura casa»)</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('lcc');
                    setMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                    activeTab === 'lcc'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <LineChart className="w-4 h-4 text-sky-400" />
                  <span>Simulador LCC (30 años)</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('blower');
                    setMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                    activeTab === 'blower'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Wind className="w-4 h-4 text-teal-400" />
                  <span>Test Hermetismo (Cero fugas)</span>
                </button>

                <a
                  href="https://webprumedgon.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition text-left cursor-pointer text-slate-700 hover:bg-slate-100 no-underline"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span>Catálogo Casas (Web Oficial)</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <button
                  onClick={() => {
                    setActiveTab('certificate');
                    setMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                    activeTab === 'certificate'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Certificado Oficial</span>
                </button>
              </div>

              {/* Settings & Accessibility */}
              <div className="pt-2 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block">
                  Ajustes y Accesibilidad
                </span>

                {/* Voice narration */}
                <button
                  onClick={() => {
                    onToggleSpeech();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs text-slate-700 hover:bg-slate-100 font-medium transition cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    {isSpeaking ? (
                      <VolumeX className="w-4 h-4 text-amber-600" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-slate-500" />
                    )}
                    <span>Narración por voz</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">
                    {isSpeaking ? 'Detener' : 'Activar'}
                  </span>
                </button>

                {/* Font size */}
                <div className="flex items-center justify-between px-3 py-1.5 text-xs text-slate-700">
                  <span>Tamaño texto</span>
                  <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50 font-bold">
                    <button
                      onClick={() => setFontSize('normal')}
                      className={`px-2 py-0.5 rounded text-xs cursor-pointer ${
                        fontSize === 'normal'
                          ? 'bg-white shadow-2xs text-slate-900'
                          : 'text-slate-500'
                      }`}
                    >
                      A
                    </button>
                    <button
                      onClick={() => setFontSize('large')}
                      className={`px-2 py-0.5 rounded text-sm cursor-pointer ${
                        fontSize === 'large'
                          ? 'bg-white shadow-2xs text-slate-900'
                          : 'text-slate-500'
                      }`}
                    >
                      A+
                    </button>
                  </div>
                </div>

                {/* High contrast */}
                <button
                  onClick={() => setHighContrast(!highContrast)}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs text-slate-700 hover:bg-slate-100 font-medium transition cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    {highContrast ? (
                      <Sun className="w-4 h-4 text-amber-500" />
                    ) : (
                      <Moon className="w-4 h-4 text-slate-500" />
                    )}
                    <span>Alto contraste</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">
                    {highContrast ? 'Activo' : 'Inactivo'}
                  </span>
                </button>

                {/* Reset adventure */}
                <button
                  onClick={() => {
                    onRestart();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs text-rose-700 hover:bg-rose-50 font-bold transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reiniciar simulación</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Four Reigns Indicators Always in the Same Position - matched to main section */}
      <div className="w-full bg-slate-50/90 border-t border-slate-200 py-2">
        <div className="w-full max-w-2xl mx-auto px-3 sm:px-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Indicator 1: Presupuesto */}
          <div
            className={`bg-white p-2.5 rounded-xl border transition-all shadow-2xs relative ${
              getIndicatorHaloClass('budget') ||
              (previewChoice?.deltaPresupuesto
                ? previewChoice.deltaPresupuesto < 0
                  ? 'border-rose-400 ring-2 ring-rose-200'
                  : 'border-emerald-400 ring-2 ring-emerald-200'
                : 'border-slate-200/80')
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <span>💰</span>
                <span>Presupuesto</span>
              </span>

              {/* Consequence Animated Delta Badge */}
              {highlightedIndicator === 'budget' && activeDelta?.presupuesto !== undefined ? (
                <span
                  className={`text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider animate-item-pop ${
                    activeDelta.presupuesto < 0
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-teal-600 text-white shadow-xs'
                  }`}
                >
                  {activeDelta.presupuesto < 0
                    ? `${activeDelta.presupuesto} €`
                    : '✓ Blindado'}
                </span>
              ) : previewChoice ? (
                <span
                  className={`text-[9px] font-extrabold px-1 py-0.2 rounded-full ${
                    previewChoice.deltaPresupuesto < 0
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {previewChoice.deltaPresupuesto < 0
                    ? `${previewChoice.deltaPresupuesto} €`
                    : '✓ Blindado'}
                </span>
              ) : null}
            </div>

            {/* Big Counter Value (ticking progressively) */}
            <div className="text-sm sm:text-base font-black text-slate-900 mt-0.5 leading-tight tracking-tight">
              {formatoEuros(animatedPresupuesto)}
            </div>

            {/* Total / Deviation context */}
            <div className="text-[10px] text-slate-500 truncate mt-0.5">
              {desvioEuros === 0 ? (
                <span className="text-emerald-700 font-semibold">Desvíos: 0 €</span>
              ) : (
                <span className="text-rose-700 font-semibold">
                  Desvío total: +{formatoEuros(desvioEuros)}
                </span>
              )}
            </div>
          </div>

          {/* Indicator 2: Plazos / Tiempo */}
          <div
            className={`bg-white p-2.5 rounded-xl border transition-all shadow-2xs relative ${
              getIndicatorHaloClass('weeks') ||
              (previewChoice?.deltaSemanas
                ? previewChoice.deltaSemanas > 3
                  ? 'border-rose-400 ring-2 ring-rose-200'
                  : 'border-slate-400 ring-2 ring-slate-200'
                : 'border-slate-200/80')
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <span>⏳</span>
                <span>Plazo Obra</span>
              </span>

              {/* Consequence Animated Delta Badge */}
              {highlightedIndicator === 'weeks' && activeDelta?.semanas !== undefined ? (
                <span
                  className={`text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider animate-item-pop ${
                    activeDelta.semanas > 0
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-teal-600 text-white shadow-xs'
                  }`}
                >
                  {activeDelta.semanas > 0 ? `+${activeDelta.semanas} sem` : '0 sem'}
                </span>
              ) : previewChoice ? (
                <span
                  className={`text-[9px] font-extrabold px-1 py-0.2 rounded-full ${
                    previewChoice.deltaSemanas > 2
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  +{previewChoice.deltaSemanas} sem
                </span>
              ) : null}
            </div>

            {/* Big Counter Value */}
            <div className="text-sm sm:text-base font-black text-slate-900 mt-0.5 leading-tight tracking-tight">
              Semana {animatedSemanas}
            </div>

            {/* Total / Scheduled context */}
            <div className="text-[10px] text-slate-500 truncate mt-0.5">
              <span>Previsto: {semanasPrevistas} sem</span>
            </div>
          </div>

          {/* Indicator 3: Estrés / Bienestar */}
          <div
            className={`bg-white p-2.5 rounded-xl border transition-all shadow-2xs relative ${
              getIndicatorHaloClass('stress') ||
              (previewChoice?.deltaEstres
                ? previewChoice.deltaEstres > 0
                  ? 'border-amber-400 ring-2 ring-amber-200'
                  : 'border-emerald-400 ring-2 ring-emerald-200'
                : 'border-slate-200/80')
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <span>🧠</span>
                <span>Estrés</span>
              </span>

              {/* Consequence Animated Delta Badge */}
              {highlightedIndicator === 'stress' && activeDelta?.estres !== undefined ? (
                <span
                  className={`text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider animate-item-pop ${
                    activeDelta.estres > 0
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-teal-600 text-white shadow-xs'
                  }`}
                >
                  {activeDelta.estres > 0 ? `+${activeDelta.estres}%` : `${activeDelta.estres}%`}
                </span>
              ) : previewChoice ? (
                <span
                  className={`text-[9px] font-extrabold px-1 py-0.2 rounded-full ${
                    previewChoice.deltaEstres > 0
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {previewChoice.deltaEstres > 0 ? `+${previewChoice.deltaEstres}%` : '-5%'}
                </span>
              ) : null}
            </div>

            {/* Big Counter Value with dynamic Progress Bar */}
            <div className="text-sm sm:text-base font-black text-slate-900 mt-0.5 leading-tight font-mono tracking-tight flex items-baseline justify-between">
              <span>{animatedEstres}%</span>
              <span className="text-[9px] font-sans font-normal text-slate-400">
                {animatedEstres < 30 ? 'Bajo control' : animatedEstres < 60 ? 'Tensión' : 'Alerta'}
              </span>
            </div>

            {/* Dynamic visual progress bar for stress */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1 border border-slate-200/50">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  animatedEstres > 50
                    ? 'bg-rose-500'
                    : animatedEstres > 25
                    ? 'bg-amber-500'
                    : 'bg-teal-500'
                }`}
                style={{ width: `${Math.min(100, Math.max(0, animatedEstres))}%` }}
              />
            </div>

            {/* ASCII bar */}
            <div className="text-[9px] text-slate-400 truncate mt-0.5 font-mono">
              {estresBarra}
            </div>
          </div>

          {/* Indicator 4: Confort y Factura Passivhaus */}
          <div
            className={`bg-white p-2.5 rounded-xl border transition-all shadow-2xs relative ${
              getIndicatorHaloClass('energy') ||
              (previewChoice?.deltaFactura
                ? previewChoice.deltaFactura > 0
                  ? 'border-rose-400 ring-2 ring-rose-200'
                  : 'border-emerald-400 ring-2 ring-emerald-200'
                : 'border-slate-200/80')
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <span>⚡</span>
                <span>Energía</span>
              </span>

              {/* Consequence Animated Delta Badge */}
              {highlightedIndicator === 'energy' && activeDelta?.factura !== undefined ? (
                <span
                  className={`text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider animate-item-pop ${
                    activeDelta.factura > 0
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-teal-600 text-white shadow-xs'
                  }`}
                >
                  {activeDelta.factura > 0 ? `+${activeDelta.factura} €` : '35 €/mes'}
                </span>
              ) : previewChoice ? (
                <span
                  className={`text-[9px] font-extrabold px-1 py-0.2 rounded-full ${
                    previewChoice.deltaFactura > 0
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {previewChoice.deltaFactura > 0 ? `+${previewChoice.deltaFactura} €` : 'Óptimo'}
                </span>
              ) : null}
            </div>

            {/* Big Counter Value */}
            <div className="text-sm sm:text-base font-black text-emerald-800 mt-0.5 leading-tight tracking-tight">
              {animatedFactura} €/mes
            </div>

            {/* Total / Airtightness context */}
            <div className="text-[10px] text-slate-500 truncate mt-0.5">
              Hermetismo: {blowerDoorN50} ren/h
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
