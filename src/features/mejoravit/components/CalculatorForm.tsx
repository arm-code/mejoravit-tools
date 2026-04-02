import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculatorSchema, type CalculatorSchema } from "../schemas/mejoravit.schema";
import { useMejoravit } from "../hooks/useMejoravit";

const PLAZOS = [5, 10, 15, 20];

export function CalculatorForm() {
    const { form, calcular } = useMejoravit();

    const { register, handleSubmit, formState: { errors } } = useForm<CalculatorSchema>({
        resolver: zodResolver(calculatorSchema),
        defaultValues: form,
    });

    const onSubmit = (data: CalculatorSchema) => calcular(data);

    return (
        <div className="border rounded-xl p-6 bg-white shadow-sm">
            <h2 className="font-bold text-lg mb-4">Condiciones</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex gap-4 items-start">
                    {/* Valor de la mejora */}
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-sm text-gray-500">Valor de la mejora:</label>
                        <input
                            type="number"
                            step="0.01"
                            {...register("valorMejora", { valueAsNumber: true })}
                            className="border rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                        {errors.valorMejora && (
                            <span className="text-xs text-red-500">{errors.valorMejora.message}</span>
                        )}
                    </div>

                    {/* Plazo */}
                    <div className="flex flex-col gap-1 w-36">
                        <label className="text-sm text-gray-500">Plazo:</label>
                        <select
                            {...register("plazo", { valueAsNumber: true })}
                            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                            {PLAZOS.map((p) => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                        Calcular
                    </button>
                </div>

                {/* Regularización */}
                <div>
                    <p className="text-sm text-gray-600 mb-2">
                        El derechohabiente ¿requiere destinar un porcentaje para regularizar su vivienda?
                    </p>
                    <div className="flex gap-6">
                        {(["true", "false"] as const).map((val) => (
                            <label key={val} className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                    type="radio"
                                    value={val}
                                    {...register("requiereRegularizacion", {
                                        setValueAs: (v) => v === "true",
                                    })}
                                    className="accent-blue-600"
                                />
                                {val === "true" ? "Sí" : "No"}
                            </label>
                        ))}
                    </div>
                </div>
            </form>
        </div>
    );
}