'use client'

import { useFormStatus, useFormState } from 'react-dom'
import { useEffect, useState } from 'react'
import { FormItem } from '~/components/ui/form'
import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { toast } from 'sonner'

import { sign_in_action } from '~/server/actions'

export default function SignIn(props: { center: 'northridge' | 'silverlake' }) {
    const [inputText, setInputText] = useState('')
    const [state, formAction] = useFormState(sign_in_action, {
        success: false,
        errors: undefined
    })

    const { pending } = useFormStatus()

    useEffect(() => {
        if (state.success) {
            toast.success('Ninja Signed In')
            setInputText('')
        } else if (!state.success && state.errors) {
            toast.error(state.errors.ninja_name)
        }
    }, [state])

    return (
        <form className="flex w-full flex-col gap-5" action={formAction}>
            <FormItem>
                <Label>Ninja&apos;s Name</Label>
                <Input name="center" value={props.center} type="hidden" />
                <Input
                    name="ninja_name"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter your ninja's name"
                />
            </FormItem>
            <Button type="submit" disabled={pending}>
                Sign In
            </Button>
        </form>
    )
}
