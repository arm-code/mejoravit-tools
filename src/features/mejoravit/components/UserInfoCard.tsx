import { useMejoravit } from "../hooks/useMejoravit";

export function UserInfoCard() {
    const { user } = useMejoravit();

    // MejoravitPage ya tiene guard de ruta, pero TypeScript requiere el null-check
    if (!user) return null;

    return (
        <div className="flex justify-start items-start flex-col w-full">
            <p className="text-black font-bold">N.S.S.: {user.nss}</p>
            <p className="text-black font-bold">R.F.C.: {user.rfc}</p>
            <p className="text-black font-bold">Nombre: {user.nombre}</p>
        </div>
    );
}