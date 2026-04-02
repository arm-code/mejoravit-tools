export interface UserInfo {
    nss: string;
    rfc: string;
    nombre: string;
}

export interface CalculatorFormValues {
    valorMejora: number;
    plazo: number;
    requiereRegularizacion: boolean;
}

export interface CreditConditions {
    montoCredito: number;
    montoRegularizacion: number;
    retencionMensual: number;
    tasaInteres: number;
}

export interface MejoravitState {
    user: UserInfo | null;
    form: CalculatorFormValues;
    results: CreditConditions | null;
}