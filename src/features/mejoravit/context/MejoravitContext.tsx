import { createContext, useContext, useState, type ReactNode } from "react";
import type { MejoravitState, CreditConditions, CalculatorFormValues } from "@/features/mejoravit/types/mejoravit.types";
import { setItem, getItem } from "@/shared/utils/storage";

const STORAGE_KEY = "mejoravit_state";

const defaultState: MejoravitState = {
    user: { nss: "48068619054", rfc: "RORR860708LE3", nombre: "DE LA ROSA RAMIREZ RAUL" },
    form: { valorMejora: 163030.21, plazo: 10, requiereRegularizacion: false },
    results: null,
};

interface MejoravitContextType {
    state: MejoravitState;
    setResults: (results: CreditConditions) => void;
    updateForm: (form: CalculatorFormValues) => void;
    reset: () => void;
}

const MejoravitContext = createContext<MejoravitContextType | null>(null);

export function MejoravitProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<MejoravitState>(
        () => getItem<MejoravitState>(STORAGE_KEY) ?? defaultState
    );

    const setResults = (results: CreditConditions) => {
        setState((prev) => {
            const next = { ...prev, results };
            setItem(STORAGE_KEY, next);
            return next;
        });
    };

    const updateForm = (form: CalculatorFormValues) => {
        setState((prev) => {
            const next = { ...prev, form, results: null };
            setItem(STORAGE_KEY, next);
            return next;
        });
    };

    const reset = () => {
        setState(defaultState);
        setItem(STORAGE_KEY, defaultState);
    };

    return (
        <MejoravitContext.Provider value={{ state, setResults, updateForm, reset }}>
            {children}
        </MejoravitContext.Provider>
    );
}

export function useMejoravitContext() {
    const ctx = useContext(MejoravitContext);
    if (!ctx) throw new Error("useMejoravitContext debe usarse dentro de MejoravitProvider");
    return ctx;
}