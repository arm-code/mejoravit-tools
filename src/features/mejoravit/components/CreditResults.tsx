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
            <h2 className="font-bold text-lg mb-4 ">Estas serían tus condiciones de crédito:</h2>
            <div className="divide-y divide-gray-200">
                {rows.map(({ label, value }) => (
                    <div key={label} className="flex flex-col md:flex-row md:justify-between md:items-center py-3 gap-0.5 md:gap-0">
                        <span className="text-sm md:text-lg text-gray-600 md:text-black leading-snug">{label}</span>
                        <span className="font-extrabold text-xl md:text-lg text-black">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}