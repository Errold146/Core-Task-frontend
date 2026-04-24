
export function ErrorMessage({children}: {children: React.ReactNode}) {
    return (
        <p className="mt-1 text-sm font-medium text-red-500">
            {children}
        </p>
    )
}
