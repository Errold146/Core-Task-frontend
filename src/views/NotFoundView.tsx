import { Link } from "react-router-dom";
import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FaceFrownIcon } from "@heroicons/react/24/solid";

export default function NotFoundView() {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gris-900">

            {/* Blobs decorativos */}
            <div className="absolute rounded-full -top-32 -left-32 size-96 bg-azul-600/20 blur-3xl" />
            <div className="absolute rounded-full -bottom-32 -right-32 size-96 bg-verde-600/20 blur-3xl" />
            <div className="absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-azul-950/40 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center px-6 text-center">

                {/* Icono principal */}
                <div className="flex items-center justify-center mb-6 border size-28 rounded-3xl bg-gris-800/80 border-gris-700/60 backdrop-blur-sm shadow-2xl shadow-black/40">
                    <FaceFrownIcon className="size-14 text-azul-400" />
                </div>

                {/* 404 grande */}
                <h1 className="font-black leading-none tracking-tighter text-transparent select-none text-[10rem] md:text-[14rem] bg-gradient-to-br from-azul-400 via-azul-500 to-verde-400 bg-clip-text">
                    404
                </h1>

                {/* Texto */}
                <div className="max-w-lg -mt-4 space-y-3">
                    <h2 className="text-2xl font-extrabold text-white md:text-3xl">
                        Página no encontrada
                    </h2>
                    <p className="text-base leading-relaxed text-gris-400">
                        Lo que estás buscando no existe, fue movido o simplemente nunca estuvo aquí.
                        Verifica la URL o regresa al inicio.
                    </p>
                </div>

                {/* Divider decorativo */}
                <div className="flex items-center gap-3 my-8">
                    <div className="flex-1 h-px w-24 bg-gradient-to-r from-transparent to-gris-700" />
                    <MagnifyingGlassIcon className="size-4 text-gris-600" />
                    <div className="flex-1 h-px w-24 bg-gradient-to-l from-transparent to-gris-700" />
                </div>

                {/* CTA */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 font-bold text-white transition-all duration-300 rounded-2xl bg-gradient-to-r from-azul-600 to-azul-500 hover:from-azul-500 hover:to-azul-400 shadow-lg shadow-azul-900/50 hover:shadow-azul-700/50 hover:scale-105 active:scale-100"
                >
                    <HomeIcon className="size-5" />
                    Regresar al inicio
                </Link>
            </div>
        </div>
    )
}
