import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate, useNavigate } from "react-router-dom";
import { userSchema, type UserSchema } from "../schemas/user.schema";
import { useMejoravit } from "../hooks/useMejoravit";

export function UserFormPage() {
    const { updateUser, user } = useMejoravit();
    const navigate = useNavigate();

    // Si ya hay usuario en localStorage, ir directo al calculator
    if (user) {
        return <Navigate to="/calculator" replace />;
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<UserSchema>({
        resolver: zodResolver(userSchema),
    });

    const onSubmit = (data: UserSchema) => {
        updateUser({
            nss: data.nss,
            rfc: data.rfc.toUpperCase(),
            nombre: data.nombre.toUpperCase(),
        });
        navigate("/calculator");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="flex items-center justify-between px-4 py-6 max-w-2xl mx-auto w-full">
                <h1 className="text-red-600 font-bold text-2xl md:text-4xl tracking-tighter">
                    Mejoravit solo para ti
                </h1>
            </header>

            <main className="flex-1 flex items-start justify-center px-4 py-6">
                <div className="w-full max-w-md">
                    <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
                        <h2 className="font-bold text-lg mb-1">Datos del derechohabiente</h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Ingresa tus datos para continuar con la simulación.
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* NSS */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="nss" className="text-sm font-medium text-gray-700">
                                    Número de Seguridad Social (NSS)
                                </label>
                                <input
                                    id="nss"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={11}
                                    placeholder="Ej. 48068619054"
                                    {...register("nss")}
                                    className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                                />
                                {errors.nss && (
                                    <span className="text-xs text-red-500">{errors.nss.message}</span>
                                )}
                            </div>

                            {/* RFC */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="rfc" className="text-sm font-medium text-gray-700">
                                    RFC
                                </label>
                                <input
                                    id="rfc"
                                    type="text"
                                    maxLength={13}
                                    placeholder="Ej. RORR860708LE3"
                                    {...register("rfc")}
                                    className="border rounded-md px-3 py-2 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-red-400"
                                />
                                {errors.rfc && (
                                    <span className="text-xs text-red-500">{errors.rfc.message}</span>
                                )}
                            </div>

                            {/* Nombre */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="nombre" className="text-sm font-medium text-gray-700">
                                    Nombre completo
                                </label>
                                <input
                                    id="nombre"
                                    type="text"
                                    placeholder="Ej. DE LA ROSA RAMIREZ RAUL"
                                    {...register("nombre")}
                                    className="border rounded-md px-3 py-2 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-red-400"
                                />
                                {errors.nombre && (
                                    <span className="text-xs text-red-500">{errors.nombre.message}</span>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full mt-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                            >
                                Continuar →
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
