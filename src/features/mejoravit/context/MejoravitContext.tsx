import { createContext, useState } from "react";
import type { CalculadoraFormValues, CreditConditions, MejoravitState } from "../types/mejoravit.types";
import { getItem, setItem } from "@/shared/utils/storage";

const STORAGE_KEY = 'mejoravit_state'

const defaultstate: MejoravitState = {
    user: { nss: "48068619054", rfc: "RORR860708LE3", nombre: "DE LA ROSA RAMIREZ RAUL" },
    form: { valorMejora: 163030.21, plazo: 10, requiereRegularizacion: false },
    results: null,
}

interface MejoravitContextType {
    state: MejoravitState;
    setResults: (results: CreditConditions) => void
    updateForm: (form: CalculadoraFormValues) => void
    reset: () => void
}

const MejoravitContext = createContext<MejoravitContextType | null>(null)

export function MejoravitProvider({ children }: { children: React.ReactNode }) {

    const [state, setState] = useState<MejoravitState>(
        () => getItem<MejoravitState>(STORAGE_KEY) ?? defaultstate
    )

}