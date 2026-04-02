import { useMejoravit } from "../hooks/useMejoravit";

const fmt = (n: number) =>
    new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(n);

export function CreditResults() {
    const { results } = useMejoravit();
    if (!results) return null;

    const rows = [
        { label: "Monto de crédito a otorgar:", value: fmt(results.montoCredito) },
        { label: "Monto de crédito para regularización de la vivienda:", value: fmt(results.montoRegularizacion) },
        { label: "Retención mensual de tu salario:", value: fmt(results.retencionMensual) },
        { label: "Tasa de interés", value: `${results.tasaInteres}%` },
    ];

    return (
        <div className="mt-6">
            <h2 className="font-bold text-lg mb-4">Estas serían tus condiciones de crédito:</h2>
            <div className="divide-y border-t border-b">
                {rows.map(({ label, value }) => (
                    <div key={label} className="flex justify-between py-3 text-sm">
                        <span className="text-gray-700">{label}</span>
                        <span className="font-bold text-gray-900">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}