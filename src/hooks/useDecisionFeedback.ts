import { useState, useRef, useCallback, useEffect } from 'react';
import { GameIndicators, CardChoice } from '../types/game';

export type FeedbackTone = 'favorable' | 'unfavorable' | 'warning' | null;
export type HighlightedIndicatorId = 'budget' | 'weeks' | 'stress' | 'energy' | null;

export interface DecisionConsequencesParams {
  title?: string;
  label: string;
  choiceId: string;
  consequenceText: string;
  partnerReaction?: string;
  isPassivhausWay?: boolean;
  deltaPresupuesto: number;
  deltaSemanas: number;
  deltaEstres: number;
  deltaFactura: number;
  prevIndicators: GameIndicators;
  nextIndicators: GameIndicators;
  onComplete: () => void;
}

export interface DecisionFeedbackState {
  isActive: boolean;
  isLocked: boolean;
  selectedChoiceId: string | null;
  step: number; // 0: intro, 1: budget, 2: weeks, 3: stress, 4: energy, 5: completed
  highlightedIndicator: HighlightedIndicatorId;
  highlightTone: FeedbackTone;
  title: string;
  label: string;
  consequenceText: string;
  partnerReaction?: string;
  isPassivhausWay?: boolean;
  deltaPresupuesto: number;
  deltaSemanas: number;
  deltaEstres: number;
  deltaFactura: number;
  prevIndicators: GameIndicators | null;
  nextIndicators: GameIndicators | null;
}

export function useDecisionFeedback() {
  const [feedbackState, setFeedbackState] = useState<DecisionFeedbackState>({
    isActive: false,
    isLocked: false,
    selectedChoiceId: null,
    step: 0,
    highlightedIndicator: null,
    highlightTone: null,
    title: '',
    label: '',
    consequenceText: '',
    partnerReaction: undefined,
    isPassivhausWay: false,
    deltaPresupuesto: 0,
    deltaSemanas: 0,
    deltaEstres: 0,
    deltaFactura: 0,
    prevIndicators: null,
    nextIndicators: null,
  });

  const onCompleteRef = useRef<(() => void) | null>(null);
  const timeoutsRef = useRef<number[]>([]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((t) => window.clearTimeout(t));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    return () => clearAllTimeouts();
  }, []);

  const getTone = (indicator: HighlightedIndicatorId, params: DecisionConsequencesParams): FeedbackTone => {
    if (indicator === 'budget') {
      return params.deltaPresupuesto >= 0 ? 'favorable' : 'unfavorable';
    }
    if (indicator === 'weeks') {
      if (params.deltaSemanas <= 0) return 'favorable';
      if (params.deltaSemanas > 2) return 'unfavorable';
      return 'warning';
    }
    if (indicator === 'stress') {
      if (params.deltaEstres <= 0) return 'favorable';
      if (params.deltaEstres > 8) return 'unfavorable';
      return 'warning';
    }
    if (indicator === 'energy') {
      return params.deltaFactura <= 0 ? 'favorable' : 'unfavorable';
    }
    return null;
  };

  /**
   * Centralized reusable function as requested:
   * showDecisionConsequences({ budget, weeks, stress, energy, ... })
   */
  const showDecisionConsequences = useCallback((params: DecisionConsequencesParams) => {
    clearAllTimeouts();
    onCompleteRef.current = params.onComplete;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Set initial state: locked button, card appears
    setFeedbackState({
      isActive: true,
      isLocked: true,
      selectedChoiceId: params.choiceId,
      step: prefersReducedMotion ? 5 : 0,
      highlightedIndicator: null,
      highlightTone: null,
      title: params.title || 'Consecuencias de tu decisión',
      label: params.label,
      consequenceText: params.consequenceText,
      partnerReaction: params.partnerReaction,
      isPassivhausWay: params.isPassivhausWay,
      deltaPresupuesto: params.deltaPresupuesto,
      deltaSemanas: params.deltaSemanas,
      deltaEstres: params.deltaEstres,
      deltaFactura: params.deltaFactura,
      prevIndicators: params.prevIndicators,
      nextIndicators: params.nextIndicators,
    });

    if (prefersReducedMotion) {
      // Immediate resolution for reduced motion
      return;
    }

    // Step 1: Budget consequence (at 250ms)
    const t1 = window.setTimeout(() => {
      setFeedbackState((prev) => ({
        ...prev,
        step: 1,
        highlightedIndicator: 'budget',
        highlightTone: getTone('budget', params),
      }));
    }, 250);

    // Step 2: Weeks consequence (at 650ms)
    const t2 = window.setTimeout(() => {
      setFeedbackState((prev) => ({
        ...prev,
        step: 2,
        highlightedIndicator: 'weeks',
        highlightTone: getTone('weeks', params),
      }));
    }, 650);

    // Step 3: Stress consequence (at 1050ms)
    const t3 = window.setTimeout(() => {
      setFeedbackState((prev) => ({
        ...prev,
        step: 3,
        highlightedIndicator: 'stress',
        highlightTone: getTone('stress', params),
      }));
    }, 1050);

    // Step 4: Energy consequence (at 1450ms)
    const t4 = window.setTimeout(() => {
      setFeedbackState((prev) => ({
        ...prev,
        step: 4,
        highlightedIndicator: 'energy',
        highlightTone: getTone('energy', params),
      }));
    }, 1450);

    // Step 5: Completed / Settle (at 1850ms)
    const t5 = window.setTimeout(() => {
      setFeedbackState((prev) => ({
        ...prev,
        step: 5,
        highlightedIndicator: null,
        highlightTone: null,
      }));
    }, 1850);

    timeoutsRef.current = [t1, t2, t3, t4, t5];
  }, []);

  // Player can skip animation immediately to see all consequences
  const skipOrAdvance = useCallback(() => {
    if (feedbackState.step < 5) {
      clearAllTimeouts();
      setFeedbackState((prev) => ({
        ...prev,
        step: 5,
        highlightedIndicator: null,
        highlightTone: null,
      }));
    } else {
      // Already at step 5: finish and trigger next stage callback
      clearAllTimeouts();
      setFeedbackState((prev) => ({
        ...prev,
        isActive: false,
        isLocked: false,
        selectedChoiceId: null,
      }));
      if (onCompleteRef.current) {
        onCompleteRef.current();
        onCompleteRef.current = null;
      }
    }
  }, [feedbackState.step]);

  return {
    feedbackState,
    showDecisionConsequences,
    skipOrAdvance,
  };
}
