import { Suspense } from 'react'

import SignIn from '~/components/forms/signin'
import { DataTable } from '~/components/ui/data-table'

import { Separator } from '~/components/ui/separator'
import { columns } from '~/components/columns'
import { get_signed_in_ninjas } from '~/server/queries'

export default function SignInSheetPage() {
    return (
        <main className="grid grid-cols-1 pt-20">
            <div className="container mx-auto flex max-w-3xl flex-col gap-5">
                <SignIn />
                <Separator />
                <Suspense fallback={<div>Loading...</div>}>
                    <GetSignedInNinjas />
                </Suspense>
            </div>
        </main>
    )
}

async function GetSignedInNinjas() {
    const ninjas = await get_signed_in_ninjas()

    return <DataTable columns={columns} data={ninjas} />
}
