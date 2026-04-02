import { useMejoravitContext } from "../context/MejoravitContext";
import type { CalculatorFormValues, CreditConditions } from "../types/mejoravit.types";

const TASA_INTERES = 0.11;

function calcularCredito(
    valorMejora: number,
    plazo: number,
    requiereRegularizacion: boolean
): CreditConditions {
    const meses = plazo * 12;
    const tasaMensual = TASA_INTERES / 12;

    // Fórmula de amortización francesa
    const retencionMensual =
        (valorMejora * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -meses));

    const montoRegularizacion = requiereRegularizacion ? valorMejora * 0.1 : 0;

    return {
        montoCredito: valorMejora,
        montoRegularizacion,
        retencionMensual: Math.round(retencionMensual * 100) / 100,
        tasaInteres: TASA_INTERES * 100,
    };
}

export function useMejoravit() {
    const { state, setResults, updateForm, reset } = useMejoravitContext();

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
        reset,
    };
}