import Link from 'next/link'

export default function MainPage() {
    return (
        <main className="flex h-screen w-screen flex-col items-center justify-center gap-5">
            <Link
                href="/northridge"
                className="flex flex-row items-center justify-center rounded-md bg-primary p-5 text-primary-foreground"
            >
                Northridge
            </Link>
            <Link
                href="/silverlake"
                className="flex flex-row items-center justify-center rounded-md bg-primary p-5 text-primary-foreground"
            >
                Silverlake
            </Link>
        </main>
    )
}
