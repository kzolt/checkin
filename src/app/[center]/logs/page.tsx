import { Suspense } from 'react'

import { DataTable } from '~/components/ui/data-table'
import { get_ninjas } from '~/server/queries'

export default function LogPage() {
    return (
        <div className="container mx-auto flex max-w-6xl flex-col gap-5 pt-20">
            <Suspense fallback={<div>Loading...</div>}>
                <GetNinjas />
            </Suspense>
        </div>
    )
}

async function GetNinjas() {
    const ninjas = await get_ninjas()

    return (
        <DataTable
            columns={[
                {
                    accessorKey: 'ninja_name',
                    header: 'Ninja Name'
                },
                {
                    accessorKey: 'dropoff_guardian',
                    header: 'Dropoff Guardian'
                },
                {
                    accessorKey: 'pickup_guardian',
                    header: 'Pickup Guardian'
                },
                {
                    accessorKey: 'date',
                    header: 'Date'
                },
                {
                    accessorKey: 'time_in',
                    header: 'Time In'
                },
                {
                    accessorKey: 'time_out',
                    header: 'Time Out'
                }
            ]}
            data={ninjas}
        />
    )
}
