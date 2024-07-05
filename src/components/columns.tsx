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
        accessorKey: 'time_in',
        header: 'Time Signed In'
    },
    {
        header: 'Sign Out',
        cell: ({ row }) => <SignOutDialog row={row.original} />
    }
]