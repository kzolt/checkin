import { Suspense } from 'react'

import SignIn from '~/components/forms/signin'
import { DataTable } from '~/components/ui/data-table'

import { Separator } from '~/components/ui/separator'
import { columns } from '~/components/columns'
import { get_signed_in_ninjas } from '~/server/queries'

export default function SignInSheetPage({ params }: { params: { center: string } }) {
    return (
        <main className="grid grid-cols-1 pt-20">
            <div className="container mx-auto flex max-w-3xl flex-col gap-5">
                <SignIn center={params.center as 'northridge' | 'silverlake'} />
                <Separator />
                <Suspense fallback={<div>Loading...</div>}>
                    <GetSignedInNinjas
                        center={params.center as 'northridge' | 'silverlake'}
                    />
                </Suspense>
            </div>
        </main>
    )
}

async function GetSignedInNinjas(props: { center: 'northridge' | 'silverlake' }) {
    const ninjas = await get_signed_in_ninjas(props.center)

    return <DataTable columns={columns} data={ninjas} />
}
