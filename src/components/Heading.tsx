type HeadingProps = {
    title: string;
    subtitle: string;
};

export function Heading({ title, subtitle }: HeadingProps) {
    return (
        <>
            <h1 className="text-5xl font-black text-gray-800">{title}</h1>
            <p className="mt-5 text-2xl font-medium text-gris-500">{subtitle}</p>
        </>
    );
}
