import '~/styles/globals.css'

import { GeistSans } from 'geist/font/sans'
import NextTopLoader from 'nextjs-toploader'

import { ThemeProvider } from '~/components/ui/theme-provider'
import { ModeToggle } from '~/components/ui/theme-switcher'

import { Toaster } from '~/components/ui/sonner'

export const metadata = {
    title: 'Code Ninjas Tracker',
    description: 'Code Ninjas Northridge & Los Angeles Tracker',
    icons: [{ rel: 'icon', url: '/favicon.ico' }]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${GeistSans.variable}`} suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <NextTopLoader />
                    {children}
                    <div className="absolute right-0 top-0 m-10">
                        <ModeToggle />
                    </div>
                    <Toaster position="bottom-right" richColors />
                </ThemeProvider>
            </body>
        </html>
    )
}
