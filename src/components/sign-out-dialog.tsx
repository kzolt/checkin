'use client'

import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { LogOutIcon } from 'lucide-react'

import { toast } from 'sonner'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import type { ColumnsType } from '~/components/columns'

import { Separator } from '~/components/ui/separator'
import SubmitButton from '~/components/forms/submit-button'

import { sign_out_action } from '~/server/actions'

export default function SignOutDialog(props: { row: ColumnsType }) {
    const [state, formAction] = useFormState(sign_out_action, {
        success: false,
        errors: undefined
    })

    useEffect(() => {
        if (state.success) {
            toast.success('Signed out successfully')
        } else if (!state.success && state.errors) {
            toast.error(state.errors.guardian_signature)
        }
    }, [state])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <LogOutIcon />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Sign Out</DialogTitle>
                    <DialogDescription>
                        Please enter your name to sign out
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <form action={formAction} className="flex w-full flex-col gap-5">
                    <Input name="id" value={props.row.id} className="hidden" />
                    <Input name="guardian_signature" placeholder="Enter your name" />
                    <DialogClose>
                        <SubmitButton text="Sign Out" />
                    </DialogClose>
                </form>
            </DialogContent>
        </Dialog>
    )
}
