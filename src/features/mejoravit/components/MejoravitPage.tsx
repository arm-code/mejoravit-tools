import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalculatorForm } from "./CalculatorForm";
import { CreditResults } from "./CreditResults";
import { DisclaimerBanner } from "./DisclaimerBanner";
import { useMejoravit } from "../hooks/useMejoravit";
import { userSchema, type UserSchema } from "../schemas/user.schema";

export function MejoravitPage() {
    const { user, updateUser, clearUser } = useMejoravit();
    const [editando, setEditando] = useState(false);

    const {
        register,
        handleSubmit,
        reset: resetForm,
        formState: { errors, isSubmitting },
    } = useForm<UserSchema>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            nss: user?.nss ?? "",
            rfc: user?.rfc ?? "",
            nombre: user?.nombre ?? "",
        },
    });

    const onSubmit = (data: UserSchema) => {
        updateUser({
            nss: data.nss,
            rfc: data.rfc.toUpperCase(),
            nombre: data.nombre.toUpperCase(),
        });
        setEditando(false);
    };

    const handleEditar = () => {
        resetForm({
            nss: user?.nss ?? "",
            rfc: user?.rfc ?? "",
            nombre: user?.nombre ?? "",
        });
        setEditando(true);
    };

    const handleCancelarEdicion = () => {
        setEditando(false);
    };

    const handleSalir = () => {
        clearUser();
        setEditando(false);
    };

    // Mostrar formulario si no hay usuario o si está editando
    const mostrarForm = !user || editando;

    return (
        <div className="min-h-screen bg-white">
            <header className="flex items-center justify-between px-4 py-4 sm:py-6 max-w-2xl mx-auto">
                <h1 className="text-primary font-bold text-2xl sm:text-3xl md:text-4xl tracking-tighter">
                    Mejoravit solo para ti
                </h1>
                {user && !editando && (
                    <button
                        onClick={handleSalir}
                        className="text-blue-500 text-sm hover:underline underline font-bold shrink-0 ml-4"
                    >
                        Salir
                    </button>
                )}
                {editando && (
                    <button
                        onClick={handleCancelarEdicion}
                        className="text-gray-400 text-xs hover:text-gray-600 transition-colors shrink-0 ml-4"
                    >
                        Cancelar
                    </button>
                )}
            </header>

            <main className="max-w-2xl mx-auto px-4 pb-8 space-y-6">
                {/* Bloque de datos del usuario */}
                {mostrarForm ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        {/* NSS */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                            <span className="text-text-primary font-bold text-sm sm:text-base w-full sm:w-28 shrink-0">
                                N.S.S.:
                            </span>
                            <div className="flex flex-col flex-1 gap-0.5">
                                <input
                                    id="nss"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={11}
                                    placeholder="Ej. 61088604741"
                                    onFocus={(e) => e.target.select()}
                                    {...register("nss")}
                                    className="border border-border-soft rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-btn w-full sm:max-w-xs"
                                />
                                {errors.nss && (
                                    <span className="text-xs text-red-500">{errors.nss.message}</span>
                                )}
                            </div>
                        </div>

                        {/* RFC */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                            <span className="text-text-primary font-bold text-sm sm:text-base w-full sm:w-28 shrink-0">
                                R.F.C.:
                            </span>
                            <div className="flex flex-col flex-1 gap-0.5">
                                <input
                                    id="rfc"
                                    type="text"
                                    maxLength={13}
                                    placeholder="Ej. CAMJ8606234G5"
                                    onFocus={(e) => e.target.select()}
                                    {...register("rfc")}
                                    className="border border-border-soft rounded-md px-3 py-1.5 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-blue-btn w-full sm:max-w-xs"
                                />
                                {errors.rfc && (
                                    <span className="text-xs text-red-500">{errors.rfc.message}</span>
                                )}
                            </div>
                        </div>

                        {/* Nombre */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                            <span className="text-text-primary font-bold text-sm sm:text-base w-full sm:w-28 shrink-0">
                                Nombre:
                            </span>
                            <div className="flex flex-col flex-1 gap-0.5">
                                <input
                                    id="nombre"
                                    type="text"
                                    placeholder="Ej. CALVO MORALES JUANA MARIA LUISA"
                                    onFocus={(e) => e.target.select()}
                                    {...register("nombre")}
                                    className="border border-border-soft rounded-md px-3 py-1.5 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-blue-btn w-full"
                                />
                                {errors.nombre && (
                                    <span className="text-xs text-red-500">{errors.nombre.message}</span>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-3 pt-1">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-primary hover:opacity-90 disabled:opacity-60 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                ) : (
                    /* Vista de datos en modo lectura con botón Editar muy discreto */
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-col gap-0.5">
                            <p className="text-text-primary font-extrabold text-sm sm:text-base">N.S.S.: {user!.nss}</p>
                            <p className="text-text-primary font-extrabold text-sm sm:text-base">R.F.C.: {user!.rfc}</p>
                            <p className="text-text-primary font-extrabold text-sm sm:text-base">Nombre: {user!.nombre}</p>
                        </div>
                        {/* Botón editar: lo más discreto posible */}
                        <button
                            onClick={handleEditar}
                            title="Editar datos"
                            className="text-gray-300 hover:text-gray-500 transition-colors text-xs mt-0.5 shrink-0"
                            aria-label="Editar datos del derechohabiente"
                        >
                            ✎
                        </button>
                    </div>
                )}

                {/* Solo mostrar el resto si hay usuario (o se está editando) */}
                {user && (
                    <>
                        <DisclaimerBanner />
                        <CalculatorForm />
                        <CreditResults />
                    </>
                )}

                {/* Si no hay usuario aún, mostrar solo el disclaimer antes de continuar */}
                {!user && (
                    <DisclaimerBanner />
                )}
            </main>
        </div>
    );
}