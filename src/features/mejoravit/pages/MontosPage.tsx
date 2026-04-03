import { Link } from "react-router-dom";
import { CalculatorMontos } from "../components/CalculatorMontos";

export const MontosPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <header className="flex items-center justify-between px-4 py-4 sm:py-6 max-w-2xl mx-auto">
                <div className="flex flex-col gap-1">
                    <h1 className="text-primary font-bold text-2xl sm:text-3xl md:text-4xl tracking-tighter">
                        Calculadora de Montos
                    </h1>
                </div>
                <div className="flex gap-4 items-center">
                    <Link to="/" className="text-gray-500 font-semibold text-sm hover:underline shrink-0">
                        Volver al menú
                    </Link>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 pb-8 space-y-6">
                <CalculatorMontos />
            </main>
        </div>
    );
};