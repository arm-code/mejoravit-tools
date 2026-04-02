
import { CalculatorForm } from "./CalculatorForm";
import { CreditResults } from "./CreditResults";
import { DisclaimerBanner } from "./DisclaimerBanner";
import { UserInfoCard } from "./UserInfoCard";

export function MejoravitPage() {

    return (
        <div className="min-h-screen  bg-gray-50">

            <header className="flex items-center justify-between px-4 py-6 max-w-2xl mx-auto">
                <h1 className="text-red-600 font-bold text-2xl md:text-4xl tracking-tighter">Mejoravit solo para ti</h1>
                <button className="text-blue-500 text-sm hover:underline underline font-bold">Salir</button>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
                <UserInfoCard />

                <DisclaimerBanner />
                <CalculatorForm />
                <CreditResults />
            </main>
        </div>
    );
}