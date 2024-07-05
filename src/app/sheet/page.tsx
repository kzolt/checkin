import SignIn from '~/components/forms/signin'

export default function SignInSheetPage() {
    return (
        <main className="flex h-screen w-screen items-center justify-center">
            <div className="container mx-auto flex max-w-xl flex-col gap-5">
                <SignIn />
            </div>
        </main>
    )
}
