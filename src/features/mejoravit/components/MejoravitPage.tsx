
import { CalculatorForm } from "./CalculatorForm";
import { CreditResults } from "./CreditResults";
import { useMejoravit } from "../hooks/useMejoravit";
import { DisclaimerBanner } from "./DisclaimerBanner";
import { UserInfoCard } from "./UserInfoCard";

export function MejoravitPage() {
    const { user } = useMejoravit();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
                <h1 className="text-red-600 font-bold text-xl">Mejoravit solo para ti</h1>
                <button className="text-blue-500 text-sm hover:underline">Salir</button>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
                {/* User Info */}
                <div className="text-sm space-y-1">
                    <p><strong>N.S.S.:</strong> {user.nss}</p>
                    <p><strong>R.F.C.:</strong> {user.rfc}</p>
                    <p><strong>Nombre:</strong> {user.nombre}</p>
                </div>

                <DisclaimerBanner />
                <CalculatorForm />
                <CreditResults />
            </main>
        </div>
    );
}