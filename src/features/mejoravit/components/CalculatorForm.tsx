import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculatorSchema, type CalculatorInputSchema, type CalculatorSchema } from "../schemas/mejoravit.schema";
import { useMejoravit } from "../hooks/useMejoravit";

const PLAZOS = [5, 10];

export function CalculatorForm() {
    const { form, calcular } = useMejoravit();

    const { register, handleSubmit, formState: { errors } } = useForm<CalculatorInputSchema, unknown, CalculatorSchema>({
        resolver: zodResolver(calculatorSchema),
        defaultValues: {
            valorMejora: form.valorMejora,
            plazo: form.plazo,
            // String para que coincida con value="false" del radio → Zod lo transforma a boolean
            requiereRegularizacion: form.requiereRegularizacion ? "true" : "false",
        },
    });

    const onSubmit = (data: CalculatorSchema) => {
        console.log("📤 onSubmit ejecutado con:", data);
        calcular(data);
    };


    return (
        <div className="border border-border-soft rounded-xl p-6 bg-bg-light shadow-sm">
            <h2 className="font-extrabold text-lg mb-4">Condiciones</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-row md:flex-nowrap gap-2 items-end">
                    {/* Valor de la mejora */}
                    <div className="flex flex-col gap-1 w-[200px] md:flex-none">
                        <label className="text-sm text-text-primary font-semibold">Valor de la mejora:</label>
                        <input
                            type="number"
                            step="0.01"
                            onFocus={(e) => e.target.select()}
                            {...register("valorMejora", { valueAsNumber: true })}
                            className="border border-border-soft rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-btn bg-white"
                        />
                        {errors.valorMejora && (
                            <span className="text-xs text-red-500">{errors.valorMejora.message}</span>
                        )}
                    </div>

                    {/* Plazo */}
                    <div className="flex flex-col gap-1 w-[150px] shrink-0">
                        <label className="text-sm text-text-primary font-semibold">Plazo:</label>
                        <select
                            {...register("plazo", { valueAsNumber: true })}
                            className="border border-border-soft rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-btn w-full bg-white"
                        >
                            {PLAZOS.map((p) => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                        {errors.plazo && (
                            <span className="text-xs text-red-500">{errors.plazo.message}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className=" md:w-auto bg-blue-btn hover:opacity-90 text-white px-6 py-2 rounded-2xl text-sm font-semibold transition-colors cursor-pointer"
                    >
                        Calcular
                    </button>
                </div>

                {/* Regularización */}
                <div>
                    <p className="text-sm text-text-primary mb-2">
                        El derechohabiente ¿requiere destinar un porcentaje para regularizar su vivienda?
                    </p>
                    <div className="flex gap-6">
                        {(["true", "false"] as const).map((val) => (
                            <label key={val} className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                    type="radio"
                                    value={val}
                                    {...register("requiereRegularizacion")}
                                    className="accent-blue-600"
                                />
                                {val === "true" ? "Sí" : "No"}
                            </label>
                        ))}
                    </div>
                    {errors.requiereRegularizacion && (
                        <span className="text-xs text-red-500">{errors.requiereRegularizacion.message}</span>
                    )}
                </div>
            </form>
        </div>
    );
}