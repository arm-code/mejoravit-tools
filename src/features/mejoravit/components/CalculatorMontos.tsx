import { useState } from "react";

export const CalculatorMontos = () => {
    const [monto, setMonto] = useState<number | "">("");
    const [resultado, setResultado] = useState<number | null>(null);
    const [copiado, setCopiado] = useState(false);

    const calcularMonto = (e: React.FormEvent) => {
        e.preventDefault();
        if (monto) {
            setResultado(Number(monto) * 0.9);
            setCopiado(false); // Resetear estado de copiado si se hace un nuevo cálculo
        } else {
            setResultado(null);
        }
    };

    const handleCopiar = () => {
        if (resultado) {
            // Copiar al portapapeles formato numérico simple redondeado a 2 decimales para que sea fácil pegar
            const textoCopiar = resultado.toFixed(2);
            navigator.clipboard.writeText(textoCopiar).then(() => {
                setCopiado(true);
                setTimeout(() => setCopiado(false), 2000);
            });
        }
    };

    return (
        <div className="border border-border-soft rounded-xl p-6 bg-bg-light shadow-sm max-w-md mx-auto">
            <h2 className="font-extrabold text-lg mb-4 text-text-primary">Calcular el 90%</h2>

            <form onSubmit={calcularMonto} className="space-y-4">
                <div className="flex flex-col gap-1 w-full">
                    <label className="text-sm text-text-primary font-semibold">Monto inicial:</label>
                    <input
                        type="number"
                        step="0.01"
                        value={monto}
                        onChange={(e) => setMonto(e.target.value ? Number(e.target.value) : "")}
                        onFocus={(e) => e.target.select()}
                        placeholder="Ej. 50000"
                        className="border border-border-soft rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-btn bg-white"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary hover:opacity-90 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                >
                    Calcular
                </button>
            </form>

            {resultado !== null && (
                <div className="mt-6 border-t border-border-soft pt-4">
                    <p className="text-sm text-text-primary mb-2 font-semibold">Resultado (90%):</p>
                    <div className="flex items-center justify-between bg-white border border-border-soft rounded-lg p-3">
                        <span className="font-extrabold text-lg text-text-primary">
                            {new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(resultado)}
                        </span>

                        <button
                            onClick={handleCopiar}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${copiado
                                ? "bg-green-100 text-green-700 border border-green-200"
                                : "bg-gray-100 text-text-primary hover:bg-gray-200 border border-gray-200"
                                }`}
                            title="Copiar valor"
                        >
                            {copiado ? (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>¡Copiado!</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                    </svg>
                                    <span>Copiar</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};