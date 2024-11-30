'use client'

import { type ColumnDef } from '@tanstack/react-table'
import SignOutDialog from '~/components/sign-out-dialog'

export type ColumnsType = {
    id: string
    ninja_name: string
    time_in: string
}

export const columns: ColumnDef<ColumnsType>[] = [
    {
        accessorKey: 'ninja_name',
        header: 'Ninja Name'
    },
    {
        header: 'Time Signed In',
        accessorKey: 'time_in'
    },
    {
        accessorKey: 'phone_number',
        header: 'Phone Number'
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
        header: 'Sign Out',
        cell: ({ row }) => <SignOutDialog row={row.original} />
    }
]
