import Link from 'next/link'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from '~/components/ui/card'

export default function MainPage() {
    return (
        <main className="flex h-screen w-screen flex-row items-center justify-center gap-5">
            <Card>
                <CardHeader>
                    <CardTitle>Centers</CardTitle>
                    <CardDescription>Please select a center</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-row gap-5">
                    <Link
                        href="/northridge"
                        className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    >
                        Northridge
                    </Link>
                    <Link
                        href="/silverlake"
                        className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    >
                        Silverlake
                    </Link>
                </CardContent>
            </Card>
        </main>
    )
}
