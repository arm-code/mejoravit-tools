import { useMejoravitContext } from "../context/MejoravitContext";
import type { CalculatorFormValues, CreditConditions } from "../types/mejoravit.types";

// Tasas de interés fijas por plazo (anual)
const TASAS_POR_PLAZO: Record<number, number> = {
    5: 0.10, // 10%
    10: 0.11, // 11%
};

function getTasaAnual(plazo: number): number {
    return TASAS_POR_PLAZO[plazo] ?? 0.10;
}

function calcularCredito(
    valorMejora: number,
    plazo: number,
    requiereRegularizacion: boolean
): CreditConditions {
    const tasaAnual = getTasaAnual(plazo);
    const meses = plazo * 12;
    const tasaMensual = tasaAnual / 12;

    // Fórmula de amortización francesa
    const retencionMensual =
        (valorMejora * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -meses));

    const montoRegularizacion = requiereRegularizacion ? valorMejora * 0.1 : 0;

    return {
        montoCredito: valorMejora,
        montoRegularizacion,
        retencionMensual: Math.round(retencionMensual * 100) / 100,
        tasaInteres: tasaAnual * 100,
    };
}

export function useMejoravit() {
    const { state, setResults, updateForm, updateUser, clearUser, reset } = useMejoravitContext();

    const calcular = (values: CalculatorFormValues) => {
        updateForm(values);
        const results = calcularCredito(
            values.valorMejora,
            values.plazo,
            values.requiereRegularizacion
        );
        setResults(results);
    };

    return {
        user: state.user,
        form: state.form,
        results: state.results,
        calcular,
        updateUser,
        clearUser,
        updateForm,
        reset,
    };
}