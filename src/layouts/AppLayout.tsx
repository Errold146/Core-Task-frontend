import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { Footer, Logo, NavMenu, Spinner } from "@/components";

export default function AppLayout() {

    const { data, isError, isLoading } = useAuth()

    if ( isLoading ) return <Spinner centered />;
    if ( isError ) return <Navigate to={'/auth/login'} />;

    if ( data ) return (
        <>
            <header className="px-10 py-2 bg-gris-800">
                <div className="flex flex-col items-center justify-between mx-auto max-w-screen-2xl lg:flex-row">
                    <div className="w-20">
                        <Logo />
                    </div>

                    <NavMenu name={data.name} />
                </div>
            </header>

            <section className="p-5 mx-auto mt-10 max-w-screen-2xl">
                <Outlet />
            </section>

            <Footer />
        </>
    )
}
