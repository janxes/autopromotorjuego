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
  Type,
  ChevronDown,
  ChevronUp,
  HelpCircle,
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
  fontSize: 'normal' | 'medium' | 'large' | 'xlarge';
  setFontSize: (size: 'normal' | 'medium' | 'large' | 'xlarge') => void;
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
  onOpenHelp?: () => void;
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
  onOpenHelp,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [textSizePopoverOpen, setTextSizePopoverOpen] = useState(false);
  const [restartConfirmOpen, setRestartConfirmOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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
    <header
      style={{ position: 'sticky', top: 0 }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 shadow-xs w-full"
    >
      {/* Top Bar matched to the exact width of the 'main' section */}
      <div className="w-full max-w-2xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-3 relative">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2 min-w-0 flex-1 sm:flex-initial">
          <div className="h-7 sm:h-9 flex items-center justify-center shrink-0">
            <img
              src="/images/Logomedgonnofondo.png"
              alt="Medgon Passivhaus"
              className="h-7 sm:h-9 w-auto max-w-[80px] sm:max-w-[110px] object-contain shrink-0"
            />
          </div>
          <div className="min-w-0">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('adventure');
              }}
              className="text-xs sm:text-base font-black tracking-tight text-slate-900 hover:text-emerald-800 transition block leading-tight truncate"
            >
              La Odisea del Autopromotor
            </a>
            <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium block truncate">
              El juego de construir tu mejor casa.
            </span>
          </div>
        </div>

        {/* Right Header Action Buttons: Help, Accessibility, New Game, and Menu */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Quick Help Guide Button */}
          <button
            onClick={onOpenHelp}
            className="p-2 rounded-xl border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-800 transition flex items-center justify-center gap-1 focus:outline-hidden cursor-pointer"
            title="Guía del juego: Cómo jugar y accesibilidad"
            aria-label="Guía del juego: Cómo jugar y accesibilidad"
          >
            <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-800 hidden sm:inline">
              Ayuda
            </span>
          </button>

          {/* Quick Text Size Accessibility Button */}
          <div className="relative">
            <button
              onClick={() => {
                setTextSizePopoverOpen(!textSizePopoverOpen);
                setMenuOpen(false);
                setRestartConfirmOpen(false);
              }}
              className={`p-2 rounded-xl border text-slate-800 transition flex items-center justify-center gap-1 focus:outline-hidden cursor-pointer ${
                textSizePopoverOpen
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-300'
              }`}
              title="Accesibilidad y ampliación de texto"
              aria-label="Accesibilidad y ampliación de texto"
              aria-expanded={textSizePopoverOpen}
            >
              <Type className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-tight hidden sm:inline">
                {fontSize === 'normal' && 'A'}
                {fontSize === 'medium' && 'A+'}
                {fontSize === 'large' && 'A++'}
                {fontSize === 'xlarge' && 'Max'}
              </span>
            </button>

            {/* Accessibility / Text Size Popover - locked strictly to mobile screen bounds */}
            {textSizePopoverOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-black/10 backdrop-blur-2xs"
                  onClick={() => setTextSizePopoverOpen(false)}
                />
                <div className="fixed sm:absolute left-3 right-3 sm:left-auto sm:right-0 top-14 sm:top-full mt-1.5 sm:mt-2 max-w-[calc(100vw-1.5rem)] sm:w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-2.5 mx-auto">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Type className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Ampliación de texto</span>
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                      {fontSize === 'normal' && '100%'}
                      {fontSize === 'medium' && '115%'}
                      {fontSize === 'large' && '130%'}
                      {fontSize === 'xlarge' && '150%'}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-1 p-0.5 bg-slate-100 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setFontSize('normal')}
                      className={`py-1.5 px-1 rounded-lg text-xs font-bold transition flex items-center justify-center cursor-pointer min-w-0 truncate ${
                        fontSize === 'normal'
                          ? 'bg-slate-900 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                      }`}
                      title="100% - Normal"
                    >
                      A
                    </button>
                    <button
                      type="button"
                      onClick={() => setFontSize('medium')}
                      className={`py-1.5 px-1 rounded-lg text-xs font-bold transition flex items-center justify-center cursor-pointer min-w-0 truncate ${
                        fontSize === 'medium'
                          ? 'bg-slate-900 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                      }`}
                      title="115% - Grande"
                    >
                      A+
                    </button>
                    <button
                      type="button"
                      onClick={() => setFontSize('large')}
                      className={`py-1.5 px-1 rounded-lg text-xs font-bold transition flex items-center justify-center cursor-pointer min-w-0 truncate ${
                        fontSize === 'large'
                          ? 'bg-slate-900 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                      }`}
                      title="130% - Muy grande"
                    >
                      A++
                    </button>
                    <button
                      type="button"
                      onClick={() => setFontSize('xlarge')}
                      className={`py-1.5 px-1 rounded-lg text-xs font-black transition flex items-center justify-center cursor-pointer min-w-0 truncate ${
                        fontSize === 'xlarge'
                          ? 'bg-slate-900 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                      }`}
                      title="150% - Máximo accesible"
                    >
                      Max
                    </button>
                  </div>

                  {/* Contrast shortcut */}
                  <div className="pt-2 border-t border-slate-100">
                    <button
                      onClick={() => setHighContrast(!highContrast)}
                      className={`w-full px-2.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                        highContrast
                          ? 'bg-amber-100 border-amber-300 text-amber-950 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Sun className="w-3.5 h-3.5 text-amber-600" />
                        <span>Modo alto contraste</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">
                        {highContrast ? 'ON' : 'OFF'}
                      </span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Quick Restart / Nueva Partida Button */}
          <div className="relative">
            <button
              onClick={() => {
                setRestartConfirmOpen(!restartConfirmOpen);
                setMenuOpen(false);
                setTextSizePopoverOpen(false);
              }}
              className={`p-2 rounded-xl border text-slate-800 transition flex items-center justify-center gap-1.5 focus:outline-hidden cursor-pointer ${
                restartConfirmOpen
                  ? 'bg-rose-50 text-rose-700 border-rose-300'
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-300'
              }`}
              title="Empezar nueva partida"
              aria-label="Empezar nueva partida"
            >
              <RotateCcw className="w-4 h-4 text-slate-700" />
              <span className="text-[11px] font-bold hidden md:inline text-slate-700">
                Nueva partida
              </span>
            </button>

            {/* Restart Confirmation Popover - safely bounded on mobile */}
            {restartConfirmOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-black/10 backdrop-blur-2xs"
                  onClick={() => setRestartConfirmOpen(false)}
                />
                <div className="fixed sm:absolute left-3 right-3 sm:left-auto sm:right-0 top-14 sm:top-full mt-1.5 sm:mt-2 max-w-[calc(100vw-1.5rem)] sm:w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-2.5 mx-auto">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-900 block">
                      ¿Empezar nueva partida?
                    </span>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      Reiniciarás el presupuesto, el calendario y tus decisiones para empezar de cero.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => setRestartConfirmOpen(false)}
                      className="px-2.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        onRestart();
                        setRestartConfirmOpen(false);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-2xs cursor-pointer"
                    >
                      Sí, reiniciar
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 3 Horizontal Stripes Menu Button */}
          <div className="relative">
            <button
              onClick={() => {
                setMenuOpen(!menuOpen);
                setTextSizePopoverOpen(false);
                setRestartConfirmOpen(false);
              }}
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
              className="fixed inset-0 z-40 bg-black/10 backdrop-blur-2xs"
              onClick={() => setMenuOpen(false)}
            />
          )}

          {/* Dropdown Menu - safely bounded on mobile */}
          {menuOpen && (
            <div className="fixed sm:absolute left-3 right-3 sm:left-auto sm:right-0 top-14 sm:top-full mt-1.5 sm:mt-2 max-w-[calc(100vw-1.5rem)] sm:w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[85vh] overflow-y-auto mx-auto">
              {/* Top featured: Help Guide */}
              <div className="pb-2 border-b border-slate-100">
                <button
                  onClick={() => {
                    onOpenHelp?.();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold transition text-left cursor-pointer bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-200 shadow-2xs"
                >
                  <HelpCircle className="w-5 h-5 text-emerald-700 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="block font-black text-emerald-950 leading-tight">
                      ¿Cómo jugar? (Guía de Ayuda)
                    </span>
                    <span className="text-[10px] text-emerald-800 font-medium block truncate">
                      Intención, mecánica y accesibilidad
                    </span>
                  </div>
                </button>
              </div>

              {/* Navigation items */}
              <div className="space-y-1 py-2 border-b border-slate-100">
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

                {/* Font size - 4 accessible enlargement options */}
                <div className="px-3 py-2 space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">Tamaño de texto</span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                      {fontSize === 'normal' && '100% · Estándar'}
                      {fontSize === 'medium' && '115% · Grande'}
                      {fontSize === 'large' && '130% · Muy grande'}
                      {fontSize === 'xlarge' && '150% · Máximo'}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 p-0.5 bg-slate-100 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setFontSize('normal')}
                      title="Tamaño estándar (100% - 16px)"
                      className={`py-1 rounded-lg text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                        fontSize === 'normal'
                          ? 'bg-slate-900 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                      }`}
                    >
                      A
                    </button>
                    <button
                      type="button"
                      onClick={() => setFontSize('medium')}
                      title="Tamaño grande (115% - 18.5px)"
                      className={`py-1 rounded-lg text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                        fontSize === 'medium'
                          ? 'bg-slate-900 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                      }`}
                    >
                      A+
                    </button>
                    <button
                      type="button"
                      onClick={() => setFontSize('large')}
                      title="Tamaño muy grande (130% - 21px)"
                      className={`py-1 rounded-lg text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                        fontSize === 'large'
                          ? 'bg-slate-900 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                      }`}
                    >
                      A++
                    </button>
                    <button
                      type="button"
                      onClick={() => setFontSize('xlarge')}
                      title="Tamaño máximo accesible (150% - 24px)"
                      className={`py-1 rounded-lg text-xs font-black transition flex items-center justify-center cursor-pointer ${
                        fontSize === 'xlarge'
                          ? 'bg-slate-900 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                      }`}
                    >
                      Max
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
    </div>

      {/* Four Reigns Indicators Always in the Same Position - strictly 1 single row */}
      <div className="w-full bg-slate-50/95 border-t border-slate-200 py-1.5 shadow-xs">
        {/* Selected target element: 1-row 4-column grid */}
        <div className="w-full max-w-2xl mx-auto px-2 sm:px-4 grid grid-cols-4 gap-1 sm:gap-2 items-stretch">
          {/* Indicator 1: Presupuesto */}
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className={`bg-white p-1.5 sm:p-2 rounded-xl border transition-all shadow-2xs relative cursor-pointer select-none ${
              getIndicatorHaloClass('budget') ||
              (previewChoice?.deltaPresupuesto
                ? previewChoice.deltaPresupuesto < 0
                  ? 'border-rose-400 ring-2 ring-rose-200'
                  : 'border-emerald-400 ring-2 ring-emerald-200'
                : 'border-slate-200/90 hover:border-slate-300')
            }`}
            title={isExpanded ? 'Toca para compactar' : 'Toca para ver detalles de presupuesto'}
          >
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-0.5 sm:gap-1 min-w-0">
                <span className="shrink-0">💰</span>
                <span className="truncate hidden xs:inline sm:inline">Presupuesto</span>
                <span className="truncate xs:hidden sm:hidden">Presup.</span>
              </span>

              {/* Consequence Animated Delta Badge */}
              {highlightedIndicator === 'budget' && activeDelta?.presupuesto !== undefined ? (
                <span
                  className={`text-[9px] sm:text-xs font-black px-1 sm:px-1.5 py-0.2 sm:py-0.5 rounded-md uppercase tracking-wider animate-item-pop shrink-0 ${
                    activeDelta.presupuesto < 0
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-teal-600 text-white shadow-xs'
                  }`}
                >
                  {activeDelta.presupuesto < 0
                    ? `${activeDelta.presupuesto} €`
                    : '✓ OK'}
                </span>
              ) : previewChoice ? (
                <span
                  className={`text-[9px] sm:text-xs font-extrabold px-1 sm:px-1.5 py-0.2 sm:py-0.5 rounded-full shrink-0 ${
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
            <div className="text-[11px] xs:text-xs sm:text-sm md:text-base font-black text-slate-900 mt-0.5 leading-tight tracking-tight truncate">
              {formatoEuros(animatedPresupuesto)}
            </div>

            {/* Expanded context */}
            {isExpanded && (
              <div className="text-[9px] sm:text-xs text-slate-600 truncate mt-1 pt-1 border-t border-slate-100 font-medium">
                {desvioEuros === 0 ? (
                  <span className="text-emerald-700 font-bold">Desvíos: 0 €</span>
                ) : (
                  <span className="text-rose-700 font-bold">
                    +{formatoEuros(desvioEuros)}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Indicator 2: Plazos / Tiempo */}
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className={`bg-white p-1.5 sm:p-2 rounded-xl border transition-all shadow-2xs relative cursor-pointer select-none ${
              getIndicatorHaloClass('weeks') ||
              (previewChoice?.deltaSemanas
                ? previewChoice.deltaSemanas > 3
                  ? 'border-rose-400 ring-2 ring-rose-200'
                  : 'border-slate-400 ring-2 ring-slate-200'
                : 'border-slate-200/90 hover:border-slate-300')
            }`}
            title={isExpanded ? 'Toca para compactar' : 'Toca para ver detalles de plazos'}
          >
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-0.5 sm:gap-1 min-w-0">
                <span className="shrink-0">⏳</span>
                <span className="truncate">Plazo</span>
              </span>

              {/* Consequence Animated Delta Badge */}
              {highlightedIndicator === 'weeks' && activeDelta?.semanas !== undefined ? (
                <span
                  className={`text-[9px] sm:text-xs font-black px-1 sm:px-1.5 py-0.2 sm:py-0.5 rounded-md uppercase tracking-wider animate-item-pop shrink-0 ${
                    activeDelta.semanas > 0
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-teal-600 text-white shadow-xs'
                  }`}
                >
                  {activeDelta.semanas > 0 ? `+${activeDelta.semanas}s` : '0s'}
                </span>
              ) : previewChoice ? (
                <span
                  className={`text-[9px] sm:text-xs font-extrabold px-1 sm:px-1.5 py-0.2 sm:py-0.5 rounded-full shrink-0 ${
                    previewChoice.deltaSemanas > 2
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  +{previewChoice.deltaSemanas}s
                </span>
              ) : null}
            </div>

            {/* Big Counter Value */}
            <div className="text-[11px] xs:text-xs sm:text-sm md:text-base font-black text-slate-900 mt-0.5 leading-tight tracking-tight truncate">
              Sem. {animatedSemanas}
            </div>

            {/* Expanded context */}
            {isExpanded && (
              <div className="text-[9px] sm:text-xs text-slate-600 truncate mt-1 pt-1 border-t border-slate-100 font-medium">
                Previsto: {semanasPrevistas} sem
              </div>
            )}
          </div>

          {/* Indicator 3: Estrés / Bienestar */}
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className={`bg-white p-1.5 sm:p-2 rounded-xl border transition-all shadow-2xs relative cursor-pointer select-none ${
              getIndicatorHaloClass('stress') ||
              (previewChoice?.deltaEstres
                ? previewChoice.deltaEstres > 0
                  ? 'border-amber-400 ring-2 ring-amber-200'
                  : 'border-emerald-400 ring-2 ring-emerald-200'
                : 'border-slate-200/90 hover:border-slate-300')
            }`}
            title={isExpanded ? 'Toca para compactar' : 'Toca para ver detalles de estrés'}
          >
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-0.5 sm:gap-1 min-w-0">
                <span className="shrink-0">🧠</span>
                <span className="truncate">Estrés</span>
              </span>

              {/* Consequence Animated Delta Badge */}
              {highlightedIndicator === 'stress' && activeDelta?.estres !== undefined ? (
                <span
                  className={`text-[9px] sm:text-xs font-black px-1 sm:px-1.5 py-0.2 sm:py-0.5 rounded-md uppercase tracking-wider animate-item-pop shrink-0 ${
                    activeDelta.estres > 0
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-teal-600 text-white shadow-xs'
                  }`}
                >
                  {activeDelta.estres > 0 ? `+${activeDelta.estres}%` : `${activeDelta.estres}%`}
                </span>
              ) : previewChoice ? (
                <span
                  className={`text-[9px] sm:text-xs font-extrabold px-1 sm:px-1.5 py-0.2 sm:py-0.5 rounded-full shrink-0 ${
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
            <div className="text-[11px] xs:text-xs sm:text-sm md:text-base font-black text-slate-900 mt-0.5 leading-tight font-mono tracking-tight flex items-baseline justify-between truncate">
              <span>{animatedEstres}%</span>
              <span className="text-[8px] sm:text-[9px] font-sans font-bold text-slate-400 hidden xs:inline">
                {animatedEstres < 30 ? 'Zen' : animatedEstres < 60 ? 'Tensión' : 'Alerta'}
              </span>
            </div>

            {/* Dynamic visual progress bar for stress */}
            <div className="w-full bg-slate-100 h-1 sm:h-1.5 rounded-full overflow-hidden mt-0.5 sm:mt-1 border border-slate-200/50">
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

            {/* Expanded details */}
            {isExpanded && (
              <div className="text-[9px] sm:text-xs text-slate-500 truncate mt-1 pt-1 border-t border-slate-100 font-mono">
                {estresBarra}
              </div>
            )}
          </div>

          {/* Indicator 4: Confort y Factura Passivhaus */}
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className={`bg-white p-1.5 sm:p-2 rounded-xl border transition-all shadow-2xs relative cursor-pointer select-none ${
              getIndicatorHaloClass('energy') ||
              (previewChoice?.deltaFactura
                ? previewChoice.deltaFactura > 0
                  ? 'border-rose-400 ring-2 ring-rose-200'
                  : 'border-emerald-400 ring-2 ring-emerald-200'
                : 'border-slate-200/90 hover:border-slate-300')
            }`}
            title={isExpanded ? 'Toca para compactar' : 'Toca para ver detalles de energía'}
          >
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-0.5 sm:gap-1 min-w-0">
                <span className="shrink-0">⚡</span>
                <span className="truncate">Energía</span>
              </span>

              {/* Consequence Animated Delta Badge */}
              {highlightedIndicator === 'energy' && activeDelta?.factura !== undefined ? (
                <span
                  className={`text-[9px] sm:text-xs font-black px-1 sm:px-1.5 py-0.2 sm:py-0.5 rounded-md uppercase tracking-wider animate-item-pop shrink-0 ${
                    activeDelta.factura > 0
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-teal-600 text-white shadow-xs'
                  }`}
                >
                  {activeDelta.factura > 0 ? `+${activeDelta.factura}€` : '35€/m'}
                </span>
              ) : previewChoice ? (
                <span
                  className={`text-[9px] sm:text-xs font-extrabold px-1 sm:px-1.5 py-0.2 sm:py-0.5 rounded-full shrink-0 ${
                    previewChoice.deltaFactura > 0
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {previewChoice.deltaFactura > 0 ? `+${previewChoice.deltaFactura}€` : 'Óptimo'}
                </span>
              ) : null}
            </div>

            {/* Big Counter Value */}
            <div className="text-[11px] xs:text-xs sm:text-sm md:text-base font-black text-emerald-800 mt-0.5 leading-tight tracking-tight truncate">
              {animatedFactura} €/m
            </div>

            {/* Expanded details */}
            {isExpanded && (
              <div className="text-[9px] sm:text-xs text-slate-600 truncate mt-1 pt-1 border-t border-slate-100 font-medium">
                n50: {blowerDoorN50} ren/h
              </div>
            )}
          </div>
        </div>

        {/* Optional expand / collapse interaction button */}
        <div className="w-full max-w-2xl mx-auto px-2 sm:px-4 flex items-center justify-between pt-0.5">
          <span className="text-[8px] sm:text-[9px] text-slate-600 font-bold hidden sm:inline">
            Marcador fijado arriba · Pulsa cualquier indicador para ver detalles
          </span>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1 text-[8px] sm:text-[9px] font-bold text-slate-500 hover:text-slate-800 transition py-0.5 px-1.5 rounded hover:bg-slate-200/50 cursor-pointer ml-auto"
            title={isExpanded ? 'Compactar a 1 fila' : 'Ver marcador en grande con detalles'}
          >
            <span>{isExpanded ? '▲ Compactar a 1 fila' : '▼ Ver en grande con detalles'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
