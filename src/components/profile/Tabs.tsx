import { FingerPrintIcon, UserIcon } from '@heroicons/react/20/solid'
import { Link, useLocation } from 'react-router-dom'

const tabs = [
    { name: 'Mi Perfil', href: '/profile', icon: UserIcon },
    { name: 'Cambiar Password', href: '/profile/password', icon: FingerPrintIcon },
]

export default function Tabs() {
    const location = useLocation()

    return (
        <div className='mb-10'>
            <div className="flex gap-1 p-1 rounded-2xl bg-gris-100 sm:inline-flex">
                {tabs.map((tab) => {
                    const isActive = location.pathname === tab.href
                    return (
                        <Link
                            key={tab.name}
                            to={tab.href}
                            className={`flex flex-1 sm:flex-none items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                isActive
                                    ? 'bg-white text-azul-600 shadow-sm shadow-gris-900/10'
                                    : 'text-gris-500 hover:text-gris-700'
                            }`}
                        >
                            <tab.icon
                                className={`h-4 w-4 shrink-0 ${isActive ? 'text-azul-500' : 'text-gris-400'}`}
                                aria-hidden="true"
                            />
                            <span>{tab.name}</span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}