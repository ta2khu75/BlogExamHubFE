import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Search",
    description: "Search",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}