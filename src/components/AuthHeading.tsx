type AuthHeadingProps = {
    title: string;
    description: string;
    highlight: string;
};

export function AuthHeading({ title, description, highlight }: AuthHeadingProps) {
    return (
        <>
            <h1 className="text-3xl font-black text-white sm:text-4xl">{title}</h1>
            <p className="mt-3 text-base text-gris-200 sm:text-lg">
                {description}{' '}
                <span className="font-bold text-azul-400">{highlight}</span>
            </p>
        </>
    );
}
