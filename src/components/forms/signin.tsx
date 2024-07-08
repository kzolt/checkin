'use client'

import { useFormStatus, useFormState } from 'react-dom'
import { useEffect, useRef } from 'react'
import { FormItem } from '~/components/ui/form'
import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { toast } from 'sonner'

import { sign_in_action } from '~/server/actions'

export default function SignIn(props: { center: 'northridge' | 'silverlake' }) {
    const [state, formAction] = useFormState(sign_in_action, {
        success: false,
        errors: undefined
    })

    const { pending } = useFormStatus()

    const ninja_name_ref = useRef<HTMLInputElement>(null)
    const dropoff_phone_number_ref = useRef<HTMLInputElement>(null)
    const dropoff_guardian_ref = useRef<HTMLInputElement>(null)
    const pickup_guardian_ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (state.success) {
            toast.success('Ninja Signed In')

            if (
                ninja_name_ref.current &&
                dropoff_guardian_ref.current &&
                dropoff_phone_number_ref.current &&
                pickup_guardian_ref.current
            ) {
                ninja_name_ref.current.value = ''
                dropoff_guardian_ref.current.value = ''
                dropoff_phone_number_ref.current.value = ''
                pickup_guardian_ref.current.value = ''
            }
        } else if (!state.success && state.errors) {
            toast.error(state.errors.ninja_name)
        }
    }, [state])

    return (
        <form className="flex w-full flex-col gap-5" action={formAction}>
            <FormItem>
                <Input name="center" value={props.center} type="hidden" />
            </FormItem>
            <FormItem>
                <Label>Ninja&apos;s Name*</Label>
                <Input
                    ref={ninja_name_ref}
                    name="ninja_name"
                    placeholder="Enter your ninja's name"
                />
            </FormItem>
            <FormItem>
                <Label>Guardian Name*</Label>
                <Input
                    ref={dropoff_guardian_ref}
                    name="dropoff_guardian"
                    placeholder="Guardian Name"
                />
            </FormItem>
            <FormItem>
                <Label>Phone Number*</Label>
                <Input
                    ref={dropoff_phone_number_ref}
                    name="phone_number"
                    type="tel"
                    placeholder="Phone number"
                />
            </FormItem>
            <FormItem>
                <Label>Pickup Guardian</Label>
                <Input
                    ref={pickup_guardian_ref}
                    name="pickup_guardian"
                    placeholder="Pickup name"
                />
            </FormItem>

            <Button type="submit" disabled={pending}>
                Sign In
            </Button>
        </form>
    )
}
