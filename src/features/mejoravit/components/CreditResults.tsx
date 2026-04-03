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
            <h2 className="font-extrabold text-lg mb-4 text-text-primary">Estas serían tus condiciones de crédito:</h2>
            <div className="">
                {rows.map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center py-3 gap-2">
                        <span className="text-sm sm:text-base text-text-primary leading-snug">{label}</span>
                        <span className="font-extrabold text-base sm:text-lg text-text-primary text-right shrink-0">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}