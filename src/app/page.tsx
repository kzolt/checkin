import { Suspense } from 'react'
import { unstable_cache } from 'next/cache'

import SignIn from '~/components/forms/signin'
import { DataTable } from '~/components/ui/data-table'

import { db } from '~/server/db'
import { signins } from '~/server/db/schema'
import { Separator } from '~/components/ui/separator'

const get_ninjas = unstable_cache(
    async () => {
        const ninjas = await db.query.signins.findMany()

        const formattedNinjas = ninjas.map((ninja) => ({
            ninja_name: ninja.ninja_name,
            time_in: ninja.time_in.toLocaleTimeString(['en-US'], {
                hour: '2-digit',
                minute: '2-digit'
            })
        }))

        return formattedNinjas
    },
    ['ninjas'],
    { tags: ['ninjas'] }
)

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
    const ninjas = await get_ninjas()

    return (
        <DataTable
            columns={[
                {
                    accessorKey: 'ninja_name',
                    header: 'Ninja Name'
                },
                {
                    accessorKey: 'time_in',
                    header: 'Time Signed In'
                }
            ]}
            data={ninjas}
        />
    )
}
