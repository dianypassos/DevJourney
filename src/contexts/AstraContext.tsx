import { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ExerciseError {
  exerciseTitle:       string;
  exerciseDescription?: string;
  errorTitle?:         string;
  errorDetail?:        string;
  userCode?:           string;
}

interface AstraContextValue {
  reportExerciseError:  (data: ExerciseError) => void;
  triggerOpenWithError: (data?: ExerciseError) => void;
  getError:             () => ExerciseError | null;
  clearExerciseError:   () => void;
  errorTriggerCount:    number;
}

// ── Context ───────────────────────────────────────────────────────────────────

const AstraContext = createContext<AstraContextValue | null>(null);

export function AstraProvider({ children }: { children: ReactNode }) {
  const errorRef              = useRef<ExerciseError | null>(null);
  const [errorTriggerCount, setErrorTriggerCount] = useState(0);

  const reportExerciseError = useCallback((errorData: ExerciseError) => {
    errorRef.current = errorData;
  }, []);

  const triggerOpenWithError = useCallback((errorData?: ExerciseError) => {
    if (errorData) errorRef.current = errorData;
    setErrorTriggerCount(c => c + 1);
  }, []);

  const getError         = useCallback(() => errorRef.current, []);
  const clearExerciseError = useCallback(() => { errorRef.current = null; }, []);

  return (
    <AstraContext.Provider value={{
      reportExerciseError,
      triggerOpenWithError,
      getError,
      clearExerciseError,
      errorTriggerCount,
    }}>
      {children}
    </AstraContext.Provider>
  );
}

export function useAstra(): AstraContextValue {
  const ctx = useContext(AstraContext);
  if (!ctx) throw new Error('useAstra must be used inside AstraProvider');
  return ctx;
}
