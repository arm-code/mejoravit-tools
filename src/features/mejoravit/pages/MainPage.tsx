import { Link } from "react-router-dom";

export const MainPage = () => {
    return (
        <div className="flex flex-col w-full min-h-screen items-center justify-center bg-bg-light px-4">
            <h1 className="text-primary font-extrabold text-3xl sm:text-4xl text-center mb-6">Herramientas</h1>

            <div className="flex flex-col gap-4 w-full max-w-sm bg-white border border-border-soft p-6 shadow-sm rounded-xl">
                <Link className="bg-primary hover:opacity-90 text-white font-semibold py-3 px-4 rounded-lg text-center transition-opacity" to="/montos">
                    Calculadora de Montos
                </Link>

                <Link className="bg-primary hover:opacity-90 text-white font-semibold py-3 px-4 rounded-lg text-center transition-opacity" to="/calculadora">
                    Calculadora de Crédito
                </Link>
            </div>
        </div>
    );
};