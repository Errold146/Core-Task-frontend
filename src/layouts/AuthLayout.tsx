import { Logo } from "@/components";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <>
            <div className="min-h-screen px-4 py-8 bg-gradient-to-b from-gris-800 via-gris-800 to-gris-700 sm:py-12">
                <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md flex-col justify-center">
                    <div className="mx-auto mb-6 w-40 sm:mb-8 sm:w-44 md:w-48 [&_img]:block [&_img]:h-auto [&_img]:w-full">
                        <Logo />
                    </div>

                    <div className="pb-4 sm:pb-6">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
