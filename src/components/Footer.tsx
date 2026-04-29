import { Link } from "react-router-dom";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="mt-16 border-t border-gris-200 bg-gris-900">
            <div className="mx-auto max-w-screen-2xl px-10 py-10">
                <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">

                    {/* Brand */}
                    <div className="flex flex-col items-center gap-3 md:items-start">
                        <div className="flex items-center gap-2">
                            <span className="bg-gradient-to-r from-azul-400 to-verde-400 bg-clip-text text-2xl font-black text-transparent">
                                CoreTask
                            </span>
                        </div>
                        <p className="max-w-xs text-center text-sm leading-relaxed text-gris-400 md:text-left">
                            Gestiona proyectos y equipos de trabajo de forma simple, visual y eficiente.
                        </p>
                    </div>

                    {/* Nav links */}
                    <div className="flex flex-col items-center gap-2 md:items-start">
                        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gris-500">
                            Navegación
                        </p>
                        <Link
                            to="/"
                            className="text-sm text-gris-400 transition-colors duration-150 hover:text-azul-400"
                        >
                            Mis Proyectos
                        </Link>
                        <Link
                            to="/projects/create"
                            className="text-sm text-gris-400 transition-colors duration-150 hover:text-azul-400"
                        >
                            Nuevo Proyecto
                        </Link>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col items-center gap-2 md:items-start">
                        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gris-500">
                            Contacto
                        </p>
                        <a
                            href="mailto:errold222@gmail.com"
                            className="inline-flex items-center gap-2 text-sm text-gris-400 transition-colors duration-150 hover:text-azul-400"
                        >
                            <EnvelopeIcon className="size-4" />
                            errold222@gmail.com
                        </a>
                        <a
                            href="https://github.com/Errold146"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-gris-400 transition-colors duration-150 hover:text-azul-400"
                        >
                            <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.749 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                            Errold146
                        </a>
                    </div>
                </div>

                {/* Divider + copyright */}
                <div className="mt-8 flex flex-col items-center gap-2 border-t border-gris-800 pt-6 md:flex-row md:justify-between">
                    <p className="text-xs text-gris-500">
                        © {year} <span className="text-gris-400 font-medium">MicroWeb-cr</span> · Todos los derechos reservados.
                    </p>
                    <div className="h-px w-16 rounded-full bg-gradient-to-r from-azul-600 to-verde-600 md:hidden" />
                    <p className="text-xs text-gris-600">
                        Hecho con ♥ en Costa Rica
                    </p>
                </div>
            </div>
        </footer>
    )
}
