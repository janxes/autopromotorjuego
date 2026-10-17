export type CharacterId = 'architect' | 'builder' | 'partner' | 'advisor' | 'surveyor';

export interface Character {
  id: CharacterId;
  name: string;
  role: string;
  avatarBg: string;
  avatarColor: string;
}

export type HouseStage = 1 | 2 | 3 | 4 | 5;

export interface GameIndicators {
  presupuestoRestante: number; // Initially 250000
  presupuestoInicial: number;
  desvioEuros: number;
  semanasTranscurridas: number; // Initially 0
  semanasPrevistas: number; // Initially 24
  estresPorcentaje: number; // Initially 10
  facturaEnergeticaMes: number; // Initially 35
  n50BlowerDoor: number; // Initially 0.45
}

export interface PhaseAnalogyCase {
  label: string;
  tip: string;
}

export interface PhaseAnalogy {
  title: string;
  metaphor: string;
  explanation: string;
  cases: PhaseAnalogyCase[];
}

export interface TechnicalTip {
  warning: string;
  advice: string;
  quote: string;
  analogy?: {
    title: string;
    story: string;
    lesson: string;
    adaptableAdvice: string;
    cases?: PhaseAnalogyCase[];
  };
}

export interface CardChoice {
  id: string;
  label: string; // Brief label on button (e.g. "Revisar condiciones primero")
  subtext?: string;
  deltaPresupuesto: number;
  deltaSemanas: number;
  deltaEstres: number;
  deltaFactura: number;
  consequenceText: string;
  partnerReaction?: string;
  technicalTip?: TechnicalTip;
  parallelOutcome: {
    title: string;
    budgetResult: string;
    weeksResult: string;
    narrative: string;
  };
  isPassivhausWay?: boolean;
}

export interface GameCard {
  id: string;
  level: number;
  sceneTitle: string;
  character: Character;
  messageType?: 'chat' | 'in_person' | 'surprise';
  prompt: string;
  detailContext?: string;
  leftChoice: CardChoice;
  rightChoice: CardChoice;
  houseStageAfter: HouseStage;
  isSurpriseCard?: boolean;
  phaseAnalogy?: PhaseAnalogy;
}

export interface PlayerProfile {
  title: string;
  tagline: string;
  description: string;
  badgeEmoji: string;
}

export interface GameHistoryEntry {
  cardId: string;
  chosenOptionId: string;
  chosenLabel: string;
  consequenceText: string;
  partnerReaction?: string;
  indicatorsSnapshot: GameIndicators;
  unselectedChoice: CardChoice;
  isPassivhausWay?: boolean;
}

// Backwards-compatible and narrative types
export interface AlertaAutopromotor {
  impacto: string;
  porqueTecnico: string;
  alternativaIndustrializada: string;
  penalizacionPresupuesto: number;
  penalizacionSemanas: number;
  penalizacionEstres: number;
  analogia?: string;
  adaptableACadaCaso?: string;
}

export interface ChoiceOption {
  id: string;
  letter?: 'A' | 'B';
  label: string;
  description: string;
  isBadDecision?: boolean;
  recommended?: boolean;
  isRewindAction?: boolean;
}

export interface TurnMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  alertaAutopromotor?: AlertaAutopromotor;
  statusPanelMarkdown?: string;
  timestamp: number;
  choices?: ChoiceOption[];
  gameStateSnapshot?: GameState;
}

export interface GameState {
  level: 0 | 1 | 2 | 3 | 4 | 5;
  levelName: string;
  faseNombre: string;
  presupuestoInicial: number;
  presupuestoRestante: number;
  desvioAcumuladoEuros: number;
  desvioAcumuladoPorcentaje: number;
  tiempoSemanas: number;
  tiempoPrevistoSemanas: number;
  estresPorcentaje: number;
  estresBarra: string;
  estadoEstres: string;
  facturaEnergeticaMes: number;
  confortYAire: string;
  confortPuntos: number;
  huellaCarbono: number;
  modeloConstructivo: string;
  blowerDoorN50: number;
  vmcInstalado: boolean;
  tripleVidrio: boolean;
  calibration?: {
    ubicacionParcela: string;
    dormitorios: number;
    calibrado: boolean;
  };
  turnNumber: number;
  alertaActiva?: AlertaAutopromotor;
  rewindStateBackup?: GameState;
  gameOver: boolean;
  gameVictory: boolean;
}

// LCC Types
export interface LCCComparisonInput {
  areaM2: number;
  costeKWh: number;
  inflacionEnergeticaAnual: number;
  years: number;
}

export interface LCCYearData {
  year: number;
  costeAcumuladoTradicional: number;
  costeAcumuladoIndustrializado: number;
  gastoEnergiaTradicional: number;
  gastoEnergiaIndustrializado: number;
  mantenimientoPatologiasTradicional: number;
  mantenimientoPatologiasIndustrializado: number;
  ahorroNetoAcumulado: number;
}

export interface LCCResult {
  capexInicialTradicional: number;
  capexRealConDesvioTradicional: number;
  capexInicialIndustrializado: number;
  consumoAnualKWhTradicional: number;
  consumoAnualKWhPassivhaus: number;
  ahorroEnergeticoPorcentaje: number;
  ahorroTotal30Anos: number;
  paybackAnos: number;
  co2EmbebidoTradicionalTons: number;
  co2SecuestradoMaderaTons: number;
  chartData: LCCYearData[];
}
