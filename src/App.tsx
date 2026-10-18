import React, { useState, useEffect } from 'react';
import {
  GameIndicators,
  HouseStage,
  CardChoice,
  GameHistoryEntry,
  PlayerProfile,
} from './types/game';
import {
  REIGNS_SCENARIOS,
  calculatePlayerProfile,
} from './utils/reignsScenarioData';
import { HUDHeader } from './components/HUDHeader';
import { ReignsCard } from './components/ReignsCard';
import { HouseVisualizer } from './components/HouseVisualizer';
import { MyProjectView } from './components/MyProjectView';
import { TechnicalTipCard } from './components/TechnicalTipCard';
import { ParallelUniverseModal } from './components/ParallelUniverseModal';
import { LCCSimulatorView } from './components/LCCSimulatorView';
import { BlowerDoorLabView } from './components/BlowerDoorLabView';
import { CatalogView } from './components/CatalogView';
import { CertificateModal } from './components/CertificateModal';
import { useDecisionFeedback } from './hooks/useDecisionFeedback';
import { ConsequenceFeedbackCard } from './components/ConsequenceFeedbackCard';
import { WelcomeScreen } from './components/WelcomeScreen';
import {
  Home,
  FileText,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Layers,
  BookOpen,
  LineChart,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'autopromotor_reigns_save_v4';

const INITIAL_INDICATORS: GameIndicators = {
  presupuestoRestante: 250000,
  presupuestoInicial: 250000,
  desvioEuros: 0,
  semanasTranscurridas: 0,
  semanasPrevistas: 24,
  estresPorcentaje: 10,
  facturaEnergeticaMes: 35,
  n50BlowerDoor: 0.45,
};

export default function App() {
  // Navigation & Subviews
  const [activeTab, setActiveTab] = useState<
    'adventure' | 'lcc' | 'blower' | 'catalog' | 'certificate'
  >('adventure');
  const [activeSubView, setActiveSubView] = useState<'house' | 'project'>('house');
  const [showWelcome, setShowWelcome] = useState<boolean>(true);

  // Game Engine State
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [houseStage, setHouseStage] = useState<HouseStage>(1);
  const [indicators, setIndicators] = useState<GameIndicators>(INITIAL_INDICATORS);
  const [history, setHistory] = useState<GameHistoryEntry[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [playerProfile, setPlayerProfile] = useState<PlayerProfile | null>(null);

  // Interaction & Choice state
  const [hoveredPreviewChoice, setHoveredPreviewChoice] = useState<CardChoice | null>(null);
  const [pendingChoiceForTip, setPendingChoiceForTip] = useState<{
    choice: CardChoice;
    unselectedChoice: CardChoice;
  } | null>(null);
  // Reusable Animated Consequence Feedback Hook (Sort the Court! inspired)
  const { feedbackState, showDecisionConsequences, skipOrAdvance } = useDecisionFeedback();

  // Parallel Universe modal
  const [parallelModalData, setParallelModalData] = useState<{
    chosen: CardChoice;
    alternative: CardChoice;
  } | null>(null);

  // Accessibility state with 4 text enlargement levels
  const [fontSize, setFontSize] = useState<'normal' | 'medium' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Root font size listener: scales all typography proportionally across the app
  useEffect(() => {
    const sizeMap: Record<'normal' | 'medium' | 'large' | 'xlarge', string> = {
      normal: '16px',
      medium: '18.5px',
      large: '21px',
      xlarge: '24px',
    };
    document.documentElement.style.setProperty('--app-font-size', sizeMap[fontSize] || '16px');
  }, [fontSize]);

  // High contrast listener
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.indicators && typeof parsed.cardIndex === 'number') {
          setIndicators(parsed.indicators);
          setCardIndex(parsed.cardIndex);
          setHouseStage(parsed.houseStage || 1);
          setHistory(parsed.history || []);
          setIsGameOver(parsed.isGameOver || false);
          setPlayerProfile(parsed.playerProfile || null);
        }
      }
    } catch (e) {
      console.warn('Could not restore saved game state', e);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          indicators,
          cardIndex,
          houseStage,
          history,
          isGameOver,
          playerProfile,
        })
      );
    } catch (e) {
      // ignore
    }
  }, [indicators, cardIndex, houseStage, history, isGameOver, playerProfile]);

  const currentCard = REIGNS_SCENARIOS[cardIndex] || REIGNS_SCENARIOS[0];

  // Speech synthesis
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = feedbackState.isActive
      ? `${feedbackState.consequenceText}. ${feedbackState.partnerReaction || ''}`
      : `${currentCard.character.role} ${currentCard.character.name} dice: ${currentCard.prompt}. Opción A: ${currentCard.leftChoice.label}. Opción B: ${currentCard.rightChoice.label}.`;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'es-ES';
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleRestart = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    localStorage.removeItem(STORAGE_KEY);
    setIndicators(INITIAL_INDICATORS);
    setCardIndex(0);
    setHouseStage(1);
    setHistory([]);
    setIsGameOver(false);
    setPlayerProfile(null);
    setPendingChoiceForTip(null);
    setHoveredPreviewChoice(null);
    setActiveTab('adventure');
    setActiveSubView('house');
  };

  // User chooses an option on the Reigns card
  const handleChoose = (choice: CardChoice) => {
    if (feedbackState.isLocked) return;
    setHoveredPreviewChoice(null);
    const unselectedChoice =
      choice.id === currentCard.leftChoice.id ? currentCard.rightChoice : currentCard.leftChoice;

    // If the choice has a technical warning tip, present the TechnicalTipCard first
    if (choice.technicalTip) {
      setPendingChoiceForTip({ choice, unselectedChoice });
      return;
    }

    // Otherwise apply directly
    applyChoiceCommit(choice, unselectedChoice);
  };

  // Confirmed commit of the choice: triggers Sort the Court! style feedback
  const applyChoiceCommit = (choice: CardChoice, unselectedChoice: CardChoice) => {
    setPendingChoiceForTip(null);

    const deltaEur = choice.deltaPresupuesto;
    const nuevoRestante = Math.max(0, indicators.presupuestoRestante + deltaEur);
    const nuevoDesvio = deltaEur < 0 ? indicators.desvioEuros + Math.abs(deltaEur) : indicators.desvioEuros;
    const nuevasSemanas = indicators.semanasTranscurridas + choice.deltaSemanas;
    const nuevoEstres = Math.min(100, Math.max(0, indicators.estresPorcentaje + choice.deltaEstres));
    const nuevaFactura = Math.max(25, indicators.facturaEnergeticaMes + choice.deltaFactura);
    const nuevoN50 = choice.isPassivhausWay
      ? indicators.n50BlowerDoor
      : currentCard.level >= 4
      ? 5.4
      : indicators.n50BlowerDoor;

    const nextIndicators: GameIndicators = {
      presupuestoInicial: indicators.presupuestoInicial,
      presupuestoRestante: nuevoRestante,
      desvioEuros: nuevoDesvio,
      semanasTranscurridas: nuevasSemanas,
      semanasPrevistas: indicators.semanasPrevistas,
      estresPorcentaje: nuevoEstres,
      facturaEnergeticaMes: nuevaFactura,
      n50BlowerDoor: nuevoN50,
    };

    const prevIndicators = { ...indicators };
    setIndicators(nextIndicators);
    setHouseStage(currentCard.houseStageAfter);

    const newHistoryEntry: GameHistoryEntry = {
      cardId: currentCard.id,
      chosenOptionId: choice.id,
      chosenLabel: choice.label,
      consequenceText: choice.consequenceText,
      partnerReaction: choice.partnerReaction,
      indicatorsSnapshot: nextIndicators,
      unselectedChoice,
      isPassivhausWay: choice.isPassivhausWay,
    };

    const nextHistory = [...history, newHistoryEntry];
    setHistory(nextHistory);

    // Reusable Centralized Consequence Animation Function
    showDecisionConsequences({
      title: currentCard.sceneTitle,
      label: choice.label,
      choiceId: choice.id,
      consequenceText: choice.consequenceText,
      partnerReaction: choice.partnerReaction,
      isPassivhausWay: choice.isPassivhausWay,
      deltaPresupuesto: choice.deltaPresupuesto,
      deltaSemanas: choice.deltaSemanas,
      deltaEstres: choice.deltaEstres,
      deltaFactura: choice.deltaFactura,
      animation: choice.consequenceAnimation,
      prevIndicators,
      nextIndicators,
      onComplete: () => {
        const nextIndex = cardIndex + 1;
        if (nextIndex >= REIGNS_SCENARIOS.length) {
          setIsGameOver(true);
          const profile = calculatePlayerProfile(nextHistory);
          setPlayerProfile(profile);
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
          });
        } else {
          setCardIndex(nextIndex);
        }
      },
    });
  };

  const formatoEuros = (val: number) =>
    new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(val) + ' €';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-700 selection:text-white w-full overflow-x-hidden">
      {/* 4 Fixed Indicators Header with Animated Feedback & Progressive Counters */}
      <HUDHeader
        indicators={indicators}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'game') setActiveTab('adventure');
          else setActiveTab(tab);
        }}
        onRestart={handleRestart}
        fontSize={fontSize}
        setFontSize={setFontSize}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        isSpeaking={isSpeaking}
        onToggleSpeech={handleToggleSpeech}
        previewChoice={hoveredPreviewChoice}
        highlightedIndicator={feedbackState.highlightedIndicator}
        highlightTone={feedbackState.highlightTone}
        activeDelta={
          feedbackState.isActive
            ? {
                presupuesto: feedbackState.deltaPresupuesto,
                semanas: feedbackState.deltaSemanas,
                estres: feedbackState.deltaEstres,
                factura: feedbackState.deltaFactura,
              }
            : null
        }
        onOpenWelcome={() => {
          setShowWelcome(true);
          setActiveTab('adventure');
        }}
      />

      {/* Main Container matching Header width */}
      <main className="flex-1 pb-16 w-full max-w-2xl mx-auto px-3 sm:px-4">
        {/* Welcome Screen (Seth Godin Style Manifesto) */}
        {showWelcome && activeTab === 'adventure' ? (
          <WelcomeScreen
            onStart={() => {
              handleRestart();
              setShowWelcome(false);
            }}
            hasSavedProgress={history.length > 0}
            savedTurn={cardIndex + 1}
            onResume={() => setShowWelcome(false)}
          />
        ) : (
          <>
            {/* TAB 1: ADVENTURE (Reigns Card + House Visualizer + My Project) */}
            {activeTab === 'adventure' && (
          <div className="w-full py-2.5 sm:py-3.5 space-y-3 sm:space-y-3.5">
            {/* View Switcher: «Mi futura casa» vs «Mi proyecto» */}
            <div className="flex items-center justify-center">
              <div className="inline-flex p-1 rounded-xl bg-slate-200/80 border border-slate-300 text-xs font-bold shadow-2xs">
                <button
                  onClick={() => setActiveSubView('house')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                    activeSubView === 'house'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Home className="w-3.5 h-3.5 text-emerald-700" />
                  <span>«Mi futura casa»</span>
                </button>

                <button
                  onClick={() => setActiveSubView('project')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                    activeSubView === 'project'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-sky-700" />
                  <span>«Mi proyecto»</span>
                  {history.length > 0 && (
                    <span className="w-4 h-4 rounded-full bg-slate-900 text-white text-[9px] flex items-center justify-center font-bold">
                      {history.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* SUB-VIEW 1: MI FUTURA CASA */}
            {activeSubView === 'house' && (
              <div className="space-y-3 sm:space-y-3.5 animate-in fade-in duration-200">
                {/* Visualizer Piece: The parcel transforms into a home with each decision */}
                <HouseVisualizer stage={houseStage} />

                {/* GAME OVER CARD: DELIVERY DAY! */}
                {isGameOver ? (
                  <div className="max-w-lg mx-auto bg-white rounded-3xl border-2 border-emerald-500 shadow-xl p-6 sm:p-8 text-center space-y-5 animate-in zoom-in-95 duration-300">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-3xl shadow-xs">
                      🏡
                    </div>

                    <div>
                      <span className="text-xs font-black uppercase tracking-widest text-emerald-800 block">
                        ¡Hito Conquistado!
                      </span>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                        Has llegado al Día de la Mudanza
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Tu casa de madera técnica está terminada, con llaves entregadas y confort certificado.
                      </p>
                    </div>

                    {/* Profile Badge */}
                    {playerProfile && (
                      <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-left space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{playerProfile.badgeEmoji}</span>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                              Perfil del Autopromotor:
                            </span>
                            <h4 className="text-base font-black text-emerald-950">
                              {playerProfile.title}
                            </h4>
                          </div>
                        </div>
                        <p className="text-xs text-emerald-900/90 leading-relaxed font-medium">
                          {playerProfile.description}
                        </p>
                      </div>
                    )}

                    {/* Summary metrics */}
                    <div className="grid grid-cols-2 gap-2 text-left text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                      <div>
                        <span className="text-slate-500 block">Desvío final:</span>
                        <strong
                          className={
                            indicators.desvioEuros === 0
                              ? 'text-emerald-700 font-bold'
                              : 'text-rose-700 font-bold'
                          }
                        >
                          {indicators.desvioEuros === 0
                            ? '0 € (Blindado)'
                            : `+${formatoEuros(indicators.desvioEuros)}`}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Tiempo final:</span>
                        <strong className="text-slate-800 font-bold">
                          Semana {indicators.semanasTranscurridas} (vs {indicators.semanasPrevistas})
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Factura mensual:</span>
                        <strong className="text-emerald-700 font-bold">
                          {indicators.facturaEnergeticaMes} €/mes
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Hermetismo (Cero fugas):</span>
                        <strong className="text-emerald-700 font-bold">
                          {indicators.n50BlowerDoor} ren/h (Excelente)
                        </strong>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col gap-2.5 pt-2">
                      <button
                        onClick={() => setActiveTab('certificate')}
                        className="w-full py-3.5 px-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition"
                      >
                        <Award className="w-4 h-4" />
                        <span>Ver Certificado Oficial de Idoneidad</span>
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setActiveTab('lcc')}
                          className="py-2.5 px-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                        >
                          <LineChart className="w-3.5 h-3.5 text-slate-600" />
                          <span>Simular 30 Años</span>
                        </button>

                        <a
                          href="https://webprumedgon.netlify.app"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition no-underline cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-slate-600" />
                          <span>Catálogo Casas</span>
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </a>
                      </div>

                      <button
                        onClick={handleRestart}
                        className="text-xs text-slate-500 hover:text-rose-700 font-semibold pt-1 flex items-center justify-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Empezar de nuevo con otra estrategia</span>
                      </button>
                    </div>
                  </div>
                ) : pendingChoiceForTip ? (
                  /* Technical Tip Card: Real jobsite warning and chance to review or commit */
                  <TechnicalTipCard
                    warning={pendingChoiceForTip.choice.technicalTip!.warning}
                    advice={pendingChoiceForTip.choice.technicalTip!.advice}
                    quote={pendingChoiceForTip.choice.technicalTip!.quote}
                    analogy={pendingChoiceForTip.choice.technicalTip?.analogy}
                    onKeepDecision={() =>
                      applyChoiceCommit(
                        pendingChoiceForTip.choice,
                        pendingChoiceForTip.unselectedChoice
                      )
                    }
                    onReviewDecision={() => setPendingChoiceForTip(null)}
                  />
                ) : feedbackState.isActive ? (
                  /* Animated Decision Consequence Feedback (Sort the Court! inspired) */
                  <ConsequenceFeedbackCard
                    feedback={feedbackState}
                    onAdvance={skipOrAdvance}
                  />
                ) : (
                  /* REIGNS MAIN CARD COMPONENT */
                  <ReignsCard
                    card={currentCard}
                    onChoose={handleChoose}
                    onPreviewChoice={setHoveredPreviewChoice}
                    isLocked={feedbackState.isLocked}
                    selectedChoiceId={feedbackState.selectedChoiceId}
                  />
                )}
              </div>
            )}

            {/* SUB-VIEW 2: MI PROYECTO (Documentation, timeline, and Parallel Universe) */}
            {activeSubView === 'project' && (
              <MyProjectView
                indicators={indicators}
                history={history}
                onOpenParallelUniverse={(chosen, unselected) =>
                  setParallelModalData({ chosen, alternative: unselected })
                }
              />
            )}
          </div>
        )}

        {/* TAB 2: LCC 30 AÑOS */}
        {activeTab === 'lcc' && <LCCSimulatorView />}

        {/* TAB 3: BLOWER DOOR TEST */}
        {activeTab === 'blower' && <BlowerDoorLabView />}

        {/* TAB 4: CATÁLOGO */}
        {activeTab === 'catalog' && <CatalogView />}

        {/* TAB 5: CERTIFICADO */}
        {activeTab === 'certificate' && (
          <CertificateModal
            state={{
              level: 5,
              levelName: 'Certificado Final',
              faseNombre: 'Certificado de Idoneidad',
              presupuestoInicial: indicators.presupuestoInicial,
              presupuestoRestante: indicators.presupuestoRestante,
              desvioAcumuladoEuros: indicators.desvioEuros,
              desvioAcumuladoPorcentaje:
                (indicators.desvioEuros / indicators.presupuestoInicial) * 100,
              tiempoSemanas: indicators.semanasTranscurridas,
              tiempoPrevistoSemanas: indicators.semanasPrevistas,
              estresPorcentaje: indicators.estresPorcentaje,
              estresBarra: `[${'■'.repeat(Math.round(indicators.estresPorcentaje / 10))}]`,
              estadoEstres: indicators.estresPorcentaje < 30 ? 'En Control' : 'Estrés de Obra',
              facturaEnergeticaMes: indicators.facturaEnergeticaMes,
              confortYAire: 'Passivhaus Confort',
              confortPuntos: indicators.n50BlowerDoor <= 0.6 ? 90 : 50,
              huellaCarbono: -24,
              modeloConstructivo: 'Madera Técnica Passivhaus',
              blowerDoorN50: indicators.n50BlowerDoor,
              vmcInstalado: true,
              tripleVidrio: true,
              turnNumber: history.length,
              gameOver: true,
              gameVictory: indicators.desvioEuros <= 5000,
            }}
            onRestart={handleRestart}
            onClose={() => setActiveTab('adventure')}
          />
        )}
          </>
        )}
      </main>

      {/* Parallel Universe Modal */}
      {parallelModalData && (
        <ParallelUniverseModal
          chosenChoice={parallelModalData.chosen}
          alternativeChoice={parallelModalData.alternative}
          onExploreAlternative={() => setParallelModalData(null)}
          onClose={() => setParallelModalData(null)}
        />
      )}

      {/* Footer strictly with requested text and matching width */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500 w-full">
        <div className="w-full max-w-2xl mx-auto px-3 sm:px-4 text-center font-normal">
          <span>
            La Odisea del Autopromotor · Asesoría pedagógica interactiva.
          </span>
        </div>
      </footer>
    </div>
  );
}
