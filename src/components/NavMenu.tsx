import { Link } from "react-router-dom";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Bars3Icon, UserCircleIcon, FolderIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid";
import type { UserType } from "@/type";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
    name: UserType['name']
}

export function NavMenu({ name }: Props) {

    const queryClient = useQueryClient()
    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN_CORETASK')
        queryClient.invalidateQueries({queryKey: ['user']})
    }

    return (
        <Popover className="relative">
            <PopoverButton className="inline-flex items-center p-2 transition-colors duration-200 gap-x-1 rounded-xl bg-azul-600 hover:bg-azul-700 focus:outline-none focus:ring-2 focus:ring-azul-400 focus:ring-offset-2">
                <Bars3Icon className="text-white w-7 h-7" />
            </PopoverButton>

            <PopoverPanel
                transition
                anchor="bottom end"
                className="z-40 mt-3 w-64 origin-top-right rounded-2xl bg-white p-2 shadow-xl ring-1 ring-gris-200 transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
            >
                <div className="px-4 py-3 border-b border-gris-100">
                    <p className="text-sm text-gris-500">Bienvenido (a)</p>
                    <p className="text-sm font-semibold truncate text-gris-900">{name}</p>
                </div>

                <div className="py-1">
                    <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gris-700 hover:bg-azul-50 hover:text-azul-700 transition-colors duration-150"
                    >
                        <UserCircleIcon className="w-5 h-5 text-azul-500" />
                        Mi Perfil
                    </Link>
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gris-700 hover:bg-verde-50 hover:text-verde-700 transition-colors duration-150"
                    >
                        <FolderIcon className="w-5 h-5 text-verde-500" />
                        Mis Proyectos
                    </Link>
                </div>

                <div className="pt-1 border-t border-gris-100">
                    <button
                        className="flex w-full items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gris-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
                        type="button"
                        onClick={logout}
                    >
                        <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
                        Cerrar Sesión
                    </button>
                </div>
            </PopoverPanel>
        </Popover>
    );
}
